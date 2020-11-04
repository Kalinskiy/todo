import React from "react";
import {action} from '@storybook/addon-actions'
import {Task} from "../Task";
import {Provider} from "react-redux";
import {store} from "../state/store";
import {TaskStatuses} from "../api/todolists-api";

export default {
    title: 'Task Stories',
    component: Task
}

const removeCallBack = action('Remove Button inside Task clicked')
const changeStatusCallBack = action('Status changed inside Task')
const changeTitleCallBack = action('Title changed inside Task')

export const TaskBaseExample = (props: any) => {
    return (
        <div>
            <Provider store={store}>
                <Task
                    todolistId={'todolistId1'}
                    task={{id: '1', status: TaskStatuses.Completed, title: 'CSS',totoListId:'todolist1',addedDate:'',order:0,deadline:'',description:'',startDate:'',priority:0}
                    }/>
                <Task
                    todolistId={'todolistId2'}
                    task={{id: '2', status: TaskStatuses.New, title: 'JS',totoListId:'todolist2',addedDate:'',order:0,deadline:'',description:'',startDate:'',priority:0}
                    }/>
            </Provider>
        </div>

    )
}