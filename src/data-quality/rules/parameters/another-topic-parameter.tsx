import {useForceUpdate} from '../../../basic-widgets/utils';
import {DropdownOption} from '../../../basic-widgets/types';
import {Dropdown} from '../../../basic-widgets/dropdown';
import React from 'react';
import {Topic} from '../../../services/tuples/topic-types';
import {getTopicName} from '../../utils';
import {MonitorRuleParameters} from '../../../services/data-quality/rule-types';

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
