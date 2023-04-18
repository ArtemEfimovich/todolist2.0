import React, {useCallback, useEffect} from 'react';
import '../assets/styles/App.css';
import {Todolist} from "../components/Todolist/Todolist";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, LinearProgress, Paper, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import {
    addTodolistTC,
    changeTodolistTitleTC, fetchTodolistsTC,
    removeTodolistTC
} from "../services/reducers/todolists-reducer";
import {
    createTaskTC,
    removeTaskTC, updateTaskStatusTC, updateTaskTitleTC
} from '../services/reducers/tasks-reducer';
import {useAppDispatch, useAppSelector} from "../services/store/store";
import {TaskStatuses, TaskTypes} from "../middleware/todolist-api";
import {changeTodolistFilterAC} from "../services/actions/todolists-actions";
import {RequestStatusType} from "../services/reducers/app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";

export type FilterValueType = 'all' | 'completed' | 'active'
export type TodolistsType = {
    id: string,
    title: string,
    filter: string
}

export type TasksStateType = {
    [key: string]: TaskTypes[]
}


function AppWithRedux() {
    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(fetchTodolistsTC())
    },[])

    const tasks = useAppSelector< TasksStateType>(state => state.tasks)
    const todolists = useAppSelector< TodolistsType[]>(state => state.todolists)
    const status = useAppSelector<RequestStatusType>(state => state.app.status)




    const changeFilter = useCallback((todolistId: string, filter: FilterValueType) => {
        dispatch(changeTodolistFilterAC(todolistId, filter))
    }, [dispatch])

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(createTaskTC(todolistId,title))
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
    },[dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])


    return (
        <div className="App">
            <AppBar position="static">
                <ErrorSnackbar />
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
                {status === 'loading' && <LinearProgress/> }
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
