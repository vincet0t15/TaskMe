import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ListInterface } from '@/types/List';
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import DeleteList from './deleteList';
import { EditList } from './editList';

interface Props {
    list: ListInterface;
}

export function DropDownChild({ list }: Props) {
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <MoreHorizontal
                    className="h-5 w-5"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-40" align="end">
                <DropdownMenuItem
                    onClick={(e) => {
                        e.stopPropagation();
                        setOpenEdit(true);
                    }}
                >
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem>Archive</DropdownMenuItem>
                <DropdownMenuItem
                    onClick={(e) => {
                        e.stopPropagation();
                        setOpenDelete(true);
                    }}
                    className="text-red-500 focus:text-red-600"
                >
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
            {openEdit && list && (
                <EditList list={list} open={openEdit} setOpen={setOpenEdit} />
            )}

            {openDelete && list && (
                <DeleteList
                    open={openDelete}
                    setOpen={setOpenDelete}
                    list={list}
                />
            )}
        </DropdownMenu>
    );
}
