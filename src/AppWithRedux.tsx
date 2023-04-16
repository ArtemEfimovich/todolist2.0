import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    fetchTodolistsThunk,
    removeTodolistAC
} from "./todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './tasks-reducer';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "./state/store";

export type FilterValueType = 'all' | 'completed' | 'active'
export type TodolistsType = {
    id: string,
    title: string,
    filter: string
}

export type TasksStateType = {
    [key: string]: TaskType[]
}


function AppWithRedux() {


    useEffect(()=>{
        dispatch(fetchTodolistsThunk)
    },[])

    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const todolists = useSelector<AppRootStateType, TodolistsType[]>(state => state.todolists)

    const dispatch = useAppDispatch()





    const changeFilter = useCallback((todolistId: string, filter: FilterValueType) => {
        dispatch(changeTodolistFilterAC(todolistId, filter))
    }, [])

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskAC(title, todolistId))
    }, [])

    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(removeTaskAC(id, todolistId))
    }, [])

    const changeTaskStatus = useCallback((id: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(id, isDone, todolistId))
    }, [])

    const changeTaskTitle = useCallback((id: string, title: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(id, title, todolistId))
    }, [])

    const changeTodolistTitle = useCallback((title: string, todolistId: string) => {
        dispatch(changeTodolistTitleAC(title, todolistId))
    }, [])

    const removeTodolist = useCallback((id: string) => {
        dispatch(removeTodolistAC(id))
    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [])


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Todolist
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container>
                <Grid container style={{padding: '20px'}}><AddItemForm addItem={addTodolist}/></Grid>
                <Grid container spacing={3}>  {todolists.map(({filter, title, id}) => {
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

        </div>
    )
        ;
}

export default AppWithRedux;
