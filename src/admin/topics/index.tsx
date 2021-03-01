import React, { useEffect } from 'react';
import TopicBackground from '../../assets/topic-background.png';
import { TUPLE_SEARCH_PAGE_SIZE } from '../../basic-widgets/constants';
import { useEventBus } from '../../events/event-bus';
import { EventTypes } from '../../events/types';
import { DataPage } from '../../services/query/data-page';
import { QueryTopic } from '../../services/tuples/query-topic-types';
import { fetchTopic, listTopics, saveTopic } from '../../services/tuples/topic';
import { Topic } from '../../services/tuples/topic-types';
import { QueryTuple } from '../../services/tuples/tuple-types';
import { TupleWorkbench } from '../widgets/tuple-workbench';
import { TupleEventBusProvider, useTupleEventBus } from '../widgets/tuple-workbench/tuple-event-bus';
import { TupleEventTypes } from '../widgets/tuple-workbench/tuple-event-bus-types';
import { renderCard } from './card';
import { renderEditor } from './editor';
import { createTopic } from './utils';

const fetchTopicAndCodes = async (queryTopic: QueryTopic) => {
	const { topic } = await fetchTopic(queryTopic.topicId);
	return { tuple: topic };
};

const getKeyOfTopic = (topic: QueryTopic) => topic.topicId;

const AdminTopics = () => {
	const { fire: fireGlobal } = useEventBus();
	const { on, off, fire } = useTupleEventBus();
	useEffect(() => {
		const onDoCreateTopic = () => {
			fire(TupleEventTypes.TUPLE_CREATED, createTopic());
		};
		const onDoEditTopic = async (queryTopic: QueryTopic) => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await fetchTopicAndCodes(queryTopic),
				({ tuple }) => fire(TupleEventTypes.TUPLE_LOADED, tuple));
		};
		const onDoSearchTopic = async (searchText: string, pageNumber: number) => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await listTopics({ search: searchText, pageNumber, pageSize: TUPLE_SEARCH_PAGE_SIZE }),
				(page: DataPage<QueryTuple>) => fire(TupleEventTypes.TUPLE_SEARCHED, page, searchText));
		};
		const onDoSaveTopic = async (topic: Topic) => {
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
	}, [ on, off, fire, fireGlobal ]);

	return <TupleWorkbench title='Topics'
	                       createButtonLabel='Create Topic' canCreate={true}
	                       searchPlaceholder='Search by topic name, factor name, description, etc.'
	                       tupleLabel='Topic' tupleImage={TopicBackground} tupleImagePosition='left 80px'
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