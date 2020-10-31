import {TaskType} from "./App";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import React, {ChangeEvent, useCallback} from "react";
import {Checkbox} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@material-ui/core/IconButton";
import {Delete} from "@material-ui/icons";

export type TaskPropsType = {
    task: TaskType
    todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {
    const dispatch = useDispatch()
    const onClickHandler = () => dispatch(removeTaskAC(props.task.id, props.todolistId));
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newValueIsDone = e.currentTarget.checked
        dispatch(changeTaskStatusAC(props.task.id, newValueIsDone, props.todolistId))
    }
    const onChangeTitleHandler = useCallback( (newValue: string) => {
        dispatch(changeTaskTitleAC(props.task.id, newValue, props.todolistId))
    },[props.task.id, props.todolistId])

    return <div key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
        <Checkbox
            color={"primary"}
            checked={props.task.isDone}
            onChange={onChangeStatusHandler}
        />
        <EditableSpan
            title={props.task.title}
            onChange={onChangeTitleHandler}
        />
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
})
