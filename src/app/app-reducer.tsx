import {setTodolistsAC} from "../features/TodolistsList/todolists-reducer";
import {Dispatch} from "redux";
import {authAPI} from "../api/todolists-api";
import {handleServerNetworkError} from "../utils/error-utils";
import {setIsLoggedIn} from "../features/TodolistsList/auth-reducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    //true когда приложение проинициализировалось (проверили пользователя, получили настройки и т.д)
    isInitialized: false
}
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>;
export type setAppIsInitialized = ReturnType<typeof setAppIsInitialized>;

type ActionsType = SetAppStatusActionType | SetAppErrorActionType | setAppIsInitialized

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case "APP/SET-ERROR": {
            return {...state, error: action.error}
        }
        case "APP/SET-INITIALIZED": {
            return {...state, isInitialized: action.value}
        }
        default:
            return state
    }
}
//actions
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppIsInitialized = (value: boolean) => ({type: 'APP/SET-INITIALIZED', value} as const)

//thunks

export const initializedAppTC = () => async (dispatch: Dispatch) => {

    try {
        const res = await authAPI.auth()
        if(res.data.resultCode === 0){
            dispatch(setIsLoggedIn(true))
        }
        else {
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }
    finally {
        dispatch(setAppIsInitialized(true))
    }
}
