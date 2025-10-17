import { Button } from '@/components/ui/button';
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

export default function ListShow({ list }: ListLayoutProps) {
    const handleBack = () => {
        router.visit(spaces.index.url(), { preserveScroll: true });
    };
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Projects', href: spaces.index.url() },
        { title: list.name, href: '' },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={list?.name || 'Tasks'} />
            <div className="flex flex-col gap-4 p-4">
                <div className="rounded-md bg-sidebar p-4">
                    <Button
                        variant={'ghost'}
                        size={'icon'}
                        onClick={handleBack}
                        className="flex w-fit cursor-pointer items-center gap-2 rounded-lg text-sm font-medium text-slate-300 transition hover:bg-sidebar hover:text-white"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Back
                    </Button>

                    {/* Header Section */}
                    <div className="flex w-full items-start justify-between">
                        {/* Left: Title, description, and details */}
                        <div className="flex flex-col space-y-2">
                            <div>
                                <h1 className="text-xl font-bold text-white">
                                    {list?.name || 'Untitled List'}
                                </h1>
                                <p className="text-sm text-slate-400">
                                    {list?.description ||
                                        'No description available.'}
                                </p>
                            </div>
                        </div>

                        {/* Right: Avatars and Invite button */}
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
                </div>
                <div className="mt-3 flex items-center justify-between rounded-md bg-sidebar p-4">
                    <div className="flex w-full items-center justify-between">
                        {/* Tabs Section */}
                        <Tabs defaultValue="list" className="w-full">
                            <div className="flex w-full items-center justify-between">
                                <TabsList className="flex gap-6 bg-transparent px-1">
                                    {[
                                        { label: 'List', value: 'list' },
                                        { label: 'Kanban', value: 'kanban' },
                                        {
                                            label: 'Calendar',
                                            value: 'calendar',
                                        },
                                    ].map((tab) => (
                                        <TabsTrigger
                                            key={tab.value}
                                            value={tab.value}
                                            className="relative px-2 py-2 text-sm font-medium text-slate-300 transition-all duration-300 ease-in-out hover:text-white data-[state=active]:text-white"
                                        >
                                            {tab.label}
                                            <span className="absolute -bottom-[2px] left-0 h-[2px] w-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-in-out data-[state=active]:w-full" />
                                        </TabsTrigger>
                                    ))}
                                </TabsList>

                                {/* Create Task Button */}
                                <Button
                                    variant={'ghost'}
                                    onClick={() => console.log('Create Task')}
                                    className="ml-4 flex items-center gap-2 rounded-md border border-slate-600 px-4 py-1.5 text-sm font-medium text-slate-300 transition hover:border-blue-500 hover:text-white"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="h-4 w-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 4.5v15m7.5-7.5h-15"
                                        />
                                    </svg>
                                    Create Task
                                </Button>
                            </div>

                            {/* Tab Contents */}
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
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
