import React from "react";
import {action} from '@storybook/addon-actions'
import {EditableSpan} from "../EditableSpan";
import {AppWithRedux} from "../AppWithRedux";
import {Provider} from "react-redux";
import {store} from "../state/store";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";


export default {
    title: 'AppWithRedux Stories',
    component: AppWithRedux,
    decorators:[ReduxStoreProviderDecorator]
}

export const AppWithReduxBaseExample = (props: any) => {
    return (
        <Provider store={store}>
            <AppWithRedux/>
        </Provider>
    )


}