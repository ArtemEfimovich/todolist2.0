

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppSetStatusType = ReturnType<typeof appSetStatusAC>

export type AppSetErrorType = ReturnType<typeof appSetErrorAC>

type ActionType= AppSetStatusType | AppSetErrorType
type InitialStateType = typeof initialState

const initialState = {
    status: 'loading' as RequestStatusType,
    error: 'null' as null | string
}

export const appReducer = (state: InitialStateType = initialState,action: ActionType):InitialStateType=>{
    switch (action.type){
        case 'APP/SET-STATUS':{
            return {...state,status: action.status}
        }
        case 'APP/SET-ERROR':{
            return {...state, error : action.error}
        }
        default:
            return state
    }
}
export const appSetStatusAC = (status:RequestStatusType)=>{
    return {type:'APP/SET-STATUS',status} as const
}
export const appSetErrorAC = (error:string | null)=>{
    return{type: 'APP/SET-ERROR',error} as const
}
