import {todolistAPI, TodolistType} from "middleware/todolist-api";
import {DispatchType} from "../store/store";
import {
    addTodolistAC,
    AddTodolistActionType,
    changeTodolistEntityStatusAC,
    ChangeTodolistEntityStatusType,
    ChangeTodolistFilterActionType,
    changeTodolistTitleAC,
    ChangeTodolistTitleActionType,
    removeTodolistAC,
    RemoveTodoListActionType,
    setTodolistsAC,
    SetTodolistsActionType
} from "../actions/todolists-actions";
import {appSetStatusAC, RequestStatusType} from "./app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";


type ActionsType = RemoveTodoListActionType |
    AddTodolistActionType |
    ChangeTodolistTitleActionType |
    ChangeTodolistFilterActionType |
    SetTodolistsActionType |
    ChangeTodolistEntityStatusType

const initialState: TodolistDomainType[] = []

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}


export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST': {
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE':
            const todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return [...state]
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        }
        case'SET-TODOLISTS': {
            return action.todolists.map((tl) => {
                return {...tl, filter: 'all', entityStatus: 'idle'}
            })
        }
        case "CHANGE-TODOLIST-ENTITY-STATUS":
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl);
        default:
            return state
    }
}


export const fetchTodolistsTC = () => (dispatch: DispatchType<any>) => {
    dispatch(appSetStatusAC('loading'))
    todolistAPI.getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
            dispatch(appSetStatusAC('succeeded'))
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const addTodolistTC = (title: string) => (dispatch: DispatchType<any>) => {
    dispatch(appSetStatusAC('loading'))
    todolistAPI.createTodolist(title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(appSetStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const removeTodolistTC = (todolistId: string) => (dispatch: DispatchType<any>) => {
    dispatch(appSetStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
    todolistAPI.deleteTodolist(todolistId)
        .then(() => {
            dispatch(removeTodolistAC(todolistId))
            dispatch(appSetStatusAC('succeeded'))
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const changeTodolistTitleTC = (title: string, todolistId: string) => (dispatch: DispatchType<any>) => {
    dispatch(appSetStatusAC('loading'))
    todolistAPI.updateTodolist(todolistId, title)
        .then(() => {
            dispatch(changeTodolistTitleAC(todolistId, title))
            dispatch(appSetStatusAC('succeeded'))
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(error, dispatch)
        })
}


