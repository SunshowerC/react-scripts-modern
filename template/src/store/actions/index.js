import { PLUS, ADD_LIST } from "./types"


export const add = () => ({
  type: PLUS
  //   payload: {
  //     id: ++nextTodoId,
  //     content
  //   }
})
 

export const addList = content => ({
  type: ADD_LIST,
  payload: content
})
