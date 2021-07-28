import React from 'react';
import {PageHeaderButtons, PageHeaderButtonSeparator} from '../../../../basic-widgets/page-header-buttons';
import {ConnectedSpace} from '../../../../services/tuples/connected-space-types';
import {HeaderCatalogButton} from '../../header/header-catalog-button';
import {HeaderAddSubjectButton} from './header-add-subject-button';
import {HeaderCreateConnectedSpaceButton} from './header-create-connected-space-button';
import {HeaderDeleteConnectedSpaceButton} from './header-delete-connected-space-buttton';
import {HeaderFavoriteButton} from './header-favorite-button';
import {HeaderSwitchConnectedSpaceButton} from './header-switch-connected-space-button';
import {isAdmin} from '../../../../services/account';
import {HeaderTemplateButton} from './header-template-button';

export const CatalogHeaderButtons = (props: { connectedSpace: ConnectedSpace }) => {
		const {connectedSpace} = props;

		const admin = isAdmin();

		return <PageHeaderButtons>
			<HeaderCatalogButton connectedSpace={connectedSpace}/>
			<HeaderAddSubjectButton connectedSpace={connectedSpace}/>
			<PageHeaderButtonSeparator/>
			<HeaderFavoriteButton connectedSpace={connectedSpace}/>
			{admin ? <HeaderTemplateButton connectedSpace={connectedSpace}/> : null}
			<PageHeaderButtonSeparator/>
			<HeaderCreateConnectedSpaceButton/>
			<HeaderSwitchConnectedSpaceButton connectedSpace={connectedSpace}/>
			<PageHeaderButtonSeparator/>
			<HeaderDeleteConnectedSpaceButton connectedSpace={connectedSpace}/>
		</PageHeaderButtons>;
	}
;