import React from 'react';
import './App.css';

/*
export type FilterValueType = 'all' | 'completed' | 'active'
export type TodolistsType = {
    id: string,
    title: string,
    filter: string
}

export type TasksStateType = {
    [key: string]: TaskType[]
}
*/


/*
function AppWithReducers() {

    /!*let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, dispatchToTodolist] = useReducer(todolistsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
        ],
        [todolistID2]: [
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "GraphQL", isDone: true}
        ]
    })

    const changeFilter = ( todolistId: string, filter: FilterValueType) => {
        const action = changeTodolistFilterAC(todolistId, filter)
        dispatchToTodolist(action)
    }

    const addTask = (title: string, todolistId: string) => {
        let action = addTaskAC(title, todolistId)
        dispatchToTasks(action)
    }

    const removeTask = (id: string, todolistId: string) => {
        const action = removeTaskAC(id, todolistId)
        dispatchToTasks(action)
    }

    const changeTaskStatus = (id: string, isDone: boolean, todolistId: string) => {
        const action = changeTaskStatusAC(id, isDone, todolistId)
        dispatchToTasks(action)
    }

    const changeTaskTitle = (id: string, title: string, todolistId: string) => {
        const action = changeTaskTitleAC(id, title, todolistId)
        dispatchToTasks(action)
    }

    const changeTodolistTitle = (title: string, todolistId: string) => {
        const action = changeTodolistTitleAC(title, todolistId)
        dispatchToTodolist(action)
    }

    const removeTodolist = (id: string) => {
        const action = removeTodolistAC(id)
        dispatchToTodolist(action)
        dispatchToTasks(action)
    }

    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispatchToTasks(action)
        dispatchToTodolist(action)
    }


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Todolist
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container>
                <Grid container style={{padding: '20px'}}><AddItemForm addItem={addTodolist}/></Grid>
                <Grid container spacing={3}>  {todolists.map(({filter, title, id}) => {
                    let tasksForTodolist = tasks[id]
                    if (filter === 'active') {
                        tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)
                    }
                    if (filter === 'completed') {
                        tasksForTodolist = tasksForTodolist.filter(task => task.isDone)
                    }
                    return <Grid item>
                        <Paper style={{padding: '10px'}}>
                            < Todolist
                                key={id}
                                todolistId={id}
                                title={title}
                                tasks={tasksForTodolist}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeTaskStatus}
                                filter={filter}
                                removeTodolist={removeTodolist}
                                changeTaskTitle={changeTaskTitle}
                                changeTodolistTitle={changeTodolistTitle}
                            />
                        </Paper>
                    </Grid>
                })}</Grid>
            </Container>

        </div>
    )
        ;*!/
}

*/
