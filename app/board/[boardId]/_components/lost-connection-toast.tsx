'use client';

import { useLostConnectionListener } from '@/liveblocks.config';
import { useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export function LostConnectionToasts() {
	const toastId = useRef<string>();

	useLostConnectionListener((event) => {
		if (event === 'lost') {
			toastId.current = toast.loading('Still trying to reconnect…');
		} else if (event === 'restored') {
			toast.success('Reconnected', { id: toastId.current });
		} else if (event === 'failed') {
			toast.error('Could not reconnect, please refresh', {
				id: toastId.current,
			});
		}
	});

	return (
		<Toaster
			position='bottom-center'
			toastOptions={{
				style: {
                    borderRadius: '10px',
				},
			}}
		/>
	);
}
