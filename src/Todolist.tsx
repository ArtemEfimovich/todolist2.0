import React, {useCallback, useEffect} from 'react';
import {FilterValueType} from "./App";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./task/Task";
import {fetchTasksTC} from "./tasks-reducer";
import {useAppDispatch} from "./state/store";


export type TaskType = {
    id: string,
    title: string,
    isDone?: boolean
}

type TodolistPropsType = {
    title: string,
    tasks: TaskType[],
    removeTask: (taskId: string, todolistId: string) => void,
    changeFilter: (todolistId: string, filter: FilterValueType) => void,
    addTask: (taskTitle: string, todolistId: string) => void,
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void,
    filter: string,
    todolistId: string,
    removeTodolist: (id: string) => void,
    changeTaskTitle: (id: string, title: string, todolistId: string) => void,
    changeTodolistTitle: (title: string, todolistId: string) => void
}


export const Todolist: React.FC<TodolistPropsType> = React.memo(({
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

        const dispatch= useAppDispatch()

        useEffect(()=>{
            dispatch(fetchTasksTC(todolistId))
        },[dispatch,todolistId])


    const onAddTask = useCallback((title: string) => {
        addTask(title, todolistId)
    }, [addTask, todolistId])

    const onDeleteClick = () => {
        removeTodolist(todolistId)
    }
    const onFilterChangeAll = useCallback(() => {
        changeFilter(todolistId, 'all')
    }, [changeFilter, todolistId])
    const onFilterChangeActive = useCallback(() => {
        changeFilter(todolistId, 'active')
    }, [changeFilter, todolistId])
    const onFilterChangeCompleted = useCallback(() => {
        changeFilter(todolistId, 'completed')
    }, [changeFilter, todolistId])
    const setTodolistTitle = (newTitle: string) => {
        changeTodolistTitle(newTitle, todolistId)
    }

    let tasksForTodolist = tasks

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.isDone === false)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone === true)
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
                {tasksForTodolist && tasksForTodolist.map(t => <Task key={t.id}
                                                 task={t}
                                                 todolistId={todolistId}
                                                 changeTaskStatus={changeTaskStatus}
                                                 changeTaskTitle={changeTaskTitle}
                                                 removeTask={removeTask}
                    />
                )}
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
});

