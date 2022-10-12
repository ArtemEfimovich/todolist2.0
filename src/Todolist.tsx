import React from 'react';


type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}

type TodolistPropsType = {
    title: string,
    tasks: TaskType[]
}


export const Todolist: React.FC<TodolistPropsType> = ({title, tasks}) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasks.map(({id,isDone,title})=>{
                    return  <li key={id}><input type="checkbox" checked={isDone}/> <span>{title}</span></li>
                })}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};

