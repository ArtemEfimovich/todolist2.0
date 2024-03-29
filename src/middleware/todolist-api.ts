import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': '369a3457-d3e2-4331-b490-319ddee29442',
    },
})

export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
    filter?: string
}
export type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskTypes = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskTypes[]
}
export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
export type AuthMeType = {
    id: number
    email: string
    login: string
}


export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<ResponseType<{ userId: number }>>('auth/login', data)
    },
    me() {
        return instance.get<ResponseType<AuthMeType>>('auth/me')
    },
    logout() {
        return instance.delete<ResponseType<{}>>('auth/login')
    }
}

export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType<{}>>(
            `/todo-lists/${todolistId}`,
            {title}
        )
    },
    getTodolists() {
        return instance.get<TodolistType[]>(
            'todo-lists'
        )
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>(
            `/todo-lists`,
            {title}
        )
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType<{}>>(
            `/todo-lists/${todolistId}`,
        )
    },
    getTask(todolistId: string) {
        return instance.get<GetTasksResponse>(
            `/todo-lists/${todolistId}/tasks`
        )
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskTypes }>>(
            `/todo-lists/${todolistId}/tasks`,
            {title}
        )
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<{}>>(
            `/todo-lists/${todolistId}/tasks/${taskId}`,
            model
        )
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType<{}>>(
            `/todo-lists/${todolistId}/tasks/${taskId}`
        )
    }
}
