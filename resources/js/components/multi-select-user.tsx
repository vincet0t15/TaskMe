import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { useInitials } from '@/hooks/use-initials';
import { cn } from '@/lib/utils';
import { User } from '@/types';
import { Check, ChevronDown, X } from 'lucide-react';
import { useState } from 'react';

interface MultiSelectUserProps {
    users: User[];
    selectedUsers: User[];
    onUsersChange: (users: User[]) => void;
    placeholder?: string;
    emptyMessage?: string;
    className?: string;
    disabled?: boolean;
}

export default function MultiSelectUser({
    users,
    selectedUsers,
    onUsersChange,
    placeholder = 'Select users...',
    emptyMessage = 'No users found.',
    className,
    disabled = false,
}: MultiSelectUserProps) {
    const [open, setOpen] = useState(false);

    const getInitials = useInitials();

    const handleSelect = (user: User) => {
        const isSelected = selectedUsers.some(
            (selected) => selected.id === user.id,
        );

        let newSelected: User[];
        if (isSelected) {
            newSelected = selectedUsers.filter(
                (selected) => selected.id !== user.id,
            );
        } else {
            newSelected = [...selectedUsers, user];
        }

        onUsersChange(newSelected);
    };

    const handleRemove = (userId: number) => {
        const newSelected = selectedUsers.filter((user) => user.id !== userId);
        onUsersChange(newSelected);
    };

    const getUserDisplayName = (user: User) => {
        return user.name || user.email;
    };

    return (
        <div className={cn('w-full', className)}>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                        disabled={disabled}
                    >
                        <div className="flex flex-1 flex-wrap gap-1">
                            {selectedUsers.length === 0 ? (
                                <span className="text-muted-foreground">
                                    {placeholder}
                                </span>
                            ) : (
                                selectedUsers.map((user) => (
                                    <Badge
                                        key={user.id}
                                        variant="secondary"
                                        className="flex items-center text-xs"
                                    >
                                        {getInitials(user.name || 'U')}
                                        <span
                                            role="button"
                                            tabIndex={0}
                                            className="ml-1 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full hover:bg-secondary-foreground/20"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleRemove(user.id);
                                            }}
                                            onKeyDown={(e) => {
                                                if (
                                                    e.key === 'Enter' ||
                                                    e.key === ' '
                                                ) {
                                                    e.stopPropagation();
                                                    handleRemove(user.id);
                                                }
                                            }}
                                        >
                                            <X className="h-3 w-3" />
                                        </span>
                                    </Badge>
                                ))
                            )}
                        </div>
                        <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                    <Command>
                        <CommandInput placeholder="Search users..." />
                        <CommandList>
                            <CommandEmpty>{emptyMessage}</CommandEmpty>
                            <CommandGroup>
                                {users.map((user) => {
                                    const isSelected = selectedUsers.some(
                                        (selected) => selected.id === user.id,
                                    );

                                    return (
                                        <CommandItem
                                            key={user.id}
                                            onSelect={() => handleSelect(user)}
                                        >
                                            <Check
                                                className={cn(
                                                    'mr-2 h-4 w-4',
                                                    isSelected
                                                        ? 'opacity-100'
                                                        : 'opacity-0',
                                                )}
                                            />
                                            <div className="flex items-center">
                                                {user.avatar && (
                                                    <img
                                                        src={user.avatar}
                                                        alt={user.name}
                                                        className="mr-2 h-6 w-6 rounded-full"
                                                    />
                                                )}
                                                <div>
                                                    <div className="font-medium">
                                                        {user.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </CommandItem>
                                    );
                                })}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}
