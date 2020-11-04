import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TaskPriorities, TaskStatuses, TaskType} from "./api/todolists-api";
import {FilterValuesType, TodolistDomainType} from "./state/todolists-reducer";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}


export const App = () => {


    let todolist1 = v1();
    let todolist2 = v1();

//states
    let [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
        {id: todolist1, title: 'what to learn', filter: 'all', addedDate: '', order: 0},
        {id: todolist2, title: 'what to buy', filter: 'all', addedDate: '', order: 0},
    ])
    let [tasks, setTasks] = useState<TasksStateType>({
        [todolist1]: [
            {
                id: v1(), title: 'HTML&CSS',
                status: TaskStatuses.Completed,
                totoListId: todolist1,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: v1(), title: 'JS',
                status: TaskStatuses.inProgress,
                totoListId: todolist1,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            }

        ],
        [todolist2]: [
            {
                id: v1(), title: 'Mil',
                status: TaskStatuses.Completed,
                totoListId: todolist2,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: v1(), title: 'Water',
                status: TaskStatuses.Completed,
                totoListId: todolist2,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            }

        ],

    })
    //Tasks Functions
    const removeTask = (id: string, todolistId: string) => {
        const todolistTasks = tasks[todolistId];
        tasks[todolistId] = todolistTasks.filter(t => t.id !== id)
        setTasks({...tasks})
    }

    const addTask = (title: string, todolistId: string) => {
        let task = {
            id: v1(), title: title,
            status: TaskStatuses.New,
            totoListId: todolistId,
            startDate: '',
            addedDate: '',
            deadline: '',
            order: 0,
            priority: TaskPriorities.Low,
            description: ''
        }
        const todolistTasks = tasks[todolistId];
        tasks[todolistId] = [task, ...todolistTasks]
        setTasks({...tasks})

    }
    const changeTaskStatus = (id: string, status: TaskStatuses, todolistId: string) => {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === id)
        if (task) {
            task.status = status;
            setTasks({...tasks});
        }
    }
    const changeTaskTitle = (id: string, newTitle: string, todolistId: string) => {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === id)
        if (task) {
            task.title = newTitle;
            setTasks({...tasks});
        }
    }
//Todolists Functions
    const removeTodolist = (id: string) => {
        setTodolists(todolists.filter(tl => tl.id !== id))
        delete tasks[id]
        setTasks({...tasks})
    }
    const addTodolist = (title: string) => {
        const newTodolistId = v1();
        const newTodolist: TodolistDomainType = {
            id: newTodolistId,
            title: title,
            filter: 'all',
            addedDate: '',
            order: 0,
        }
        setTodolists([newTodolist, ...todolists])
        setTasks({
            ...tasks,
            [newTodolistId]: []
        })
    }
    const onChangeTodolistTitle = (id: string, newTitle: string) => {
        const todolist = todolists.find(tl => tl.id === id)
        if (todolist) {
            todolist.title = newTitle;
            setTodolists([...todolists])
        }
    }
    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
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
                                    tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.New)
                                }
                                if (tl.filter === 'completed') {
                                    tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.Completed)
                                }

                                return <Grid item>
                                    <Paper style={{padding: '10px'}}>
                                        <Todolist
                                            title={tl.title}
                                            key={tl.id}
                                            id={tl.id}
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


