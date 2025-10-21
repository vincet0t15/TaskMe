import { User } from '.';
import { PrioritiesInterface } from './priorities';
import { StatusInterface } from './statuses';

export type SubTaskForm = {
    name: string;
    description: string;
    priority_id: number;
    status_id: number;
    task_id: number;
    due_date: string;
    assignees: number[];
};

export interface SubTaskInterface {
    id: number;
    name: string;
    description: string;
    priority_id: number;
    status_id: number;
    task_id: number;
    due_date: string;
    priority: PrioritiesInterface;
    status: StatusInterface;
    users?: User[];
}
