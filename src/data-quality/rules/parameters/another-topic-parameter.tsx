import {MonitorRuleParameters} from '@/services/data/data-quality/rule-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {Dropdown} from '@/widgets/basic/dropdown';
import {DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import React from 'react';
import {getTopicName} from '../../utils';

export const AnotherTopicParameter = (props: { params: MonitorRuleParameters, currentTopic?: Topic, topics: Array<Topic> }) => {
	const {params, currentTopic, topics} = props;

	const forceUpdate = useForceUpdate();
	const onChanged = (option: DropdownOption) => {
		params.topicId = option.value;
		forceUpdate();
	};

	const options = topics.filter(topic => topic !== currentTopic).map(topic => {
		return {label: getTopicName(topic), value: topic.topicId};
	});

	return <Dropdown options={options}
	                 value={params.topicId}
	                 onChange={onChanged}/>;
};
