import {TuplePage} from '@/services/data/query/tuple-page';
import {ParameterCondition, TopicFactorParameter} from '@/services/data/tuples/factor-calculator-types';
import {isExpressionParameter, isJointParameter, strictParameterJoint} from '@/services/data/tuples/parameter-utils';
import {QuerySpace} from '@/services/data/tuples/query-space-types';
import {fetchSpace, listSpaces, saveSpace} from '@/services/data/tuples/space';
import {Space} from '@/services/data/tuples/space-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {QueryTuple} from '@/services/data/tuples/tuple-types';
import {generateUuid} from '@/services/data/tuples/utils';
import {getCurrentTime} from '@/services/data/utils';
import {AdminCacheData} from '@/services/local-persist/types';
import {AlertLabel} from '@/widgets/alert/widgets';
import {TUPLE_SEARCH_PAGE_SIZE} from '@/widgets/basic/constants';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {TupleWorkbench} from '@/widgets/tuple-workbench';
import {TupleEventBusProvider, useTupleEventBus} from '@/widgets/tuple-workbench/tuple-event-bus';
import {TupleEventTypes} from '@/widgets/tuple-workbench/tuple-event-bus-types';
import React, {useEffect} from 'react';
import SpaceBackground from '../../assets/space-background.svg';
import {useAdminCacheEventBus} from '../cache/cache-event-bus';
import {AdminCacheEventTypes} from '../cache/cache-event-bus-types';
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

const validateFilter = (filter: ParameterCondition, topic: Topic): boolean => {
	if (isExpressionParameter(filter)) {
		// left is topic factor, right is constant
		const tfp = filter.left as TopicFactorParameter;
		// eslint-disable-next-line
		return tfp.topicId == topic.topicId && topic.factors.some(factor => factor.factorId == tfp.factorId);
	} else if (isJointParameter(filter)) {
		return filter.filters.every(filter => validateFilter(filter, topic));
	}

	// never occurs
	throw new Error('Unsupported filter type.');
};

const validateSpaceFilters = (space: Space, topics: Array<Topic>): { pass: boolean, message?: string } => {
	if (!space.filters || space.filters.length === 0) {
		return {pass: true};
	}

	const failed = space.filters.filter(filter => filter.enabled).some(({topicId, joint}) => {
		// eslint-disable-next-line
		const topic = topics.find(topic => topic.topicId == topicId);
		if (!topic) {
			// true means failed
			return true;
		}

		return strictParameterJoint(joint).filters.some(filter => !validateFilter(filter, topic));
	});

	return {pass: !failed, message: 'Incorrect filter found.'};
};

const AdminSpaces = () => {
	const {fire: fireGlobal} = useEventBus();
	const {fire: fireCache} = useAdminCacheEventBus();
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
				(page: TuplePage<QueryTuple>) => fire(TupleEventTypes.TUPLE_SEARCHED, page, searchText));
		};
		const onSaveSpace = async (space: Space, onSaved: (space: Space, saved: boolean) => void) => {
			if (!space.name || !space.name.trim()) {
				fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>Space name is required.</AlertLabel>, () => {
					onSaved(space, false);
				});
				return;
			}

			fireCache(AdminCacheEventTypes.ASK_DATA, (data?: AdminCacheData) => {
				const {topics} = data || {};
				const {pass, message} = validateSpaceFilters(space, topics || []);
				if (!pass) {
					fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>{message}</AlertLabel>, () => {
						onSaved(space, false);
					});
				} else {
					fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
						async () => await saveSpace(space),
						() => onSaved(space, true),
						() => onSaved(space, false));
				}
			});
		};
		on(TupleEventTypes.DO_CREATE_TUPLE, onDoCreateSpace);
		on(TupleEventTypes.DO_EDIT_TUPLE, onDoEditSpace);
		on(TupleEventTypes.DO_SEARCH_TUPLE, onDoSearchSpace);
		on(TupleEventTypes.SAVE_TUPLE, onSaveSpace);
		return () => {
			off(TupleEventTypes.DO_CREATE_TUPLE, onDoCreateSpace);
			off(TupleEventTypes.DO_EDIT_TUPLE, onDoEditSpace);
			off(TupleEventTypes.DO_SEARCH_TUPLE, onDoSearchSpace);
			off(TupleEventTypes.SAVE_TUPLE, onSaveSpace);
		};
	}, [on, off, fire, fireGlobal, fireCache]);

	return <TupleWorkbench title="Spaces"
	                       createButtonLabel="Create Space" canCreate={true}
	                       searchPlaceholder="Search by space name, topic name, report name, description, etc."
	                       tupleLabel="Space" tupleImage={SpaceBackground} tupleImagePosition="left 80px"
	                       renderEditor={renderEditor}
	                       renderCard={renderCard} getKeyOfTuple={getKeyOfSpace}
	/>;
};
const AdminSpacesIndex = () => {
	return <TupleEventBusProvider>
		<AdminSpaces/>
	</TupleEventBusProvider>;
};

export default AdminSpacesIndex;