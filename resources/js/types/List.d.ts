import { PrioritiesInterface } from './priorities';

export interface ListInterface {
    id: number;
    name: string;
    description?: string;
    space_id: number;
    priority_id?: number;
    priorities?: PrioritiesInterface;
    created_at: string;
    updated_at: string;
}

export type ListTypes = {
    name: string;
    space_id?: number;
    priority_id?: number;
};
