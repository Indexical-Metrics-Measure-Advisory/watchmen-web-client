import {AdminCacheData} from '@/services/local-persist/types';
import {FullWidthPage} from '@/widgets/basic/page';
import React, {useEffect, useState} from 'react';
import {CacheState} from '../cache';
import {useAdminCacheEventBus} from '../cache/cache-event-bus';
import {AdminCacheEventTypes} from '../cache/cache-event-bus-types';
import {AdminMain} from '../pipelines/widgets';
import {SimulatorBody} from './body';
import {SimulatorHeader} from './header';
import {SimulatorEventBusProvider} from './simulator-event-bus';
import {SimulatorLoading} from './simulator-loading';

const AdminDebugIndex = () => {
	const {fire: fireCache} = useAdminCacheEventBus();
	const [state, setState] = useState<CacheState>({initialized: false});
	useEffect(() => {
		if (!state.initialized) {
			const askData = () => {
				fireCache(AdminCacheEventTypes.ASK_DATA_LOADED, (loaded) => {
					if (loaded) {
						fireCache(AdminCacheEventTypes.ASK_DATA, (data?: AdminCacheData) => {
							setState({initialized: true, data});
						});
					} else {
						setTimeout(() => askData(), 100);
					}
				});
			};
			askData();
		}
	}, [fireCache, state.initialized]);

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