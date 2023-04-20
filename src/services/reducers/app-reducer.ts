import {Dispatch} from "redux";
import {authAPI} from "middleware/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {AxiosError} from "axios";
import {authActions} from "services/reducers/auth-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'completed' as RequestStatusType,
    error: null as null | string,
    isInitialized:false
}

const slice = createSlice({
    name:'app',
    initialState,
    reducers:{
        appSetStatus:(state,action:PayloadAction<{status: RequestStatusType}>)=>{
            state.status = action.payload.status
        },
        appSetError:(state,action:PayloadAction<{error: string | null}>)=>{
            state.error = action.payload.error
        },
        appSetInitialized:(state,action:PayloadAction<{isInitialized:boolean}>)=>{
            state.isInitialized = action.payload.isInitialized
        },
    }
})

export const appReducer = slice.reducer
export const appActions = slice.actions

export const initializeAppTC = () => (dispatch:Dispatch<any>) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(authActions.setIsLoggedIn({value:true}))
            dispatch(appActions.appSetInitialized({isInitialized:true}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    })
        .catch((error: AxiosError) => {
            handleServerNetworkError(error, dispatch)
        })
}
