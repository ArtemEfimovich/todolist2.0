import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type FilterValueType = 'all' | 'completed' | 'active'


function App() {

    let [tasks, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "GraphQL", isDone: true}
    ])
    let [filter, setFilter] = useState<FilterValueType>('all')

    const removeTask = (id: number) => {
        let filterTasks = tasks.filter(task => task.id !== id)
        setTasks(filterTasks)
    }


    let tasksForTodolist = tasks
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(task => !task.isDone)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(task => task.isDone)
    }

    const changeFilter = (value: FilterValueType) => {
        setFilter(value)
    }


    return (
        <div className="App">
            <Todolist title='What to learn'
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
