import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";

export type FilterValueType = 'all' | 'completed' | 'active'
export type TodolistsType = {
    id: string,
    title: string,
    filter: string
}

type TasksStateType = {
    [key: string]: TaskType[]
}


function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<TodolistsType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
        ],
        [todolistID2]: [
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "GraphQL", isDone: true}
        ]
    })

    const changeFilter = (value: FilterValueType, todolistId: string) => {
        let todolistFilter = todolists.find(tl => tl.id === todolistId)
        if (todolistFilter) {
            todolistFilter.filter = value
            setTodolists([...todolists])
        }
    }

    const addTask = (title: string, todolistId: string) => {
        let task = {id: v1(), title: title, isDone: false}
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = [task, ...todolistTasks]
        setTasks({...tasks})
    }

    const removeTask = (id: string, todolistId: string) => {
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter(task => task.id !== id)
        setTasks({...tasks})
    }

    const changeTaskStatus = (id: string, isDone: boolean, todolistId: string) => {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(task => task.id === id)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    const changeTaskTitle = (id:string,title:string,todolistId:string)=>{
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(task => task.id === id)
            if (task) {
                task.title = title
                setTasks({...tasks})
            }
    }

    const changeTodolistTitle = (title:string,todolistId:string)=>{

    }

    const removeTodolist = (id: string) => {
        setTodolists(todolists.filter(tl => tl.id !== id))
        delete tasks[id]
        setTasks({...tasks})
    }

    const addTodolist = (title: string) => {
        let newTodolistId = v1()
        let newTodolist: TodolistsType = {id: newTodolistId, title: title, filter: 'all'}
        setTodolists([newTodolist, ...todolists])
        setTasks({
            ...tasks,
            [newTodolistId]: []
        })
    }


    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todolists.map(({filter, title, id}) => {
                let tasksForTodolist = tasks[id]
                if (filter === 'active') {
                    tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)
                }
                if (filter === 'completed') {
                    tasksForTodolist = tasksForTodolist.filter(task => task.isDone)
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
                    removeTodolist={removeTodolist}
                    changeTaskTitle={changeTaskTitle}
                />
            })}

        </div>
    );
}

export default App;
