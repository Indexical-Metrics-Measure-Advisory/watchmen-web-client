import React, {useEffect, useState} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {FullWidthPage} from '@/basic-widgets/page';
import {Router} from '@/routes/types';
import {PipelinesCatalog} from './catalog';
import {PipelineWorkbench} from './pipeline';
import {PipelinesEventBusProvider, usePipelinesEventBus} from './pipelines-event-bus';
import {PipelinesEventTypes} from './pipelines-event-bus-types';
import {PipelinesLoading} from './pipelines-loading';
import {SettingsHolder} from './settings-loader';
import {AdminMain} from './widgets';

const PipelinesRouter = () => {
	return <Switch>
		<Route path={Router.ADMIN_PIPELINE_CATALOG}><PipelinesCatalog/></Route>
		<Route path={Router.ADMIN_PIPELINE}><PipelineWorkbench/></Route>
		<Route path="*">
			<Redirect to={Router.ADMIN_PIPELINE_CATALOG}/>
		</Route>
	</Switch>;
};

const PipelinesContainerDelegate = () => {
	const {once, on, off} = usePipelinesEventBus();
	const [initialized, setInitialized] = useState(false);
	// when data is loading from remote, it takes time. and SETTINGS_LOADED event should be fired by loader and listened here.
	// in some cases, data might be already in cache, which means SETTINGS_LOADED is fired before its listener registered
	// then ask every 100ms.
	// anyway, when they both occurred, since state is true already, will not cause refresh in ask data.
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
		const ask = () => {
			once(PipelinesEventTypes.REPLY_SETTINGS_LOADED, (loaded: boolean) => {
				if (loaded) {
					setInitialized(true);
				} else {
					setTimeout(() => ask(), 100);
				}
			}).fire(PipelinesEventTypes.ASK_SETTINGS_LOADED);
		};
		ask();
		return () => {
			off(PipelinesEventTypes.SETTINGS_LOADED, onSettingsLoaded);
		};
	}, [once, on, off]);

	return <AdminMain>
		<FullWidthPage>
			{initialized ? <PipelinesRouter/> : <PipelinesLoading/>}
			<SettingsHolder/>
		</FullWidthPage>
	</AdminMain>;
};

const AdminPipelinesIndex = () => {
	return <PipelinesEventBusProvider>
		<PipelinesContainerDelegate/>
	</PipelinesEventBusProvider>;
};

export default AdminPipelinesIndex;