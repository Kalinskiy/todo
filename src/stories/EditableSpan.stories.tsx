import React from "react";
import {action} from '@storybook/addon-actions'
import {Task} from "../Task";
import {Provider} from "react-redux";
import {store} from "../state/store";
import {EditableSpan} from "../EditableSpan";

export default {
    title: 'Task Stories',
    component: EditableSpan
}

export const EditableSpanBaseExample = (props: any) => {
    return (

        <EditableSpan title={'Click me two times!'} onChange={action('value changed')}/>
    )


}