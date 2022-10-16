import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValueType = 'all' | 'completed' | 'active'
export type TodolistsType = {
    id: string,
    title: string,
    filter: string
}

function App() {

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: v1(), title: 'What to learn', filter: 'all'},
        {id: v1(), title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "GraphQL", isDone: true}
    ])

    const changeFilter = (value: FilterValueType, todolistId: string) => {
        let todolistFilter = todolists.find(tl => tl.id === todolistId)
        if (todolistFilter) {
            todolistFilter.filter = value
            setTodolists([...todolists])
        }
    }


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


    return (
        <div className="App">
            {todolists.map(({filter, title, id}) => {
                let tasksForTodolist = tasks
                if (filter === 'active') {
                    tasksForTodolist = tasks.filter(task => !task.isDone)
                }
                if (filter === 'completed') {
                    tasksForTodolist = tasks.filter(task => task.isDone)
                }
                return <Todolist
                    key={id}
                    todolistId={id}
                    title={title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    filter={filter}
                />
            })}

        </div>
    );
}

export default App;
