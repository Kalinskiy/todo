import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import IconButton from '@material-ui/core/IconButton';
import {Button, Checkbox} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";


type PropsType = {
    title: string
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    filter: FilterValuesType
    id: string
    removeTodolist: (id: string) => void
    onChangeTodolistTitle: (id: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {
    const dispatch = useDispatch()
    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.id])

//todolist
    const changeTodolistTitle = (newTitle: string) => {
        props.onChangeTodolistTitle(props.id, newTitle)
    }
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)

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
        <AddItemForm addItem={(title) => dispatch(addTaskAC(title, props.id))}/>
        <div>

        </div>
        <div>
            {
                tasksForTodolist.map(t => {
                    const onClickHandler = () => dispatch(removeTaskAC(t.id, props.id));
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newValueIsDone = e.currentTarget.checked
                        dispatch(changeTaskStatusAC(t.id, newValueIsDone, props.id))
                    }
                    const onChangeTitleHandler = (newValue: string) => {
                        dispatch(changeTaskTitleAC(t.id, newValue, props.id))
                    }

                    return <div key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <Checkbox
                            color={"primary"}
                            checked={t.isDone}
                            onChange={onChangeStatusHandler}
                        />
                        <EditableSpan
                            title={t.title}
                            onChange={onChangeTitleHandler}


                        />

                        <IconButton onClick={onClickHandler}>
                            <Delete/>
                        </IconButton>
                    </div>
                })
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
}

