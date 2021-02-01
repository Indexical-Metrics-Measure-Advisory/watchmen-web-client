import React from 'react';
import { PageTitleEditor } from '../../basic-widgets/page-title-editor';
import { useForceUpdate } from '../../basic-widgets/utils';
import { ConnectedSpace } from '../../services/tuples/connected-space-types';

export const HeaderNameEditor = (props: { connectedSpace: ConnectedSpace }) => {
	const { connectedSpace } = props;

	const forceUpdate = useForceUpdate();

	const onNameChange = (name: string) => {
		connectedSpace.name = name;
		// TODO fire save connected space
		forceUpdate();
	};

	return <PageTitleEditor title={connectedSpace.name} onChange={onNameChange}/>;
};
