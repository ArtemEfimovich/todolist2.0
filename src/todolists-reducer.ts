import {FilterValueType, TodolistsType} from "./App";
import {todolistAPI} from "./api/todolist-api";
import {DispatchType} from "./state/store";





export type  RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    todolist:TodolistsType
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
        case 'ADD-TODOLIST':{
            const stateCopy = {...state}
            return [stateCopy,{...action.todolist, filter:'all'}]
        }
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
export const addTodolistAC = (todolist:TodolistsType): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', todolist}
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


export const fetchTodolistsThunk = (dispatch:DispatchType<any>):void=>{
    todolistAPI.getTodolists()
        .then((res)=>{
            dispatch(setTodolistsAC(res.data))
        })
        .catch(()=>{
        })
}

export const addTodolistTC = (title:string)=>(dispatch : DispatchType<any>)=>{
      todolistAPI.createTodolist(title)
        .then((res) => {
             dispatch(addTodolistAC(res.data.data.item))
        })
}

export const removeTodolistTC = (todolistId:string)=>(dispatch : DispatchType<any>)=>{
    todolistAPI.deleteTodolist(todolistId)
        .then(()=>{
            dispatch(removeTodolistAC(todolistId))
        })
}

export const changeTodolistTitleTC = (title:string,todolistId:string)=>(dispatch:DispatchType<any>)=>{
    todolistAPI.updateTodolist(todolistId,title)
        .then(()=>{
            dispatch(changeTodolistTitleAC(todolistId,title))
        })
}