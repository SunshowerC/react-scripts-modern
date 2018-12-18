# react-scripts-modern
基于 [create-react-app 中 react-scripts](https://github.com/facebook/create-react-app/tree/master/packages/react-scripts) 的二次封装， 更加完善健全的 react-scripts 模板

## 使用
- 生成工程     
    1. 首先安装 create-react-app 2.x 的版本： `npm i -g create-react-app`
    2. `create-react-app 工程名 --scripts-version react-scripts-shopee --typescript`, 包管理默认使用  yarn , 如果需要使用 npm , 需要加上 `--use-npm` 参数    

- eject 配置        
`npm run eject`
- 本地开发     
`npm start`
- 构建    
`npm run build`
- modern build 构建   
`npm run build:modern`
- 分析代码包    
`npm run analysis`



## 新增特性
- [x] 集成 `react-router`, `redux`
- [x] 集成 react.lazy 对路由按需加载
- [x] 对 polyfill 按需引入
- [x] 构建出 es6 和 es5 两份代码，根据 type=module/nomodule 浏览器支持程度自动下载所需要的代码 (npm run build)
- [ ] tslint
