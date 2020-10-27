import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";


//types
export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {


    //states
    let [filter, setFilter] = useState<FilterValuesType>('all')


    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "rest api", isDone: false},
        {id: v1(), title: "graphQL", isDone: false}
    ])
    //functions

    const removeTask = (id: string) => {
        const filteredTasks = tasks.filter(t => t.id != id)
        setTasks(filteredTasks)
    }
    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }
    const addTask = (title: string) => {
        let task = {id: v1(), title: title, isDone: false}
        let newTask = [task, ...tasks]
        setTasks(newTask)
    }
    const changeTaskStatus = (id: string, isDone: boolean) => {
        let task = tasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone;
            setTasks([...tasks])
        }

    }
//logic
    let tasksForTodolist = tasks;
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }
    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                filter={filter}

            />
        </div>
    );
}

export default App;
