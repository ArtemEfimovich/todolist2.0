import { Dispatch } from 'redux'
import {ResponseType} from 'middleware/todolist-api'
import {appActions} from "services/reducers/app-reducer";

// generic function
export const handleServerAppError = <T>(data:ResponseType<{}>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(appActions.appSetError({error:data.messages[0]}))
    } else {
        dispatch(appActions.appSetError({error:'Some error occurred'}))
    }
    dispatch(appActions.appSetStatus({status:'failed'}))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: ErrorUtilsDispatchType) => {
    dispatch(appActions.appSetError({error:error.message}))
    dispatch(appActions.appSetStatus({status:'failed'}))
}

type ErrorUtilsDispatchType = Dispatch
