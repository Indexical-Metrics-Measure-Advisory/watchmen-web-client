import React from 'react';
import { PageHeaderButtons, PageHeaderButtonSeparator } from '../../../basic-widgets/page-header-buttons';
import { ConnectedSpace } from '../../../services/tuples/connected-space-types';
import { HeaderAddSubjectButton } from './header-add-subject-button';
import { HeaderCatalogButton } from './header-catalog-button';
import { HeaderCreateConnectedSpaceButton } from './header-create-connected-space-button';
import { HeaderDeleteMeButton } from './header-delete-me-buttton';
import { HeaderFavoriteButton } from './header-favorite-button';
import { HeaderSwitchConnectedSpaceButton } from './header-switch-connected-space-button';

export const HeaderButtons = (props: { connectedSpace: ConnectedSpace }) => {
	const { connectedSpace } = props;

	return <PageHeaderButtons>
		<HeaderCatalogButton connectedSpace={connectedSpace}/>
		<HeaderAddSubjectButton connectedSpace={connectedSpace}/>
		<PageHeaderButtonSeparator/>
		<HeaderFavoriteButton connectedSpace={connectedSpace}/>
		<PageHeaderButtonSeparator/>
		<HeaderCreateConnectedSpaceButton/>
		<HeaderSwitchConnectedSpaceButton connectedSpace={connectedSpace}/>
		<PageHeaderButtonSeparator/>
		<HeaderDeleteMeButton connectedSpace={connectedSpace}/>
	</PageHeaderButtons>;
};