import CustomDatePicker from '@/components/custom-date-picker';
import InputError from '@/components/input-error';
import MultiSelectUser from '@/components/multi-select-user';
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
import { Textarea } from '@/components/ui/textarea';
import subtask from '@/routes/subtask';
import { User } from '@/types';
import { PrioritiesInterface } from '@/types/priorities';
import { StatusInterface } from '@/types/statuses';
import { SubTaskForm, SubTaskInterface } from '@/types/subTask';
import { useForm, usePage } from '@inertiajs/react';
import { ChangeEventHandler, FormEventHandler } from 'react';
import { toast } from 'sonner';
interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    subTasks?: SubTaskInterface;
}
export function EditSubTaskDialog({ open, setOpen, subTasks }: Props) {
    const { data, setData, put, processing, reset, errors } =
        useForm<SubTaskForm>({
            name: subTasks?.name ?? '',
            description: subTasks?.description ?? '',
            due_date: subTasks?.due_date ?? '',
            priority_id: subTasks?.priority_id ?? 0,
            status_id: subTasks?.status_id ?? 0,
            assignees: subTasks?.users?.map((user) => user.id) ?? [],
            task_id: subTasks?.task_id ?? 0,
        });

    const { systemStatuses } = usePage().props;
    const { systemPriorities } = usePage().props;
    const { systemUsers } = usePage<{ systemUsers: User[] }>().props;

    const prioritiesOption = (systemPriorities as PrioritiesInterface[]).map(
        (data) => ({
            label: data.name || '',
            value: String(data.id),
            color: data.color || '#000000',
        }),
    );

    const statusesOptions = (systemStatuses as StatusInterface[]).map(
        (data) => ({
            label: data.name || '',
            value: String(data.id),
            color: data.color || '#000000',
        }),
    );

    const handleSelectPriorityChange = (value: string) => {
        setData('priority_id', Number(value));
    };
    const handleSelectStatusChange = (value: string) => {
        setData('status_id', Number(value));
    };

    const onChangeDueDate = (date: string) => {
        setData('due_date', date);
    };
    const handleSelectUserChange = (selectedUsers: User[]) => {
        setData(
            'assignees',
            selectedUsers.map((user) => user.id),
        );
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (!subTasks?.id) {
            toast.error('No task selected to update.');
            return;
        }

        put(subtask.update.url(subTasks.id), {
            onSuccess: (response: { props: FlashProps }) => {
                toast.success(response.props.flash?.success);
                reset();
                setOpen(false);
            },
        });
    };

    const handleChangeInput: ChangeEventHandler<
        HTMLInputElement | HTMLTextAreaElement
    > = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle>Edit Task</DialogTitle>
                    <DialogDescription>
                        Fill in the details below to edit a task to this list.
                        You can set its title, priority, status, and assign it
                        to team members.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={submit}>
                    <div className="mb-2 grid gap-4">
                        <div className="grid gap-3">
                            <Label>Name</Label>
                            <Input
                                name="name"
                                value={data.name}
                                onChange={handleChangeInput}
                            />

                            <InputError message={errors.name} />
                        </div>
                        <div className="grid gap-3">
                            <Label>Description</Label>
                            <Textarea
                                className="max-h-[200px] min-h-[80px] resize-y overflow-auto"
                                name="description"
                                value={data.description}
                                onChange={handleChangeInput}
                            />
                        </div>
                    </div>
                    <div className="mb-2 grid gap-4">
                        <Label>Assignee</Label>

                        <MultiSelectUser
                            users={systemUsers}
                            selectedUsers={systemUsers.filter((user) =>
                                data.assignees.includes(user.id),
                            )}
                            onUsersChange={handleSelectUserChange}
                            placeholder="Select assignees"
                        />
                        <InputError message={errors.assignees} />
                    </div>
                    <div className="mt-4 mb-2 flex flex-col gap-2 md:flex-row">
                        <div className="grid flex-1 gap-3">
                            <Label>Priority</Label>
                            <CustomSelectWithColor
                                options={prioritiesOption}
                                widthClass="w-full"
                                label="Priority"
                                onChange={handleSelectPriorityChange}
                                value={String(data.priority_id)}
                                placeholder="Select types"
                            />
                            <InputError message={errors.priority_id} />
                        </div>
                        <div className="grid flex-1 gap-3">
                            <Label>Status</Label>
                            <CustomSelectWithColor
                                widthClass="w-full"
                                options={statusesOptions}
                                label="Status"
                                onChange={handleSelectStatusChange}
                                value={String(data.status_id)}
                                placeholder="Select types"
                            />
                            <InputError message={errors.status_id} />
                        </div>
                        <div className="grid flex-1 gap-3">
                            <Label>Due Date</Label>
                            <CustomDatePicker
                                initialDate={data.due_date}
                                onSelect={onChangeDueDate}
                            />
                            <InputError message={errors.due_date} />
                        </div>
                    </div>

                    <DialogFooter className="mt-4">
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
