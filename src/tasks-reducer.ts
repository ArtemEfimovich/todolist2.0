import {TasksStateType} from "./App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodoListActionType, SetTodolistsActionType} from "./todolists-reducer";

import {Dispatch} from "redux";
import { todolistAPI} from "./api/todolist-api";
import {TaskType} from "./Todolist";
import {DispatchType} from "./state/store";



export type  RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    taskId: string,
    todolistId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    title: string,
    todolistId: string
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    id: string,
    title: string,
    todolistId: string
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    id: string,
    filter: boolean,
    todolistId: string
}

export type SetTasksActionType = {
    type:'SET-TASKS',
    tasks: TaskType[]
    todolistId: string
}

type ActionsType = RemoveTaskActionType |
    AddTaskActionType |
    ChangeTaskTitleActionType |
    ChangeTaskStatusActionType |
    AddTodolistActionType |
    RemoveTodoListActionType|
    SetTodolistsActionType|
    SetTasksActionType


const initialState: TasksStateType = {}


export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType) => {

    switch (action.type) {
        case 'REMOVE-TASK': {
            let stateCopy = {...state}
            let todolistTask = stateCopy[action.todolistId]
            stateCopy[action.todolistId] = todolistTask.filter(t => t.id !== action.taskId)
            return stateCopy
        }
        case 'ADD-TASK': {
            let task = {id: v1(), title: action.title, isDone: false}
            let todolistTasks = state[action.todolistId]
            state[action.todolistId] = [task, ...todolistTasks]
            return state
        }
        case  'CHANGE-TASK-STATUS': {
            let stateCopy = {...state}
            let todolistTaskStatus = stateCopy[action.todolistId]
            let taskStatus = todolistTaskStatus.map(t => t.id === action.id ? {...t, status: action.filter} : t);
            state[action.todolistId] = [...taskStatus]
            return stateCopy
        }
        case 'CHANGE-TASK-TITLE': {
            let stateCopy = {...state}
            let todolistTaskTitle = stateCopy[action.todolistId]
            let taskFind = todolistTaskTitle.map(t => t.id === action.id ? {...t, title: action.title} : t);
            state[action.todolistId] = [...taskFind]
            return stateCopy
        }
        case 'ADD-TODOLIST': {
            let stateCopy = {...state}
            return {stateCopy, [action.todolistId]: []}
        }
        case 'REMOVE-TODOLIST': {
            let stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        case 'SET-TODOLISTS':{
            const stateCopy = {...state}
            action.todolists.forEach((tl)=>{
                stateCopy[tl.id]=[]
            })
            return stateCopy
        }
        case 'SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        default:
            return state
    }
}



export const setTasksAC = (tasks:TaskType[],todolistId:string):SetTasksActionType =>{
    return {type:'SET-TASKS',tasks,todolistId}
}
export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId, todolistId}
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistId}
}

export const changeTaskStatusAC = (id: string, filter: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', id, filter, todolistId}
}

export const changeTaskTitleAC = (id: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', id, title, todolistId}
}



export const fetchTasksTC = (todolistId:string)=>(dispatch:DispatchType)=>{
    todolistAPI.getTask(todolistId)
        .then((res)=>{
            let tasks = res.data.items
            dispatch(setTasksAC(tasks,todolistId))
        })
}

