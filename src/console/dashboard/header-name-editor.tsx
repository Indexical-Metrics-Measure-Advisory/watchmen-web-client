import React from 'react';
import { PageTitleEditor } from '../../basic-widgets/page-title-editor';
import { useForceUpdate } from '../../basic-widgets/utils';
import { Dashboard } from '../../services/tuples/dashboard-types';

export const HeaderNameEditor = (props: { dashboard: Dashboard }) => {
	const { dashboard } = props;

	const forceUpdate = useForceUpdate();

	const onNameChange = (name: string) => {
		dashboard.name = name;
		// TODO fire save dashboard
		forceUpdate();
	};

	return <PageTitleEditor title={dashboard.name} onChange={onNameChange}/>;
};
