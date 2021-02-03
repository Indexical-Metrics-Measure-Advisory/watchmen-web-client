import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { ICON_CONNECTED_SPACE_CATALOG } from '../../../basic-widgets/constants';
import { PageHeaderButton } from '../../../basic-widgets/page-header-buttons';
import { Lang } from '../../../langs';
import { toConnectedSpaceCatalog } from '../../../routes/utils';
import { ConnectedSpace } from '../../../services/tuples/connected-space-types';

export const HeaderCatalogButton = (props: { connectedSpace: ConnectedSpace }) => {
	const { connectedSpace } = props;

	const history = useHistory();

	const onCatalogClicked = () => {
		history.push(toConnectedSpaceCatalog(connectedSpace.connectId));
	};

	return <PageHeaderButton tooltip={Lang.CONSOLE.CONNECTED_SPACE.CATALOG} onClick={onCatalogClicked}>
		<FontAwesomeIcon icon={ICON_CONNECTED_SPACE_CATALOG}/>
	</PageHeaderButton>
}