import {todolistAPI} from "../../middleware/todolist-api";
import {DispatchType} from "../store/store";
import {TodolistsType} from "../../pages/AppWithRedux";
import {
    addTodolistAC,
    AddTodolistActionType, ChangeTodolistFilterActionType, changeTodolistTitleAC,
    ChangeTodolistTitleActionType, removeTodolistAC,
    RemoveTodoListActionType, setTodolistsAC, SetTodolistsActionType
} from "../actions/todolists-actions";
import {appSetErrorAC, appSetStatusAC} from "./app-reducer";
import {AxiosError} from "axios";


type ActionsType = RemoveTodoListActionType |
    AddTodolistActionType |
    ChangeTodolistTitleActionType |
    ChangeTodolistFilterActionType|
    SetTodolistsActionType

const initialState: TodolistsType[] = []

export const todolistsReducer = (state: TodolistsType[]=initialState, action: ActionsType):TodolistsType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':{
            return [...state,{...action.todolist, filter:'all'}]
        }
        case 'CHANGE-TODOLIST-TITLE':
            const todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return [...state]
        case 'CHANGE-TODOLIST-FILTER':{
            let stateCopy = [...state]
            const todolistFilter = stateCopy.find(tl => tl.id === action.id)
            if (todolistFilter) {
                todolistFilter.filter = action.filter
            }
            return stateCopy}
        case'SET-TODOLISTS': {
            return action.todolists.map((tl)=>{
                return {...tl,filter:'all'}
            })
        }
        default:
            return state
    }
}



export const fetchTodolistsTC =()=> (dispatch:DispatchType<any>):void=>{
    dispatch(appSetStatusAC('loading'))
    todolistAPI.getTodolists()
        .then((res)=>{
            dispatch(setTodolistsAC(res.data))
            dispatch(appSetStatusAC('succeeded'))
        })
        .catch((error:AxiosError)=>{
            dispatch(appSetErrorAC(error.message))
        })
}

export const addTodolistTC = (title:string)=>(dispatch : DispatchType<any>)=>{
    dispatch(appSetStatusAC('loading'))
      todolistAPI.createTodolist(title)
        .then((res) => {
            if(res.data.resultCode === 0){
             dispatch(addTodolistAC(res.data.data.item))
            dispatch(appSetStatusAC('succeeded'))}
            else{
                if (res.data.messages.length) {
                dispatch(appSetErrorAC(res.data.messages[0]))
            } else {
                dispatch(appSetErrorAC('Some error occurred'))
            }
                dispatch(appSetStatusAC('failed'))
            }
        })
          .catch((error:AxiosError)=>{
              dispatch(appSetErrorAC(error.message))
          })
}

export const removeTodolistTC = (todolistId:string)=>(dispatch : DispatchType<any>)=>{
    dispatch(appSetStatusAC('loading'))
    todolistAPI.deleteTodolist(todolistId)
        .then(()=>{
            dispatch(removeTodolistAC(todolistId))
            dispatch(appSetStatusAC('succeeded'))
        })
        .catch((error:AxiosError)=>{
            dispatch(appSetErrorAC(error.message))
        })
}

export const changeTodolistTitleTC = (title:string,todolistId:string)=>(dispatch:DispatchType<any>)=>{
    dispatch(appSetStatusAC('loading'))
    todolistAPI.updateTodolist(todolistId,title)
        .then(()=>{
            dispatch(changeTodolistTitleAC(todolistId,title))
            dispatch(appSetStatusAC('succeeded'))
        })
        .catch((error:AxiosError)=>{
            dispatch(appSetErrorAC(error.message))
        })
}