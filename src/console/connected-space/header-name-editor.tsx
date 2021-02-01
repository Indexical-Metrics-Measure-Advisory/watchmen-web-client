import React from 'react';
import { PageTitleEditor } from '../../basic-widgets/page-title-editor';
import { useForceUpdate } from '../../basic-widgets/utils';
import { useLanguage } from '../../langs';
import { renameConnectedSpace } from '../../services/tuples/connected-space';
import { ConnectedSpace } from '../../services/tuples/connected-space-types';

export const HeaderNameEditor = (props: { connectedSpace: ConnectedSpace }) => {
	const { connectedSpace } = props;

	const language = useLanguage();
	const forceUpdate = useForceUpdate();

	const onNameChange = async (name: string) => {
		connectedSpace.name = name;
		forceUpdate();
	};
	const onNameChangeComplete = async (name: string) => {
		connectedSpace.name = name.trim() || language.PLAIN.DEFAULT_CONNECTED_SPACE_NAME;
		forceUpdate();
		await renameConnectedSpace(connectedSpace);
	};

	return <PageTitleEditor title={connectedSpace.name}
	                        defaultTitle={language.PLAIN.DEFAULT_CONNECTED_SPACE_NAME}
	                        onChange={onNameChange} onChangeComplete={onNameChangeComplete}/>;
};
