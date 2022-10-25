import {FilterValueType, TasksStateType} from "./App";



export type  RemoveTaskActionType = {
    type:'REMOVE-TASK',
    taskId:string,
    todolistId:string
}

export type AddTaskActionType = {
    type:'ADD-TODOLIST',
    title: string
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
        default:
            throw new Error("I don`t understand this type ")
    }
}


export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId, todolistId}
}
