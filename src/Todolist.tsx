import React, {ChangeEvent, useState} from 'react';
import {FilterValueType} from "./App";


type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type TodolistPropsType = {
    title: string,
    tasks: TaskType[],
    removeTask: (taskId: string) => void,
    changeFilter: (value: FilterValueType) => void,
    addTask: (taskTitle: string) => void
}


export const Todolist: React.FC<TodolistPropsType> = ({
                                                          title,
                                                          tasks,
                                                          removeTask,
                                                          changeFilter,
                                                          addTask
                                                      }) => {

    let [taskTitle, setTitle] = useState('')

    const onAddTask = () => {
        addTask(taskTitle)
        setTitle('')
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onAddTask()
        }
    }

    const onFilterChangeAll = () => {
        changeFilter('all')
    }
    const onFilterChangeActive = () => {
        changeFilter('active')
    }
    const onFilterChangeCompleted = () => {
        changeFilter('completed')
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={taskTitle} onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                />
                <button onClick={onAddTask}>+</button>
            </div>
            <ul>
                {tasks.map(({id, isDone, title}) => {
                    const onClickHandler = () => {
                        removeTask(id)
                    }

                    return <li key={id}>
                        <input type="checkbox" checked={isDone}/>
                        <span>{title}</span>
                        <button onClick={onClickHandler}>x
                        </button>
                    </li>
                })}
            </ul>
            <div>
                <button onClick={onFilterChangeAll}>All
                </button>
                <button onClick={onFilterChangeActive}>Active
                </button>
                <button onClick={onFilterChangeCompleted}>Completed
                </button>
            </div>
        </div>
    );
};

