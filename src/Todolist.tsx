import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import IconButton from '@material-ui/core/IconButton';
import {Button, Checkbox} from "@material-ui/core";


type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    filter: FilterValuesType
    id: string
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string, todolistId: string) => void
    onChangeTodolistTitle:(id:string, newTitle:string)=>void
}

export function Todolist(props: PropsType) {

//tasks
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
//todolist
    const changeTodolistTitle=(newTitle:string)=>{
    props.onChangeTodolistTitle(props.id, newTitle)
    }
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    // const changeTodolistTitle=(newTitle:string)=>{
    //     props.changeTodolistTitle(props.id,newTitle)
    // }
    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)

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
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id);
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newValueIsDone = e.currentTarget.checked
                        props.changeTaskStatus(t.id, newValueIsDone, props.id)
                    }
                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id)
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

