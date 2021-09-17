import {Router} from '@/routes/types';
import {ICON_PIPELINES_CATALOG} from '@/widgets/basic/constants';
import {PageHeaderButton} from '@/widgets/basic/page-header-buttons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {useHistory} from 'react-router-dom';

export const HeaderCatalogButton = () => {
	const history = useHistory();

	const onCatalogClicked = () => {
		history.push(Router.ADMIN_PIPELINES);
	};

	return <PageHeaderButton tooltip="Back to Catalog"
	                         onClick={onCatalogClicked}>
		<FontAwesomeIcon icon={ICON_PIPELINES_CATALOG}/>
	</PageHeaderButton>;
};