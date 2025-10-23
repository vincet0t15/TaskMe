import { Button } from '@/components/ui/button';
import calendar from '@/routes/calendar';
import kanban from '@/routes/kanban';
import { ListInterface } from '@/types/List';
import { Link, usePage } from '@inertiajs/react';
import { ChevronLeft, PlusIcon } from 'lucide-react';
import { PropsWithChildren, useState } from 'react';
import { CreateTaskDialog } from '../Task/create';
interface Props {
    list: ListInterface;
}
export default function ListLayout({
    list,
    children,
}: PropsWithChildren<Props>) {
    const [openCreateTask, setOpenCreateTask] = useState(false);
    const { url } = usePage();

    const isKanbanActive = url === kanban.show.url(list.id);
    const isCalendarActive = url === calendar.show.url(list.id);

    return (
        <div className="p-4">
            <Button
                variant="ghost"
                size="icon"
                onClick={() => window.history.back()}
                className="mb-4 flex w-fit cursor-pointer items-center gap-2 rounded-lg p-2 text-sm font-medium text-slate-300 transition hover:bg-sidebar hover:text-white"
            >
                <ChevronLeft className="h-4 w-4" />
                Back
            </Button>
            <div className="rounded-md bg-sidebar p-4">
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
                </div>
            </div>
            <div className="mt-2 flex w-full justify-between gap-2 rounded-md bg-sidebar p-1">
                <div className="gap-2">
                    <Button
                        variant={isKanbanActive ? 'default' : 'ghost'}
                        className={
                            isKanbanActive
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'text-slate-100 hover:text-white'
                        }
                    >
                        <Link href={kanban.show.url(list.id)}>Kanban</Link>
                    </Button>
                    <Button
                        variant={isCalendarActive ? 'default' : 'ghost'}
                        className={
                            isCalendarActive
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'text-slate-100 hover:text-white'
                        }
                    >
                        <Link href={calendar.show.url(list.id)}>Calendar</Link>
                    </Button>
                </div>
                <div>
                    <Button
                        variant={'ghost'}
                        className="border"
                        onClick={() => setOpenCreateTask(true)}
                    >
                        <PlusIcon />
                        Create task
                    </Button>
                </div>
            </div>
            <div className="mt-4 rounded-md bg-transparent p-2">{children}</div>
            {openCreateTask && (
                <CreateTaskDialog
                    open={openCreateTask}
                    setOpen={setOpenCreateTask}
                />
            )}
        </div>
    );
}
