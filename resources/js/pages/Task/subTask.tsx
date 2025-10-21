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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useInitials } from '@/hooks/use-initials';
import { SubTaskInterface } from '@/types/subTask';
import { AlertTriangle, Clock, WorkflowIcon } from 'lucide-react';
import { SubTaskDropDown } from './subTaskDropDown';

interface Props {
    subTask: SubTaskInterface[];
}

export function Subtask({ subTask }: Props) {
    const initials = useInitials();

    return (
        <Drawer direction="bottom">
            <DrawerTrigger asChild>
                <DrawerTrigger className="ml-1 flex cursor-pointer items-center gap-1">
                    <WorkflowIcon className="h-3.5 w-3.5" />
                    <div>{subTask.length}</div>
                    <span>Subtask</span>
                </DrawerTrigger>
            </DrawerTrigger>
            <DrawerContent className="h-[70vh] overflow-hidden">
                <div className="mx-auto w-full max-w-6xl">
                    <DrawerHeader>
                        <DrawerTitle>Subtask List</DrawerTitle>
                        <DrawerDescription>
                            View and manage all subtasks under this task. You
                            can track their progress, update status, or assign
                            members.
                        </DrawerDescription>
                    </DrawerHeader>

                    {subTask.length === 0 ? (
                        <div className="flex h-64 flex-col items-center justify-center text-center text-gray-500">
                            <WorkflowIcon className="mb-2 h-8 w-8 text-gray-400" />
                            <p className="text-base font-medium">No Subtasks</p>
                            <p className="text-sm text-gray-400">
                                There are no subtasks available for this task
                                yet.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-hidden rounded-lg border">
                            <Table>
                                <TableHeader className="sticky top-0 z-10 bg-muted">
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Priority</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Assignees</TableHead>
                                        <TableHead>Due date</TableHead>
                                        <TableHead></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {subTask.map((data, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">
                                                {data.name}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    style={{
                                                        backgroundColor:
                                                            data.priority.color,
                                                    }}
                                                    className="text-white"
                                                >
                                                    {data.priority.name}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    style={{
                                                        backgroundColor:
                                                            data.status.color,
                                                    }}
                                                    className="text-white"
                                                >
                                                    {data.status.name}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                <div className="flex -space-x-2">
                                                    {data.users &&
                                                    data.users.length > 0 ? (
                                                        data.users.map(
                                                            (user, index) => (
                                                                <Avatar
                                                                    key={index}
                                                                    className="h-8 w-8 border-2 border-background"
                                                                >
                                                                    <AvatarFallback className="bg-gray-700 text-xs font-semibold">
                                                                        {initials(
                                                                            user.name,
                                                                        )}
                                                                    </AvatarFallback>
                                                                </Avatar>
                                                            ),
                                                        )
                                                    ) : (
                                                        <span>N/A</span>
                                                    )}
                                                </div>
                                            </TableCell>

                                            <TableCell>
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
                                            </TableCell>

                                            <TableCell>
                                                <SubTaskDropDown
                                                    subTask={data}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </div>
            </DrawerContent>
        </Drawer>
    );
}
