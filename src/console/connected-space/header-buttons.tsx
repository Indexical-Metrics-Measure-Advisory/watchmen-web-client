import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import {
	ICON_CONNECTED_SPACE_CATALOG,
	ICON_CONNECTED_SPACE_RESOURCES,
	ICON_SUBJECT
} from '../../basic-widgets/constants';
import {
	PageHeaderButton,
	PageHeaderButtons,
	PageHeaderButtonSeparator
} from '../../basic-widgets/page-header-buttons';
import { Lang } from '../../langs';
import { ConnectedSpace } from '../../services/tuples/connected-space-types';
import { HeaderCreateConnectedSpaceButton } from './header-create-connected-space-button';
import { HeaderDeleteMeButton } from './header-delete-me-buttton';
import { HeaderFavoriteButton } from './header-favorite-button';
import { HeaderSwitchConnectedSpaceButton } from './header-switch-connected-space-button';

export const HeaderButtons = (props: { connectedSpace: ConnectedSpace }) => {
	const { connectedSpace } = props;

	const onCatalogClicked = () => {
	};
	const onResourcesClicked = () => {
	};
	const onAddSubjectClicked = () => {
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
		<HeaderCreateConnectedSpaceButton/>
		<HeaderSwitchConnectedSpaceButton connectedSpace={connectedSpace}/>
		<PageHeaderButtonSeparator/>
		<HeaderDeleteMeButton connectedSpace={connectedSpace}/>
	</PageHeaderButtons>;
};