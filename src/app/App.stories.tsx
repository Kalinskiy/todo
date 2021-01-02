import React from 'react'
import App from './App'
import {ReduxStoreProviderDecorator} from '../stories/decorators/ReduxStoreProviderDecorator'
import StoryRouter from 'storybook-react-router';

export default {
    title: 'App Stories',
    component: App,
    decorators: [ReduxStoreProviderDecorator, StoryRouter()]
}

export const AppBaseExample = (props: any) => {
    return (<App/>)
}
