import {FilterValueType, TodolistsType} from "../../pages/AppWithRedux";


export type  RemoveTodoListActionType = ReturnType<typeof removeTodolistAC>

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>

export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>

export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>

export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>


export const setTodolistsAC = (todolists:  TodolistsType[]) => {
    return {type: 'SET-TODOLISTS', todolists} as const
}
export const addTodolistAC = (todolist:TodolistsType) => {
    return {type: 'ADD-TODOLIST', todolist} as const
}

export const removeTodolistAC = (id: string) => {
    return {type: 'REMOVE-TODOLIST', id} as const
}

export const changeTodolistTitleAC = (id: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title} as const
}
export const changeTodolistFilterAC = (id: string, filter: FilterValueType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter} as const
}