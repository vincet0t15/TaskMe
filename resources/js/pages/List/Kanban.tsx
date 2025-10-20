import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { BreadcrumbItem } from '@/types';
import { ListInterface } from '@/types/List';
import { StatusInterface } from '@/types/statuses';
import { Heart, MessageCircle, MoreVertical, Plus } from 'lucide-react';
import ListLayout from './ListLayout';

interface Props {
    list: ListInterface;
    tasks: StatusInterface[];
}

export default function Kanban({ list, tasks }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: dashboard().url,
        },
    ];

    // Helper to add transparency to the status color
    const getTransparentColor = (hex: string, opacity = 0.15) => {
        if (!hex.startsWith('#')) return hex;
        const bigint = parseInt(hex.slice(1), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
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
                                            <button className="p-1 text-slate-300 transition-colors hover:text-white">
                                                <Plus className="h-4 w-4" />
                                            </button>
                                            <button className="p-1 text-slate-300 transition-colors hover:text-white">
                                                <MoreVertical className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Task Cards */}
                                    <div className="custom-scrollbar mt-4 flex-1 space-y-3 overflow-y-auto pr-2">
                                        {status.tasks.map((task) => (
                                            <div
                                                key={task.id}
                                                className="group cursor-pointer rounded-xl border border-slate-800 p-4 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-700 hover:shadow-lg"
                                                style={{
                                                    backgroundColor:
                                                        getTransparentColor(
                                                            status.color,
                                                            0.18,
                                                        ),
                                                    backdropFilter: 'blur(4px)',
                                                }}
                                            >
                                                {/* Header section — Priority + Task name */}
                                                <div className="mb-2 flex items-center justify-between">
                                                    <span className="truncate text-sm font-semibold text-slate-300">
                                                        {task.name}
                                                    </span>
                                                    <span
                                                        className="inline-block rounded-md border border-transparent px-2 py-0.5 text-xs font-semibold text-white shadow-sm"
                                                        style={{
                                                            backgroundColor:
                                                                task.priority
                                                                    .color,
                                                        }}
                                                    >
                                                        {task.priority.name}
                                                    </span>

                                                    {/* Optional task name badge */}
                                                </div>

                                                {/* Description */}
                                                <p className="mb-3 line-clamp-2 text-sm leading-snug text-slate-100/90">
                                                    {task.description ||
                                                        'No description provided.'}
                                                </p>

                                                {/* Footer */}
                                                <div className="flex items-center justify-between border-t border-slate-700/40 pt-2 text-xs text-slate-400">
                                                    {/* Could replace with assigned user avatars later */}
                                                    <div className="flex items-center gap-2">
                                                        <MessageCircle className="h-3.5 w-3.5" />
                                                        <span>2</span>
                                                        <Heart className="ml-3 h-3.5 w-3.5" />
                                                        <span>1</span>
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
            </ListLayout>
        </AppLayout>
    );
}
