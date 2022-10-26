import {FilterValueType, TasksStateType} from "./App";
import {v1} from "uuid";



export type  RemoveTaskActionType = {
    type:'REMOVE-TASK',
    taskId:string,
    todolistId:string
}

export type AddTaskActionType = {
    type:'ADD-TASK',
    title: string,
    todolistId:string
}

export type ChangeTaskTitleActionType = {
    type:'CHANGE-TODOLIST-TITLE',
    id:string,
    title:string
}

export type ChangeTaskStatusActionType= {
    type:'CHANGE-TODOLIST-FILTER' ,
    id:string,
    filter:FilterValueType
}


type ActionsType = RemoveTaskActionType|
    AddTaskActionType|
    ChangeTaskTitleActionType|
    ChangeTaskStatusActionType


export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            let stateCopy = {...state}
            let todolistTask = stateCopy[action.todolistId]
             let newTask = todolistTask.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId] = newTask
            return stateCopy
        case 'ADD-TASK':
            let task = {id: v1(), title: action.title, isDone: false}
            let todolistTasks = state[action.todolistId]
            state[action.todolistId] = [task, ...todolistTasks]
            return state
        default:
            throw new Error("I don`t understand this type ")
    }
}


export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId, todolistId}
}

export const addTaskAC = (title:string,todolistId:string):AddTaskActionType=>{
 return  {type:'ADD-TASK',title,todolistId}
}


