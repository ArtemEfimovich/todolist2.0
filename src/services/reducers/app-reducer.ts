import {Dispatch} from "redux";
import {authAPI} from "middleware/todolist-api";
import {setIsLoggedInAC, SetIsLoggedType} from "./auth-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {AxiosError} from "axios";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppSetStatusType = ReturnType<typeof appSetStatusAC>

export type AppSetErrorType = ReturnType<typeof appSetErrorAC>

export type AppSetInitializedType = ReturnType<typeof appSetInitializedAC>
type ActionType = AppSetStatusType | AppSetErrorType |SetIsLoggedType |AppSetInitializedType
type InitialStateType = typeof initialState

const initialState = {
    status: 'completed' as RequestStatusType,
    error: null as null | string,
    isInitialized:false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS': {
            return {...state, status: action.status}
        }
        case 'APP/SET-ERROR': {
            return {...state, error: action.error}
        }
        case 'SET-IS-INITIALIZED':{
            return  {...state,isInitialized: action.isInitialized}
        }
        default:
            return state
    }
}
export const appSetStatusAC = (status: RequestStatusType) => {
    return {type: 'APP/SET-STATUS', status} as const
}
export const appSetErrorAC = (error: string | null) => {
    return {type: 'APP/SET-ERROR', error} as const
}

export const appSetInitializedAC = (isInitialized:boolean)=>{
    return {type:'SET-IS-INITIALIZED', isInitialized} as const
}
export const initializeAppTC = () => (dispatch:Dispatch<any>) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(appSetInitializedAC(true))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    })
        .catch((error: AxiosError) => {
            handleServerNetworkError(error, dispatch)
        })
}
