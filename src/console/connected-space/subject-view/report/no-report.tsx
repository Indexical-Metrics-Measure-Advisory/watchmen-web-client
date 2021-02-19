import React from 'react';
import { Lang } from '../../../../langs';
import { SubjectNoReport } from './widgets';

export const NoReport = () => {
	return <SubjectNoReport>
		<span>
			{Lang.CONSOLE.CONNECTED_SPACE.NO_REPORT}
		</span>
	</SubjectNoReport>;
};