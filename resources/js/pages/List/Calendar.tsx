import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { ListInterface } from '@/types/List';
import ListLayout from './ListLayout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface Props {
    list: ListInterface;
}

export default function TableList({ list }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <ListLayout list={list}>Calendar</ListLayout>
        </AppLayout>
    );
}
