import React, {ChangeEvent, useState} from 'react';


type PropsType = {
    value: string,
    onChange: (newTitle: string) => void
}


export const EditableSpan: React.FC<PropsType> = ({value, onChange}) => {

    const [edit, setEditMode] = useState(false)

    const [title, setTitle] = useState(value)

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(value)
    }

    const activateViewMode = () => {
        setEditMode(false)
        onChange(title)
    }


    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        edit ? <input defaultValue={value} onChange={changeTitle} onBlur={activateViewMode} autoFocus/> :
            <span onDoubleClick={activateEditMode}>{value}</span>
    );
};

