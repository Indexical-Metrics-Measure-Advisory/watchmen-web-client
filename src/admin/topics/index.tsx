import React, {useEffect} from 'react';
import {AlertLabel} from '../../alert/widgets';
import TopicBackground from '../../assets/topic-background.png';
import {TUPLE_SEARCH_PAGE_SIZE} from '../../basic-widgets/constants';
import {useEventBus} from '../../events/event-bus';
import {EventTypes} from '../../events/types';
import {DataPage} from '../../services/query/data-page';
import {listEnumsForHolder} from '../../services/tuples/enum';
import {FactorType} from '../../services/tuples/factor-types';
import {QueryTopic} from '../../services/tuples/query-topic-types';
import {fetchTopic, listTopics, saveTopic} from '../../services/tuples/topic';
import {Topic, TopicType} from '../../services/tuples/topic-types';
import {QueryTuple} from '../../services/tuples/tuple-types';
import {TupleWorkbench} from '../widgets/tuple-workbench';
import {TupleEventBusProvider, useTupleEventBus} from '../widgets/tuple-workbench/tuple-event-bus';
import {TupleEventTypes} from '../widgets/tuple-workbench/tuple-event-bus-types';
import {renderCard} from './card';
import {renderEditor} from './editor';
import {createTopic} from './utils';

const fetchTopicAndCodes = async (queryTopic: QueryTopic) => {
	const {topic} = await fetchTopic(queryTopic.topicId);
	const enums = await listEnumsForHolder();
	return {tuple: topic, enums};
};

const getKeyOfTopic = (topic: QueryTopic) => topic.topicId;

const isNameInvalid = (name: string) => {
	return /^\d.*$/.test(name)
		|| name.split('_').some(part => !/^[A-Za-z0-9]+$/.test(part));
};
const AdminTopics = () => {
	const {once: onceGlobal, fire: fireGlobal} = useEventBus();
	const {on, off, fire} = useTupleEventBus();
	useEffect(() => {
		const onDoCreateTopic = async () => {
			const enums = await listEnumsForHolder();
			fire(TupleEventTypes.TUPLE_CREATED, createTopic(), {enums});
		};
		const onDoEditTopic = async (queryTopic: QueryTopic) => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await fetchTopicAndCodes(queryTopic),
				({tuple, enums}) => fire(TupleEventTypes.TUPLE_LOADED, tuple, {enums}));
		};
		const onDoSearchTopic = async (searchText: string, pageNumber: number) => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await listTopics({search: searchText, pageNumber, pageSize: TUPLE_SEARCH_PAGE_SIZE}),
				(page: DataPage<QueryTuple>) => fire(TupleEventTypes.TUPLE_SEARCHED, page, searchText));
		};
		const onDoSaveTopic = async (topic: Topic) => {
			if (!topic.name || !topic.name.trim()) {
				onceGlobal(EventTypes.ALERT_HIDDEN, () => {
					fire(TupleEventTypes.TUPLE_SAVED, topic, false);
				}).fire(EventTypes.SHOW_ALERT, <AlertLabel>Topic name is required.</AlertLabel>);
				return;
			} else if (isNameInvalid(topic.name)) {
				onceGlobal(EventTypes.ALERT_HIDDEN, () => {
					fire(TupleEventTypes.TUPLE_SAVED, topic, false);
				}).fire(EventTypes.SHOW_ALERT,
					<AlertLabel>
						Please use camel case or snake case for topic name, and starts with lower case character.
					</AlertLabel>);
				return;
			} else if (!topic.factors || topic.factors.filter(f => !!f).length === 0) {
				onceGlobal(EventTypes.ALERT_HIDDEN, () => {
					fire(TupleEventTypes.TUPLE_SAVED, topic, false);
				}).fire(EventTypes.SHOW_ALERT, <AlertLabel>At least one factor in topic.</AlertLabel>);
				return;
			} else if (topic.factors.some(f => !f.name || !f.name.trim())) {
				onceGlobal(EventTypes.ALERT_HIDDEN, () => {
					fire(TupleEventTypes.TUPLE_SAVED, topic, false);
				}).fire(EventTypes.SHOW_ALERT, <AlertLabel>Factor name is required for each one.</AlertLabel>);
				return;
			} else if (topic.factors.some(f => isNameInvalid(f.name))) {
				onceGlobal(EventTypes.ALERT_HIDDEN, () => {
					fire(TupleEventTypes.TUPLE_SAVED, topic, false);
				}).fire(EventTypes.SHOW_ALERT,
					<AlertLabel>
						Please use camel case or snake case for factor name, and starts with lower case character.
					</AlertLabel>);
				return;
			} else if (topic.type !== TopicType.RAW && topic.factors.some(f => f.type === FactorType.OBJECT || f.type === FactorType.ARRAY)) {
				onceGlobal(EventTypes.ALERT_HIDDEN, () => {
					fire(TupleEventTypes.TUPLE_SAVED, topic, false);
				}).fire(EventTypes.SHOW_ALERT,
					<AlertLabel>Object or array factor is allowed in raw topic only.</AlertLabel>);
				return;
			}
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await saveTopic(topic),
				() => fire(TupleEventTypes.TUPLE_SAVED, topic, true),
				() => fire(TupleEventTypes.TUPLE_SAVED, topic, false));
		};
		on(TupleEventTypes.DO_CREATE_TUPLE, onDoCreateTopic);
		on(TupleEventTypes.DO_EDIT_TUPLE, onDoEditTopic);
		on(TupleEventTypes.DO_SEARCH_TUPLE, onDoSearchTopic);
		on(TupleEventTypes.DO_SAVE_TUPLE, onDoSaveTopic);
		return () => {
			off(TupleEventTypes.DO_CREATE_TUPLE, onDoCreateTopic);
			off(TupleEventTypes.DO_EDIT_TUPLE, onDoEditTopic);
			off(TupleEventTypes.DO_SEARCH_TUPLE, onDoSearchTopic);
			off(TupleEventTypes.DO_SAVE_TUPLE, onDoSaveTopic);
		};
	}, [on, off, fire, onceGlobal, fireGlobal]);

	return <TupleWorkbench title="Topics"
	                       createButtonLabel="Create Topic" canCreate={true}
	                       searchPlaceholder="Search by topic name, factor name, description, etc."
	                       tupleLabel="Topic" tupleImage={TopicBackground} tupleImagePosition="left 80px"
	                       renderEditor={renderEditor}
	                       renderCard={renderCard} getKeyOfTuple={getKeyOfTopic}
	/>;
};
const AdminTopicsIndex = () => {
	return <TupleEventBusProvider>
		<AdminTopics/>
	</TupleEventBusProvider>;
};

export default AdminTopicsIndex;