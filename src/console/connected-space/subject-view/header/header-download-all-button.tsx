import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ICON_DOWNLOAD } from '../../../../basic-widgets/constants';
import { PageHeaderButton } from '../../../../basic-widgets/page-header-buttons';
import { Lang } from '../../../../langs';
import { ConnectedSpace } from '../../../../services/tuples/connected-space-types';
import { Subject } from '../../../../services/tuples/subject-types';

export const HeaderDownloadAllButton = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const onDownloadClicked = async () => {
		// TODO print subject all pages
		// const data = await fetchSubjectData({subjectId: subject.subjectId, pageNumber: 1, pageSize: 50000});
		// download(data);
	};

	return <PageHeaderButton tooltip={Lang.CONSOLE.CONNECTED_SPACE.DOWNLOAD_ALL} onClick={onDownloadClicked}>
		<FontAwesomeIcon icon={ICON_DOWNLOAD}/>
	</PageHeaderButton>;
};