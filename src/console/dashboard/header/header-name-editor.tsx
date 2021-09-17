import {renameDashboard} from '@/services/data/tuples/dashboard';
import {Dashboard} from '@/services/data/tuples/dashboard-types';
import {PageTitleEditor} from '@/widgets/basic/page-title-editor';
import {useForceUpdate} from '@/widgets/basic/utils';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {useLanguage} from '@/widgets/langs';
import React from 'react';
import {useConsoleEventBus} from '../../console-event-bus';
import {ConsoleEventTypes} from '../../console-event-bus-types';

export const HeaderNameEditor = (props: { dashboard: Dashboard }) => {
	const {dashboard} = props;

	const language = useLanguage();
	const {fire: fireGlobal} = useEventBus();
	const {fire} = useConsoleEventBus();
	const forceUpdate = useForceUpdate();

	const onNameChange = async (name: string) => {
		dashboard.name = name;
		forceUpdate();
		fire(ConsoleEventTypes.DASHBOARD_RENAMED, dashboard);
	};
	const onNameChangeComplete = async (name: string) => {
		dashboard.name = name.trim() || language.PLAIN.DEFAULT_DASHBOARD_NAME;
		forceUpdate();
		fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
			async () => await renameDashboard(dashboard),
			() => fire(ConsoleEventTypes.DASHBOARD_RENAMED, dashboard));
	};

	return <PageTitleEditor title={dashboard.name}
	                        defaultTitle={language.PLAIN.DEFAULT_DASHBOARD_NAME}
	                        onChange={onNameChange} onChangeComplete={onNameChangeComplete}/>;
};
