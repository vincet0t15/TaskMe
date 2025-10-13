import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import spaces from '@/routes/spaces';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { ArrowLeft, UserPlus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Projects',
        href: spaces.index.url(),
    },
    {
        title: 'List',
        href: '',
    },
];

export default function ListShow() {
    // ✅ Back to spaces function
    const handleBack = () => {
        router.visit(spaces.index.url(), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-wrap items-center justify-between rounded-md bg-accent px-6 py-4 text-white shadow-md">
                    {/* Left Section */}
                    <div className="flex items-center gap-24">
                        <div>
                            <button
                                onClick={handleBack}
                                className="flex cursor-pointer items-center gap-2 text-sm text-gray-400 transition hover:text-white"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                <span>Back to Spaces</span>
                            </button>

                            <h2 className="ml-6 text-xl font-semibold">
                                Syncro
                            </h2>
                        </div>
                        <div className="flex items-center">
                            <div>
                                <p className="text-xs text-gray-400 uppercase">
                                    Today's Date
                                </p>
                                <p className="text-base font-medium">
                                    Mar 21, 2024
                                </p>
                            </div>
                        </div>

                        <div>
                            <p className="text-xs text-gray-400 uppercase">
                                People on Project
                            </p>
                            <div className="flex items-center -space-x-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <img
                                        key={i}
                                        src={`https://i.pravatar.cc/40?img=${i}`}
                                        alt="avatar"
                                        className="h-8 w-8 rounded-full border-2 border-[#0B1220]"
                                    />
                                ))}
                                <span className="ml-3 text-sm font-medium text-gray-300">
                                    +7
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right Section */}
                    <Button
                        className="flex cursor-pointer items-center gap-2 border"
                        variant={'default'}
                    >
                        <UserPlus className="h-4 w-4" />
                        Add people
                    </Button>
                </div>

                <div>
                    <div className="rounded-lg bg-accent p-4 text-white">
                        <Button>Create Task</Button>
                        <p>This area takes up more space.</p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
