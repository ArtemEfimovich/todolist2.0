import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Task} from "../task/Task";
import {action} from "@storybook/addon-actions";


export default {
    title: 'TodoList/Task',
    component: Task,
} as ComponentMeta<typeof Task>;

const changeTaskStatusCallback = action("Status changed inside Task")
const changeTaskTitleCallback = action("Title changed inside Task")
const removeTaskCallback = action("Remove button inside Task was clicked")

const baseArgs = {
    changeTaskStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback,
    removeTask: removeTaskCallback,
}


const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    ...baseArgs,
    task: {id: '1', isDone: true, title: 'js'},
    todolistId: 'todolistId1'
}


export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    ...baseArgs,
    task: {id: '1', isDone: false, title: 'js'},
    todolistId: 'todolistId1'
}

