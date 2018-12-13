import { combineReducers } from "redux"
import simpleCount, { State as SimpleCountState } from "./simple-count"
import list, { State as ListState } from "./list"

export interface IState {
  simpleCount: SimpleCountState
  list: ListState
}

export default combineReducers({ simpleCount, list })
