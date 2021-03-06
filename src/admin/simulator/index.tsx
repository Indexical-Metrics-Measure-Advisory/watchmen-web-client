import {AdminMain} from '../pipelines/widgets';
import {FullWidthPage} from '../../basic-widgets/page';
import React, {useEffect, useState} from 'react';
import {SimulatorHeader} from './header';
import {SimulatorEventBusProvider} from './simulator-event-bus';
import {SimulatorBody} from './body';
import {AdminCacheEventTypes} from '../cache/cache-event-bus-types';
import {AdminCacheData} from '../../local-persist/types';
import {CacheState} from '../cache';
import {useAdminCacheEventBus} from '../cache/cache-event-bus';
import {SimulatorLoading} from './simulator-loading';

const AdminDebugIndex = () => {
	const {once: onceCache} = useAdminCacheEventBus();
	const [state, setState] = useState<CacheState>({initialized: false});
	useEffect(() => {
		if (!state.initialized) {
			const askData = () => {
				onceCache(AdminCacheEventTypes.REPLY_DATA_LOADED, (loaded) => {
					if (loaded) {
						onceCache(AdminCacheEventTypes.REPLY_DATA, (data?: AdminCacheData) => {
							setState({initialized: true, data});
						}).fire(AdminCacheEventTypes.ASK_DATA);
					} else {
						setTimeout(() => askData(), 100);
					}
				}).fire(AdminCacheEventTypes.ASK_DATA_LOADED);
			};
			askData();
		}
	}, [onceCache, state.initialized]);

	return <AdminMain>
		<FullWidthPage>
			{state.initialized
				? <SimulatorEventBusProvider>
					<SimulatorHeader/>
					<SimulatorBody pipelines={state.data?.pipelines || []} topics={state.data?.topics || []}/>
				</SimulatorEventBusProvider>
				: <SimulatorLoading/>
			}
		</FullWidthPage>
	</AdminMain>;
};

export default AdminDebugIndex;