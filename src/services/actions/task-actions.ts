import {TaskStatuses, TaskTypes} from "../../middleware/todolist-api";

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
    status: TaskStatuses,
    todolistId: string
}
export type SetTasksActionType = {
    type: 'SET-TASKS',
    tasks: TaskTypes[]
    todolistId: string
}

export const setTasksAC = (tasks: TaskTypes[], todolistId: string): SetTasksActionType => {
    return {type: 'SET-TASKS', tasks, todolistId} as const
}
export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId, todolistId} as const
}
export const addTaskAC = (task: TaskTypes): AddTaskActionType => {
    return {type: 'ADD-TASK', task} as const
}
export const changeTaskStatusAC = (id: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', id, status, todolistId} as const
}
export const changeTaskTitleAC = (id: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', id, title, todolistId} as const
}