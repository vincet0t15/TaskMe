import TaskController from '@/actions/App/Http/Controllers/TaskController';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import calendar from '@/routes/calendar';
import { type BreadcrumbItem } from '@/types';
import { ListInterface } from '@/types/List';
import { TaskInterface } from '@/types/task';
import { EventDropArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import { router } from '@inertiajs/react';
import { toast } from 'sonner';
import ListLayout from './ListLayout';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface Props {
    list: ListInterface;
    tasks: TaskInterface[];
}

export default function TableList({ list, tasks }: Props) {
    const test = (tasks as TaskInterface[]).map((task) => ({
        id: String(task.id),
        title: task.name ?? '',
        color: String(task.priority.color) ?? '',
        start: task.due_date ?? '',
        end: task.due_date ?? '',
    }));

    function handleEventDrop(info: EventDropArg) {
        const start = info.event.start
            ? info.event.start.toLocaleDateString('en-CA')
            : null;

        if (!start) {
            console.warn('Invalid event start date');
            info.revert();
            return;
        }

        router.put(
            calendar.move.url(Number(info.event.id)),
            { due_date: start },
            {
                preserveScroll: true,
                preserveState: true,
                onSuccess: (response: { props: FlashProps }) => {
                    toast.success(
                        response.props.flash?.success ||
                            'Task date updated successfully',
                    );
                },
                onError: (error) => {
                    console.error('Failed to update task date:', error);
                    info.revert();
                },
            },
        );
    }

    function handleEventClick(data: any) {
        router.get(TaskController.details.url(data.event.id));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <ListLayout list={list}>
                <div className="rounded-md bg-sidebar p-4">
                    <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        events={test}
                        editable={true}
                        selectable={true} // Allow dates to be selectable.
                        selectMirror={true}
                        eventDrop={handleEventDrop}
                        expandRows={true}
                        dayMaxEvents={true}
                        eventClick={handleEventClick}
                        // eventContent={renderEventContent}
                        // height="auto"
                    />
                </div>
            </ListLayout>
        </AppLayout>
    );
}
