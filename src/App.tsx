import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValueType = 'all' | 'completed' | 'active'


function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "GraphQL", isDone: true}
    ])
    let [filter, setFilter] = useState<FilterValueType>('all')


    const addTask = (title: string) => {
        let task = {id: v1(), title: title, isDone: true}
        let newTask = [task, ...tasks]
        setTasks(newTask)
    }

    const removeTask = (id: string) => {
        let filterTasks = tasks.filter(task => task.id !== id)
        setTasks(filterTasks)
    }

    const changeTaskStatus = (id: string, isDone: boolean) => {
        let task = tasks.find(task => task.id === id)
        if (task) {
            task.isDone = isDone
            setTasks([...tasks])
        }
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
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
                      filter={filter}
            />
        </div>
    );
}

export default App;
