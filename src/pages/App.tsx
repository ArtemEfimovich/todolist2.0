import React from 'react';
import '../assets/styles/App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import {useAppSelector} from "../services/store/store";
import {RequestStatusType} from "../services/reducers/app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {Navigate, Route, Routes} from "react-router-dom";
import {TodolistPage} from "../components/TodolistPage/TodolistPage";
import {Login} from "./Login";


function App() {

    const status = useAppSelector<RequestStatusType>(state => state.app.status)




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
