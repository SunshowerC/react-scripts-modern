

import React, { FunctionComponent } from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux'
import { IAction, addList, add } from "../../store/actions"

import { IState } from "../../store/reducers"
import list, { State as ListState } from "../../store/reducers/list"
import { State as SimpleCountState } from "../../store/reducers/simple-count"

interface IMapDispatchToProps {
    addList: IAction,
    add: IAction
}

interface IMapState {
    count: SimpleCountState
    list: ListState
}

const HomePage: FunctionComponent<IMapDispatchToProps & IMapState> = (props) => {
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


const mapDispathToProps: MapDispatchToProps<IMapDispatchToProps, {}> = {
    addList,
    add
}
const mapStateToProps: MapStateToProps<IMapState, {}, IState> = state => {
    return {
        list: state.list,
        count: state.simpleCount
    }
}

export default connect(
    mapStateToProps,
    mapDispathToProps
)(HomePage)


