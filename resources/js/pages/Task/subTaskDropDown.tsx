import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SubTaskInterface } from '@/types/subTask';
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import { MoreHorizontal, PenLine, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { EditSubTaskDialog } from './editSubtask';
interface Props {
    subTask: SubTaskInterface;
}
export function SubTaskDropDown({ subTask }: Props) {
    const [openEditSubTask, setOpenEditSubTask] = useState(false);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer">
                <MoreHorizontal className="h-5 w-5 text-slate-400" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => setOpenEditSubTask(true)}>
                        Manage
                        <DropdownMenuShortcut>
                            <PenLine />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-orange-500 hover:text-orange-500">
                        Delete
                        <DropdownMenuShortcut>
                            <Trash2 className="text-orange-500" />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
            {openEditSubTask && (
                <EditSubTaskDialog
                    open={openEditSubTask}
                    setOpen={setOpenEditSubTask}
                    subTasks={subTask}
                />
            )}
        </DropdownMenu>
    );
}
