import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";
import {TasksStateType, TodolistType} from "../AppWithRedux";



const rootReducer  = combineReducers({
    tasks:tasksReducer,
    todolists:todolistsReducer
})
export const store = createStore(rootReducer)
export type AppRootState = ReturnType<typeof rootReducer>
// type AppRootStateType = {
//     todolists:Array<TodolistType>
//     tasks:TasksStateType
// }
//@ts-ignore
window.store = store;