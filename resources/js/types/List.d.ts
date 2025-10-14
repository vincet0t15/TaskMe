export interface ListInterface {
    id: number;
    name: string;
    space_id: number;
}

export type ListTypes = {
    name: string;
    space_id?: number;
    priority_id?: number;
};
