import React from 'react';
import { PageTitleEditor } from '../../basic-widgets/page-title-editor';
import { useForceUpdate } from '../../basic-widgets/utils';
import { useLanguage } from '../../langs';
import { renameDashboard } from '../../services/tuples/dashboard';
import { Dashboard } from '../../services/tuples/dashboard-types';
import { useConsoleEventBus } from '../console-event-bus';
import { ConsoleEventTypes } from '../console-event-bus-types';

export const HeaderNameEditor = (props: { dashboard: Dashboard }) => {
	const { dashboard } = props;

	const language = useLanguage();
	const { fire } = useConsoleEventBus();
	const forceUpdate = useForceUpdate();

	const onNameChange = async (name: string) => {
		dashboard.name = name;
		forceUpdate();
		fire(ConsoleEventTypes.DASHBOARD_RENAMED, dashboard);
	};
	const onNameChangeComplete = async (name: string) => {
		dashboard.name = name.trim() || language.PLAIN.DEFAULT_DASHBOARD_NAME;
		forceUpdate();
		fire(ConsoleEventTypes.DASHBOARD_RENAMED, dashboard);
		await renameDashboard(dashboard);
	};

	return <PageTitleEditor title={dashboard.name}
	                        defaultTitle={language.PLAIN.DEFAULT_DASHBOARD_NAME}
	                        onChange={onNameChange} onChangeComplete={onNameChangeComplete}/>;
};
