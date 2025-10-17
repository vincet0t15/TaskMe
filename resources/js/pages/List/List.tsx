import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { ListInterface } from '@/types/List';
import { PaginatedDataResponse } from '@/types/pagination';
import { TaskInterface } from '@/types/task';
import { AlertTriangleIcon, Clock } from 'lucide-react';
import ListLayout from './ListLayout';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface Props {
    list: ListInterface;
    tasks: PaginatedDataResponse<TaskInterface>;
}

export default function TableList({ list, tasks }: Props) {
    console.log(tasks);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <ListLayout list={list}>
                <div className="overflow-hidden rounded-sm">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="">Name</TableHead>
                                <TableHead>Due date</TableHead>
                                <TableHead>Priority</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tasks.data.map((data, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">
                                        {data.name}
                                    </TableCell>

                                    <TableCell className="font-medium">
                                        {data.due_date ? (
                                            (() => {
                                                const dueDate = new Date(
                                                    data.due_date,
                                                );
                                                const today = new Date();
                                                const isOverdue =
                                                    dueDate < today;

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
                                                            <AlertTriangleIcon className="h-3 w-3" />
                                                        ) : (
                                                            <Clock className="h-3 w-3" />
                                                        )}
                                                        {dueDate.toLocaleDateString(
                                                            'en-US',
                                                            {
                                                                month: 'short',
                                                                day: 'numeric',
                                                            },
                                                        )}
                                                    </div>
                                                );
                                            })()
                                        ) : (
                                            <span className="text-gray-500">
                                                —
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {data.priorities.name}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {data.status.name}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </ListLayout>
        </AppLayout>
    );
}
