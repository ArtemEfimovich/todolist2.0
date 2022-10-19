import React, {ChangeEvent, useState} from 'react';


type AddItemFormPropsType = {
    addItem: (title: string) => void
}


export const AddItemForm: React.FC<AddItemFormPropsType> = ({addItem}) => {

    let [taskTitle, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const onAddTask = () => {
        setError(null)
        if (taskTitle.trim() !== '') {
            addItem(taskTitle)
            setTitle('')
        } else {
            setError('Title is required')
        }

    }

    const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onAddTask()
        }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    return (
        <div>
            <input value={taskTitle} onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? 'error' : ''}
            />
            <button onClick={onAddTask}>+</button>
            {error && <div className='error-message'>{error}</div>}
        </div>
    );
};

