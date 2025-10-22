'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useInitials } from '@/hooks/use-initials';
import { SubTaskInterface } from '@/types/subTask';
import { TaskInterface } from '@/types/task';
import { useState } from 'react';
import { EditSubTaskDialog } from './subTask/editSubtask';

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    task: TaskInterface;
}

export function TaskShow({ open, setOpen, task }: Props) {
    const initials = useInitials();
    const [openEditSubTaskDialog, setOpenEditSubTaskDialog] = useState(false);
    const [subTask, setSubTask] = useState<{ subTask: SubTaskInterface }>();

    const handleClickSubTask = (subTask: SubTaskInterface) => {
        setSubTask({ subTask });
        setOpenEditSubTaskDialog(true);
    };
    return (
        <Drawer open={open} onOpenChange={setOpen} direction="right">
            <DrawerContent className="flex h-screen w-full max-w-sm flex-col bg-sidebar">
                {/* Sticky header */}
                <DrawerHeader className="sticky top-0 z-10 border-b px-4 sm:px-6">
                    <DrawerTitle className="uppercase">{task.name}</DrawerTitle>
                </DrawerHeader>

                {/* ✅ Scrollable content area */}
                <div className="flex-1 overflow-hidden">
                    <ScrollArea className="h-full px-4">
                        <div className="p-4 pb-0">
                            <div className="grid grid-cols-2 items-center gap-y-2 text-xs">
                                {/* Status */}
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-muted-foreground">
                                        Status
                                    </span>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox
                                            disabled
                                            style={{
                                                backgroundColor:
                                                    task.status.color,
                                            }}
                                        />
                                        <span>{task.status.name}</span>
                                    </div>
                                </div>

                                {/* Priority */}
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-muted-foreground">
                                        Priority
                                    </span>
                                </div>
                                <div>
                                    <Badge
                                        className="rounded-xs text-white"
                                        style={{
                                            backgroundColor:
                                                task.priority.color,
                                        }}
                                    >
                                        {task.priority.name}
                                    </Badge>
                                </div>

                                {/* Assignee */}
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-muted-foreground">
                                        Assignee
                                    </span>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <div className="mt-1 flex -space-x-2">
                                        {task.users?.length ? (
                                            task.users
                                                .slice(0, 3)
                                                .map((user, i) => (
                                                    <Avatar
                                                        key={i}
                                                        className="h-6 w-6 border-2 border-background shadow-sm transition-transform hover:scale-105 sm:h-7 sm:w-7"
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
                                        {(task.users?.length ?? 0) > 3 && (
                                            <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-slate-400 bg-gray-700 text-[10px] font-semibold text-white sm:h-7 sm:w-7 sm:text-xs">
                                                +{(task.users?.length ?? 0) - 3}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-muted-foreground">
                                        Due date
                                    </span>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        {task.due_date ? (
                                            <span
                                                className={`rounded-md px-2 py-1 text-sm font-medium ${
                                                    new Date(task.due_date) <
                                                    new Date()
                                                        ? 'bg-red-500/10 text-red-500'
                                                        : 'bg-green-500/10 text-green-500'
                                                }`}
                                            >
                                                {new Date(
                                                    task.due_date,
                                                ).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                })}
                                            </span>
                                        ) : (
                                            <span className="text-sm text-muted-foreground italic">
                                                No due date
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="col-span-2 mt-4">
                                    <span className="text-sm font-medium text-muted-foreground">
                                        Description:
                                    </span>
                                    <p className="mt-1 text-sm text-slate-200">
                                        {task.description}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-4 mb-4 space-y-2">
                                <span className="mb-2 text-sm font-medium text-muted-foreground">
                                    Subtask
                                </span>
                                {task.sub_tasks.length ? (
                                    task.sub_tasks.map((subtask, index) => (
                                        <div
                                            key={index}
                                            className="mt-2 flex cursor-pointer items-center justify-between rounded-lg border border-border bg-muted/40 px-3 py-2 transition-colors hover:bg-muted/60"
                                            onClick={() =>
                                                handleClickSubTask(subtask)
                                            }
                                        >
                                            <div className="flex items-center space-x-2">
                                                {/* Status dot */}
                                                <span
                                                    className={`h-2.5 w-2.5 rounded-full`}
                                                    style={{
                                                        backgroundColor:
                                                            subtask.status
                                                                .color,
                                                    }}
                                                ></span>
                                                <span className="text-sm font-medium text-foreground">
                                                    {subtask.name}
                                                </span>
                                            </div>

                                            {/* Optional status text */}
                                            <span
                                                className={`text-xs font-medium`}
                                                style={{
                                                    color: subtask.status.color,
                                                }}
                                            >
                                                {subtask.status.name}
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="mt-2 rounded-lg border border-border bg-muted/40 px-3 py-2 text-center text-sm text-muted-foreground">
                                        No subtasks added
                                    </div>
                                )}
                            </div>

                            {/* Description */}
                        </div>
                    </ScrollArea>
                </div>
                {openEditSubTaskDialog && subTask && (
                    <EditSubTaskDialog
                        open={openEditSubTaskDialog}
                        setOpen={setOpenEditSubTaskDialog}
                        subTasks={subTask.subTask}
                    />
                )}
                {/* Footer pinned to bottom */}
                {/* <DrawerFooter className="border-t bg-sidebar">
                    <Button className="w-full">Submit</Button>
                    <DrawerClose asChild>
                        <Button variant="outline" className="w-full">
                            Cancel
                        </Button>
                    </DrawerClose>
                </DrawerFooter> */}
            </DrawerContent>
        </Drawer>
    );
}
