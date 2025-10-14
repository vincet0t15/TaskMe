import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import CustomSelectWithColor from '@/components/ui/custom-select-with-color';
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
import list from '@/routes/list';
import { ListTypes } from '@/types/List';
import { PrioritiesInterface } from '@/types/priorities';
import { SpaceInterface } from '@/types/Space';
import { useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { ChangeEventHandler, FormEventHandler } from 'react';
import { toast } from 'sonner';
interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    space: SpaceInterface;
}
export function CreateList({ open, setOpen, space }: Props) {
    const { systemPriorities } = usePage().props;

    const { data, setData, post, processing, reset, errors } =
        useForm<ListTypes>({
            name: '',
            space_id: space.id,
            priority_id: 0,
        });

    const prioritiesOption = (systemPriorities as PrioritiesInterface[]).map(
        (data) => ({
            label: data.name || '',
            value: String(data.id),
            color: data.color || '#000000',
        }),
    );

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(list.store.url(), {
            onSuccess: (response: { props: FlashProps }) => {
                toast.success(response.props.flash?.success);
                reset();
                setOpen(false);
            },
        });
    };

    const handleSelectPriority = (data: string) => {
        setData('priority_id', Number(data));
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
                        <div className="grid flex-1 gap-3">
                            <Label>Priority</Label>
                            <CustomSelectWithColor
                                options={prioritiesOption}
                                widthClass="w-full"
                                label="Priority"
                                onChange={handleSelectPriority}
                                value={String(data.priority_id)}
                                placeholder="Select types"
                            />
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
