import { User } from '.';

export interface ProjectInterface {
    id: number;
    name: string;
    user_id: number;
    user: User;
}

export type ProjectTypes = {
    name: string;
};
