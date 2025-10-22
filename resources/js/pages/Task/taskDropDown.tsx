import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TaskInterface } from '@/types/task';
import { MoreVerticalIcon, PenIcon, PlusIcon, Trash2 } from 'lucide-react';
interface Props {
    task: TaskInterface;
    onEdit: (task: TaskInterface) => void;
    onDelete: (task: TaskInterface) => void;
    onCreateSubTask: (task: TaskInterface) => void;
}
export function TaskDropDown({
    task,
    onEdit,
    onDelete,
    onCreateSubTask,
}: Props) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="cursor-pointer text-slate-300 transition-colors hover:text-white">
                    <MoreVerticalIcon className="h-4 w-4" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                className="w-56 bg-sidebar"
                align="start"
                onClick={(e) => e.stopPropagation()}
            >
                <DropdownMenuItem
                    onClick={() => onEdit(task)}
                    className="cursor-pointer justify-between"
                >
                    Manage
                    <PenIcon className="mr-2 h-4 w-4" />
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => onCreateSubTask(task)}
                    className="cursor-pointer justify-between"
                >
                    Add subtask
                    <PlusIcon className="mr-2 h-4 w-4" />
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => onDelete(task)}
                    className="cursor-pointer justify-between text-orange-500 focus:text-orange-500"
                >
                    Delete
                    <Trash2 className="mr-2 h-4 w-4 text-orange-500" />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
