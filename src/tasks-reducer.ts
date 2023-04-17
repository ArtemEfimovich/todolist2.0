import {TasksStateType} from "./App";
import {AddTodolistActionType, RemoveTodoListActionType, SetTodolistsActionType} from "./todolists-reducer";
import {TaskTypes, todolistAPI} from "./api/todolist-api";
import {DispatchType} from "./state/store";



export type  RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    taskId: string,
    todolistId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    task: TaskTypes
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
    tasks: TaskTypes[]
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
            const stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId]
            stateCopy[action.task.todoListId] = [action.task,...tasks]
            return stateCopy
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
            return {stateCopy, [action.todolist.id]: []}
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



export const setTasksAC = (tasks:TaskTypes[],todolistId:string):SetTasksActionType =>{
    return {type:'SET-TASKS',tasks,todolistId}
}
export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId, todolistId}
}

export const addTaskAC = (task:TaskTypes): AddTaskActionType => {
    return {type: 'ADD-TASK',task}
}

export const changeTaskStatusAC = (id: string, filter: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', id, filter, todolistId}
}

export const changeTaskTitleAC = (id: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', id, title, todolistId}
}



export const fetchTasksTC = (todolistId:string)=>(dispatch:DispatchType<any>)=>{
    todolistAPI.getTask(todolistId)
        .then((res)=>{
            let tasks = res.data.items
            dispatch(setTasksAC(tasks,todolistId))
        })
}

export const createTaskTC = (todolistId : string,title:string)=>(dispatch : DispatchType<any>)=>{
    todolistAPI.createTask(todolistId,title)
        .then((res)=>{
            dispatch(addTaskAC(res.data.data.item))
        })
}


export const removeTaskTC = (taskId:string,todolistId:string)=>(dispatch : DispatchType<any>)=> {
    todolistAPI.deleteTask(todolistId,taskId)
        .then(()=>{
            dispatch(removeTaskAC(taskId,todolistId))
        })
}