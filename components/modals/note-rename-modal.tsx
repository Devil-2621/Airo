'use client';

import { useNoteRenameModal } from '@/store/use-note-rename-modal';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogClose,
	DialogFooter,
	DialogTitle,
} from '@/components/ui/dialog';
import { FormEventHandler, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useApiMutation } from '@/hooks/use-api-mutation';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';

export const NoteRenameModal = () => {
    const { mutate, pending } = useApiMutation(api.note.update);

	const { isOpen, onClose, initialValues } = useNoteRenameModal();

	const [title, setTitle] = useState(initialValues.title);

	useEffect(() => {
		setTitle(initialValues.title);
	}, [initialValues.title]);

    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        mutate({
            id: initialValues.id,
            title,
        })
            .then(() => {
                toast.success('Note renamed successfully');
                onClose();
            })
        .catch(() => toast.error('Failed to rename note'));
    };

	return (
		<Dialog
			open={isOpen}
			onOpenChange={onClose}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit note title</DialogTitle>
					<DialogDescription>
						Enter a new title for this note.
					</DialogDescription>
					<form
						onSubmit={onSubmit}
						className='space-y-4'
					>
						<Input
							disabled={pending}
							required
							maxLength={60}
							value={title}
							onChange={(e) => setTitle(e.target.value)}
                            placeholder='Note title'
                            className='text-black font-semibold border-slate-300 my-4'
						/>
						<DialogFooter>
							<DialogClose asChild>
								<Button
									type='button'
                                    variant='outline'
                                    className='border-slate-400 hover:border-slate-500'
								>
									Cancel
								</Button>
							</DialogClose>
							<Button
								disabled={pending}
								type='submit'
							>
								Save
							</Button>
						</DialogFooter>
					</form>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};
