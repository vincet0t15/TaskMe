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
import { Clock, WorkflowIcon } from 'lucide-react';
import { SubTaskDropDown } from './subTaskDropDown';

interface Props {
    subTask: SubTaskInterface[];
}

export function Subtask({ subTask }: Props) {
    const initials = useInitials();

    return (
        <Drawer direction="bottom">
            <DrawerTrigger asChild>
                <DrawerTrigger className="ml-1 flex cursor-pointer items-center gap-1 text-sm transition-colors hover:text-primary">
                    <WorkflowIcon className="h-3.5 w-3.5" />
                    <div className="font-medium">{subTask.length}</div>
                    <span>Subtask</span>
                </DrawerTrigger>
            </DrawerTrigger>

            <DrawerContent className="h-[70vh] overflow-hidden border-t border-muted bg-background shadow-lg">
                <div className="mx-auto w-full max-w-5xl">
                    <DrawerHeader>
                        <DrawerTitle className="text-xl font-semibold">
                            Subtask List
                        </DrawerTitle>
                        <DrawerDescription>
                            View and manage all subtasks for this task.
                        </DrawerDescription>
                    </DrawerHeader>

                    {subTask.length === 0 ? (
                        <div className="flex h-64 flex-col items-center justify-center text-center text-gray-500">
                            <WorkflowIcon className="mb-2 h-8 w-8 text-gray-400" />
                            <p className="text-base font-medium">No Subtasks</p>
                            <p className="text-sm text-gray-400">
                                There are no subtasks yet.
                            </p>
                        </div>
                    ) : (
                        <div
                            className="space-y-3 overflow-y-auto px-4 pb-6"
                            style={{
                                maxHeight: 'calc(70vh - 120px)',
                                scrollbarWidth: 'thin',
                            }}
                        >
                            {/* Scrollbar styling for Chrome, Edge, Safari */}

                            {subTask.map((data, index) => {
                                const dueDate = data?.due_date
                                    ? new Date(data.due_date)
                                    : null;

                                return (
                                    <div
                                        key={index}
                                        className="flex flex-col gap-2 rounded-lg border border-gray-200 bg-accent/30 p-4 shadow-sm transition-all hover:shadow-md"
                                    >
                                        {/* Title */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex gap-2">
                                                <div className="text-sm font-semibold text-gray-200">
                                                    {data.name}
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    <Badge
                                                        style={{
                                                            backgroundColor:
                                                                data.priority
                                                                    .color,
                                                        }}
                                                        className="text-xs text-white"
                                                    >
                                                        {data.priority.name}
                                                    </Badge>
                                                    <Badge
                                                        style={{
                                                            backgroundColor:
                                                                data.status
                                                                    .color,
                                                        }}
                                                        className="text-xs text-white"
                                                    >
                                                        {data.status.name}
                                                    </Badge>
                                                </div>
                                            </div>
                                            <div className="mt-2 flex items-center justify-between gap-2 text-xs text-gray-400">
                                                <div className="flex items-center gap-1">
                                                    <Clock className="h-3 w-3" />
                                                    {dueDate
                                                        ? dueDate.toLocaleDateString(
                                                              'en-US',
                                                              {
                                                                  month: 'short',
                                                                  day: 'numeric',
                                                              },
                                                          )
                                                        : 'No due date'}
                                                </div>
                                                <SubTaskDropDown
                                                    subTask={data}
                                                />
                                            </div>
                                        </div>

                                        {/* Description */}
                                        {data.description && (
                                            <div className="text-xs text-gray-400">
                                                {data.description}
                                            </div>
                                        )}

                                        {/* Badges */}

                                        {/* Assignees */}
                                        <div className="mt-1 flex -space-x-2">
                                            {data.users?.length ? (
                                                data.users
                                                    .slice(0, 3)
                                                    .map((user, i) => (
                                                        <Avatar
                                                            key={i}
                                                            className="h-6 w-6 border-2 border-background shadow-sm"
                                                        >
                                                            <AvatarFallback className="bg-gray-700 text-[10px] font-semibold text-white">
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
                                                <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-gray-700 text-[10px] font-semibold text-white">
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
