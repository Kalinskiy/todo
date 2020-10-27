import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';


//types
export type FilterValuesType = 'all' | 'active' | 'completed'
function App() {


    //state
    let[filter,setFilter]= useState<FilterValuesType>('all')

    let [tasks, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "rest api", isDone: false},
        {id: 5, title: "graphQL", isDone: false}
    ])
    //functions

    const removeTask = (id: number) => {
        const filteredTasks = tasks.filter(t => t.id != id)
        setTasks(filteredTasks)
    }
    const changeFilter = (value:FilterValuesType)=>{
        setFilter(value)
    }
//logic
    let tasksForTodolist = tasks;
    if(filter === 'active'){
        tasksForTodolist = tasks.filter(t=>!t.isDone)
    }
    if(filter ==='completed'){
        tasksForTodolist = tasks.filter(t=>t.isDone)
    }
    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}

            />
        </div>
    );
}

export default App;
