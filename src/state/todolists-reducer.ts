import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistTypeActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistTypeActionType = {
    type: 'ADD-TODOLIST',
    title: string
}
export type ChangeTodolistTypeActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
}
export type ChangeTodolistFilterTypeActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValuesType
}
export type ActionTypes =
    RemoveTodolistTypeActionType
    | AddTodolistTypeActionType
    | ChangeTodolistTypeActionType
    | ChangeTodolistFilterTypeActionType

export const todolistsReducer = (state: Array<TodolistType>, action: ActionTypes): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id != action.id)
        case 'ADD-TODOLIST':
            return [...state,
                {id: v1(), title: action.title, filter: 'all'}
            ]
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.filter = action.filter
            }
            return [...state]
        }

        default:
            throw new Error("I don't understand this type")
    }

}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistTypeActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const AddTodolistAC = (title: string): AddTodolistTypeActionType => {
    return {type: 'ADD-TODOLIST', title}
}
export const ChangeTodolistAC = (id: string, title: string): ChangeTodolistTypeActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title}
}
export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterTypeActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id, filter}
}
