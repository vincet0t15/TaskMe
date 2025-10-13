import SpaceController from '@/actions/App/Http/Controllers/SpaceController';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { SpaceInterface } from '@/types/Space';

import { router } from '@inertiajs/react';
import { toast } from 'sonner';
interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    space: SpaceInterface;
}
export default function DeleteSpaces({ open, setOpen, space }: Props) {
    const deleteData = () => {
        router.delete(SpaceController.destroy.url({ space: space.id }), {
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
                                {space.name}
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
