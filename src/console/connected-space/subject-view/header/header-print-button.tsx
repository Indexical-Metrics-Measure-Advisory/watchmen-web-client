import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ICON_PRINT } from '../../../../basic-widgets/constants';
import { PageHeaderButton } from '../../../../basic-widgets/page-header-buttons';
import { Lang } from '../../../../langs';
import { ConnectedSpace } from '../../../../services/tuples/connected-space-types';
import { Subject } from '../../../../services/tuples/subject-types';

export const HeaderPrintButton = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const onPrintClicked = () => {
		window.print();
	};

	return <PageHeaderButton tooltip={Lang.CONSOLE.CONNECTED_SPACE.PRINT} onClick={onPrintClicked}>
		<FontAwesomeIcon icon={ICON_PRINT}/>
	</PageHeaderButton>;
};