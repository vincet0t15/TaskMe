import { User } from '.';

export interface SpaceInterface {
    id: number;
    name: string;
    user_id: number;
    user: User;
}

export type SpaceType = {
    name: string;
};
