'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';
import { useInitials } from '@/hooks/use-initials';
import { SubTaskInterface } from '@/types/subTask';
import { AlertTriangle, Clock, WorkflowIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SubTaskDropDown } from './subTaskDropDown';

interface Props {
    subTask: SubTaskInterface[];
}

export function Subtask({ subTask }: Props) {
    const initials = useInitials();
    const [maxHeight, setMaxHeight] = useState<string>('100%');

    // 🧮 Dynamically calculate available height
    useEffect(() => {
        const handleResize = () => {
            const height = window.innerHeight - 160; // subtract header & margins
            setMaxHeight(`${height}px`);
        };

        handleResize(); // initial run
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Drawer direction="right">
            <DrawerTrigger asChild>
                <DrawerTrigger className="ml-1 flex cursor-pointer items-center gap-1 text-sm transition-colors hover:text-primary">
                    <WorkflowIcon className="h-3.5 w-3.5" />
                    <div className="font-medium">{subTask.length}</div>
                    <span>Subtask</span>
                </DrawerTrigger>
            </DrawerTrigger>

            <DrawerContent className="h-screen overflow-hidden bg-sidebar">
                <div className="scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent h-full overflow-y-auto">
                    {/* Header */}
                    <DrawerHeader className="sticky top-0 z-10 border-muted bg-sidebar px-4 sm:px-6">
                        <DrawerTitle className="text-lg font-semibold sm:text-xl">
                            Subtask List
                        </DrawerTitle>
                        <DrawerDescription className="text-xs text-gray-400 sm:text-sm">
                            View and manage all subtasks for this task.
                        </DrawerDescription>
                    </DrawerHeader>

                    {/* No subtasks */}
                    {subTask.length === 0 ? (
                        <div className="flex h-64 flex-col items-center justify-center text-center text-gray-500">
                            <WorkflowIcon className="mb-2 h-8 w-8 text-gray-400" />
                            <p className="text-base font-medium">No Subtasks</p>
                            <p className="text-sm text-gray-400">
                                There are no subtasks yet.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3 px-3 pb-6 transition-all sm:px-4 md:px-6">
                            {subTask.map((data, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-accent/30 p-3 shadow-sm transition-all hover:shadow-md sm:p-4"
                                    >
                                        {/* Title + Meta */}

                                        <div className="flex justify-between">
                                            {/* Task Name */}
                                            <div
                                                className="max-w-[150px] truncate text-sm font-semibold text-gray-200 sm:max-w-[300px] sm:text-base"
                                                title={data.name} // show full name on hover
                                            >
                                                {data.name}
                                            </div>
                                            <SubTaskDropDown subTask={data} />
                                        </div>

                                        <div className="flex items-center justify-between gap-1 text-xs text-gray-400">
                                            <div className="mt-1 flex flex-wrap gap-2 sm:mt-0">
                                                <Badge
                                                    style={{
                                                        backgroundColor:
                                                            data.priority.color,
                                                    }}
                                                    className="text-xs text-white"
                                                >
                                                    {data.priority.name}
                                                </Badge>
                                                <Badge
                                                    style={{
                                                        backgroundColor:
                                                            data.status.color,
                                                    }}
                                                    className="text-xs text-white"
                                                >
                                                    {data.status.name}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                {(() => {
                                                    const dueDate =
                                                        data?.due_date;
                                                    const isOverdue =
                                                        dueDate &&
                                                        new Date(dueDate) <
                                                            new Date();

                                                    if (dueDate) {
                                                        return (
                                                            <div
                                                                className={`flex items-center gap-1 text-xs ${
                                                                    isOverdue
                                                                        ? 'text-red-400'
                                                                        : 'text-gray-400'
                                                                }`}
                                                                title={
                                                                    isOverdue
                                                                        ? 'Overdue'
                                                                        : 'Due Date'
                                                                }
                                                            >
                                                                {isOverdue ? (
                                                                    <AlertTriangle className="h-3 w-3" />
                                                                ) : (
                                                                    <Clock className="h-3 w-3" />
                                                                )}
                                                                {new Date(
                                                                    dueDate,
                                                                ).toLocaleDateString(
                                                                    'en-US',
                                                                    {
                                                                        month: 'short',
                                                                        day: 'numeric',
                                                                    },
                                                                )}
                                                            </div>
                                                        );
                                                    }

                                                    return (
                                                        <span className="text-gray-500">
                                                            —
                                                        </span>
                                                    );
                                                })()}
                                            </div>
                                        </div>
                                        {/* Description */}
                                        {data.description && (
                                            <div className="text-xs text-gray-400 sm:text-sm">
                                                {data.description}
                                            </div>
                                        )}

                                        {/* Assignees */}
                                        <div className="mt-1 flex -space-x-2">
                                            {data.users?.length ? (
                                                data.users
                                                    .slice(0, 3)
                                                    .map((user, i) => (
                                                        <Avatar
                                                            key={i}
                                                            className="h-6 w-6 border-2 border-background shadow-sm sm:h-7 sm:w-7"
                                                        >
                                                            <AvatarFallback className="bg-gray-700 text-[10px] font-semibold text-white sm:text-xs">
                                                                {initials(
                                                                    user.name,
                                                                )}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                    ))
                                            ) : (
                                                <span className="text-xs text-gray-400">
                                                    Unassigned
                                                </span>
                                            )}
                                            {(data.users?.length ?? 0) > 3 && (
                                                <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-gray-700 text-[10px] font-semibold text-white sm:h-7 sm:w-7 sm:text-xs">
                                                    +
                                                    {(data.users?.length ?? 0) -
                                                        3}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </DrawerContent>
        </Drawer>
    );
}
