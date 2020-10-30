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
    [todolist1]: [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
    ],
    [todolist2]: [
        {id: v1(), title: 'Milk', isDone: true},
        {id: v1(), title: 'React book', isDone: true},
    ],

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
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const task = tasks.find(t => t.id === action.taskId)
            if (task) {
                task.isDone = action.isDone
            }
            return stateCopy;

        }
        case "CHANGE-TITLE": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const task = tasks.find(t => t.id === action.taskId)
            if (task) {
                task.title = action.title
            }
            return stateCopy;

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

