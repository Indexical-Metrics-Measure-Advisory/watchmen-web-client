import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ICON_PRINT } from '../../../basic-widgets/constants';
import { PageHeaderButton } from '../../../basic-widgets/page-header-buttons';
import { Lang } from '../../../langs';

export const HeaderPrintButton = () => {
	const onPrintClicked = () => {
		// TODO print dashboard
	};

	return <PageHeaderButton tooltip={Lang.CONSOLE.DASHBOARD.PRINT} onClick={onPrintClicked}>
		<FontAwesomeIcon icon={ICON_PRINT}/>
	</PageHeaderButton>;
}