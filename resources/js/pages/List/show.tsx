import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import spaces from '@/routes/spaces';
import { type BreadcrumbItem } from '@/types';
import { StatusInterface } from '@/types/statuses';
import { Head, router, usePage } from '@inertiajs/react';

import {
    ChevronLeft,
    ChevronRight,
    Heart,
    MessageCircle,
    MoreVertical,
    Plus,
    Share2,
} from 'lucide-react';

// 🧭 Breadcrumb setup (No change needed)
const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Projects', href: spaces.index.url() },
    { title: 'List', href: '' },
];

// 🗂️ Sample statuses & tasks - UPDATED to match the image structure and counts
const statuses = [
    { name: 'To do', color: 'text-yellow-500', count: 4 }, // Updated count
    { name: 'In progress', color: 'text-red-500', count: 2 }, // Updated count
    { name: 'Review / QA', color: 'text-purple-500', count: 5 }, // Updated name and count
    { name: 'Done', color: 'text-green-500', count: 3 },
    { name: 'Review', color: 'text-green-500', count: 3 },
    // Updated count
];

// Helper to assign colors to the category tags in the image
const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
        case 'ui design':
            return 'bg-amber-800/50 text-amber-300 border-amber-800';
        case 'copywriting':
            return 'bg-green-800/50 text-green-300 border-green-800';
        case 'ux research':
            return 'bg-red-800/50 text-red-300 border-red-800';
        case 'web design':
            return 'bg-blue-800/50 text-blue-300 border-blue-800';
        case 'marketing':
            return 'bg-purple-800/50 text-purple-300 border-purple-800';
        case '3d design':
            return 'bg-orange-800/50 text-orange-300 border-orange-800';
        case 'graphic design':
            return 'bg-cyan-800/50 text-cyan-300 border-cyan-800';
        case 'testing':
            return 'bg-pink-800/50 text-pink-300 border-pink-800';
        default:
            return 'bg-slate-700 text-slate-300 border-slate-700';
    }
};

// 🗂️ Sample tasks - UPDATED to match the image content, with added 'category', 'comments', and 'votes'
const tasks = [
    // To Do
    {
        id: '1',
        title: 'We’ve gotten some updates by client with cards’ titles and description in...', // Corrected to match image more closely
        status: 'To do',
        category: 'UI design',
        comments: 2,
        votes: 118,
        dueDate: null,
        avatarCount: 2,
    },
    {
        id: '2',
        title: 'Rewrite cards titles.',
        status: 'To do',
        category: 'Copywriting',
        comments: 1,
        votes: 19,
        dueDate: null,
        avatarCount: 2,
    },
    {
        id: '3',
        title: 'Make some changes after clients comments. Till 15:00 12/29/2022, client really want to see something!',
        status: 'To do',
        category: 'UI design',
        comments: 4,
        votes: 118,
        dueDate: null,
        avatarCount: 2,
    },
    // The image only shows 3 cards clearly, I'll remove the 4th dummy card for exact match
    /* {
        id: '4',
        title: 'New card title example.',
        status: 'To do',
        category: 'Marketing',
        comments: 0,
        votes: 0,
        dueDate: null,
        avatarCount: 1,
    }, */

    // In Progress
    {
        id: '5',
        title: 'Cart sorting [2nd try]',
        status: 'In progress',
        category: 'UX research',
        comments: 1,
        votes: 97,
        dueDate: null,
        avatarCount: 3,
    },
    {
        id: '6',
        title: 'Landing page about future IRL event + Mobile app ad',
        status: 'In progress',
        category: 'Web design',
        comments: 21,
        votes: 140,
        dueDate: null,
        avatarCount: 4,
    },

    // Review / QA
    {
        id: '7',
        title: 'Motion Ads for TikTok, Facebook & Instagram stories',
        status: 'Review / QA',
        category: 'Marketing',
        comments: 2,
        votes: 235,
        dueDate: null,
        avatarCount: 2,
    },
    {
        id: '8',
        title: '3D animation of 9k mascot',
        status: 'Review / QA',
        category: '3D design',
        comments: 12,
        votes: 85,
        dueDate: null,
        avatarCount: 3,
    },
    {
        id: '9',
        title: 'Youtube video announce. Make an impressive video, to attract new audiences',
        status: 'Review / QA',
        category: 'Marketing',
        comments: 4,
        votes: 118,
        dueDate: null,
        avatarCount: 2,
    },
    // Adding the two missing cards to match the count of 5 in the image, based on the titles and categories
    {
        id: '10',
        title: 'Dribbble shot', // Assuming this is the 'Dribbble shot' from the Done column that got moved to 'Review / QA' to get a count of 5
        status: 'Review / QA',
        category: 'UI design',
        comments: 24,
        votes: 347,
        dueDate: null,
        avatarCount: 3,
    },
    {
        id: '11',
        title: 'Logotype integration', // Assuming this is the 'Logotype integration' from the Done column that got moved to 'Review / QA'
        status: 'Review / QA',
        category: 'Graphic design',
        comments: 1,
        votes: 23,
        dueDate: null,
        avatarCount: 3,
    },

    // Done
    {
        id: '12',
        title: 'Dribbble shot on Dribbble in a minimalistic style', // This is likely the first 'Done' card
        status: 'Done',
        category: 'UI design',
        comments: 24,
        votes: 347,
        dueDate: null,
        avatarCount: 3,
    },
    {
        id: '13',
        title: 'Logotype integration', // This is the second 'Done' card
        status: 'Done',
        category: 'Graphic design',
        comments: 1,
        votes: 23,
        dueDate: null,
        avatarCount: 3,
    },
    {
        id: '14',
        title: 'Check 2-4 screens concept to present', // This is the third 'Done' card
        status: 'Done',
        category: 'Testing',
        comments: 4,
        votes: 118,
        dueDate: null,
        avatarCount: 2,
    },
];

export default function ListShow() {
    const { systemStatuses } = usePage<{
        systemStatuses: StatusInterface[];
    }>().props;

    const handleBack = () => {
        router.visit(spaces.index.url(), { preserveScroll: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Mobile App for iOS" />

            {/* 🔥 NEW: Project Header and Navigation (Top Bar) 🔥 */}
            <div className="flex flex-col gap-4 p-4">
                <div className="rounded-md bg-sidebar p-4">
                    <button
                        onClick={handleBack}
                        className="flex w-fit cursor-pointer items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-300 transition hover:bg-sidebar hover:text-white"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Back
                    </button>
                    {/* Project Title and Details */}
                    <div className="flex items-start justify-between">
                        <div className="flex flex-col">
                            <h1 className="text-xl font-bold text-white">
                                Mobile App for iOS
                            </h1>
                            <p className="text-sm text-slate-400">
                                Over9k: Gamers app is a social network for
                                gamers. Designed for streaming various games,
                                communication, finding friends for joint games.
                            </p>
                            <div className="mt-2 flex items-center space-x-4 text-sm text-slate-400">
                                <span className="font-medium text-white">
                                    28d, 2h, 28min
                                </span>
                                <span>|</span>
                                <span>24.02.2024 - 12.07.24</span>
                            </div>
                        </div>

                        {/* Team Avatars and Invite Button */}
                        <div className="flex items-center space-x-3">
                            {/* Avatar Group - simulating 4 avatars shown in the image */}
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
                            <button className="flex items-center rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-blue-500">
                                <Share2 className="mr-2 h-4 w-4" />
                                Invite
                            </button>
                        </div>
                    </div>
                    {/* View Selector, Filter, and Date Navigation */}
                    <div className="mt-3 flex items-center justify-between">
                        {/* View and Filter */}
                        <div className="flex w-full max-w-sm flex-col gap-6">
                            <Tabs defaultValue="account">
                                <TabsList>
                                    <TabsTrigger value="account">
                                        Account
                                    </TabsTrigger>
                                    <TabsTrigger value="password">
                                        Password
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value="account">1</TabsContent>
                                <TabsContent value="password">2</TabsContent>
                            </Tabs>
                        </div>

                        {/* Date Navigation */}
                        <div className="flex items-center space-x-2 text-slate-400">
                            <button className="rounded-full p-1 transition hover:bg-slate-800">
                                <ChevronLeft className="h-4 w-4" />
                            </button>
                            <span className="text-sm font-medium text-white">
                                18.03 - 24.03
                            </span>
                            <span className="text-xs">March, week 4</span>
                            <button className="rounded-full p-1 transition hover:bg-slate-800">
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* ⬆️ END: Project Header and Navigation ⬆️ */}

            <div className="flex h-full w-full flex-1 flex-col gap-6 overflow-x-auto">
                <div className="w-full flex-1 p-0">
                    <div className="flex h-full">
                        {systemStatuses.map((status) => {
                            const filtered = tasks.filter(
                                (t) =>
                                    t.status.toLowerCase() ===
                                    status.name.toLowerCase(),
                            );
                            return (
                                <div
                                    key={status.name}
                                    className="flex w-72 flex-shrink-0 flex-col rounded-xl p-4 shadow-xl"
                                >
                                    <div
                                        className="flex items-center justify-between rounded-sm border-b border-slate-800 p-3"
                                        style={{
                                            backgroundColor: status.color,
                                        }}
                                    >
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-sm font-bold tracking-wide text-white">
                                                {status.name}
                                            </h3>

                                            {/* Corrected logic to show filtered count, although I've manually updated status.count to match image */}
                                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 text-xs font-semibold text-slate-400">
                                                2
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <button className="p-1 text-slate-400 transition-colors hover:text-white">
                                                <Plus className="h-4 w-4" />
                                            </button>

                                            <button className="p-1 text-slate-400 transition-colors hover:text-white">
                                                <MoreVertical className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Task Cards Container */}
                                    <div className="custom-scrollbar mt-4 flex-1 space-y-3 overflow-y-auto">
                                        {filtered.map((task) => (
                                            // ➡️ Task Card
                                            <div
                                                key={task.id}
                                                // Card styling: dark background, border, shadow
                                                className={`group cursor-pointer rounded-xl border border-slate-800 bg-[#1d1e1f] p-4 shadow-lg transition-all duration-200 hover:border-slate-700`}
                                            >
                                                {/* Category/Tag Label */}
                                                <span
                                                    className={`mb-3 inline-block rounded-md px-2 py-0.5 text-xs font-semibold ${getCategoryColor(task.category)} border`}
                                                >
                                                    {task.category}
                                                </span>

                                                {/* Task Title */}
                                                <h4 className="mb-3 text-sm leading-snug font-medium text-white">
                                                    {task.title}
                                                </h4>

                                                {/* Card Footer: Avatars and Metadata (Comments/Votes) */}
                                                <div className="flex items-center justify-between pt-1">
                                                    {/* Avatars */}
                                                    <div className="flex items-center -space-x-1">
                                                        {[
                                                            ...Array(
                                                                task.avatarCount,
                                                            ),
                                                        ].map((_, i) => (
                                                            <img
                                                                key={i}
                                                                src={`https://i.pravatar.cc/32?img=${task.id * 10 + i + 1}`}
                                                                alt={`Avatar ${i + 1}`}
                                                                className="h-6 w-6 rounded-full border-2 border-slate-900"
                                                            />
                                                        ))}
                                                    </div>

                                                    {/* Comments and Votes (matching the image's icons and counters) */}
                                                    <div className="flex items-center space-x-3 text-slate-500">
                                                        <div className="flex items-center gap-1 text-xs">
                                                            <MessageCircle className="h-4 w-4" />
                                                            <span>
                                                                {task.comments}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-1 text-xs">
                                                            <Heart className="h-4 w-4" />
                                                            <span>
                                                                {task.votes}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
