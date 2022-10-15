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
    addTask: (taskTitle: string) => void,
    changeTaskStatus: (id: string, isDone: boolean) => void,
    filter: string,
}


export const Todolist: React.FC<TodolistPropsType> = ({
                                                          title,
                                                          tasks,
                                                          removeTask,
                                                          changeFilter,
                                                          addTask,
                                                          changeTaskStatus,
                                                          filter
                                                      }) => {

    let [taskTitle, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const onAddTask = () => {
        setError(null)
        if (taskTitle.trim() !== '') {
            addTask(taskTitle)
            setTitle('')
        } else {
            setError('Title is required')
        }

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
                       className={error ? 'error' : ''}
                />
                <button onClick={onAddTask}>+</button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            <ul>
                {tasks.map(({id, isDone, title}) => {
                    const onClickHandler = () => {
                        removeTask(id)
                    }

                    const onChangeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = event.currentTarget.checked
                        changeTaskStatus(id, newIsDoneValue)
                    }

                    return <li key={id} className={isDone ? 'is-done' : ''}>
                        <input type="checkbox" checked={isDone} onChange={onChangeStatusHandler}/>
                        <span>{title}</span>
                        <button onClick={onClickHandler}>x
                        </button>
                    </li>
                })}
            </ul>
            <div>
                <button onClick={onFilterChangeAll} className={filter === 'all' ? 'active-filter' : ''}>All
                </button>
                <button onClick={onFilterChangeActive} className={filter === 'active' ? 'active-filter' : ''}>Active
                </button>
                <button onClick={onFilterChangeCompleted}
                        className={filter === 'completed' ? 'active-filter' : ''}>Completed
                </button>
            </div>
        </div>
    );
};

