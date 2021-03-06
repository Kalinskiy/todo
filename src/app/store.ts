import {tasksReducer} from '../features/TodolistsList/tasks-reducer';

import {combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {authReducer} from "../features/TodolistsList/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {appReducer} from "./app-reducer";
import {todolistsReducer} from "../features/TodolistsList/todolists-reducer";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})
export type rootReducerType = typeof rootReducer
// непосредственно создаём store
// export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<rootReducerType>

// @ts-ignore
window.store = store;
