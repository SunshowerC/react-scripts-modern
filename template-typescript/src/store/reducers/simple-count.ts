import { PLUS } from "../actions/types"

export type State = number

export default (state = 0, action:any) => {
  switch (action.type) {
    case PLUS:
      return state + 1
    
    default:
      return state
  }
}
