import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {useHistory} from 'react-router-dom';
import {ICON_PIPELINES_CATALOG} from '../../../../basic-widgets/constants';
import {PageHeaderButton} from '../../../../basic-widgets/page-header-buttons';
import {Router} from '../../../../routes/types';

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