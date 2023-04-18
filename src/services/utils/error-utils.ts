import { Dispatch } from 'redux'
import {appSetErrorAC, AppSetErrorType, appSetStatusAC, AppSetStatusType} from "../reducers/app-reducer";
import {ResponseType} from '../../middleware/todolist-api'

// generic function
export const handleServerAppError = <T>(data:ResponseType<{}>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(appSetErrorAC(data.messages[0]))
    } else {
        dispatch(appSetErrorAC('Some error occurred'))
    }
    dispatch(appSetStatusAC('failed'))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: ErrorUtilsDispatchType) => {
    dispatch(appSetErrorAC(error.message))
    dispatch(appSetStatusAC('failed'))
}

type ErrorUtilsDispatchType = Dispatch<AppSetStatusType | AppSetErrorType>
