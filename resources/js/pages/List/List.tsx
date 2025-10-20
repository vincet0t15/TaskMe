import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { useInitials } from '@/hooks/use-initials';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { ListInterface } from '@/types/List';
import { PaginatedDataResponse } from '@/types/pagination';
import { StatusInterface } from '@/types/statuses';
import { Calendar, Flag, GitBranch, MoreVertical, Tag } from 'lucide-react';
import ListLayout from './ListLayout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface Props {
    list: ListInterface;
    tasks: PaginatedDataResponse<StatusInterface>;
}

export default function ModernTaskTable({ list, tasks }: Props) {
    const getInitials = useInitials();

    const defaultAccordion = tasks.data.map((s) => String(s.id));

    const formatDate = (d?: string | null) => {
        if (!d) return '—';
        try {
            return new Date(d).toLocaleDateString('en-US', {
                month: 'short',
                day: '2-digit',
                year: 'numeric',
            });
        } catch {
            return '—';
        }
    };

    const isOverdue = (d?: string | null) => {
        if (!d) return false;
        const due = new Date(d).getTime();
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return due < today.getTime();
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <ListLayout list={list}>
                <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-md dark:border-neutral-800 dark:bg-neutral-950">
                    {/* Global Header */}

                    {/* Status Groups */}
                    <Accordion
                        type="multiple"
                        defaultValue={defaultAccordion}
                        className="divide-y divide-neutral-100 dark:divide-neutral-800"
                    >
                        {tasks.data.map((status) => (
                            <AccordionItem
                                key={status.id}
                                value={String(status.id)}
                            >
                                {/* Status Header */}
                                <AccordionTrigger className="bg-neutral-50 px-6 py-3 hover:no-underline dark:bg-neutral-900">
                                    <div className="flex w-full items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="h-3 w-3 rounded-full"
                                                style={{
                                                    backgroundColor:
                                                        status.color,
                                                }}
                                            />
                                            <span className="font-semibold text-neutral-800 dark:text-neutral-100">
                                                {status.name}
                                            </span>
                                            <Badge
                                                variant="outline"
                                                className="ml-2 rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium dark:bg-neutral-800"
                                            >
                                                {status.tasks.length}
                                            </Badge>
                                        </div>
                                    </div>
                                </AccordionTrigger>

                                {/* Table */}
                                <AccordionContent className="px-0">
                                    <div className="overflow-x-auto">
                                        <Table className="min-w-full">
                                            <TableHeader className="bg-neutral-100 dark:bg-neutral-800/50">
                                                <TableRow>
                                                    <TableHead className="w-[220px] text-neutral-600 dark:text-neutral-300">
                                                        Task Title
                                                    </TableHead>
                                                    <TableHead className="text-neutral-600 dark:text-neutral-300">
                                                        Assignee
                                                    </TableHead>
                                                    <TableHead className="hidden text-neutral-600 sm:table-cell dark:text-neutral-300">
                                                        Sub Status
                                                    </TableHead>
                                                    <TableHead className="hidden text-neutral-600 md:table-cell dark:text-neutral-300">
                                                        Labels
                                                    </TableHead>
                                                    <TableHead className="text-neutral-600 dark:text-neutral-300">
                                                        Priority
                                                    </TableHead>
                                                    <TableHead className="hidden text-neutral-600 sm:table-cell dark:text-neutral-300">
                                                        Start Date
                                                    </TableHead>
                                                    <TableHead className="hidden text-neutral-600 sm:table-cell dark:text-neutral-300">
                                                        Due Date
                                                    </TableHead>
                                                    <TableHead className="text-right text-neutral-600 dark:text-neutral-300">
                                                        Actions
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>

                                            <TableBody>
                                                {status.tasks.length === 0 && (
                                                    <TableRow>
                                                        <TableCell
                                                            colSpan={8}
                                                            className="py-6 text-center text-neutral-500 dark:text-neutral-400"
                                                        >
                                                            No tasks in this
                                                            status.
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                                {status.tasks.map((task) => (
                                                    <TableRow
                                                        key={task.id}
                                                        className="transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900/60"
                                                    >
                                                        <TableCell className="font-medium text-neutral-800 dark:text-neutral-100">
                                                            <div className="max-w-[220px] truncate pr-2">
                                                                {task.name}
                                                            </div>
                                                        </TableCell>

                                                        {/* Assignees */}
                                                        <TableCell>
                                                            <div className="flex -space-x-2">
                                                                {(task as any)
                                                                    .users
                                                                    ?.length ? (
                                                                    (
                                                                        task as any
                                                                    ).users.map(
                                                                        (
                                                                            user: any,
                                                                        ) => (
                                                                            <Tooltip
                                                                                key={
                                                                                    user.id
                                                                                }
                                                                            >
                                                                                <TooltipTrigger
                                                                                    asChild
                                                                                >
                                                                                    <Avatar className="h-6 w-6 overflow-hidden rounded-full border-2 border-white dark:border-neutral-950">
                                                                                        <AvatarImage
                                                                                            src={
                                                                                                user.avatar ??
                                                                                                '/default-avatar.png'
                                                                                            }
                                                                                            alt={
                                                                                                user.name
                                                                                            }
                                                                                        />
                                                                                        <AvatarFallback className="rounded-full bg-neutral-200 text-[10px] text-black dark:bg-neutral-700 dark:text-white">
                                                                                            {getInitials(
                                                                                                user.name,
                                                                                            )}
                                                                                        </AvatarFallback>
                                                                                    </Avatar>
                                                                                </TooltipTrigger>
                                                                                <TooltipContent side="top">
                                                                                    {
                                                                                        user.name
                                                                                    }
                                                                                </TooltipContent>
                                                                            </Tooltip>
                                                                        ),
                                                                    )
                                                                ) : (
                                                                    <span className="text-neutral-400">
                                                                        —
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </TableCell>

                                                        {/* Sub Status */}
                                                        <TableCell className="hidden sm:table-cell">
                                                            {(task as any)
                                                                .sub_status ? (
                                                                <span className="inline-flex items-center gap-2 rounded-md bg-neutral-100 px-2 py-0.5 text-xs text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                                                                    {
                                                                        (
                                                                            task as any
                                                                        )
                                                                            .sub_status
                                                                    }
                                                                </span>
                                                            ) : (
                                                                <GitBranch className="h-4 w-4 text-neutral-300" />
                                                            )}
                                                        </TableCell>

                                                        {/* Labels */}
                                                        <TableCell className="hidden md:table-cell">
                                                            {(task as any)
                                                                .labels
                                                                ?.length ? (
                                                                <div className="flex flex-wrap gap-1">
                                                                    {(
                                                                        task as any
                                                                    ).labels.map(
                                                                        (
                                                                            label: any,
                                                                        ) => (
                                                                            <Badge
                                                                                key={
                                                                                    label.id ??
                                                                                    label.name
                                                                                }
                                                                                className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                                                                                style={{
                                                                                    borderColor:
                                                                                        label.color,
                                                                                    color: label.color,
                                                                                }}
                                                                                variant="outline"
                                                                            >
                                                                                {
                                                                                    label.name
                                                                                }
                                                                            </Badge>
                                                                        ),
                                                                    )}
                                                                </div>
                                                            ) : (
                                                                <Tag className="h-4 w-4 text-neutral-300" />
                                                            )}
                                                        </TableCell>

                                                        {/* Priority */}
                                                        <TableCell>
                                                            {(task as any)
                                                                .priority ? (
                                                                <Flag
                                                                    className="h-4 w-4"
                                                                    style={{
                                                                        color: (
                                                                            task as any
                                                                        )
                                                                            .priority
                                                                            .color,
                                                                    }}
                                                                />
                                                            ) : (
                                                                <span className="text-neutral-400">
                                                                    —
                                                                </span>
                                                            )}
                                                        </TableCell>

                                                        {/* Start Date */}
                                                        <TableCell className="hidden sm:table-cell">
                                                            {(task as any)
                                                                .start_date ? (
                                                                <span className="inline-flex items-center rounded-md bg-emerald-600 px-2 py-0.5 text-xs font-medium text-white dark:bg-emerald-500">
                                                                    {formatDate(
                                                                        (
                                                                            task as any
                                                                        )
                                                                            .start_date,
                                                                    )}
                                                                </span>
                                                            ) : (
                                                                <Calendar className="h-4 w-4 text-neutral-300" />
                                                            )}
                                                        </TableCell>

                                                        {/* Due Date */}
                                                        <TableCell className="hidden sm:table-cell">
                                                            {(task as any)
                                                                .due_date ? (
                                                                <span
                                                                    className={cn(
                                                                        'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium',
                                                                        isOverdue(
                                                                            (
                                                                                task as any
                                                                            )
                                                                                .due_date,
                                                                        )
                                                                            ? 'bg-red-600 text-white dark:bg-red-500'
                                                                            : 'bg-emerald-600 text-white dark:bg-emerald-500',
                                                                    )}
                                                                >
                                                                    {formatDate(
                                                                        (
                                                                            task as any
                                                                        )
                                                                            .due_date,
                                                                    )}
                                                                </span>
                                                            ) : (
                                                                <Calendar className="h-4 w-4 text-neutral-300" />
                                                            )}
                                                        </TableCell>

                                                        {/* Actions */}
                                                        <TableCell className="text-right">
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger
                                                                    asChild
                                                                >
                                                                    <button className="rounded-md p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800">
                                                                        <MoreVertical className="h-4 w-4 text-neutral-500" />
                                                                    </button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent
                                                                    align="end"
                                                                    className="w-40"
                                                                >
                                                                    <DropdownMenuItem
                                                                        asChild
                                                                    >
                                                                        <a href="#">
                                                                            View
                                                                        </a>
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem
                                                                        asChild
                                                                    >
                                                                        <a href="#">
                                                                            Edit
                                                                        </a>
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem className="text-red-600 focus:text-red-600">
                                                                        Delete
                                                                    </DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </ListLayout>
        </AppLayout>
    );
}
