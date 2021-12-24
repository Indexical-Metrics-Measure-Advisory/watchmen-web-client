import {QueryUserForHolder} from '@/services/data/tuples/query-user-types';
import {useEffect} from 'react';
import {useCatalogEventBus} from '../catalog-event-bus';
import {CatalogEventTypes} from '../catalog-event-bus-types';

export const useUserData = (onData: (users: Array<QueryUserForHolder>) => void) => {
	const {fire} = useCatalogEventBus();
	useEffect(() => {
		fire(CatalogEventTypes.ASK_USERS, onData);
	}, [fire, onData]);
};