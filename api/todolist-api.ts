import axios from 'axios'

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '369a3457-d3e2-4331-b490-319ddee29442',
    },
}

export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        const promise = axios.put(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
            { title: title },
            settings
        )
        return promise
    },
}
