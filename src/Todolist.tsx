import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType} from "./App";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
    filter:FilterValuesType
}

export function Todolist(props: PropsType) {

    let [error, setError] = useState<string | null>(null)

    let [title, setTitle] = useState('')

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title)
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
        <h3>{props.title}</h3>
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
                    const onClickHandler = () => props.removeTask(t.id);
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newValueIsDone = e.currentTarget.checked
                        props.changeTaskStatus(t.id, newValueIsDone)
                    }

                    return <li key={t.id} className={t.isDone?'is-done':''}>
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
                className={props.filter==='all'?'active-filter':''}
                onClick={() => props.changeFilter('all')}>All</button>
            <button
                className={props.filter==='active'?'active-filter':''}
                onClick={() => props.changeFilter('active')}>Active</button>
            <button
                className={props.filter==='completed'?'active-filter':''}
                onClick={() => props.changeFilter('completed')}>Completed</button>
        </div>
    </div>
}

