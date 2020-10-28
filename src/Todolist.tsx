import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";





type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    id: string
    removeTodolist:(id:string)=>void
}

export function Todolist(props: PropsType) {

    let [error, setError] = useState<string | null>(null)
    let [title, setTitle] = useState('')
//tasks
    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title, props.id)
            setTitle('')
        } else {
            setError('Title is required!')
        }

    }
    const addTaskOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addTask()
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return <div>

        <h3>{props.title}
            <button onClick={()=>props.removeTodolist(props.id)}>X</button>
        </h3>

        <div>
            <input
                className={error ? 'error' : ''}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={addTaskOnKeyPress}

            />
            <button onClick={addTask}>+</button>
            {error && <div className='error-message'>{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id);
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newValueIsDone = e.currentTarget.checked
                        props.changeTaskStatus(t.id, newValueIsDone, props.id)
                    }

                    return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <input

                            type="checkbox"
                            checked={t.isDone}
                            onChange={onChangeHandler}
                        />
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>X</button>
                    </li>
                })
            }

        </ul>
        <div>
            <button
                className={props.filter === 'all' ? 'active-filter' : ''}
                onClick={() => props.changeFilter('all', props.id)}>All
            </button>
            <button
                className={props.filter === 'active' ? 'active-filter' : ''}
                onClick={() => props.changeFilter('active', props.id)}>Active
            </button>
            <button
                className={props.filter === 'completed' ? 'active-filter' : ''}
                onClick={() => props.changeFilter('completed', props.id)}>Completed
            </button>
        </div>
    </div>
}

