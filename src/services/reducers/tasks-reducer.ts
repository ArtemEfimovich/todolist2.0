import {TaskPriorities, TaskStatuses, TaskTypes, todolistAPI, UpdateTaskModelType} from "middleware/todolist-api";
import {AppRootStateType, DispatchType} from "../store/store";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {TasksStateType} from "components/TodolistPage/TodolistPage";
import {appActions} from "services/reducers/app-reducer";
import {AxiosError} from "axios";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {todolistsActions} from "services/reducers/todolists-reducer";
import {Dispatch} from "redux";


const initialState: TasksStateType = {}


const slice = createSlice({
    name:'task',
    initialState,
    reducers:{
        setTasks:(state,action:PayloadAction<{tasks: TaskTypes[], todolistId: string}>)=>{
            state[action.payload.todolistId] = action.payload.tasks
        },
        removeTask:(state,action:PayloadAction<{taskId: string, todolistId: string}>)=>{
            const task = state[action.payload.todolistId]
            const index = task.findIndex(t=> t.id === action.payload.taskId)
            if(index >- 1){
                task.splice(index, 1)
            }
        },
        addTask:(state,action:PayloadAction<{task: TaskTypes}>)=>{
                state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        updateTask:(state,action:PayloadAction<{taskId: string, model: UpdateDomainTaskModelType, todolistId: string}>)=>{
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1){
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },
    },
    extraReducers:(builder)=> {
        builder.addCase(todolistsActions.addTodolist, (state, action) => {
            state[action.payload.todolist.id] = []
        })
        builder.addCase(todolistsActions.removeTodolist, (state, action) => {
            delete state[action.payload.id]
        })
        builder.addCase(todolistsActions.setTodolists, (state, action) => {
            action.payload.todolists.forEach(tl => {
                state[tl.id] = []
            })
        })
    }
})

export const tasksReducer = slice.reducer
export const tasksActions= slice.actions


export const fetchTasksTC = (todolistId: string) => (dispatch: DispatchType<any>) => {
    dispatch(appActions.appSetStatus({status:'loading'}))
    todolistAPI.getTask(todolistId)
        .then((res) => {
            let tasks = res.data.items
            dispatch(tasksActions.setTasks({tasks, todolistId}))
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
                dispatch(tasksActions.addTask({task}))
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
            dispatch(tasksActions.removeTask({taskId, todolistId}))
            dispatch(appActions.appSetStatus({status:'succeeded'}))
        }).catch((error: AxiosError) => {
        handleServerNetworkError(error, dispatch)
    })

}

export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            //throw new Error("task not found in the state");
            console.warn('task not found in the state')
            return
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }

        todolistAPI.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                if (res.data.resultCode === 0) {
                    const action = tasksActions.updateTask({taskId, model:domainModel, todolistId})
                    dispatch(action)
                } else {
                    handleServerAppError(res.data, dispatch);
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch);
            })
    }

// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}