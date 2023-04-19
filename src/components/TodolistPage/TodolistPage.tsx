import React, {useCallback, useEffect} from 'react';
import {Container, Grid, Paper} from "@mui/material";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {Todolist} from "../Todolist/Todolist";
import {
    addTodolistTC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    FilterValuesType, removeTodolistTC,
    TodolistDomainType
} from "services/reducers/todolists-reducer";
import {useAppDispatch, useAppSelector} from "services/store/store";
import {changeTodolistFilterAC} from "services/actions/todolists-actions";
import {createTaskTC, removeTaskTC, updateTaskStatusTC, updateTaskTitleTC} from "services/reducers/tasks-reducer";
import {TaskStatuses, TaskTypes} from "middleware/todolist-api";
import {Navigate} from "react-router-dom";


export type TasksStateType = {
    [key: string]: TaskTypes[]
}

export const TodolistPage: React.FC = () => {

    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)

    useEffect(() => {
        if(!isLoggedIn){
            return
        }
        dispatch(fetchTodolistsTC())
    }, [])

    const tasks = useAppSelector<TasksStateType>(state => state.tasks)
    const todolists = useAppSelector<TodolistDomainType[]>(state => state.todolists)

    const changeFilter = useCallback((todolistId: string, filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todolistId, filter))
    }, [dispatch])

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(createTaskTC(todolistId, title))
    }, [dispatch])

    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(removeTaskTC(id, todolistId))
    }, [dispatch])

    const changeTaskStatus = useCallback((id: string, status: TaskStatuses, todolistId: string) => {
        dispatch(updateTaskStatusTC(id, status, todolistId))
    }, [dispatch])

    const changeTaskTitle = useCallback((id: string, title: string, todolistId: string) => {
        dispatch(updateTaskTitleTC(id, title, todolistId))
    }, [dispatch])

    const changeTodolistTitle = useCallback((title: string, todolistId: string) => {
        dispatch(changeTodolistTitleTC(title, todolistId))
    }, [dispatch])

    const removeTodolist = useCallback((id: string) => {
        dispatch(removeTodolistTC(id))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])



    if(!isLoggedIn){
        return <Navigate to ='/login'/>
    }

    return (
        <Container>
            <Grid container style={{padding: '20px'}}><AddItemForm addItem={addTodolist}/></Grid>
            <Grid container spacing={3}>  {todolists.map(({filter, title, id, entityStatus}) => {
                let tasksForTodolist = tasks[id]
                return <Grid item key={id}>
                    <Paper style={{padding: '10px'}}>
                        < Todolist
                            key={id}
                            todolistId={id}
                            title={title}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            entityStatus={entityStatus}
                            changeTaskStatus={changeTaskStatus}
                            filter={filter}
                            removeTodolist={removeTodolist}
                            changeTaskTitle={changeTaskTitle}
                            changeTodolistTitle={changeTodolistTitle}
                        />
                    </Paper>
                </Grid>
            })}</Grid>
        </Container>
    );
};
