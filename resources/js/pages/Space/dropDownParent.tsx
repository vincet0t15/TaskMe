import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SpaceInterface } from '@/types/Space';
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import { CreateList } from './createList';
import DeleteSpaces from './delete';
import { EditSpace } from './edit';

interface Props {
    space: SpaceInterface;
}

export function DropDownParent({ space }: Props) {
    const [openCreateList, setOpenCreateList] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const handleClickAddList = () => {
        setOpenCreateList(true);
    };

    const handleClickEdit = () => {
        setOpenEdit(true);
    };

    const handleClickDelete = () => {
        setOpenDelete(true);
    };
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
                        handleClickAddList();
                    }}
                >
                    Add list
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={(e) => {
                        e.stopPropagation();
                        handleClickEdit();
                    }}
                >
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem>Archive</DropdownMenuItem>
                <DropdownMenuItem
                    onClick={(e) => {
                        e.stopPropagation();
                        handleClickDelete();
                    }}
                    className="text-red-500 focus:text-red-600"
                >
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
            {openCreateList && space && (
                <CreateList
                    open={openCreateList}
                    setOpen={setOpenCreateList}
                    space={space}
                />
            )}

            {openEdit && space && (
                <EditSpace
                    space={space}
                    open={openEdit}
                    setOpen={setOpenEdit}
                />
            )}
            {openDelete && space && (
                <DeleteSpaces
                    space={space}
                    open={openDelete}
                    setOpen={setOpenDelete}
                />
            )}
        </DropdownMenu>
    );
}
