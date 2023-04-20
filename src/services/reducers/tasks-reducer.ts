import {TaskStatuses, todolistAPI} from "middleware/todolist-api";
import {AppRootStateType, DispatchType} from "../store/store";
import {
    addTaskAC,
    AddTaskActionType, changeTaskStatusAC,
    ChangeTaskStatusActionType, changeTaskTitleAC,
    ChangeTaskTitleActionType, removeTaskAC,
    RemoveTaskActionType, setTasksAC, SetTasksActionType
} from "../actions/task-actions";

import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {TasksStateType} from "components/TodolistPage/TodolistPage";
import {appActions} from "services/reducers/app-reducer";
import {AxiosError} from "axios";


type ActionsType = RemoveTaskActionType |
    AddTaskActionType |
    ChangeTaskTitleActionType |
    ChangeTaskStatusActionType |
    SetTasksActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {

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
            stateCopy[action.task.todoListId] = [action.task, ...tasks]
            return stateCopy
        }
        case  'CHANGE-TASK-STATUS': {
            state[action.todolistId].map(t => t.id === action.id ? {
                ...t,
                status: action.status
            } : t)
            return ({...state})
        }
        case 'CHANGE-TASK-TITLE': {
            state[action.todolistId].map(t => t.id === action.id ? {...t, title: action.title} : t)
            return ({...state})
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.todolist.id]: []}
        }
        case 'REMOVE-TODOLIST': {
            let stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
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


export const fetchTasksTC = (todolistId: string) => (dispatch: DispatchType<any>) => {
    dispatch(appActions.appSetStatus({status:'loading'}))
    todolistAPI.getTask(todolistId)
        .then((res) => {
            let tasks = res.data.items
            dispatch(setTasksAC(tasks, todolistId))
            dispatch(appActions.appSetStatus({status:'succeeded'}))
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const createTaskTC = (todolistId: string, title: string) => (dispatch: DispatchType<any>) => {
    dispatch(appActions.appSetStatus({status:'loading'}))
    todolistAPI.createTask(todolistId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                const task = res.data.data.item
                dispatch(addTaskAC(task))
                dispatch(appActions.appSetStatus({status:'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: DispatchType<any>) => {
    dispatch(appActions.appSetStatus({status:'loading'}))
    todolistAPI.deleteTask(todolistId, taskId)
        .then(() => {
            dispatch(removeTaskAC(taskId, todolistId))
            dispatch(appActions.appSetStatus({status:'succeeded'}))
        }).catch((error: AxiosError) => {
        handleServerNetworkError(error, dispatch)
    })

}

export const updateTaskTitleTC = (id: string, title: string, todolistId: string) => (dispatch: DispatchType<any>, getState: () => AppRootStateType) => {
    const allTasks = getState().tasks
    const taskFofCurrentTodo = allTasks[todolistId]
    const task = taskFofCurrentTodo.find(t => t.id === id)

    if (task) {
        dispatch(appActions.appSetStatus({status:'loading'}))
        todolistAPI.updateTask(todolistId, id, {
            title: title,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            status: task.status
        })
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTaskTitleAC(id, title, todolistId))
                    dispatch(appActions.appSetStatus({status:'succeeded'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error: AxiosError) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}

export const updateTaskStatusTC = (id: string, status: TaskStatuses, todolistId: string) => (dispatch: DispatchType<any>, getState: () => AppRootStateType) => {
    const allTasks = getState().tasks
    const taskFofCurrentTodo = allTasks[todolistId]
    const task = taskFofCurrentTodo.find(t => t.id === id)

    if (task) {
        dispatch(appActions.appSetStatus({status:'loading'}))
        todolistAPI.updateTask(todolistId, id, {
            title: task.title,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            status: status
        })
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTaskStatusAC(id, status, todolistId))
                    dispatch(appActions.appSetStatus({status:'succeeded'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error: AxiosError) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}