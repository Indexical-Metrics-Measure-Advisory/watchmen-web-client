import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ICON_DOWNLOAD_PAGE } from '../../../../basic-widgets/constants';
import { PageHeaderButton } from '../../../../basic-widgets/page-header-buttons';
import { Lang } from '../../../../langs';
import { ConnectedSpace } from '../../../../services/tuples/connected-space-types';
import { Subject } from '../../../../services/tuples/subject-types';

export const HeaderDownloadPageButton = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const onDownloadClicked = () => {
		// TODO download subject current page
		// download(data);
	};

	return <PageHeaderButton tooltip={Lang.CONSOLE.CONNECTED_SPACE.DOWNLOAD_PAGE} onClick={onDownloadClicked}>
		<FontAwesomeIcon icon={ICON_DOWNLOAD_PAGE}/>
	</PageHeaderButton>;
};