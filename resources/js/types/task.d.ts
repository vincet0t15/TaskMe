import { PrioritiesInterface } from './priorities';
import { StatusInterface } from './statuses';

export type TaskForm = {
    name: string;
    description: string;
    priority_id: number;
    status_id: number;
    list_task_id: number;
    due_date: string;
    assignees: number[];
};

export interface TaskInterface {
    id: number;
    name: string;
    description: string;
    priority_id: number;
    status_id: number;
    list_task_id: number;
    due_date: string;
    priorities: PrioritiesInterface;
    status: StatusInterface;
}
