import {authAPI} from "middleware/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {AxiosError} from "axios";
import {authActions} from "services/reducers/auth-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'completed' as RequestStatusType,
    error: null as null | string,
    isInitialized:false
}

export const initializeAppTC = createAsyncThunk('app/initializeApp',( arg,thunkAPI)=>{
    authAPI.me()
        .then(res => {
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(authActions.setIsLoggedIn({value:true}))
            thunkAPI.dispatch(appActions.appSetInitialized({isInitialized:true}))
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
        }
    })
        .catch((error: AxiosError) => {
            handleServerNetworkError(error, thunkAPI.dispatch)
        })
})


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


