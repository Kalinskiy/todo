import React, {ChangeEvent, useCallback, useState} from "react";
import {TextField} from "@material-ui/core";

export type EditableSpanType = {
    title: string
    onChange: (newValue: string) => void

}
export const EditableSpan = React.memo((props: EditableSpanType) => {
    console.log('EditableSpan called')
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
                ? <TextField value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode}/>
                : <span onDoubleClick={activateEditMode}>{props.title}</span>
        }

    </>
})