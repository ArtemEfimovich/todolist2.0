import React, {ChangeEvent} from 'react';
import {FilterValueType} from "./App";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {IconButton, Button, Checkbox} from "@mui/material";
import {Delete} from "@mui/icons-material";


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type TodolistPropsType = {
    title: string,
    tasks: TaskType[],
    removeTask: (taskId: string, todolistId: string) => void,
    changeFilter: ( todolistId: string,filter: FilterValueType) => void,
    addTask: (taskTitle: string, todolistId: string) => void,
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void,
    filter: string,
    todolistId: string,
    removeTodolist: (id: string) => void,
    changeTaskTitle: (id: string, title: string, todolistId: string) => void,
    changeTodolistTitle: (title: string, todolistId: string) => void
}


export const Todolist: React.FC<TodolistPropsType> = ({
                                                          title,
                                                          tasks,
                                                          removeTask,
                                                          changeFilter,
                                                          addTask,
                                                          changeTaskStatus,
                                                          filter,
                                                          todolistId,
                                                          removeTodolist,
                                                          changeTaskTitle,
                                                          changeTodolistTitle
                                                      }) => {


    const onAddTask = (title: string) => {
        addTask(title, todolistId)
    }

    const onDeleteClick = () => {
        removeTodolist(todolistId)
    }

    const onFilterChangeAll = () => {
        changeFilter( todolistId,'all')
    }
    const onFilterChangeActive = () => {
        changeFilter(todolistId,'active')
    }
    const onFilterChangeCompleted = () => {
        changeFilter(todolistId,'completed')
    }

    const setTodolistTitle = (newTitle: string) => {
        changeTodolistTitle(newTitle, todolistId)
    }

    return (
        <div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <EditableSpan value={title} onChange={setTodolistTitle}/>
                <IconButton onClick={onDeleteClick}><Delete/></IconButton>
            </div>
            <div>
                <AddItemForm addItem={onAddTask}/>
            </div>
            <div>
                {tasks.map(({id, isDone, title}) => {

                    const onChangeTitleHandler = (newTitle: string) => {
                        changeTaskTitle(id, newTitle, todolistId)
                    }

                    const onClickHandler = () => {
                        removeTask(id, todolistId)
                    }

                    const onChangeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = event.currentTarget.checked
                        changeTaskStatus(id, newIsDoneValue, todolistId)
                    }

                    return <div key={id} className={isDone ? 'is-done' : ''}>
                        <Checkbox color="primary" checked={isDone} onChange={onChangeStatusHandler}/>
                        <EditableSpan value={title} onChange={onChangeTitleHandler}/>
                        <IconButton onClick={onClickHandler}><Delete/>
                        </IconButton>
                    </div>
                })}
            </div>
            <div>
                <Button onClick={onFilterChangeAll}
                        variant={filter === 'all' ? 'contained' : 'text'}
                        color='inherit'
                >All
                </Button>
                <Button onClick={onFilterChangeActive}
                        variant={filter === 'active' ? 'contained' : 'text'}
                        color='primary'
                >Active
                </Button>
                <Button onClick={onFilterChangeCompleted}
                        variant={filter === 'completed' ? 'contained' : 'text'}
                        color='secondary'
                >Completed
                </Button>
            </div>
        </div>
    );
};

