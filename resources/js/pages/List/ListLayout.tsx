import { Button } from '@/components/ui/button';
import calendar from '@/routes/calendar';
import lists from '@/routes/lists';
import { ListInterface } from '@/types/List';
import { Link } from '@inertiajs/react';
import { ChevronLeft, PlusIcon, Share2 } from 'lucide-react';
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
    return (
        <div className="p-4">
            <div className="rounded-md bg-sidebar p-4">
                <Button
                    variant={'ghost'}
                    size={'icon'}
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
            </div>
            <div className="mt-2 flex w-full justify-between gap-2 rounded-md bg-sidebar p-1">
                <div>
                    <Button variant={'ghost'}>
                        <Link href={lists.show.url(list.id)}>List</Link>
                    </Button>
                    <Button variant={'ghost'}>
                        <Link href={calendar.show.url(list.id)}>Kanban</Link>
                    </Button>
                    <Button variant={'ghost'}>
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
            <div className="mt-4 rounded-md bg-sidebar p-2">{children}</div>
            {openCreateTask && (
                <CreateTaskDialog
                    open={openCreateTask}
                    setOpen={setOpenCreateTask}
                />
            )}
        </div>
    );
}
