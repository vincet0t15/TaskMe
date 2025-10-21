import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import subtask from '@/routes/subtask';
import { SubTaskInterface } from '@/types/subTask';

import { router } from '@inertiajs/react';
import { toast } from 'sonner';
interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    subTasks: SubTaskInterface;
}
export default function DeleteSubTask({ open, setOpen, subTasks }: Props) {
    const deleteData = () => {
        router.delete(subtask.destroy.url({ subTask: subTasks.id! }), {
            preserveScroll: true,
            onSuccess: (response: { props: FlashProps }) => {
                toast.success(response.props.flash?.success);
                setOpen(false);
            },
        });
    };
    return (
        <div>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. It will permanently
                            delete the data you selected{' '}
                            <strong className="text-orange-400 uppercase">
                                {subTasks.name}
                            </strong>{' '}
                            from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <Button
                            size={'sm'}
                            variant={'outline'}
                            onClick={() => setOpen(false)}
                            className="cursor-pointer rounded-sm"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={deleteData}
                            size={'sm'}
                            className="cursor-pointer rounded-sm"
                        >
                            Continue
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
