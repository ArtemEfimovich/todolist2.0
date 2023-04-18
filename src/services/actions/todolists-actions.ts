
import {RequestStatusType} from "../reducers/app-reducer";
import {TodolistType} from "../../middleware/todolist-api";
import {FilterValuesType} from "../reducers/todolists-reducer";


export type  RemoveTodoListActionType = ReturnType<typeof removeTodolistAC>

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>

export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>

export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>

export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

export type ChangeTodolistEntityStatusType = ReturnType<typeof changeTodolistEntityStatusAC>
export const setTodolistsAC = (todolists:  TodolistType[]) => {
    return {type: 'SET-TODOLISTS', todolists} as const
}
export const addTodolistAC = (todolist:TodolistType) => {
    return {type: 'ADD-TODOLIST', todolist} as const
}

export const removeTodolistAC = (id: string) => {
    return {type: 'REMOVE-TODOLIST', id} as const
}

export const changeTodolistTitleAC = (id: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title} as const
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter} as const
}
export const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) => {
    return {type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, entityStatus} as const
}