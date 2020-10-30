import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistAC,
    changeTodolistFilterAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
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
    const dispatch = useDispatch()
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)
    const todolists = useSelector<AppRootState,Array<TodolistType>>(state => state.todolists)

//Todolists Functions
    const removeTodolist = (id: string) => {
        dispatch(removeTodolistAC(id))

    }
    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)

    }
    const onChangeTodolistTitle = (id: string, newTitle: string) => {
        dispatch(changeTodolistAC(id, newTitle))
    }
    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(value, todolistId))
    }


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
                            todolists.map(tl => {
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

