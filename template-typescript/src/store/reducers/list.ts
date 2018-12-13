import { ADD_LIST } from "../actions/types"

export type State = any[]
export default (state: State = [], action:any) => {
  switch (action.type) {
    case ADD_LIST:
      return [
        ...state,
        action.payload || parseInt((Math.random() * 10) as any, 10)
      ]
    default:
      return state
  }
}
