import React, {useCallback} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import IconButton from '@material-ui/core/IconButton';
import {Button} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {addTaskAC} from "./state/tasks-reducer";
import {Task} from "./Task";


type PropsType = {
    title: string
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    filter: FilterValuesType
    id: string
    removeTodolist: (id: string) => void
    onChangeTodolistTitle: (id: string, newTitle: string) => void
}

export const Todolist = React.memo((props: PropsType) => {
    console.log('Todolist called')
    const dispatch = useDispatch()
    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.id])

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(title, props.id))
    }, [props.id])

//todolist
    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.onChangeTodolistTitle(props.id, newTitle)
    }, [props.onChangeTodolistTitle, props.id])
    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.id)
    }, [props.removeTodolist, props.id])

    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.id), [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.id), [props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.id), [props.changeFilter, props.id])

    let allTodolistTasks = tasks
    let tasksForTodolist = allTodolistTasks

    if (props.filter === 'active') {
        tasksForTodolist = allTodolistTasks.filter(t => !t.isDone)
    }
    if (props.filter === 'completed') {
        tasksForTodolist = allTodolistTasks.filter(t => t.isDone)
    }

    return <div>

        <h3>
            <EditableSpan title={props.title} onChange={changeTodolistTitle}/>

            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>

        </div>
        <div>
            {
                tasksForTodolist.map(t => <Task todolistId={props.id} task={t} key={t.id}/>)
            }

        </div>
        <div>
            <Button
                color={"default"}
                variant={props.filter === 'all' ? 'outlined' : 'text'}
                onClick={onAllClickHandler}>All
            </Button>
            <Button
                color={"primary"}
                variant={props.filter === 'active' ? 'outlined' : 'text'}
                onClick={onActiveClickHandler}>Active
            </Button>
            <Button
                color={"secondary"}
                variant={props.filter === 'completed' ? 'outlined' : 'text'}
                onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
})

