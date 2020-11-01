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

type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}
export type TaskType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: Array<TaskType>
}
export type UpdateTaskType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
}
export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`${todolistId}/tasks`)

    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType>(`${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, title: string,) {
        return instance.put<ResponseType>(`/${todolistId}/tasks/${taskId}`, {title: title})
    },


}
