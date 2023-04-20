import {todolistAPI, TodolistType} from "middleware/todolist-api";
import {DispatchType} from "../store/store";
import {appActions, RequestStatusType} from "./app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";



const initialState: TodolistDomainType[] = []

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}


const slice = createSlice({
    name:'todolist',
    initialState,
    reducers:{
        setTodolists:(state,action:PayloadAction<{todolists:  TodolistType[]}>)=>{
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        },
        addTodolist:(state,action:PayloadAction<{todolist:TodolistType}>)=>{
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        },
        removeTodolist:(state,action:PayloadAction<{id: string}>)=>{
            const index = state.findIndex(tl=> tl.id === action.payload.id)
            if(index > -1){
                state.splice(index, 1)
            }
        },
        changeTodolistTitle:(state,action:PayloadAction<{id: string, title: string}>)=>{
            const index = state.findIndex(tl=> tl.id === action.payload.id)
            state[index].title = action.payload.title
        },
        changeTodolistFilter:(state,action:PayloadAction<{id: string, filter: FilterValuesType}>)=>{
            const index = state.findIndex(tl=> tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        changeTodolistEntityStatus:(state,action:PayloadAction<{id: string, entityStatus: RequestStatusType}>)=>{
            const index = state.findIndex(tl=> tl.id === action.payload.id)
            state[index].entityStatus = action.payload.entityStatus
        },
    }
})

export const todolistsReducer = slice.reducer
export const todolistsActions= slice.actions

export const fetchTodolistsTC = () => (dispatch: DispatchType<any>) => {
    dispatch(appActions.appSetStatus({status:'loading'}))
    todolistAPI.getTodolists()
        .then((res) => {
            dispatch(todolistsActions.setTodolists({todolists:res.data}))
            dispatch(appActions.appSetStatus({status:'succeeded'}))
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const addTodolistTC = (title: string) => (dispatch: DispatchType<any>) => {
    dispatch(appActions.appSetStatus({status:'loading'}))
    todolistAPI.createTodolist(title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(todolistsActions.addTodolist({todolist:res.data.data.item}))
                dispatch(appActions.appSetStatus({status:'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const removeTodolistTC = (todolistId: string) => (dispatch: DispatchType<any>) => {
    dispatch(appActions.appSetStatus({status:'loading'}))
    dispatch(todolistsActions.changeTodolistEntityStatus({id:todolistId,entityStatus:'loading'}))
    todolistAPI.deleteTodolist(todolistId)
        .then(() => {
            dispatch(todolistsActions.removeTodolist({id:todolistId}))
            dispatch(appActions.appSetStatus({status:'succeeded'}))
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const changeTodolistTitleTC = (title: string, todolistId: string) => (dispatch: DispatchType<any>) => {
    dispatch(appActions.appSetStatus({status:'loading'}))
    todolistAPI.updateTodolist(todolistId, title)
        .then(() => {
            dispatch(todolistsActions.changeTodolistTitle({id:todolistId,title:title}))
            dispatch(appActions.appSetStatus({status:'succeeded'}))
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(error, dispatch)
        })
}


