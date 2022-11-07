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

const initialState:TasksStateType = {}


export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType) => {
    let stateCopy = {...state}
    switch (action.type) {
        case 'REMOVE-TASK':
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
            let todolistTaskStatus = stateCopy[action.todolistId]
            let taskStatus = todolistTaskStatus.map(t => t.id === action.id ? {...t, status: action.filter} : t);
            state[action.todolistId]= [...taskStatus]
            return stateCopy
        case 'CHANGE-TASK-TITLE':
            let todolistTaskTitle = stateCopy[action.todolistId]
            let taskFind = todolistTaskTitle.map(t => t.id === action.id ? {...t, title: action.title} : t);
            state[action.todolistId]= [...taskFind]
            return stateCopy
        case 'ADD-TODOLIST':
            return {stateCopy,[action.todolistId]:[]}
        case 'REMOVE-TODOLIST':
            delete stateCopy[action.id]
            return stateCopy
        default:
           return state
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

