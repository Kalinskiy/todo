import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistTypeActionType, RemoveTodolistTypeActionType, todolist1, todolist2} from "./todolists-reducer";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    taskId: string
    todolistId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK',
    title: string
    todolistId: string
}
export type ChangeStatusActionType = {
    type: 'CHANGE-STATUS',
    taskId: string
    isDone: boolean
    todolistId: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TITLE',
    taskId: string
    title: string
    todolistId: string
}

export type ActionTypes =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistTypeActionType
    | RemoveTodolistTypeActionType

const initialState: TasksStateType = {
}
export const tasksReducer = (state: TasksStateType = initialState, action: ActionTypes) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state} //копия стейта
            const tasks = state[action.todolistId] //достаем массив тасок из стейта по todolist ID
            const filteredTasks = tasks.filter(t => t.id !== action.taskId) //массив отфильтрованных тасок, те таски у которых ID !== ID той таски, которую нужно удалить
            stateCopy[action.todolistId] = filteredTasks
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];  // массив нужных тасок из стейта
            const newTask = {id: v1(), title: action.title, isDone: false} //создаем таску
            const newTasks = [newTask, ...tasks] //все таски, делаем диструктуризацию
            stateCopy[action.todolistId] = newTasks; //ложим обратно в копию измененный массив тасок
            return stateCopy;

        }
        case "CHANGE-STATUS": {
            const todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks.map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)
            return {...state};

        }
        case "CHANGE-TITLE": {
            const todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks.map(t => t.id === action.taskId ? {...t, title: action.title} : t)
            return {...state};

        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy;

        }
        default:
            return state;
    }

}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId, todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistId}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeStatusActionType => {
    return {type: 'CHANGE-STATUS', taskId, isDone, todolistId}
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TITLE', taskId, title, todolistId}
}

