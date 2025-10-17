import CustomDatePicker from '@/components/custom-date-picker';
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
import { User } from '@/types';
import { ListInterface } from '@/types/List';
import { PrioritiesInterface } from '@/types/priorities';
import { StatusInterface } from '@/types/statuses';
import { TaskForm } from '@/types/task';
import { useForm, usePage } from '@inertiajs/react';
interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
}
export function CreateTaskDialog({ open, setOpen }: Props) {
    const { list } = usePage<{ list: ListInterface }>().props;
    const test = usePage().props;
    console.log(test);
    const { data, setData, post, processing, reset, errors } =
        useForm<TaskForm>({
            name: '',
            description: '',
            due_date: '',
            priority_id: 0,
            status_id: 0,
            task_list_id: list.id,
            assignees: [] as number[],
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
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <form>
                <DialogContent className="">
                    <DialogHeader>
                        <DialogTitle>Create Task</DialogTitle>
                        <DialogDescription>
                            Fill in the details below to add a new task to this
                            list. You can set its title, priority, status, and
                            assign it to team members.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label>Name</Label>
                            <Input name="name" />
                        </div>
                        <div className="grid gap-3">
                            <Label>Description</Label>
                            <Textarea name="username" />
                        </div>
                    </div>
                    <div className="grid gap-3">
                        <Label>Assignee</Label>
                        <MultiSelectUser
                            users={systemUsers}
                            selectedUsers={systemUsers.filter((user) =>
                                data.assignees.includes(user.id),
                            )}
                            onUsersChange={handleSelectUserChange}
                            placeholder="Select assignees"
                        />
                    </div>
                    <div className="flex flex-col gap-2 md:flex-row">
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
                        </div>
                        <div className="grid flex-1 gap-3">
                            <Label>Due Date</Label>
                            <CustomDatePicker
                                initialDate={data.due_date}
                                onSelect={onChangeDueDate}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Create task</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}
