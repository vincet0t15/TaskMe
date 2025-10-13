import ListTaskController from '@/actions/App/Http/Controllers/ListTaskController';
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
import { ListInterface, ListTypes } from '@/types/List';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { ChangeEventHandler, FormEventHandler } from 'react';
import { toast } from 'sonner';
interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    list: ListInterface;
}
export function EditList({ open, setOpen, list }: Props) {
    const { data, setData, put, processing, reset, errors } =
        useForm<ListTypes>({
            name: list.name,
        });

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        put(ListTaskController.update.url({ list: list.id }), {
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
                    <DialogTitle>Create List</DialogTitle>
                    <DialogDescription>
                        Add a new list to your space. Fill out the details below
                        and click save when you’re ready.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={submit}>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Name</Label>
                            <Input
                                onChange={handleInputChange}
                                name="name"
                                value={data.name}
                                placeholder="Enter list name"
                            />
                            <InputError message={errors.name} />
                        </div>
                    </div>
                    <DialogFooter className="mt-4">
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button
                            variant={'default'}
                            type="submit"
                            disabled={processing}
                        >
                            {processing && (
                                <LoaderCircle className="h-4 w-4 animate-spin" />
                            )}
                            {processing ? 'Creating list' : 'Create list'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
