import { PLUS, MULTIPLE, ADD_LIST } from "./types"

export type IAction = (payload?: any) => { type: string; payload?: any }

export const add: IAction = () => ({
  type: PLUS
  //   payload: {
  //     id: ++nextTodoId,
  //     content
  //   }
})

export const multiple: IAction = () => ({
  type: MULTIPLE
})

export const addList: IAction = content => ({
  type: ADD_LIST,
  payload: content
})
