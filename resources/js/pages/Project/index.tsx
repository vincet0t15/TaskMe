import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import project from '@/routes/project';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { CreateProject } from './create';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Porjects',
        href: project.index.url(),
    },
];

export default function Dashboard() {
    const [openCreate, setOpenCreate] = useState(false);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <Button
                        variant={'secondary'}
                        className="cursor-pointer rounded-sm"
                        onClick={() => setOpenCreate(true)}
                    >
                        <PlusIcon />
                        Create Project
                    </Button>
                    <div className="flex items-center gap-2">
                        <Input placeholder="Search..." />
                    </div>
                </div>
            </div>
            {openCreate && (
                <CreateProject open={openCreate} setOpen={setOpenCreate} />
            )}
        </AppLayout>
    );
}
