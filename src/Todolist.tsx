import React from 'react';
import {FilterValueType} from "./App";


type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}

type TodolistPropsType = {
    title: string,
    tasks: TaskType[],
    removeTask: (taskId: number) => void,
    changeFilter: (value: FilterValueType) => void
}


export const Todolist: React.FC<TodolistPropsType> = ({title, tasks, removeTask, changeFilter}) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasks.map(({id, isDone, title}) => {
                    return <li key={id}>
                        <input type="checkbox" checked={isDone}/>
                        <span>{title}</span>
                        <button onClick={() => {
                            removeTask(id)
                        }}>x
                        </button>
                    </li>
                })}
            </ul>
            <div>
                <button onClick={() => {
                    changeFilter('all')
                }}>All
                </button>
                <button onClick={() => {
                    changeFilter('active')
                }}>Active
                </button>
                <button onClick={() => {
                    changeFilter('completed')
                }}>Completed
                </button>
            </div>
        </div>
    );
};

