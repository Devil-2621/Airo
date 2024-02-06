'use client';

import { useEffect, useState } from "react";

import { NoteRenameModal } from "@/components/modals/note-rename-modal";

export const NoteModalProvider = () => {
    const [isMounted, setisMounted] = useState(false);

    useEffect(() => {
        setisMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    };

    return (
			<>
				{/* {isMounted ? <RenameModal /> : null }
				{isMounted ? <NoteRenameModal /> : null} */}
				<NoteRenameModal />
			</>
		);
}