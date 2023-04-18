import {ComponentMeta, ComponentStory} from "@storybook/react";
import React from "react";
import App from "../pages/App";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";

export default {
    title: 'TodoList/App',
    component: App,
    decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = () => <App/>;

export const AppWithReduxExample = Template.bind({});
AppWithReduxExample.args = {

}