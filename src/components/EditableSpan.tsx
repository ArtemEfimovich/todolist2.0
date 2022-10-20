import React, {useState} from 'react';


type PropsType = {
    value: string,
    onChange:(newTitle:string)=>void
}


export const EditableSpan: React.FC<PropsType> = ({value,onChange}) => {

    const [edit, setEditMode] = useState(false)

    const [title,setTitle] = useState(value)

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(title)
    }

    const activateViewMode = (event: React.FocusEvent<HTMLInputElement>)=>{
        let title = event.currentTarget.value
        setEditMode(false)
        onChange(title)
    }


    return (
        edit ? <input defaultValue={value} onBlur={activateViewMode} autoFocus/> :
            <span onDoubleClick={activateEditMode}>{value}</span>
    );
};

