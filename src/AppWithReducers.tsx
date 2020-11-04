import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistAC,
    changeTodolistFilterAC, FilterValuesType,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "./api/todolists-api";


//types


export type TasksStateType = {
    [key: string]: Array<TaskType>
}


export const AppWithReducers = () => {

    let todolist1 = v1();
    let todolist2 = v1();

//states
    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
        {id: todolist1, title: 'what to learn', filter: 'all', addedDate: '', order: 0},
        {id: todolist2, title: 'what to buy', filter: 'all', addedDate: '', order: 0},
    ])
    let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
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
        dispatchToTasksReducer(removeTaskAC(id, todolistId))
    }

    const addTask = (title: string, todolistId: string) => {
        dispatchToTasksReducer(addTaskAC(title, todolistId))

    }
    const changeTaskStatus = (id: string, status:TaskStatuses, todolistId: string) => {
        dispatchToTasksReducer(changeTaskStatusAC(id, status, todolistId))
    }
    const changeTaskTitle = (id: string, newTitle: string, todolistId: string) => {
        dispatchToTasksReducer(changeTaskTitleAC(id, newTitle, todolistId))
    }
//Todolists Functions
    const removeTodolist = (id: string) => {
        dispatchToTodolistsReducer(removeTodolistAC(id))
        dispatchToTasksReducer(removeTodolistAC(id))
    }
    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispatchToTasksReducer(action)
        dispatchToTodolistsReducer(action)
    }
    const onChangeTodolistTitle = (id: string, newTitle: string) => {
        dispatchToTodolistsReducer(changeTodolistAC(id, newTitle))
    }
    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        dispatchToTodolistsReducer(changeTodolistFilterAC(value, todolistId))
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


