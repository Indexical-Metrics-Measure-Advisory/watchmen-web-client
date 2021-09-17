import {DataPage} from '@/services/data/query/data-page';
import {QuerySpace} from '@/services/data/tuples/query-space-types';
import {fetchSpace, listSpaces, saveSpace} from '@/services/data/tuples/space';
import {Space} from '@/services/data/tuples/space-types';
import {QueryTuple} from '@/services/data/tuples/tuple-types';
import {generateUuid} from '@/services/data/tuples/utils';
import {getCurrentTime} from '@/services/data/utils';
import {AlertLabel} from '@/widgets/alert/widgets';
import {TUPLE_SEARCH_PAGE_SIZE} from '@/widgets/basic/constants';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import React, {useEffect} from 'react';
import SpaceBackground from '../../assets/space-background.svg';
import {TupleWorkbench} from '../widgets/tuple-workbench';
import {TupleEventBusProvider, useTupleEventBus} from '../widgets/tuple-workbench/tuple-event-bus';
import {TupleEventTypes} from '../widgets/tuple-workbench/tuple-event-bus-types';
import {renderCard} from './card';
import {renderEditor} from './editor';

const createSpace = (): Space => {
	return {
		spaceId: generateUuid(), name: '', topicIds: [], userGroupIds: [],
		createTime: getCurrentTime(),
		lastModified: getCurrentTime()
	};
};

const fetchSpaceAndCodes = async (querySpace: QuerySpace) => {
	const {space, topics, groups} = await fetchSpace(querySpace.spaceId);
	return {tuple: space, topics, groups};
};

const getKeyOfSpace = (space: QuerySpace) => space.spaceId;

const AdminSpaces = () => {
	const {once: onceGlobal, fire: fireGlobal} = useEventBus();
	const {on, off, fire} = useTupleEventBus();
	useEffect(() => {
		const onDoCreateSpace = () => {
			fire(TupleEventTypes.TUPLE_CREATED, createSpace());
		};
		const onDoEditSpace = async (querySpace: QuerySpace) => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await fetchSpaceAndCodes(querySpace),
				({tuple, topics, groups}) => fire(TupleEventTypes.TUPLE_LOADED, tuple, {topics, groups}));
		};
		const onDoSearchSpace = async (searchText: string, pageNumber: number) => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await listSpaces({search: searchText, pageNumber, pageSize: TUPLE_SEARCH_PAGE_SIZE}),
				(page: DataPage<QueryTuple>) => fire(TupleEventTypes.TUPLE_SEARCHED, page, searchText));
		};
		const onDoSaveSpace = async (space: Space) => {
			if (!space.name || !space.name.trim()) {
				onceGlobal(EventTypes.ALERT_HIDDEN, () => {
					fire(TupleEventTypes.TUPLE_SAVED, space, false);
				}).fire(EventTypes.SHOW_ALERT, <AlertLabel>Space name is required.</AlertLabel>);
			} else {
				fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
					async () => await saveSpace(space),
					() => fire(TupleEventTypes.TUPLE_SAVED, space, true),
					() => fire(TupleEventTypes.TUPLE_SAVED, space, false));
			}
		};
		on(TupleEventTypes.DO_CREATE_TUPLE, onDoCreateSpace);
		on(TupleEventTypes.DO_EDIT_TUPLE, onDoEditSpace);
		on(TupleEventTypes.DO_SEARCH_TUPLE, onDoSearchSpace);
		on(TupleEventTypes.DO_SAVE_TUPLE, onDoSaveSpace);
		return () => {
			off(TupleEventTypes.DO_CREATE_TUPLE, onDoCreateSpace);
			off(TupleEventTypes.DO_EDIT_TUPLE, onDoEditSpace);
			off(TupleEventTypes.DO_SEARCH_TUPLE, onDoSearchSpace);
			off(TupleEventTypes.DO_SAVE_TUPLE, onDoSaveSpace);
		};
	}, [on, off, fire, onceGlobal, fireGlobal]);

	return <TupleWorkbench title="Spaces"
	                       createButtonLabel="Create Space" canCreate={true}
	                       searchPlaceholder="Search by space name, topic name, report name, description, etc."
	                       tupleLabel="Space" tupleImage={SpaceBackground} renderEditor={renderEditor}
	                       renderCard={renderCard} getKeyOfTuple={getKeyOfSpace}
	/>;
};
const AdminSpacesIndex = () => {
	return <TupleEventBusProvider>
		<AdminSpaces/>
	</TupleEventBusProvider>;
};

export default AdminSpacesIndex;