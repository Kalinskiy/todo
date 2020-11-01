import React, {useEffect, useState} from 'react'
import {todolistsApi} from "../api/todolists-api";
import {tasksAPI} from "../api/tasks-api";

export default {
    title: 'API'
}

export const GetTodoList = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.getTodoList().then((res) => {
            setState(res.data)
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    const createTodolist = () => {
        todolistsApi.createTodolist(title).then((res) => {
            setState(res.data)
        })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input value={title} placeholder={'title'} onChange={(e) => setTitle(e.target.value)}/>
            <button onClick={createTodolist}>create todolist</button>
        </div>
    </div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const deleteTodolist = () => {
        todolistsApi.deleteTodolist(todolistId).then((res) => {
            setState(res.data);
            setTodolistId('')
        })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input value={todolistId}
                   placeholder={'todolist ID'}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <button onClick={deleteTodolist}>delete todolist</button>
        </div>
    </div>
}
export const UpdateTodolistTitle = () => {

    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const updateTodolist = () => {
        todolistsApi.updateTodolistTitle(todolistId, title).then((res) => {
            setState(res.data);
            setTodolistId('')
            setTitle('')

        })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input value={todolistId} placeholder={'todolist ID'}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input value={title} placeholder={'title'} onChange={(e) => setTitle(e.currentTarget.value)}/>
            <button onClick={updateTodolist}>update todolist</button>
        </div>
    </div>
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        tasksAPI.getTasks('3c51706c-8a7d-463f-a7e1-d5cd1f34ec23').then((res) => {
            setState(res.data)
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        tasksAPI.createTask(todolistId, title).then((res) => {
            setState(res.data)
        })
    }, [])
    const createTask = () => {
        tasksAPI.createTask(todolistId, title).then((res) => {
            setState(res.data)
            setTodolistId('')
            setTitle('')
        })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input
                placeholder={'todolist ID'}
                value={todolistId}
                onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input
                placeholder={'title'}
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}/>
            <button onClick={createTask}>create task</button>
        </div>
    </div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolist] = useState<string>('')
    const [taskId, setTask] = useState<string>('')

    const deleteTask = () => {
        tasksAPI.deleteTask(todolistId, taskId).then((res) => setState(res.data));
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input
                placeholder={'TASK ID'}
                onChange={(e) => setTask(e.currentTarget.value)}
                value={taskId}/>
            <input
                placeholder={'Todolist ID'}
                onChange={(e) => setTodolist(e.currentTarget.value)}
                value={todolistId}/>
            <button onClick={deleteTask}>delete task</button>
        </div>

    </div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const updateTask = () => {
        tasksAPI.updateTask(todolistId, taskId, title).then((res) => {
            setState(res.data);
            setTaskId('')
            setTodolistId('')
            setTitle('')
        })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'task ID'} value={taskId} onChange={(e) => setTaskId(e.currentTarget.value)}/>
            <input placeholder={'todolist ID'} value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={'title'} value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
            <button onClick={updateTask}>update task</button>
        </div>
    </div>
}