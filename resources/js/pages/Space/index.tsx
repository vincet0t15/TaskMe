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
import lists from '@/routes/lists';
import spaces from '@/routes/spaces';
import { type BreadcrumbItem } from '@/types';
import { FilterProps } from '@/types/filter';
import { ListInterface } from '@/types/List';
import { PaginatedDataResponse } from '@/types/pagination';
import { SpaceInterface } from '@/types/Space';
import { Head, router, useForm } from '@inertiajs/react';
import { ChevronDown, ChevronRight, PlusIcon } from 'lucide-react';
import React, { KeyboardEventHandler, useState } from 'react';
import { CreateSpace } from './create';
import { DropDownChild } from './dropDownChild';
import { DropDownParent } from './dropDownParent';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Projects',
        href: spaces.index.url(),
    },
];

interface Props {
    spaces: PaginatedDataResponse<SpaceInterface>;
    filters: FilterProps;
}

export default function SpaceIndex({ spaces, filters }: Props) {
    const [openCreate, setOpenCreate] = useState(false);
    const [expandedRow, setExpandedRow] = useState<number | null>(null);

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

    const toggleExpand = (id: number) => {
        setExpandedRow((prev) => (prev === id ? null : id));
    };

    const handleClickChildName = (list: ListInterface) => {
        router.get(lists.show.url({ list: list.id }));
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Header */}
                <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <Button
                        variant="secondary"
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

                {/* Table */}
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
                                spaces.data.map((item, index) => (
                                    <React.Fragment key={index}>
                                        {/* Main Row */}
                                        <TableRow
                                            className="cursor-pointer transition hover:bg-accent/20"
                                            onClick={() =>
                                                toggleExpand(item.id)
                                            }
                                        >
                                            <TableCell className="flex items-center gap-2 font-medium">
                                                {expandedRow === item.id ? (
                                                    <ChevronDown size={16} />
                                                ) : (
                                                    <ChevronRight size={16} />
                                                )}
                                                {item.name}
                                            </TableCell>
                                            <TableCell className="text-center font-medium">
                                                <div className="flex items-center justify-center gap-2">
                                                    <DropDownParent
                                                        space={item}
                                                    />
                                                </div>
                                            </TableCell>
                                        </TableRow>

                                        {/* Collapsible Row */}
                                        {expandedRow === item.id &&
                                            item.list.map((data, index) => (
                                                <TableRow
                                                    className="bg-gray-900/40 text-sm"
                                                    key={index}
                                                >
                                                    <TableCell className="text-gray-300">
                                                        <span
                                                            className="ml-6 cursor-pointer hover:font-bold hover:text-white"
                                                            onClick={() =>
                                                                handleClickChildName(
                                                                    data,
                                                                )
                                                            }
                                                        >
                                                            {data.name}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell className="w-12 text-center">
                                                        <div className="flex items-center justify-center gap-2">
                                                            <DropDownChild
                                                                list={data}
                                                            />
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </React.Fragment>
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

                {/* Pagination */}
                <div>
                    <Pagination data={spaces} />
                </div>
            </div>

            {/* Modals */}
            {openCreate && (
                <CreateSpace open={openCreate} setOpen={setOpenCreate} />
            )}
        </AppLayout>
    );
}
