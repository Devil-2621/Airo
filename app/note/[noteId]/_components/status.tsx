'use client';

import { useStatus } from '@/liveblocks.config';

export function Status() {
	const status = useStatus();

	return (
		<div
			className='status'
			data-status={status}
		>
			<div className='statusCircle' />
			<div className='statusText'>{status}</div>
		</div>
	);
}
