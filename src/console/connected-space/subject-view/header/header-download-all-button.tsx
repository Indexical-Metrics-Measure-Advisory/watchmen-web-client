import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ICON_DOWNLOAD } from '../../../../basic-widgets/constants';
import { PageHeaderButton } from '../../../../basic-widgets/page-header-buttons';
import { Lang } from '../../../../langs';
import { ConnectedSpace } from '../../../../services/tuples/connected-space-types';
import { Subject } from '../../../../services/tuples/subject-types';

export const HeaderDownloadAllButton = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const onDownloadClicked = () => {
		// TODO print subject all pages
	};

	return <PageHeaderButton tooltip={Lang.CONSOLE.CONNECTED_SPACE.DOWNLOAD_ALL} onClick={onDownloadClicked}>
		<FontAwesomeIcon icon={ICON_DOWNLOAD}/>
	</PageHeaderButton>;
};