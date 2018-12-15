import { ADD_LIST } from "../actions/types"

export default (state = [], action) => {
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
