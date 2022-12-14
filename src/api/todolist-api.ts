import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': '369a3457-d3e2-4331-b490-319ddee29442',
    },
})

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
    filter: string
}
type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}





export const todolistAPI = {
    updateTodolist(todolistId: string, title: string){
        return instance.put<ResponseType<{}>>(
            `/todo-lists/${todolistId}`,
            {title}
        )
    },
    getTodolist(){
        return instance.get<TodolistType[]>(
            'todo-lists'
        )
    },
    createTodolist(title:string){
        return instance.post<ResponseType<{item:TodolistType}>>(
            `/todo-lists`,
            {title}
        )
    },
    deleteTodolist(todolistId: string){
        return instance.delete<ResponseType<{}>>(
            `/todo-lists/${todolistId}`,
        )
    },
    getTask(todolistId: string){
        return instance.get(
                `/todo-lists/${todolistId}/tasks`
        )
    },
    createTask(todolistId:string,title:string){
        return instance.put(
            `/todo-lists/${todolistId}/tasks`,
            {title}
        )
    },
    updateTask(todolistId:string,taskId:string,title:string){
        instance.post(
            `/todo-lists/${todolistId}/tasks/${taskId}`,
            {title}
        )
    },
    deleteTask(todolistId:string,taskId:string){
        instance.delete(
            `/todo-lists/${todolistId}/tasks/${taskId}`
        )
    }
}
