import React, {useState} from 'react';
import {AlertProps, Snackbar} from "@mui/material";
import MuiAlert from '@mui/material/Alert'
import {useAppDispatch, useAppSelector} from "../../services/store/store";
import {appSetErrorAC} from "../../services/reducers/app-reducer";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})


export const ErrorSnackbar :React.FC = () => {
    const [open,setOpen] = useState(true)
    const error = useAppSelector<string|null>(state => state.app.error)
    const dispatch = useAppDispatch()

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
        dispatch(appSetErrorAC(null))
    }
    return (
        <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='error' sx={{width: '100%'}}>
                {error} 😠
            </Alert>
        </Snackbar>
    )
};



