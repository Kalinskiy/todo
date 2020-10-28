import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";


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
type TasksStateType = {
    [key:string]:Array<TaskType>
}


function App() {


    //states
    // let [tasks, setTasks] = useState([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "rest api", isDone: false},
    //     {id: v1(), title: "graphQL", isDone: false}
    // ])
    let todolist1 = v1();
    let todolist2 = v1();


    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolist1, title: 'what to learn', filter: 'all'},
        {id: todolist2, title: 'what to buy', filter: 'all'},


    ])
    let [tasks, setTasks] = useState<TasksStateType>({
        [todolist1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
        ],
        [todolist2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'React book', isDone: true},
        ],

    })
    //Tasks Functions
    const removeTask = (id: string, todolistId: string) => {
        const todolistTasks = tasks[todolistId];
        tasks[todolistId] = todolistTasks.filter(t => t.id != id)
        setTasks({...tasks})
    }
    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }
    const addTask = (title: string, todolistId: string) => {
        let task = {id: v1(), title: title, isDone: false}
        const todolistTasks = tasks[todolistId];
        tasks[todolistId] = [task, ...todolistTasks]
        setTasks({...tasks})

    }
    const changeTaskStatus = (id: string, isDone: boolean, todolistId: string) => {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t=>t.id ===id)
        if(task){
            task.isDone = isDone;
            setTasks({...tasks});
        }
    }
//Todolists Functions
    const removeTodolist = (id:string)=>{
        setTodolists(todolists.filter(tl=>tl.id !=id))
        delete tasks[id]
        setTasks({...tasks})
    }

    return (
        <div className="App">
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

                    return <Todolist
                        title={tl.title}
                        key={tl.id}
                        id={tl.id}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={tl.filter}

                        removeTodolist={removeTodolist}

                    />
                })

            }

        </div>
    );
}

export default App;
