import {tasksReducer} from "../tasks-reducer";
import {todolistsReducer} from "../todolists-reducer";
import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import thunk, {ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

export const store = createStore(rootReducer,applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>
export type DispatchType<T> = ThunkDispatch<T,any,AnyAction>
export const useAppDispatch = () => useDispatch<DispatchType<AppRootStateType>>()
export const useAppSelector:TypedUseSelectorHook<AppRootStateType> = useSelector
// @ts-ignore
window.store = store
