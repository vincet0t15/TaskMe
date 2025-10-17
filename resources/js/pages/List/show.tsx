import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import spaces from '@/routes/spaces';
import { BreadcrumbItem } from '@/types';
import { ListInterface } from '@/types/List';
import { Head, router } from '@inertiajs/react';
import { ChevronLeft, Share2 } from 'lucide-react';
import { PropsWithChildren } from 'react';
import Calendar from './Calendar';
import Kanban from './kanban';
import { TableList } from './List';

interface ListLayoutProps extends PropsWithChildren {
    list: ListInterface;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function ListShow({ list }: ListLayoutProps) {
    const handleBack = () => {
        router.visit(spaces.index.url(), { preserveScroll: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={list?.name || 'Tasks'} />
            <div className="flex flex-col gap-4 p-4">
                <div className="rounded-md bg-sidebar p-4">
                    {/* Back button */}
                    <button
                        onClick={handleBack}
                        className="flex w-fit cursor-pointer items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-300 transition hover:bg-sidebar hover:text-white"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Back
                    </button>

                    {/* Header Section */}
                    <div className="flex items-start justify-between">
                        <div className="flex flex-col">
                            <h1 className="text-xl font-bold text-white">
                                {list?.name || 'Untitled List'}
                            </h1>
                            <p className="text-sm text-slate-400">
                                {list?.description ||
                                    'No description available.'}
                            </p>
                            <div className="mt-2 flex items-center space-x-4 text-sm text-slate-400">
                                <span className="font-medium text-white">
                                    28d, 2h, 28min
                                </span>
                                <span>|</span>
                                <span>24.02.2024 - 12.07.24</span>
                            </div>
                        </div>

                        {/* Team and Invite */}
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center -space-x-1">
                                {Array(3)
                                    .fill(null)
                                    .map((_, i) => (
                                        <img
                                            key={i}
                                            src={`https://i.pravatar.cc/32?img=${30 + i}`}
                                            alt={`Avatar ${i + 1}`}
                                            className="h-7 w-7 rounded-full border-2 border-slate-900"
                                        />
                                    ))}
                                <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-slate-900 bg-slate-800 text-xs text-white">
                                    +10
                                </span>
                            </div>
                            <button className="flex items-center rounded-sm bg-blue-600 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-blue-500">
                                <Share2 className="mr-2 h-4 w-4" />
                                Invite
                            </button>
                        </div>
                    </div>

                    {/* Tabs Section */}
                    <div className="mt-3 flex items-center justify-between">
                        <Tabs defaultValue="list" className="w-full">
                            <TabsList className="flex gap-2 bg-transparent">
                                <TabsTrigger value="list">List</TabsTrigger>
                                <TabsTrigger value="kanban">Kanban</TabsTrigger>
                                <TabsTrigger value="calendar">
                                    Calendar
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="list" className="mt-4">
                                <TableList />
                            </TabsContent>
                            <TabsContent value="kanban" className="mt-4">
                                <Kanban />
                            </TabsContent>
                            <TabsContent value="calendar" className="mt-4">
                                <Calendar />
                            </TabsContent>
                        </Tabs>

                        {/* Date Navigation */}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
