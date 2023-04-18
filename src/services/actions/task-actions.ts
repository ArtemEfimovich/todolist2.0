import {TaskStatuses, TaskTypes} from "../../middleware/todolist-api";

export type  RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type SetTasksActionType = ReturnType<typeof setTasksAC>

export const setTasksAC = (tasks: TaskTypes[], todolistId: string) => {
    return {type: 'SET-TASKS', tasks, todolistId} as const
}
export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', taskId, todolistId} as const
}
export const addTaskAC = (task: TaskTypes) => {
    return {type: 'ADD-TASK', task} as const
}
export const changeTaskStatusAC = (id: string, status: TaskStatuses, todolistId: string) => {
    return {type: 'CHANGE-TASK-STATUS', id, status, todolistId} as const
}
export const changeTaskTitleAC = (id: string, title: string, todolistId: string) => {
    return {type: 'CHANGE-TASK-TITLE', id, title, todolistId} as const
}