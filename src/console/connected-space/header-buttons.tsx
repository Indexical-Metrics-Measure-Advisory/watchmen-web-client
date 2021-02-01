import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import {
	ICON_CONNECTED_SPACE_CATALOG,
	ICON_CONNECTED_SPACE_RESOURCES,
	ICON_CONNECTION,
	ICON_SUBJECT,
	ICON_SUBJECT_GROUP,
	ICON_SWITCH,
	ICON_THROW_AWAY
} from '../../basic-widgets/constants';
import {
	PageHeaderButton,
	PageHeaderButtons,
	PageHeaderButtonSeparator
} from '../../basic-widgets/page-header-buttons';
import { Lang } from '../../langs';

export const HeaderButtons = () => {
	const onCatalogClicked = () => {
	};
	const onResourcesClicked = () => {
	};
	const onAddGroupClicked = () => {
	};
	const onAddSubjectClicked = () => {
	};
	const onConnectSpaceClicked = () => {
	};
	const onSwitchConnectedSpaceClicked = () => {
	};
	const onDeleteClicked = () => {
	};

	return <PageHeaderButtons>
		<PageHeaderButton tooltip={Lang.CONSOLE.CONNECTED_SPACE.CATALOG} onClick={onCatalogClicked}>
			<FontAwesomeIcon icon={ICON_CONNECTED_SPACE_CATALOG}/>
		</PageHeaderButton>
		<PageHeaderButton tooltip={Lang.CONSOLE.CONNECTED_SPACE.RESOURCES} onClick={onResourcesClicked}>
			<FontAwesomeIcon icon={ICON_CONNECTED_SPACE_RESOURCES}/>
		</PageHeaderButton>
		<PageHeaderButton tooltip={Lang.CONSOLE.CONNECTED_SPACE.ADD_GROUP} onClick={onAddGroupClicked}>
			<FontAwesomeIcon icon={ICON_SUBJECT_GROUP}/>
		</PageHeaderButton>
		<PageHeaderButton tooltip={Lang.CONSOLE.CONNECTED_SPACE.ADD_SUBJECT} onClick={onAddSubjectClicked}>
			<FontAwesomeIcon icon={ICON_SUBJECT}/>
		</PageHeaderButton>
		<PageHeaderButtonSeparator/>
		<PageHeaderButton tooltip={Lang.CONSOLE.CONNECTED_SPACE.ADD_CONNECTED_SPACE} onClick={onConnectSpaceClicked}>
			<FontAwesomeIcon icon={ICON_CONNECTION}/>
		</PageHeaderButton>
		<PageHeaderButton tooltip={Lang.CONSOLE.CONNECTED_SPACE.SWITCH_CONNECTED_SPACE} onClick={onSwitchConnectedSpaceClicked}>
			<FontAwesomeIcon icon={ICON_SWITCH}/>
		</PageHeaderButton>
		<PageHeaderButtonSeparator/>
		<PageHeaderButton tooltip={Lang.CONSOLE.CONNECTED_SPACE.DELETE_ME} onClick={onDeleteClicked}>
			<FontAwesomeIcon icon={ICON_THROW_AWAY}/>
		</PageHeaderButton>
	</PageHeaderButtons>;
};