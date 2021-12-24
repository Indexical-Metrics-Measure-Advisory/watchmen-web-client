import {QueryUserForHolder} from '@/services/data/tuples/query-user-types';
import {listUsersForHolder} from '@/services/data/tuples/user';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Fragment, useEffect, useState} from 'react';
import {useCatalogEventBus} from '../catalog-event-bus';
import {CatalogEventTypes} from '../catalog-event-bus-types';

export interface CacheState {
	initialized: boolean;
	data?: Array<QueryUserForHolder>;
}

export const UserCache = () => {
	const {fire: fireGlobal} = useEventBus();
	const {on, off} = useCatalogEventBus();
	const [cache, setCache] = useState<CacheState>({initialized: false});
	useEffect(() => {
		const onAskUsers = (onData: (users: Array<QueryUserForHolder>) => void) => {
			if (cache.initialized) {
				onData(cache.data ?? []);
			} else {
				fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
					async () => await listUsersForHolder(''),
					(users: Array<QueryUserForHolder>) => {
						setCache({initialized: true, data: users});
						onData(users);
					}, () => {
						setCache({initialized: true});
						onData([]);
					});
			}
		};
		on(CatalogEventTypes.ASK_USERS, onAskUsers);
		return () => {
			off(CatalogEventTypes.ASK_USERS, onAskUsers);
		};
	}, [fireGlobal, on, off, cache.initialized, cache.data]);

	return <Fragment/>;
};