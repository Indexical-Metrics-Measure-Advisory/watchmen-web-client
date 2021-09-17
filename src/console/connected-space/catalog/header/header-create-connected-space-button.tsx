import {ICON_CONNECTION} from '@/widgets/basic/constants';
import {PageHeaderButton} from '@/widgets/basic/page-header-buttons';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {useConnectSpace} from '../../../widgets/use-connect-space';

export const HeaderCreateConnectedSpaceButton = () => {
	const onConnectSpaceClicked = useConnectSpace();

	return <PageHeaderButton tooltip={Lang.CONSOLE.CONNECTED_SPACE.ADD_CONNECTED_SPACE} onClick={onConnectSpaceClicked}>
		<FontAwesomeIcon icon={ICON_CONNECTION}/>
	</PageHeaderButton>;
};