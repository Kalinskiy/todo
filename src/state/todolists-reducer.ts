import {v1} from "uuid";
import {TodolistType} from "../api/todolists-api";

export type RemoveTodolistTypeActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistTypeActionType = {
    type: 'ADD-TODOLIST',
    todolistId: string,
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
export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS'
    todolists: Array<TodolistType>
}

export type ActionTypes =
    RemoveTodolistTypeActionType
    | AddTodolistTypeActionType
    | ChangeTodolistTypeActionType
    | ChangeTodolistFilterTypeActionType
    | SetTodolistsActionType


export let todolist1 = v1();
export let todolist2 = v1();

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}
const initialState: Array<TodolistDomainType> = []
export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionTypes): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id != action.id)
        case 'ADD-TODOLIST':
            return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all',
                addedDate: '',
                order: 0
            }, ...state]
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
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => ({
                ...tl,
                filter: 'all' // к тому
            }))
        }

        default:
            return state;
    }

}

export const removeTodolistAC = (todolistId: string): RemoveTodolistTypeActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (title: string): AddTodolistTypeActionType => {
    return {type: 'ADD-TODOLIST', title, todolistId: v1()}
}
export const changeTodolistAC = (id: string, title: string): ChangeTodolistTypeActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title}
}
export const changeTodolistFilterAC = (filter: FilterValuesType, id: string,): ChangeTodolistFilterTypeActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', filter, id}
}
export const setTodolistsAC = (todolists: Array<TodolistType>): SetTodolistsActionType => {
    return {type: 'SET-TODOLISTS', todolists}
}

