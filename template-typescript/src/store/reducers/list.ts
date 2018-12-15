import { ADD_LIST } from "../actions/types"

export type State = any[]
export default (state: State = [], action:any) => {
  switch (action.type) {
    case ADD_LIST:
      return [
        ...state,
        parseInt(action.payload)
      ]
    default:
      return state
  }
}
