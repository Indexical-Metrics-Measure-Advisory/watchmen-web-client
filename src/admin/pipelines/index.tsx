import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { FullWidthPage } from '../../basic-widgets/page';
import { Router } from '../../routes/types';
import { PipelinesCatalog } from './catalog';
import { PipelinesEventBusProvider, usePipelinesEventBus } from './pipelines-event-bus';
import { PipelinesEventTypes } from './pipelines-event-bus-types';
import { PipelinesLoading } from './pipelines-loading';
import { SettingsHolder } from './settings-loader';

const PipelinesRouter = () => {
	return <Switch>
		<Route path={Router.ADMIN_PIPELINES}><PipelinesCatalog/></Route>
		{/*<Route path={Router.CONSOLE_CONNECTED_SPACE}><ConsoleConnectedSpace/></Route>*/}
		<Route path='*'>
			<Redirect to={Router.ADMIN_PIPELINES}/>
		</Route>
	</Switch>;
};

const PipelinesContainerDelegate = () => {
	const { on, off } = usePipelinesEventBus();
	const [ initialized, setInitialized ] = useState(false);
	useEffect(() => {
		const startTime = new Date().getTime();
		const onSettingsLoaded = () => {
			const endTime = new Date().getTime();
			if (endTime - startTime < 3000) {
				setTimeout(() => setInitialized(true), (3000 - (endTime - startTime)));
			} else {
				setInitialized(true);
			}
		};
		on(PipelinesEventTypes.SETTINGS_LOADED, onSettingsLoaded);
		return () => {
			off(PipelinesEventTypes.SETTINGS_LOADED, onSettingsLoaded);
		};
	}, [ on, off ]);

	return <FullWidthPage>
		{initialized ? <PipelinesRouter/> : <PipelinesLoading/>}
		<SettingsHolder/>
	</FullWidthPage>;
};

const AdminPipelinesIndex = () => {
	return <PipelinesEventBusProvider>
		<PipelinesContainerDelegate/>
	</PipelinesEventBusProvider>;
};

export default AdminPipelinesIndex;