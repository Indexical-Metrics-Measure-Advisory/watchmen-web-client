import React from 'react';
import { useForceUpdate } from '../../basic-widgets/utils';
import { QueryTopicForHolder } from '../../services/tuples/query-topic-types';
import { QueryUserGroupForHolder } from '../../services/tuples/query-user-group-types';
import { Space } from '../../services/tuples/space-types';
import {
	TuplePropertyInput,
	TuplePropertyInputLines,
	TuplePropertyLabel
} from '../widgets/tuple-workbench/tuple-editor';
import { useTupleEventBus } from '../widgets/tuple-workbench/tuple-event-bus';
import { TupleEventTypes, TupleState } from '../widgets/tuple-workbench/tuple-event-bus-types';
import { TopicPicker } from './topic-picker';
import { HoldBySpace } from './types';
import { UserGroupPicker } from './user-group-picker';

const SpaceEditor = (props: { space: Space, codes?: HoldBySpace }) => {
	const {
		space,
		codes: {
			topics = [] as Array<QueryTopicForHolder>,
			groups = [] as Array<QueryUserGroupForHolder>
		} = {}
	} = props;

	const { fire } = useTupleEventBus();
	const forceUpdate = useForceUpdate();

	const onPropChange = (prop: 'name' | 'description') => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		if (space[prop] !== event.target.value) {
			space[prop] = event.target.value;
			fire(TupleEventTypes.CHANGE_TUPLE_STATE, TupleState.CHANGED);
			forceUpdate();
		}
	};

	// guard data
	space.topicIds = space.topicIds || [];
	space.userGroupIds = space.userGroupIds || [];

	return <>
		<TuplePropertyLabel>Space Name:</TuplePropertyLabel>
		<TuplePropertyInput value={space.name || ''} onChange={onPropChange('name')}/>
		<TuplePropertyLabel>Description:</TuplePropertyLabel>
		<TuplePropertyInputLines value={space.description || ''} onChange={onPropChange('description')}/>
		<TuplePropertyLabel>Topics:</TuplePropertyLabel>
		<TopicPicker label='Assign Topic' space={space} codes={topics}/>
		<TuplePropertyLabel>Groups:</TuplePropertyLabel>
		<UserGroupPicker label='Grant to User Group' space={space} codes={groups}/>
	</>;
};
export const renderEditor = (space: Space, codes?: HoldBySpace) => {
	return <SpaceEditor space={space} codes={codes}/>;
};
