'use client';

import { useEffect, useState } from "react";

import { BoardRenameModal } from "@/components/modals/board-rename-modal";

export const BoardModalProvider = () => {
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
				<BoardRenameModal />
			</>
		);
}