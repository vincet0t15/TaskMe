import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useInitials } from '@/hooks/use-initials';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import spaces from '@/routes/spaces';
import { BreadcrumbItem } from '@/types';
import { ListInterface } from '@/types/List';
import { StatusInterface } from '@/types/statuses';
import { TaskInterface } from '@/types/task';
import {
    MessageCircle,
    MoreVerticalIcon,
    Plus,
    UserCircle2,
    WorkflowIcon,
} from 'lucide-react';
import { useState } from 'react';
import { CreateTaskDialog } from '../Task/create';
import { EditTaskDialog } from '../Task/edit';
import { TaskDropDown } from '../Task/taskDropDown';
import ListLayout from './ListLayout';
interface Props {
    list: ListInterface;
    tasks: StatusInterface[];
}

export default function Kanban({ list, tasks }: Props) {
    const getInitials = useInitials();
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: dashboard().url,
        },
        {
            title: 'List',
            href: spaces.index.url(),
        },
        {
            title: list.name,
            href: dashboard().url,
        },
    ];

    const getTransparentColor = (hex: string, opacity = 0.15) => {
        if (!hex.startsWith('#')) return hex;
        const bigint = parseInt(hex.slice(1), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    };

    const [openCreateTask, setOpenCreateTask] = useState(false);
    const [openEditTask, setOpenEditTask] = useState(false);
    const [openDeleteTask, setOpenDeleteTask] = useState(false);
    const [editTask, setEditTask] = useState<TaskInterface | null>(null);
    const [deleteTask, setDeleteTask] = useState(Number);

    const [statusId, setStatusId] = useState(Number);
    const handleClickAddTask = (status: StatusInterface) => {
        setOpenCreateTask(true);
        setStatusId(status.id);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <ListLayout list={list}>
                <div className="flex h-full w-full flex-1 flex-col gap-6 overflow-x-auto">
                    <div className="w-full flex-1 p-0">
                        <div className="flex h-full gap-5 pb-4">
                            {tasks.map((status) => (
                                <div
                                    key={status.name}
                                    className="flex w-72 flex-shrink-0 flex-col rounded-xl bg-accent p-4 transition-all duration-300"
                                >
                                    {/* Header */}
                                    <div
                                        className="flex items-center justify-between rounded-md px-3 py-2 text-white shadow-sm"
                                        style={{
                                            backgroundColor: status.color,
                                        }}
                                    >
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-sm font-semibold">
                                                {status.name}
                                            </h3>
                                            <Badge
                                                variant={'secondary'}
                                                className="rounded-full"
                                            >
                                                {status.tasks.length}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <button
                                                className="cursor-pointer p-1 text-slate-300 transition-colors hover:text-white"
                                                onClick={() =>
                                                    handleClickAddTask(status)
                                                }
                                            >
                                                <Plus className="h-4 w-4" />
                                            </button>
                                            <button className="p-1 text-slate-300 transition-colors hover:text-white">
                                                <MoreVerticalIcon />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Task Cards */}
                                    <div className="custom-scrollbar mt-4 flex-1 space-y-3 overflow-y-auto pr-2">
                                        {status.tasks.map((task) => (
                                            <div
                                                key={task.id}
                                                className="group cursor-pointer rounded-xl border border-slate-500 p-4 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-700"
                                                // style={{
                                                //     backgroundColor:
                                                //         getTransparentColor(
                                                //             status.color,
                                                //             0.18,
                                                //         ),
                                                //     backdropFilter: 'blur(4px)',
                                                // }}
                                            >
                                                {/* Header section — Priority + Task name */}
                                                <div className="mb-2 flex items-center justify-between">
                                                    <span className="truncate text-sm font-semibold text-slate-300">
                                                        {task.name}
                                                    </span>
                                                    <div className="flex items-center justify-center gap-2">
                                                        <Badge
                                                            className="text-white"
                                                            style={{
                                                                backgroundColor:
                                                                    task
                                                                        .priority
                                                                        .color,
                                                            }}
                                                        >
                                                            {task.priority.name}
                                                        </Badge>
                                                        <TaskDropDown
                                                            task={task}
                                                            onEdit={(task) => {
                                                                setEditTask(
                                                                    task,
                                                                );
                                                                setOpenEditTask(
                                                                    true,
                                                                );
                                                            }}
                                                            onDelete={(task) =>
                                                                setDeleteTask(
                                                                    task.id,
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>

                                                {/* Description */}
                                                <p className="mb-3 line-clamp-2 text-sm leading-snug text-slate-100/90">
                                                    {task.description ||
                                                        'No description provided.'}
                                                </p>

                                                {/* Footer */}
                                                <div className="flex items-center justify-between border-t border-slate-500/40 pt-2 text-xs text-slate-400">
                                                    {/* Comments and Assigned Users */}
                                                    <div className="flex items-center gap-2">
                                                        {/* Comments Count */}
                                                        <div className="flex items-center gap-1">
                                                            <MessageCircle className="h-3.5 w-3.5" />
                                                            <span>2</span>
                                                        </div>

                                                        {/* Users (Avatars) */}
                                                        <div className="ml-3 flex items-center">
                                                            <div className="flex flex-row flex-wrap items-center gap-12">
                                                                <div className="flex -space-x-2">
                                                                    {(task.users
                                                                        ?.length ??
                                                                        0) >
                                                                    0 ? (
                                                                        <>
                                                                            {(
                                                                                task.users ??
                                                                                []
                                                                            )
                                                                                .slice(
                                                                                    0,
                                                                                    5,
                                                                                )
                                                                                .map(
                                                                                    (
                                                                                        user,
                                                                                        index,
                                                                                    ) => (
                                                                                        <Avatar
                                                                                            key={
                                                                                                index
                                                                                            }
                                                                                            className="h-5 w-5"
                                                                                        >
                                                                                            {user.avatar ? (
                                                                                                <AvatarImage
                                                                                                    src={
                                                                                                        user.avatar
                                                                                                    }
                                                                                                    alt={
                                                                                                        user.name
                                                                                                    }
                                                                                                />
                                                                                            ) : (
                                                                                                <AvatarFallback className="rounded-full">
                                                                                                    {getInitials(
                                                                                                        user.name,
                                                                                                    )}
                                                                                                </AvatarFallback>
                                                                                            )}
                                                                                        </Avatar>
                                                                                    ),
                                                                                )}

                                                                            {(task
                                                                                .users
                                                                                ?.length ??
                                                                                0) >
                                                                                5 && (
                                                                                <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-slate-900 bg-slate-700 text-[10px] font-semibold text-white">
                                                                                    +
                                                                                    {(task
                                                                                        .users
                                                                                        ?.length ??
                                                                                        0) -
                                                                                        5}
                                                                                </div>
                                                                            )}
                                                                        </>
                                                                    ) : (
                                                                        <UserCircle2 className="h-5 w-5 text-slate-400" />
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="ml-3 flex items-center gap-1">
                                                            <WorkflowIcon className="h-3.5 w-3.5" />
                                                            <span>
                                                                2 subtask
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {openCreateTask && tasks && (
                    <CreateTaskDialog
                        open={openCreateTask}
                        setOpen={setOpenCreateTask}
                        statusId={statusId}
                    />
                )}

                {editTask && openEditTask && (
                    <EditTaskDialog
                        open={openEditTask}
                        setOpen={setOpenEditTask}
                        taskEdit={editTask}
                    />
                )}
            </ListLayout>
        </AppLayout>
    );
}
