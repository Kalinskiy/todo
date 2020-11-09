import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../../app/app-reducer";
import {Dispatch} from "redux";
import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
// types


type ActionsType = ReturnType<typeof setIsLoggedIn>
type InitialStateType = {
    isLoggedIn: boolean
}
type ThunkDispatch = Dispatch<ActionsType> | SetAppStatusActionType | SetAppErrorActionType
const initialState: InitialStateType = {
    isLoggedIn: false
}


export const authReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case "login/SET-IS-LOGGED-IN": {
            return {...state, isLoggedIn: action.value}
        }

        default:
            return state
    }
}

//actions
export const setIsLoggedIn = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)


// thunks
export const loginTC = (data: LoginParamsType) =>
    async (dispatch: Dispatch) => {
        dispatch(setAppStatusAC("loading"))
        try {
            const res = await authAPI.login(data)
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIn(true))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
            }

        } catch (e) {
            handleServerNetworkError(e, dispatch)
        }


    }
export const logoutTC = () =>
    async (dispatch: Dispatch) => {
        dispatch(setAppStatusAC("loading"))
        try {
            const res = await authAPI.logout()
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIn(false))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
                dispatch(setAppStatusAC("failed"))
            }

        } catch (e) {
            handleServerNetworkError(e, dispatch)
        }


    }
