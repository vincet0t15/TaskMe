import { PrioritiesInterface } from './priorities';
import { TaskInterface } from './task';

export interface ListInterface {
    id: number;
    name: string;
    description?: string;
    space_id: number;
    priority_id?: number;
    priorities?: PrioritiesInterface;
    tasks: TaskInterface[];
}

export type ListTypes = {
    name: string;
    description: string;
    space_id?: number;
    priority_id?: number;
};
