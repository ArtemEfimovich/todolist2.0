import {FilterValueType, TodolistsType} from "./App";
import {v1} from "uuid";
import {todolistAPI} from "./api/todolist-api";
import {AppRootStateType, DispatchType} from "./state/store";
import {Dispatch} from "redux";
import {AxiosError} from "axios";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;


export type  RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string,
    todolistId: string
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValueType
}

export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS'
    todolists:  TodolistsType[]
}

type ActionsType = RemoveTodoListActionType |
    AddTodolistActionType |
    ChangeTodolistTitleActionType |
    ChangeTodolistFilterActionType|
    SetTodolistsActionType


const initialState: TodolistsType[] = []

export const todolistsReducer = (state: TodolistsType[]=initialState, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            let newTodolist: TodolistsType = {id: action.todolistId, title: action.title, filter: 'all'}
            return [...state, newTodolist]
        case 'CHANGE-TODOLIST-TITLE':
            const todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return [...state]
        case 'CHANGE-TODOLIST-FILTER':
            const todolistFilter = state.find(tl => tl.id === action.id)
            if (todolistFilter) {
                todolistFilter.filter = action.filter
            }
            return [...state]
        case'SET-TODOLISTS': {
            return action.todolists.map((tl)=>{
                return {...tl,filter:'all'}
            })
        }
        default:
            return state
    }
}


export const setTodolistsAC = (todolists:  TodolistsType[]): SetTodolistsActionType => {
    return {type: 'SET-TODOLISTS', todolists}
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title, todolistId: v1()}
}

export const removeTodolistAC = (id: string): RemoveTodoListActionType => {
    return {type: 'REMOVE-TODOLIST', id}
}

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValueType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}


export const fetchTodolistsThunk = (dispatch:DispatchType):void=>{
    todolistAPI.getTodolists()
        .then((res)=>{
            dispatch(setTodolistsAC(res.data))
        })
        .catch((error:AxiosError)=>{

        })
}