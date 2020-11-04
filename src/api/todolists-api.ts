import axios from 'axios'

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'bdb9022f-3466-40e1-957a-ab975d07c6cb'
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    ...settings
})
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    data: D
}

export enum TaskStatuses {
    New = 0,
    inProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    High  = 2,
    Urgently = 3,
    Later = 4

}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: number
    startDate: string
    deadline: string
    id: string
    totoListId: string
    order: number
    addedDate: string
}

export const todolistsApi = {
    getTodoList() {
        return instance.get<Array<TodolistType>>('', settings)

    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('', {title}, settings)
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType<{}>>(`${todolistId}`, settings)
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put<ResponseType<{}>>(`/${todolistId}`, {title: title}, settings)
    },


}
