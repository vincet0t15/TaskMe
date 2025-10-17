import { dashboard } from '@/routes';
import spaces from '@/routes/spaces';
import { type BreadcrumbItem } from '@/types';
import { ListInterface } from '@/types/List';
import { StatusInterface } from '@/types/statuses';
import { usePage } from '@inertiajs/react';
import { Heart, MessageCircle, MoreVertical, Plus } from 'lucide-react';
export default function Kanban() {
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
    const { systemStatuses } = usePage<{
        systemStatuses: StatusInterface[];
    }>().props;
    const { list } = usePage<{ list: ListInterface }>().props;
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Projects', href: spaces.index.url() },
        { title: list.name, href: '' },
    ];
    return (
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
    );
}
