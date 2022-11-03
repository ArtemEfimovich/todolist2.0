import {FilterValueType, TodolistsType} from "./App";
import {v1} from "uuid";


export type  RemoveTodoListActionType = {
    type:'REMOVE-TODOLIST',
    id:string
}

export type AddTodolistActionType = {
    type:'ADD-TODOLIST',
    title: string,
    todolistId:string
}

export type ChangeTodolistTitleActionType = {
    type:'CHANGE-TODOLIST-TITLE',
    id:string,
    title:string
}

export type ChangeTodolistFilterActionType= {
    type:'CHANGE-TODOLIST-FILTER' ,
    id:string,
    filter:FilterValueType
}


type ActionsType = RemoveTodoListActionType|
    AddTodolistActionType|
    ChangeTodolistTitleActionType|
    ChangeTodolistFilterActionType


export const todolistsReducer = (state: TodolistsType[], action: ActionsType) => {
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
            if(todolistFilter){
                todolistFilter.filter = action.filter
            }
            return [...state]
        default:
            throw new Error("I don`t understand this type ")
    }
}


export const addTodolistAC =(title:string):AddTodolistActionType=>{
    return {type: 'ADD-TODOLIST',title,todolistId:v1()}
}

export const removeTodolistAC = (id:string):RemoveTodoListActionType=>{
    return {type:'REMOVE-TODOLIST',id}
}

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValueType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}