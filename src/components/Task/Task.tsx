import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskStatuses, TaskTypes} from "../../middleware/todolist-api";


type TaskPropsType = {
    task: TaskTypes
    todolistId: string
    changeTaskStatus: (id: string,status:TaskStatuses, todolistId: string) => void
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
        changeTaskStatus(task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New , todolistId)
    },[task.id, todolistId,changeTaskStatus])

    return <div  className={task.status === TaskStatuses.Completed ? 'is-done' : ''}>
        <Checkbox color="primary" checked={task.status === TaskStatuses.Completed} onChange={onChangeStatusHandler}/>
        <EditableSpan value={task.title} onChange={onChangeTitleHandler}/>
        <IconButton onClick={onDeleteClickHandler}><Delete/>
        </IconButton>
    </div>
});

