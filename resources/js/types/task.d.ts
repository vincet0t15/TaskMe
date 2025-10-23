import { User } from '.';
import { PrioritiesInterface } from './priorities';
import { StatusInterface } from './statuses';
import { SubTaskInterface } from './subTask';

export type TaskForm = {
    name: string;
    description: string;
    priority_id: number;
    status_id: number;
    list_task_id: number;
    due_date: string;
    assignees: number[];
};

export interface UserWithSubTaskCounts extends User {
    total_subtasks: number;
    completed_subtasks_count: number;
}

export interface TaskInterface {
    id: number;
    name: string;
    description: string;
    priority_id: number;
    status_id: number;
    list_task_id: number;
    due_date: string;
    priority: PrioritiesInterface;
    status: StatusInterface;
    users: UserWithSubTaskCounts[];
    sub_tasks: SubTaskInterface[];
    completed_subtasks_count?: number;
    progress_percentage?: number;
    assignees_count?: number;
    total_subtasks?: number;
}
