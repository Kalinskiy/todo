import React, {ChangeEvent, useState} from "react";

export type EditableSpanType = {
    title: string
    onChange:(newValue:string)=>void

}
export const EditableSpan = (props: EditableSpanType) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState('')

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }


    return <>
        {
            editMode
                ? <input value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode}/>
                : <span onDoubleClick={activateEditMode}>{props.title}</span>
        }

    </>
}