import {MonitorRule} from '../../../services/data-quality/rules';
import {useForceUpdate} from '../../../basic-widgets/utils';
import {DropdownOption} from '../../../basic-widgets/types';
import {Dropdown} from '../../../basic-widgets/dropdown';
import React from 'react';
import {Topic} from '../../../services/tuples/topic-types';
import {getTopicName} from '../../utils';

export const AnotherTopicParameter = (props: { rule: MonitorRule, currentTopic?: Topic, topics: Array<Topic> }) => {
	const {rule, currentTopic, topics} = props;

	const forceUpdate = useForceUpdate();
	const onChanged = (option: DropdownOption) => {
		rule.params = (rule.params || {});
		rule.params.topicId = option.value;
		forceUpdate();
	};

	const options = topics.filter(topic => topic !== currentTopic).map(topic => {
		return {label: getTopicName(topic), value: topic.topicId};
	});

	return <Dropdown options={options}
	                 value={(rule.params || {}).topicId}
	                 onChange={onChanged}/>;
};
