import React, {ChangeEvent} from 'react';
import {FilterValueType} from "./App";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {IconButton} from "@mui/material";
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
    changeFilter: (value: FilterValueType, todolistId: string) => void,
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
        changeFilter('all', todolistId)
    }
    const onFilterChangeActive = () => {
        changeFilter('active', todolistId)
    }
    const onFilterChangeCompleted = () => {
        changeFilter('completed', todolistId)
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
            <ul>
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

                    return <li key={id} className={isDone ? 'is-done' : ''}>
                        <input type="checkbox" checked={isDone} onChange={onChangeStatusHandler}/>
                        <EditableSpan value={title} onChange={onChangeTitleHandler}/>
                        <IconButton onClick={onClickHandler}><Delete/>
                        </IconButton>
                    </li>
                })}
            </ul>
            <div>
                <button onClick={onFilterChangeAll} className={filter === 'all' ? 'active-filter' : ''}>All
                </button>
                <button onClick={onFilterChangeActive} className={filter === 'active' ? 'active-filter' : ''}>Active
                </button>
                <button onClick={onFilterChangeCompleted}
                        className={filter === 'completed' ? 'active-filter' : ''}>Completed
                </button>
            </div>
        </div>
    );
};

