import React, {useCallback, useEffect} from 'react'
import './App.css'
import {
    AppBar, Box,
    Button,
    CircularProgress,
    Container, Grid,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './store'
import {initializedAppTC, RequestStatusType} from './app-reducer'
import {BrowserRouter, Route} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {logoutTC} from "../features/TodolistsList/auth-reducer";

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(initializedAppTC())
    },[])

    const status = useSelector<AppRootStateType, string>((state) => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType,boolean>(state => state.auth.isLoggedIn)


    const logoutHandler = useCallback(()=>{
        dispatch(logoutTC())
    },[])
    if (!isInitialized) {
        return <Box  display="flex"
                     justifyContent="center"
                     alignItems="center"
                     minHeight="100vh">
            <CircularProgress/>
        </Box>
    }
    return (
        <BrowserRouter>
            <div className="App">
                <ErrorSnackbar/>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6">
                            News
                        </Typography>
                        {isLoggedIn &&<Button onClick={logoutHandler} color="inherit">Log-out</Button> }
                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                <Container fixed>
                    <Route exact path={'/'} render={() => <TodolistsList demo={demo}/>}/>
                    <Route path={'/login'} render={() => <Login/>}/>
                </Container>
            </div>
        </BrowserRouter>
    )
}

export default App
