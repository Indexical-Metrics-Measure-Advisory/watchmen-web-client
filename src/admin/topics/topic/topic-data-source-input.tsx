import {QueryDataSourceForHolder} from '@/services/data/tuples/query-data-source-types';
import {Topic, TopicType} from '@/services/data/tuples/topic-types';
import {DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {TuplePropertyDropdown} from '@/widgets/tuple-workbench/tuple-editor';
import React from 'react';
import {useTopicEventBus} from '../topic-event-bus';
import {TopicEventTypes} from '../topic-event-bus-types';

export const TopicDataSourceInput = (props: { topic: Topic; dataSources: Array<QueryDataSourceForHolder> }) => {
	const {topic, dataSources} = props;

	const {fire} = useTopicEventBus();
	const forceUpdate = useForceUpdate();
	const onDataSourceChange = (option: DropdownOption) => {
		topic.dataSourceId = option.value as TopicType;
		fire(TopicEventTypes.TOPIC_DATA_SOURCE_CHANGED, topic);
		forceUpdate();
	};

	const options: Array<DropdownOption> = dataSources.map(dataSource => {
		return {value: dataSource.dataSourceId, label: dataSource.dataSourceCode};
	});

	return <TuplePropertyDropdown value={topic.dataSourceId || ''} options={options} onChange={onDataSourceChange}/>;
};