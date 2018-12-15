

import React  from 'react';
import { connect } from 'react-redux'
import { addList, add } from "../../store/actions"
 

 

const HomePage = (props) => {
    return <div>
        <h1>home page</h1>
        <p>
            current number is {props.count}  <button onClick={props.add}> +1 </button>
        </p>
        
        
        <button onClick={()=>props.addList(props.count)} >add to list</button>
        <div>
            <p>current list:</p>
            <ul>
                {props.list.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
        </div>
        
    </div>
}


const mapDispathToProps  = {
    addList,
    add
}
const mapStateToProps  = state => {
    return {
        list: state.list,
        count: state.simpleCount
    }
}

export default connect(
    mapStateToProps,
    mapDispathToProps
)(HomePage)


