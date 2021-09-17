import {ICON_PRINT} from '@/widgets/basic/constants';
import {PageHeaderButton} from '@/widgets/basic/page-header-buttons';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';

export const HeaderPrintButton = () => {
	const onPrintClicked = () => {
		window.print();
	};

	return <PageHeaderButton tooltip={Lang.CONSOLE.DASHBOARD.PRINT} onClick={onPrintClicked}>
		<FontAwesomeIcon icon={ICON_PRINT}/>
	</PageHeaderButton>;
};