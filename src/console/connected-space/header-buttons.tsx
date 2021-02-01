import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import {
	ICON_CONNECTED_SPACE_CATALOG,
	ICON_CONNECTED_SPACE_RESOURCES,
	ICON_CONNECTION,
	ICON_SUBJECT,
	ICON_SWITCH
} from '../../basic-widgets/constants';
import {
	PageHeaderButton,
	PageHeaderButtons,
	PageHeaderButtonSeparator
} from '../../basic-widgets/page-header-buttons';
import { Lang } from '../../langs';
import { ConnectedSpace } from '../../services/tuples/connected-space-types';
import { HeaderDeleteMeButton } from './header-delete-me-buttton';
import { HeaderFavoriteButton } from './header-favorite-button';

export const HeaderButtons = (props: { connectedSpace: ConnectedSpace }) => {
	const { connectedSpace } = props;

	const onCatalogClicked = () => {
	};
	const onResourcesClicked = () => {
	};
	const onAddSubjectClicked = () => {
	};
	const onConnectSpaceClicked = () => {
	};
	const onSwitchConnectedSpaceClicked = () => {
	};

	return <PageHeaderButtons>
		<PageHeaderButton tooltip={Lang.CONSOLE.CONNECTED_SPACE.CATALOG} onClick={onCatalogClicked}>
			<FontAwesomeIcon icon={ICON_CONNECTED_SPACE_CATALOG}/>
		</PageHeaderButton>
		<PageHeaderButton tooltip={Lang.CONSOLE.CONNECTED_SPACE.RESOURCES} onClick={onResourcesClicked}>
			<FontAwesomeIcon icon={ICON_CONNECTED_SPACE_RESOURCES}/>
		</PageHeaderButton>
		<PageHeaderButton tooltip={Lang.CONSOLE.CONNECTED_SPACE.ADD_SUBJECT} onClick={onAddSubjectClicked}>
			<FontAwesomeIcon icon={ICON_SUBJECT}/>
		</PageHeaderButton>
		<PageHeaderButtonSeparator/>
		<HeaderFavoriteButton connectedSpace={connectedSpace}/>
		<PageHeaderButtonSeparator/>
		<PageHeaderButton tooltip={Lang.CONSOLE.CONNECTED_SPACE.ADD_CONNECTED_SPACE} onClick={onConnectSpaceClicked}>
			<FontAwesomeIcon icon={ICON_CONNECTION}/>
		</PageHeaderButton>
		<PageHeaderButton tooltip={Lang.CONSOLE.CONNECTED_SPACE.SWITCH_CONNECTED_SPACE}
		                  onClick={onSwitchConnectedSpaceClicked}>
			<FontAwesomeIcon icon={ICON_SWITCH}/>
		</PageHeaderButton>
		<PageHeaderButtonSeparator/>
		<HeaderDeleteMeButton connectedSpace={connectedSpace}/>
	</PageHeaderButtons>;
};