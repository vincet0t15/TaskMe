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
interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
}
export function CreateProject({ open, setOpen }: Props) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <form>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create Project</DialogTitle>
                        <DialogDescription>
                            Fill out the details below to create a new project.
                            Click save when you’re ready to add it.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Project Name</Label>
                            <Input
                                id="name-1"
                                name="name"
                                defaultValue="Project Alpha"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}
