import React from "react";
import {Provider} from "react-redux";
import {store} from "../../services/store/store";
import {combineReducers} from "redux";
import {tasksReducer} from "../../services/reducers/tasks-reducer";
import {todolistsReducer} from "../../services/reducers/todolists-reducer";
import {configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

/*
const initialGlobalState:initialGlobalStateType = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all'}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true}
        ],
        ['todolistId2']: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'React Book', isDone: true}
        ]
    }
}
*/

export const storyBookStore = configureStore({reducer:rootReducer, middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)})

export type AppStoryBookRootStateType = ReturnType<typeof rootReducer>

export const ReduxStoreProviderDecorator = (storyFn:any) =>{
    return <Provider store={store}>{storyFn()}</Provider>
}