import React from 'react';
import {ComponentMeta} from '@storybook/react';
import {Task} from "../components/Task/Task";




export default {
    title: 'TodoList/Task',
    component: Task,
} as ComponentMeta<typeof Task>;

/*const changeTaskStatusCallback = action("Status changed inside Task")
const changeTaskTitleCallback = action("Title changed inside Task")
const removeTaskCallback = action("Remove button inside Task was clicked")*/

/*const baseArgs = {
    changeTaskStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback,
    removeTask: removeTaskCallback,
}*/


/*const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;*/

/*
export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    ...baseArgs,
    Task: {id: '1', status: TaskStatuses.Completed, title: 'js',todoListId:'1',},
    todolistId: 'todolistId1'
}
*/


/*
export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    ...baseArgs,
    Task: {id: '1', status: TaskStatuses.New, title: 'js',todoListId:'2'},
    todolistId: 'todolistId1'
}
*/

