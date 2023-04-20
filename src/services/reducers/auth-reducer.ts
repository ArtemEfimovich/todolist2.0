import { Dispatch } from 'redux'
import {authAPI, LoginParamsType} from "middleware/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {AxiosError} from "axios";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {appActions} from "services/reducers/app-reducer";


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
        dispatch(appActions.appSetStatus({status:'loading'}))
        authAPI.login(data)
        .then((res)=> {
            if(res.data.resultCode === 0){
                    dispatch(authActions.setIsLoggedIn({value:true}))
                    dispatch(appActions.appSetStatus({status:'succeeded'}))
                }else{
                    handleServerAppError(res.data, dispatch)
                }
        })
            .catch((error: AxiosError) => {
                handleServerNetworkError(error, dispatch)
            })
}

export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(appActions.appSetStatus({status:'loading'}))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(authActions.setIsLoggedIn({value:false}))
                dispatch(appActions.appSetStatus({status:'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}




