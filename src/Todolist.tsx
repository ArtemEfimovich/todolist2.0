import React, {ChangeEvent} from 'react';
import {FilterValueType} from "./App";
import {AddItemForm} from "./components/AddItemForm";


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type TodolistPropsType = {
    title: string,
    tasks: TaskType[],
    removeTask: (taskId: string, todolistId: string) => void,
    changeFilter: (value: FilterValueType, todolistId: string) => void,
    addTask: (taskTitle: string, todolistId: string) => void,
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void,
    filter: string,
    todolistId: string,
    removeTodolist: (id: string) => void
}


export const Todolist: React.FC<TodolistPropsType> = ({
                                                          title,
                                                          tasks,
                                                          removeTask,
                                                          changeFilter,
                                                          addTask,
                                                          changeTaskStatus,
                                                          filter,
                                                          todolistId,
                                                          removeTodolist
                                                      }) => {


    const onAddTask = (title: string) => {
        addTask(title, todolistId)
    }

    const onDeleteClick = () => {
        removeTodolist(todolistId)
    }

    const onFilterChangeAll = () => {
        changeFilter('all', todolistId)
    }
    const onFilterChangeActive = () => {
        changeFilter('active', todolistId)
    }
    const onFilterChangeCompleted = () => {
        changeFilter('completed', todolistId)
    }

    return (
        <div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <h3>{title}</h3>
                <button onClick={onDeleteClick}>x</button>
            </div>
            <div>
                <AddItemForm addItem={onAddTask}/>
            </div>
            <ul>
                {tasks.map(({id, isDone, title}) => {
                    const onClickHandler = () => {
                        removeTask(id, todolistId)
                    }

                    const onChangeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = event.currentTarget.checked
                        changeTaskStatus(id, newIsDoneValue, todolistId)
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

