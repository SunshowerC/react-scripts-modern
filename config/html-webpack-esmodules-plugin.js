// 把 IOS 10.3 的 fix 代码单独拎出来
const safariFix = `!function(){var e=document,t=e.createElement("script");if(!("noModule"in t)&&"onbeforeload"in t){var n=!1;e.addEventListener("beforeload",function(e){if(e.target===t)n=!0;else if(!e.target.hasAttribute("nomodule")||!n)return;e.preventDefault()},!0),t.type="module",t.src=".",e.head.appendChild(t),t.remove()}}();`

// 动态插入脚本
let InsertScript =`
    (function(){
        var insertScript = function(option, elem) {
            if(!option) return false;

            var s = document.createElement("script");
            elem = elem || document.head
            for(var name in option) {
              s.defer = true
              s.setAttribute(name, option[name])
            }
            elem.appendChild(s)
        }

        var  script = document.createElement("script");
        var supportEsModule = 'noModule' in script;
        var modernList = \${modernList};
        var legacyList = \${legacyList};
        var scriptList = supportEsModule ? modernList : legacyList

        scriptList.forEach(function(item){
            insertScript(item)
        })
    })()`

class ModuleHtmlPlugin {
  constructor(htmlWebpackPlugin, opt) {
    this.htmlWebpackPlugin = htmlWebpackPlugin
    this.isModule = opt.isModernBuild
    this.dynamicInsert = opt.dynamicInsert
  }

  apply(compiler) {
    const id = 'ModuleHtmlPlugin'
    // 利用 webpack 的核心事件 tap
    compiler.hooks.compilation.tap(id, compilation => {
      // 在 htmlWebpackPlugin 拿到资源的时候我们处理下
      // 给 script 标签加上 type=module 或者 nomodule 属性
      this.htmlWebpackPlugin
        .getHooks(compilation)
        .alterAssetTags
        .tapAsync(
          id,
          (data, cb) => {
            data.assetTags.scripts.forEach(tag => {
              // 遍历下资源，把 script 中的 ES2015+ 和 legacy 的处理开
              if (tag.tagName === 'script') {
                // 给 legacy 的资源加上 nomodule 属性，反之加上 type="module" 的属性
                if (/-legacy\./.test(tag.attributes.src)) {
                  delete tag.attributes.type
                  tag.attributes.nomodule = true
                } else {
                  tag.attributes.type = 'module'
                }
              }
            })

            // 在这一步加上 10.3 的 fix，很简单，就是往资源的数组里面的 push 一个资源对象
            if (this.isModule) {
              // 移除 modern 的 style 外链，避免重复的 css
              data.assetTags.styles = []

              // inject Safari 10 nomdoule fix
              data.assetTags.scripts.unshift({
                tagName: 'script',
                closeTag: true,
                innerHTML: safariFix
              })
            }
            cb(null, data)
          }
        )

        this.dynamicInsert && this.dynamicInsertScript(id, compilation)


    })
  }

  dynamicInsertScript(id , compilation) {
    // 如果不需要 动态嵌入代码，直接使用 type=module和 nomodule，以下代码可去除
    this.htmlWebpackPlugin
      .getHooks(compilation)
      .alterAssetTagGroups
      .tap(id, (data) => {
        
        // 嵌入 内联的 script 代码，因为构建了两次，但只需要嵌入一份，所以需要 _isInsertDynamicScript 标识是否已经嵌入代码
        global._isInsertDynamicScript || data.headTags.unshift({
          closeTag: true,
          tagName: 'script',
          innerHTML: InsertScript
        })

        global._isInsertDynamicScript = true


      })

      
    this.htmlWebpackPlugin
      .getHooks(compilation)
      .afterTemplateExecution
      .tap(id, (data, cb) => {
        let targetTags = data.plugin.options.inject === 'head' ? 'headTags' : 'bodyTags'

        // 将文件名列表 作为变量值 嵌入到 内联script 标签
        var morderScriptStr = JSON.stringify( 
          data[targetTags].map(item=> item.attributes && item.attributes.src && item.attributes.type === 'module' ? {src: item.attributes.src} : null).filter((item)=> item && !item.src.includes('runtime'))
        )
        var legacyScriptStr = JSON.stringify(
          data[targetTags].map(item=> item.attributes && item.attributes.src && item.attributes.nomodule ? {src: item.attributes.src} : null).filter((item)=> item && !item.src.includes('runtime'))
        )

        if (morderScriptStr !== '[]') {
          data.headTags[0].innerHTML && (data.headTags[0].innerHTML = data.headTags[0].innerHTML.replace('${modernList}', morderScriptStr))
          data.html = data.html.replace('${modernList}', morderScriptStr)
        } 
        if (legacyScriptStr !== '[]') {
          data.headTags[0].innerHTML && (data.headTags[0].innerHTML = data.headTags[0].innerHTML.replace('${legacyList}', legacyScriptStr))
          data.html = data.html.replace('${legacyList}', legacyScriptStr)
        }


        // 使用动态插入 script 标签后， 移除 type=module 和 nomodule 的标签
        data[targetTags] = data[targetTags].filter(item => {
          // 如果没有 attributes, attributes.src（内联脚本） ， 或者 src 是 runtime, 将不过滤
          return !item.attributes || 
                !item.attributes.src ||
                item.attributes.src.includes('runtime') || 
                (item.attributes.type !== 'module' && !item.attributes.nomodule)
 
        })
      })
  }
}

module.exports = ModuleHtmlPlugin
