import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "../Task/Task";
import {fetchTasksTC} from "services/reducers/tasks-reducer";
import {useAppDispatch} from "services/store/store";
import {TaskStatuses, TaskTypes} from "middleware/todolist-api";
import {RequestStatusType} from "services/reducers/app-reducer";
import {FilterValuesType} from "services/reducers/todolists-reducer";



type TodolistPropsType = {
    title: string,
    tasks: TaskTypes[],
    removeTask: (taskId: string, todolistId: string) => void,
    changeFilter: (todolistId: string, filter: FilterValuesType) => void,
    addTask: (taskTitle: string, todolistId: string) => void,
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void,
    filter: string,
    todolistId: string,
    removeTodolist: (id: string) => void,
    changeTaskTitle: (id: string, title: string, todolistId: string) => void,
    changeTodolistTitle: (title: string, todolistId: string) => void
    entityStatus: RequestStatusType
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
                                                                     changeTodolistTitle,
                                                                     entityStatus
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
    const onFilterChangeAll = useCallback(() => {changeFilter(todolistId, 'all')}, [changeFilter, todolistId])
    const onFilterChangeActive = useCallback(() => {changeFilter(todolistId, 'active')}, [changeFilter, todolistId])
    const onFilterChangeCompleted = useCallback(() => {changeFilter(todolistId, 'completed')}, [changeFilter, todolistId])
    const setTodolistTitle = (newTitle: string) => {
        changeTodolistTitle(newTitle, todolistId)
    }

    let tasksForTodolist = tasks

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return (
        <div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <EditableSpan value={title} onChange={setTodolistTitle}/>
                <IconButton onClick={onDeleteClick} disabled={entityStatus === 'loading'}><Delete/></IconButton>
            </div>
            <div>
                <AddItemForm addItem={onAddTask} disabled={entityStatus === 'loading'}/>
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

