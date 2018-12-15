import { PLUS } from "../actions/types"


export default (state = 0, action ) => {
  switch (action.type) {
    case PLUS:
      return state + 1
    
    default:
      return state
  }
}
