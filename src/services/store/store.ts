import {tasksReducer} from "../reducers/tasks-reducer";
import {todolistsReducer} from "../reducers/todolists-reducer";
import {AnyAction, combineReducers} from "redux";
import thunk, {ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";



const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

export const store = configureStore({
    reducer:rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)})

export type AppRootStateType = ReturnType<typeof store.getState>
export type DispatchType<T> = ThunkDispatch<T,any,AnyAction>
export const useAppDispatch = () => useDispatch<DispatchType<AppRootStateType>>()
export const useAppSelector:TypedUseSelectorHook<AppRootStateType> = useSelector
// @ts-ignore
window.store = store
