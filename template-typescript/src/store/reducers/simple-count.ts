import { PLUS, MULTIPLE } from "../actions/types"

export type State = number

export default (state = 0, action:any) => {
  switch (action.type) {
    case PLUS:
      return state + 1
    case MULTIPLE:
      return state * state
    default:
      return state
  }
}
