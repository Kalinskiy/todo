import {setAppStatusAC} from "../../app/app-reducer";
import {Dispatch} from "redux";
import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
// types

const initialState = {
    isLoggedIn: false
}
const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        }
    }
})

export const authReducer = slice.reducer
export const {setIsLoggedIn} = slice.actions


// thunks
export const loginTC = (data: LoginParamsType) =>
    async (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: "loading"}))
        try {
            const res = await authAPI.login(data)
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIn({value: true}))
                dispatch(setAppStatusAC({status: "succeeded"}))
            } else {
                handleServerAppError(res.data, dispatch)
            }

        } catch (e) {
            handleServerNetworkError(e, dispatch)
        }


    }
export const logoutTC = () =>
    async (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: "loading"}))
        try {
            const res = await authAPI.logout()
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIn({value: false}))
                dispatch(setAppStatusAC({status: "succeeded"}))
            } else {
                handleServerAppError(res.data, dispatch)
                dispatch(setAppStatusAC({status: "failed"}))
            }

        } catch (e) {
            handleServerNetworkError(e, dispatch)
        }


    }
