import React, { useEffect } from 'react';
import TopicBackground from '../../assets/topic-background.png';
import { TUPLE_SEARCH_PAGE_SIZE } from '../../basic-widgets/constants';
import { QueryTopic } from '../../services/tuples/query-topic-types';
import { fetchTopic, listTopics, saveTopic } from '../../services/tuples/topic';
import { Topic, TopicType } from '../../services/tuples/topic-types';
import { generateUuid } from '../../services/tuples/utils';
import { getCurrentTime } from '../../services/utils';
import { TupleWorkbench } from '../widgets/tuple-workbench';
import { TupleEventBusProvider, useTupleEventBus } from '../widgets/tuple-workbench/tuple-event-bus';
import { TupleEventTypes } from '../widgets/tuple-workbench/tuple-event-bus-types';
import { renderCard } from './card';
import { renderEditor } from './editor';

const createTopic = (): Topic => {
	return {
		topicId: generateUuid(), name: '', type: TopicType.DISTINCT, factors: [],
		createTime: getCurrentTime(),
		lastModifyTime: getCurrentTime()
	};
};

const fetchTopicAndCodes = async (queryTopic: QueryTopic) => {
	const { topic } = await fetchTopic(queryTopic.topicId);
	return { tuple: topic };
};

const getKeyOfTopic = (topic: QueryTopic) => topic.topicId;

const AdminTopics = () => {
	const { on, off, fire } = useTupleEventBus();
	useEffect(() => {
		const onDoCreateTopic = () => {
			fire(TupleEventTypes.TUPLE_CREATED, createTopic());
		};
		const onDoEditTopic = async (queryTopic: QueryTopic) => {
			const { tuple } = await fetchTopicAndCodes(queryTopic);
			fire(TupleEventTypes.TUPLE_LOADED, tuple);
		};
		const onDoSearchTopic = async (searchText: string, pageNumber: number) => {
			const page = await listTopics({ search: searchText, pageNumber, pageSize: TUPLE_SEARCH_PAGE_SIZE });
			fire(TupleEventTypes.TUPLE_SEARCHED, page, searchText);
		};
		const onDoSaveTopic = async (topic: Topic) => {
			await saveTopic(topic);
			fire(TupleEventTypes.TUPLE_SAVED, topic);
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
	}, [ on, off, fire ]);

	return <TupleWorkbench title='Topics'
	                       createButtonLabel='Create Topic' canCreate={true}
	                       searchPlaceholder='Search by topic name, factor name, description, etc.'
	                       tupleLabel='Topic' tupleImage={TopicBackground} renderEditor={renderEditor}
	                       renderCard={renderCard} getKeyOfTuple={getKeyOfTopic}
	/>;
};
const AdminTopicsIndex = () => {
	return <TupleEventBusProvider>
		<AdminTopics/>
	</TupleEventBusProvider>;
};

export default AdminTopicsIndex;