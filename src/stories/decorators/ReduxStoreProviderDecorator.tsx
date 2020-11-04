import React from "react";
import {Provider} from "react-redux";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../../state/tasks-reducer";
import {todolistsReducer} from "../../state/todolists-reducer";
import {AppRootStateType} from "../../state/store";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../../api/todolists-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", order: 0, addedDate: ''},
        {id: "todolistId2", title: "What to buy", filter: "all", order: 0, addedDate: ''}
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(), title: 'HTML&CSS',
                status: TaskStatuses.Completed,
                totoListId: "todolist1",
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: v1(), title: 'JS',
                status: TaskStatuses.inProgress,
                totoListId: "todolist1",
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            },

        ],
        ["todolistId2"]: [
            {
                id: v1(), title: 'Milk',
                status: TaskStatuses.Completed,
                totoListId: "todolist2",
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: v1(), title: 'Water',
                status: TaskStatuses.inProgress,
                totoListId: "todolist2",
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            },
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)
