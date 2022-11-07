import React, {ChangeEvent, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";


type AddItemFormPropsType = {
    addItem: (title: string) => void
}


export const AddItemForm: React.FC<AddItemFormPropsType> =React.memo( ({addItem}) => {

    let [taskTitle, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const onAddTask = () => {
        setError(null)
        if (taskTitle.trim() !== '') {
            addItem(taskTitle)
            setTitle('')
        } else {
            setError('Title is required')
        }

    }

    const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(error !== null){
            setError(null)
        }
        if (event.key === 'Enter') {
            onAddTask()
        }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    return (
        <div>
            <TextField
                variant='outlined'
                value={taskTitle} onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                label={'Title'}
                helperText={error}
            />
            <IconButton
                color='primary'
                onClick={onAddTask}>
                <AddBox/>
            </IconButton>
        </div>
    );
});

