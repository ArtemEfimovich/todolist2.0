import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../components/EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "../Todolist";


type TaskPropsType = {
    task: TaskType
    todolistId: string
    changeTaskStatus: (id: string,isDone:boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
}


export const Task: React.FC<TaskPropsType> =React.memo( ({
                                                  task
                                                  , todolistId
                                                  , changeTaskStatus,
                                                  changeTaskTitle,
                                                  removeTask
                                              }) => {

    const onChangeTitleHandler =useCallback ( (newTitle: string) => {
        changeTaskTitle(task.id, newTitle, todolistId)
    },[task.id, todolistId,changeTaskTitle])

    const onDeleteClickHandler = useCallback (() => {
        removeTask(task.id, todolistId)
    },[task.id, todolistId,removeTask])

    const onChangeStatusHandler =useCallback ( (event: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = event.currentTarget.checked
        changeTaskStatus(task.id, newIsDoneValue, todolistId)
    },[task.id, todolistId,changeTaskStatus])

    return <div  className={task.isDone ? 'is-done' : ''}>
        <Checkbox color="primary" checked={task.isDone} onChange={onChangeStatusHandler}/>
        <EditableSpan value={task.title} onChange={onChangeTitleHandler}/>
        <IconButton onClick={onDeleteClickHandler}><Delete/>
        </IconButton>
    </div>
});

