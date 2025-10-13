import SpaceController from '@/actions/App/Http/Controllers/SpaceController';
import Pagination from '@/components/paginationData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import spaces from '@/routes/spaces';
import { type BreadcrumbItem } from '@/types';
import { FilterProps } from '@/types/filter';
import { PaginatedDataResponse } from '@/types/pagination';
import { SpaceInterface } from '@/types/Space';
import { Head, router, useForm } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';
import { KeyboardEventHandler, useState } from 'react';
import { CreateSpace } from './create';
import DeleteSpaces from './delete';
import { EditSpace } from './edit';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Porjects',
        href: spaces.index.url(),
    },
];
interface Props {
    spaces: PaginatedDataResponse<SpaceInterface>;
    filters: FilterProps;
}
export default function SpaceIndex({ spaces, filters }: Props) {
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [space, setSpace] = useState<SpaceInterface>();

    const { data, setData } = useForm({
        search: filters.search || '',
    });

    const handleSearch: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key == 'Enter') {
            const queryString = data.search
                ? { search: data.search }
                : undefined;
            router.get(SpaceController.index.url(), queryString, {
                preserveState: true,
                preserveScroll: true,
            });
        }
    };

    const handleClickEdit = (space: SpaceInterface) => {
        setSpace(space);
        setOpenEdit(true);
    };

    const handleClickDelete = (space: SpaceInterface) => {
        setSpace(space);
        setOpenDelete(true);
    };
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
                        <Input
                            placeholder="Search..."
                            onKeyDown={handleSearch}
                            value={data.search}
                            onChange={(e) => setData('search', e.target.value)}
                        />
                    </div>
                </div>

                {/* TABLE */}
                <div className="overflow-hidden rounded-sm border">
                    <Table>
                        <TableHeader className="bg-accent">
                            <TableRow>
                                <TableHead className="text-white">
                                    Name
                                </TableHead>
                                <TableHead className="w-[150px] text-center text-white">
                                    Action
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {spaces.data.length > 0 ? (
                                spaces.data.map((data, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">
                                            {data.name}
                                        </TableCell>
                                        <TableCell className="text-center font-medium">
                                            <div className="flex items-center justify-center gap-2">
                                                <span
                                                    className="cursor-pointer text-teal-500 hover:font-bold hover:text-teal-700"
                                                    onClick={() =>
                                                        handleClickEdit(data)
                                                    }
                                                >
                                                    Edit
                                                </span>
                                                |
                                                <span
                                                    onClick={() =>
                                                        handleClickDelete(data)
                                                    }
                                                    className="hover:font:bold cursor-pointer text-orange-500 hover:text-orange-700"
                                                >
                                                    Delete
                                                </span>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="text-center font-medium"
                                    >
                                        No Data Found...
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div>
                    <Pagination data={spaces} />
                </div>
            </div>
            {openCreate && (
                <CreateSpace open={openCreate} setOpen={setOpenCreate} />
            )}

            {openEdit && space && (
                <EditSpace
                    space={space}
                    open={openEdit}
                    setOpen={setOpenEdit}
                />
            )}

            {openDelete && space && (
                <DeleteSpaces
                    space={space}
                    open={openDelete}
                    setOpen={setOpenDelete}
                />
            )}
        </AppLayout>
    );
}
