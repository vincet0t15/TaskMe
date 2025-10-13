import { User } from '.';
import { ListInterface } from './List';

export interface SpaceInterface {
    id: number;
    name: string;
    user_id: number;
    user: User;
    list: ListInterface[];
}

export type SpaceType = {
    name: string;
};
