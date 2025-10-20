import { TaskInterface } from './task';

export interface StatusInterface {
    id: number;
    name: string;
    color: string;
    tasks: TaskInterface[];
}
