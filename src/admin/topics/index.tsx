import {isMultipleDataSourcesEnabled} from '@/feature-switch';
import {DataPage} from '@/services/data/query/data-page';
import {listDataSourcesForHolder} from '@/services/data/tuples/data-source';
import {listEnumsForHolder} from '@/services/data/tuples/enum';
import {FactorType} from '@/services/data/tuples/factor-types';
import {QueryTopic} from '@/services/data/tuples/query-topic-types';
import {fetchTopic, isNotRawTopic, listTopics, saveTopic} from '@/services/data/tuples/topic';
import {Topic} from '@/services/data/tuples/topic-types';
import {QueryTuple} from '@/services/data/tuples/tuple-types';
import {AdminCacheData} from '@/services/local-persist/types';
import {AlertLabel} from '@/widgets/alert/widgets';
import {ICON_DOWNLOAD, TUPLE_SEARCH_PAGE_SIZE} from '@/widgets/basic/constants';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import React, {useEffect} from 'react';
import TopicBackground from '../../assets/topic-background.svg';
import {useAdminCacheEventBus} from '../cache/cache-event-bus';
import {AdminCacheEventTypes} from '../cache/cache-event-bus-types';
import {TupleWorkbench} from '../widgets/tuple-workbench';
import {TupleEventBusProvider, useTupleEventBus} from '../widgets/tuple-workbench/tuple-event-bus';
import {TupleEventTypes} from '../widgets/tuple-workbench/tuple-event-bus-types';
import {renderCard} from './card';
import {renderEditor} from './editor';
import {ScriptsDownloadDialog} from './scripts-download-dialog';
import {createTopic} from './utils';

const fetchTopicAndCodes = async (queryTopic: QueryTopic) => {
	const {topic} = await fetchTopic(queryTopic.topicId);
	const enums = await listEnumsForHolder();
	const dataSources = await listDataSourcesForHolder();
	return {tuple: topic, enums, dataSources};
};

const getKeyOfTopic = (topic: QueryTopic) => topic.topicId;

const isNameInvalid = (name: string) => {
	return /^\d.*$/.test(name)
		|| name.split(/[_.]/).some(part => !/^[A-Za-z0-9]+$/.test(part));
};
const AdminTopics = () => {
	const {once: onceGlobal, fire: fireGlobal} = useEventBus();
	const {once: onceCache, fire: fireCache} = useAdminCacheEventBus();
	const {on, off, fire} = useTupleEventBus();
	useEffect(() => {
		const onDoCreateTopic = async () => {
			const enums = await listEnumsForHolder();
			const dataSources = await listDataSourcesForHolder();
			fire(TupleEventTypes.TUPLE_CREATED, createTopic(), {enums, dataSources});
		};
		const onDoEditTopic = async (queryTopic: QueryTopic) => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await fetchTopicAndCodes(queryTopic),
				({tuple, enums, dataSources}) => {
					fireCache(AdminCacheEventTypes.TOPIC_LOADED, tuple);
					fire(TupleEventTypes.TUPLE_LOADED, tuple, {enums, dataSources});
				});
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
						Please use camel case or snake case for topic name.
					</AlertLabel>);
				return;
			} else if (isMultipleDataSourcesEnabled() && !topic.dataSourceId) {
				onceGlobal(EventTypes.ALERT_HIDDEN, () => {
					fire(TupleEventTypes.TUPLE_SAVED, topic, false);
				}).fire(EventTypes.SHOW_ALERT,
					<AlertLabel>
						Please select data source.
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
						Please use camel case or snake case for factor name.
					</AlertLabel>);
				return;
			} else if (isNotRawTopic(topic) && topic.factors.some(f => f.type === FactorType.OBJECT || f.type === FactorType.ARRAY)) {
				onceGlobal(EventTypes.ALERT_HIDDEN, () => {
					fire(TupleEventTypes.TUPLE_SAVED, topic, false);
				}).fire(EventTypes.SHOW_ALERT,
					<AlertLabel>Object or array factor is allowed in raw topic only.</AlertLabel>);
				return;
			} else if (new Set(topic.factors.map(factor => factor.name.toUpperCase())).size !== topic.factors.length) {
				onceGlobal(EventTypes.ALERT_HIDDEN, () => {
					fire(TupleEventTypes.TUPLE_SAVED, topic, false);
				}).fire(EventTypes.SHOW_ALERT,
					<AlertLabel>Each factor should have its unique name.</AlertLabel>);
				return;
			}
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await saveTopic(topic),
				() => {
					fire(TupleEventTypes.TUPLE_SAVED, topic, true);
					fireCache(AdminCacheEventTypes.SAVE_TOPIC, topic);
				},
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
	}, [on, off, fire, onceGlobal, fireGlobal, fireCache]);

	const onDownloadScriptsClicked = () => {
		const askData = () => {
			onceCache(AdminCacheEventTypes.REPLY_DATA_LOADED, (loaded: boolean) => {
				if (loaded) {
					onceCache(AdminCacheEventTypes.REPLY_DATA, (data?: AdminCacheData) => {
						fireGlobal(EventTypes.SHOW_DIALOG, <ScriptsDownloadDialog topics={data?.topics || []}/>,
							{
								marginTop: '10vh',
								marginLeft: '20%',
								width: '60%',
								height: '80vh'
							});
					}).fire(AdminCacheEventTypes.ASK_DATA);
				} else {
					setTimeout(() => askData(), 100);
				}
			}).fire(AdminCacheEventTypes.ASK_DATA_LOADED);
		};
		askData();
	};

	return <TupleWorkbench title="Topics"
	                       createButtonLabel="Create Topic" canCreate={true}
	                       moreButtons={[{
		                       label: 'Download Scripts',
		                       icon: ICON_DOWNLOAD,
		                       action: onDownloadScriptsClicked
	                       }]}
	                       searchPlaceholder="Search by topic name, factor name, description, etc."
	                       tupleLabel="Topic" tupleImage={TopicBackground} tupleImagePosition="left 120px"
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