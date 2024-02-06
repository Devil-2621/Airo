'useclient';

import { memo } from 'react';
import { Cursor } from './cursor';
import { useOthersConnectionIds } from '@/liveblocks.config';

const Cursors = () => {
	const ids = useOthersConnectionIds();

	return (
		<>
			{ids.map((connectionId) => (
				<Cursor
					key={connectionId}
					connectionId={connectionId}
				/>
			))}
		</>
	);
};

export const CursorPresence = memo(() => {
	return (
		<>
			<Cursors />
		</>
	);
});

CursorPresence.displayName = 'CursorPresence';
