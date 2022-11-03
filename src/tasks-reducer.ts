import {TasksStateType} from "./App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodoListActionType} from "./todolists-reducer";


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
    todolistId:string
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    id: string,
    filter: boolean,
    todolistId: string
}


type ActionsType = RemoveTaskActionType |
    AddTaskActionType |
    ChangeTaskTitleActionType |
    ChangeTaskStatusActionType|AddTodolistActionType|RemoveTodoListActionType


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
        case  'CHANGE-TASK-STATUS':
            let stateCopys = {...state}
            let todolistTaskStatus = stateCopys[action.todolistId]
            let taskStatus = todolistTaskStatus.find(task => task.id === action.id)
            if(taskStatus){
                taskStatus.isDone = action.filter
            }
            return {...state}
        case 'CHANGE-TASK-TITLE':
            let copy = {...state}
            let todolistTaskTitle = copy[action.todolistId]
            let taskFind = todolistTaskTitle.find(task => task.id === action.id)
            if(taskFind){
                taskFind.title = action.title
            }
            return {...state}
        case 'ADD-TODOLIST':
            return {...state,[action.todolistId]:[]}
        case 'REMOVE-TODOLIST':
            let deleteCopyState = {...state}
            delete deleteCopyState[action.id]
            return deleteCopyState
        default:
            throw new Error("I don`t understand this type ")
    }
}


export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId, todolistId}
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistId}
}

export const changeTaskStatusAC = (id: string, filter: boolean,todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', id, filter,todolistId}
}

export const changeTaskTitleAC=(id:string,title:string,todolistId:string):ChangeTaskTitleActionType=>{
    return {type:'CHANGE-TASK-TITLE',id,title,todolistId}
}

