import React, {useEffect} from 'react';
import '../assets/styles/App.css';
import {AppBar, Button, CircularProgress, Container, IconButton, LinearProgress, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import {useAppDispatch, useAppSelector} from "services/store/store";
import {initializeAppTC, RequestStatusType} from "services/reducers/app-reducer";
import {ErrorSnackbar} from "components/ErrorSnackbar/ErrorSnackbar";
import {Navigate, Route, Routes} from "react-router-dom";
import {TodolistPage} from "components/TodolistPage/TodolistPage";
import {Login} from "./Login";
import {logoutTC} from "services/reducers/auth-reducer";


function App() {

    const dispatch = useAppDispatch()
    const status = useAppSelector<RequestStatusType>(state => state.app.status)
    const isInitialized = useAppSelector<boolean>(state=>state.app.isInitialized)
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)

    useEffect(()=>{
        dispatch(initializeAppTC())
    },[])

    const logoutHandler = () =>{
        dispatch(logoutTC())
    }


   if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }


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
                    {isLoggedIn && <Button color="inherit" style={{position:'absolute',right:'20px'}} onClick={logoutHandler}>Log out</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/> }
            </AppBar>
            <Container >
                <Routes>
                    <Route path={'/'} element={<TodolistPage/>} />
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/404'} element={<h1> PAGE NOT FOUND </h1>}/>
                    <Route path={'*'} element={<Navigate to='/404'/>}/>
                </Routes>
            </Container>
        </div>
    )
        ;
}

export default App;
