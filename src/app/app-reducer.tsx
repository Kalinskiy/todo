import {Dispatch} from "redux";
import {authAPI} from "../api/todolists-api";
import {handleServerNetworkError} from "../utils/error-utils";
import {setIsLoggedIn} from "../features/TodolistsList/auth-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'


const initialState = {
    status: 'idle',
    error: null as null | string,
    isInitialized: false  //true когда приложение проинициализировалось (проверили пользователя, получили настройки и т.д)
}


const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setAppIsInitialized(state, action: PayloadAction<{ value: boolean }>) {
            state.isInitialized = action.payload.value
        },

    }
})

export const appReducer = slice.reducer
export const {setAppStatusAC, setAppErrorAC, setAppIsInitialized} = slice.actions


//thunks

export const initializedAppTC = () => async (dispatch: Dispatch) => {

    try {
        const res = await authAPI.auth()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedIn({value: true}))
        } else {
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    } finally {
        dispatch(setAppIsInitialized({value: true}))
    }
}
