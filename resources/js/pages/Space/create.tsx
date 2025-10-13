import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import spaces from '@/routes/spaces';
import { SpaceType } from '@/types/Space';

import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { ChangeEventHandler, FormEventHandler } from 'react';
import { toast } from 'sonner';
interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
}
export function CreateSpace({ open, setOpen }: Props) {
    const { data, setData, processing, post, reset, errors } =
        useForm<SpaceType>({
            name: '',
        });

    const hanleChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(spaces.store.url(), {
            onSuccess: (response: { props: FlashProps }) => {
                toast.success(response.props.flash?.success);
                reset();
                setOpen(false);
            },
        });
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent
                className="sm:max-w-[425px]"
                onClick={(e) => e.stopPropagation()}
            >
                <DialogHeader>
                    <DialogTitle>Create Space</DialogTitle>
                    <DialogDescription>
                        Fill out the details below to create a new spaces. Click
                        save when you’re ready to add it.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={submit}>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Space Name</Label>
                            <Input
                                name="name"
                                value={data.name}
                                onChange={hanleChangeInput}
                                placeholder="Enter Space Name"
                            />
                            <InputError message={errors.name} />
                        </div>
                    </div>

                    <DialogFooter className="mt-4">
                        <DialogClose asChild>
                            <Button variant="outline" type="button">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            variant={'default'}
                            type="submit"
                            disabled={processing}
                        >
                            {processing && (
                                <LoaderCircle className="h-4 w-4 animate-spin" />
                            )}
                            {processing ? 'Creating' : 'Create'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
