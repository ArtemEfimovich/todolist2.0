import { Dispatch } from 'redux'
import {appSetStatusAC} from "./app-reducer";
import {authAPI, LoginParamsType} from "middleware/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {AxiosError} from "axios";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState = {
    isLoggedIn: false
}

const slice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setIsLoggedIn:(state,action:PayloadAction<{value :boolean}>)=>{
            state.isLoggedIn = action.payload.value
        }
    }
})

export const authReducer = slice.reducer
export const authActions = slice.actions

export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
        dispatch(appSetStatusAC('loading'))
        authAPI.login(data)
        .then((res)=>{
                if(res.data.resultCode === 0){
                    dispatch(authActions.setIsLoggedIn({value:true}))
                    dispatch(appSetStatusAC('succeeded'))
                }else{
                    handleServerAppError(res.data, dispatch)
                }
        })
            .catch((error: AxiosError) => {
                handleServerNetworkError(error, dispatch)
            })
}

export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(appSetStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(authActions.setIsLoggedIn({value:false}))
                dispatch(appSetStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}




