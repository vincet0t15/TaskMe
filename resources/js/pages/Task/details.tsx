import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useInitials } from '@/hooks/use-initials';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { BreadcrumbItem } from '@/types';
import { TaskInterface } from '@/types/task';
import { Head } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface Props {
    task: TaskInterface;
}

export default function TaskDetails({ task }: Props) {
    const initials = useInitials();
    const [showMore, setShowMore] = useState(false);
    const description = task.description;
    const maxLength = 120;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${task.name} - Task Details`} />
            <div className="min-h-screen p-4">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => window.history.back()}
                    className="mb-4 flex w-fit cursor-pointer items-center gap-2 rounded-lg p-2 text-sm font-medium text-slate-300 transition hover:bg-sidebar hover:text-white"
                >
                    <ChevronLeft className="h-4 w-4" />
                    Back
                </Button>

                <div className="container mx-auto space-y-10">
                    {/* ENHANCED HERO SECTION */}
                    <div className="relative overflow-hidden rounded-2xl bg-sidebar p-6 shadow-xl">
                        {/* Subtle background flair */}
                        <div className="relative z-10">
                            <h1 className="mb-2 text-2xl font-extrabold tracking-tight">
                                {task.name}
                            </h1>
                            <div>
                                <p className="text-sm leading-relaxed text-gray-300">
                                    {showMore
                                        ? description
                                        : description.length > maxLength
                                          ? description.slice(0, maxLength) +
                                            '...'
                                          : description}
                                </p>

                                {description.length > maxLength && (
                                    <button
                                        onClick={() => setShowMore(!showMore)}
                                        className="mt-1 text-xs font-medium text-blue-400 hover:text-blue-300"
                                    >
                                        {showMore ? 'Show less' : 'Show more'}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Added a modern grid layout and simplified card styles for a cleaner look */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {/* Priority Card - Bold Red */}
                        <Card className="group border-b-4 border-red-500 bg-sidebar transition-shadow hover:shadow-xl">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-muted-foreground uppercase">
                                        Priority
                                    </p>
                                    <span className="text-xl">⚡</span>
                                </div>
                                <p className="mt-2 text-3xl font-bold text-red-600 dark:text-red-400">
                                    {task.priority.name}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Due Date Card - Orange/Yellow Accent */}
                        <Card className="group border-b-4 border-yellow-500 bg-sidebar transition-shadow hover:shadow-xl">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-muted-foreground uppercase">
                                        Due Date
                                    </p>
                                    <span className="text-xl">📅</span>
                                </div>
                                <p className="mt-2 text-2xl font-bold">
                                    {task.due_date
                                        ? new Date(
                                              task.due_date,
                                          ).toLocaleDateString('en-US', {
                                              month: 'short',
                                              day: 'numeric',
                                              year: 'numeric',
                                          })
                                        : 'N/A'}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Progress Card - Green Accent */}
                        <Card className="group border-b-4 border-green-500 bg-sidebar transition-shadow hover:shadow-xl">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-muted-foreground uppercase">
                                        Progress
                                    </p>
                                    <span className="text-xl">🚀</span>
                                </div>
                                <p className="mt-2 text-3xl font-bold text-green-600 dark:text-green-400">
                                    {task.progress_percentage
                                        ? task.progress_percentage.toFixed(2)
                                        : 0}
                                    %
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {task.completed_subtasks_count} of
                                    {task.sub_tasks.length} tasks completed
                                </p>
                            </CardContent>
                        </Card>

                        {/* Team Card - Purple Accent */}
                        <Card className="group border-b-4 border-purple-500 bg-sidebar transition-shadow hover:shadow-xl">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-muted-foreground uppercase">
                                        Team
                                    </p>
                                    <span className="text-xl">👥</span>
                                </div>
                                <p className="mt-2 text-3xl font-bold text-purple-600 dark:text-purple-400">
                                    {task.assignees_count || 0}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    members assigned
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* ASSIGNEES PROGRESS SECTION */}
                    <Card className="bg-muted/50">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between text-2xl font-semibold">
                                <span>Team & Assignee Progress</span>
                                <Badge
                                    variant="outline"
                                    className="text-sm font-medium"
                                >
                                    {task.assignees_count || 0} members assigned
                                </Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {/* Overall Team Progress Bar */}
                            {(task!.total_subtasks ?? 0) > 0 && (
                                <div className="mb-6 space-y-2 border-b pb-4">
                                    <div className="flex items-center justify-between text-base font-semibold">
                                        <span>Overall Task Completion</span>
                                        <span className="text-lg font-extrabold text-green-600 dark:text-green-400">
                                            {task?.progress_percentage
                                                ? task.progress_percentage.toFixed(
                                                      2,
                                                  )
                                                : 0}
                                            %
                                        </span>
                                    </div>
                                    <Progress
                                        value={task?.progress_percentage ?? 0}
                                        className="h-3 w-full [&>div]:bg-green-500"
                                    />
                                </div>
                            )}

                            {/* Individual Assignee Progress */}
                            <div className="grid gap-4 md:grid-cols-2">
                                {task.users.map((user, index) => {
                                    const userProgress =
                                        (user.completed_subtasks_count /
                                            user.total_subtasks) *
                                        100;

                                    return (
                                        <div
                                            key={index}
                                            className="rounded-xl border p-4 shadow-sm transition-shadow hover:shadow-md"
                                        >
                                            <div className="mb-3 flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <Avatar className="h-10 w-10 border-2 border-background shadow-sm">
                                                        <AvatarFallback className="bg-blue-600 text-sm font-semibold text-white">
                                                            {initials(
                                                                user.name,
                                                            )}
                                                        </AvatarFallback>
                                                    </Avatar>

                                                    {/* Assignee Info */}
                                                    <div>
                                                        <h4 className="text-base font-semibold">
                                                            {user.name}
                                                        </h4>
                                                        <p className="text-xs text-muted-foreground">
                                                            @{user.username}
                                                        </p>
                                                    </div>
                                                </div>
                                                {user.total_subtasks > 0 && (
                                                    <Badge
                                                        variant="secondary"
                                                        className="text-xs font-medium"
                                                    >
                                                        {
                                                            user.completed_subtasks_count
                                                        }
                                                        /{user.total_subtasks}{' '}
                                                        tasks (
                                                        {Math.round(
                                                            (user.completed_subtasks_count /
                                                                user.total_subtasks) *
                                                                100,
                                                        )}
                                                        %)
                                                    </Badge>
                                                )}
                                            </div>

                                            {/* Individual Progress Bar */}
                                            {user.total_subtasks > 0 && (
                                                <div className="space-y-1">
                                                    <div className="flex justify-between text-xs font-medium text-muted-foreground">
                                                        <span>Completion</span>
                                                        <span>
                                                            {userProgress.toFixed(
                                                                0,
                                                            )}
                                                            %
                                                        </span>
                                                    </div>
                                                    <Progress
                                                        value={userProgress}
                                                        className="h-2 [&>div]:bg-purple-500" // Custom color
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    );
                                }) || (
                                    <div className="py-8 text-center text-muted-foreground md:col-span-2">
                                        No assignees assigned yet
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* SUBTASKS PROGRESS SECTION */}
                    <Card className="bg-muted/50">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between text-2xl font-semibold">
                                <span>Subtasks Checklist</span>
                                <Badge
                                    variant="default"
                                    className="bg-green-500 font-medium text-white"
                                >
                                    {task.completed_subtasks_count}/
                                    {task.total_subtasks} completed
                                </Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Subtasks List */}
                            <div className="space-y-3">
                                {task.sub_tasks.map((subtask, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between rounded-xl border p-4 transition-all duration-200 hover:bg-muted/50 hover:shadow-lg dark:hover:bg-muted/20"
                                    >
                                        <div className="flex items-start space-x-4">
                                            {/* Status Indicator / Checkmark */}
                                            <div
                                                style={{
                                                    backgroundColor:
                                                        subtask.status.color,
                                                }}
                                                className={`mt-1 h-3 w-3 flex-shrink-0 rounded-full`}
                                            ></div>

                                            {/* Subtask Info */}
                                            <div>
                                                <h4
                                                    className={`text-base font-medium ${subtask.status.name === 'Completed' ? 'text-muted-foreground line-through' : 'text-foreground'}`}
                                                >
                                                    {subtask.name}
                                                </h4>
                                                {subtask.description && (
                                                    <p className="text-sm text-muted-foreground">
                                                        {subtask.description}
                                                    </p>
                                                )}
                                                {/* Assigned Users Avatars for Subtask */}
                                                <div className="mt-2 flex -space-x-1">
                                                    {subtask.users?.map(
                                                        (user, i) => (
                                                            <Avatar
                                                                key={i}
                                                                className="h-6 w-6 border-2 border-background"
                                                            >
                                                                <AvatarFallback className="bg-slate-300 text-[10px] font-bold text-gray-700">
                                                                    {initials(
                                                                        user.name,
                                                                    )}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                        ),
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right side - Badges */}
                                        <div className="flex flex-col items-end space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                                            <Badge
                                                className="px-2 py-1 text-xs font-semibold text-white uppercase"
                                                style={{
                                                    backgroundColor:
                                                        subtask.priority.color,
                                                }}
                                            >
                                                {subtask.priority.name}
                                            </Badge>

                                            <Badge
                                                variant="outline"
                                                className="px-2 py-1 text-xs font-semibold uppercase"
                                                style={{
                                                    borderColor:
                                                        subtask.status.color,
                                                    color: subtask.status.color,
                                                }}
                                            >
                                                {subtask.status.name}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}

                                {task.sub_tasks.length === 0 && (
                                    <div className="py-8 text-center text-muted-foreground">
                                        No subtasks added yet 📝
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
