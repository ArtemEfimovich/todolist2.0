import { Dispatch } from 'redux'
import {authAPI, LoginParamsType} from "middleware/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {appActions} from "services/reducers/app-reducer";


const initialState = {
    isLoggedIn: false
}

export const loginTC = createAsyncThunk('auth/login',async (data: LoginParamsType,thunkAPI)=>{
    thunkAPI.dispatch(appActions.appSetStatus({status:'loading'}))
       try{
           const res = await authAPI.login(data)
           if(res.data.resultCode === 0){
               thunkAPI.dispatch(appActions.appSetStatus({status:'succeeded'}))
              return {isLoggedIn:true}
           }else{
               handleServerAppError(res.data, thunkAPI.dispatch)
           }
       }catch(error:any){
            handleServerNetworkError(error, thunkAPI.dispatch)
        }
})

const slice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setIsLoggedIn:(state,action:PayloadAction<{value :boolean}>)=>{
            state.isLoggedIn = action.payload.value
        }
    },
    extraReducers:builder => {
        builder.addCase(loginTC.fulfilled,(state,action)=>{
            if(action.payload) {
                state.isLoggedIn = action.payload.isLoggedIn
            }
        })
    }
})

export const authReducer = slice.reducer
export const authActions = slice.actions



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




