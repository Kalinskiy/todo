import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addTodolistAC, changeTodolistAC, changeTodolistFilterAC, removeTodolistAC} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";


//types
export type FilterValuesType = 'all' | 'active' | 'completed'

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}


export const AppWithRedux = () => {
    console.log('App called')
    const dispatch = useDispatch()
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)
    const todolists = useSelector<AppRootState,Array<TodolistType>>(state => state.todolists)

//Todolists Functions
    const removeTodolist = useCallback((id: string) => {
        dispatch(removeTodolistAC(id))
    },[dispatch])
    const addTodolist = useCallback( (title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)

    },[dispatch])
    const onChangeTodolistTitle = useCallback( (id: string, newTitle: string) => {
        dispatch(changeTodolistAC(id, newTitle))
    },[dispatch])
    const changeFilter = useCallback( (value: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(value, todolistId))
    },[dispatch])


    return (
        <div className="App">
            <AppBar position={'static'}>
                <Toolbar>
                    <IconButton edge={"start"} color={"inherit"} aria-label={'menu'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={"h6"}>
                        News
                    </Typography>
                    <Button color={'inherit'}>Login</Button>
                </Toolbar>

            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                    <Grid container spacing={3}>
                        {
                            todolists.map(tl =>  {
                                let allTodolistTasks = tasks[tl.id]
                                let tasksForTodolist = allTodolistTasks

                                if (tl.filter === 'active') {
                                    tasksForTodolist = allTodolistTasks.filter(t => !t.isDone)
                                }
                                if (tl.filter === 'completed') {
                                    tasksForTodolist = allTodolistTasks.filter(t => t.isDone)
                                }


                                return <Grid item>
                                    <Paper style={{padding: '10px'}}>
                                        <Todolist
                                            key={tl.id}
                                            id={tl.id}
                                            title={tl.title}
                                            changeFilter={changeFilter}
                                            filter={tl.filter}
                                            removeTodolist={removeTodolist}
                                            onChangeTodolistTitle={onChangeTodolistTitle}



                                        />
                                    </Paper>
                                </Grid>
                            })
                        }
                    </Grid>
                </Grid>
            </Container>
        </div>

    );

}

