import { PrioritiesInterface } from './priorities';

export interface ListInterface {
    id: number;
    name: string;
    space_id: number;
    priority_id?: number;
    priorities?: PrioritiesInterface;
}

export type ListTypes = {
    name: string;
    space_id?: number;
    priority_id?: number;
};
