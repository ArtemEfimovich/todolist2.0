

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppSetStatusType = {
    type:'APP/SET-STATUS',
    status:RequestStatusType
}

type ActionType= AppSetStatusType
type InitialStateType = typeof initialState

const initialState = {
    status: 'loading' as RequestStatusType
}

export const appReducer = (state: InitialStateType = initialState,action: ActionType):InitialStateType=>{
    switch (action.type){
        case 'APP/SET-STATUS':{
            return {...state,status: action.status}
        }
        default:
            return state
    }
}


export const appSetStatusAC = (status:RequestStatusType):AppSetStatusType=>{
    return {type:'APP/SET-STATUS',status}
}