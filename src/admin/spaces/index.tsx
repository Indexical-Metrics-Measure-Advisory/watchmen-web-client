import React, { useEffect } from 'react';
import SpaceBackground from '../../assets/space-background.png';
import { TUPLE_SEARCH_PAGE_SIZE } from '../../basic-widgets/constants';
import { QuerySpace } from '../../services/tuples/query-space-types';
import { fetchSpace, listSpaces, saveSpace } from '../../services/tuples/space';
import { Space } from '../../services/tuples/space-types';
import { generateUuid } from '../../services/tuples/utils';
import { TupleWorkbench } from '../widgets/tuple-workbench';
import { TupleEventBusProvider, useTupleEventBus } from '../widgets/tuple-workbench/tuple-event-bus';
import { TupleEventTypes } from '../widgets/tuple-workbench/tuple-event-bus-types';
import { renderCard } from './card';
import { renderEditor } from './editor';

const createSpace = (): Space => {
	return { spaceId: generateUuid(), name: '', topicIds: [], userGroupIds: [] };
};

const fetchSpaceAndCodes = async (querySpace: QuerySpace) => {
	const { space, topics, groups } = await fetchSpace(querySpace.spaceId);
	return { tuple: space, topics, groups };
};

const getKeyOfSpace = (space: QuerySpace) => space.spaceId;

const AdminSpaces = () => {
	const { on, off, fire } = useTupleEventBus();
	useEffect(() => {
		const onDoCreateSpace = () => {
			fire(TupleEventTypes.TUPLE_CREATED, createSpace());
		};
		const onDoEditSpace = async (querySpace: QuerySpace) => {
			const { tuple, topics, groups } = await fetchSpaceAndCodes(querySpace);
			fire(TupleEventTypes.TUPLE_LOADED, tuple, { topics, groups });
		};
		const onDoSearchSpace = async (searchText: string, pageNumber: number) => {
			const page = await listSpaces({ search: searchText, pageNumber, pageSize: TUPLE_SEARCH_PAGE_SIZE });
			fire(TupleEventTypes.TUPLE_SEARCHED, page, searchText);
		};
		const onDoSaveSpace = async (space: Space) => {
			await saveSpace(space);
			fire(TupleEventTypes.TUPLE_SAVED, space);
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
	}, [ on, off, fire ]);

	return <TupleWorkbench title='Spaces'
	                       createButtonLabel='Create Space' canCreate={true}
	                       searchPlaceholder='Search by space name, topic name, report name, description, etc.'
	                       tupleLabel='Space' tupleImage={SpaceBackground} renderEditor={renderEditor}
	                       renderCard={renderCard} getKeyOfTuple={getKeyOfSpace}
	/>;
};
const AdminSpacesIndex = () => {
	return <TupleEventBusProvider>
		<AdminSpaces/>
	</TupleEventBusProvider>;
};

export default AdminSpacesIndex;