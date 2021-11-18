import {QuerySpaceForHolder} from '@/services/data/tuples/query-space-types';
import {QueryUserForHolder} from '@/services/data/tuples/query-user-types';
import {UserGroup} from '@/services/data/tuples/user-group-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {TuplePropertyInput, TuplePropertyInputLines, TuplePropertyLabel} from '@/widgets/tuple-workbench/tuple-editor';
import {useTupleEventBus} from '@/widgets/tuple-workbench/tuple-event-bus';
import {TupleEventTypes, TupleState} from '@/widgets/tuple-workbench/tuple-event-bus-types';
import React, {ChangeEvent} from 'react';
import {SpacePicker} from './space-picker';
import {HoldByUserGroup} from './types';
import {UserPicker} from './user-picker';

const UserGroupEditor = (props: { userGroup: UserGroup, codes?: HoldByUserGroup }) => {
	const {
		userGroup,
		codes: {
			users = [] as Array<QueryUserForHolder>,
			spaces = [] as Array<QuerySpaceForHolder>
		} = {}
	} = props;

	const {fire} = useTupleEventBus();
	const forceUpdate = useForceUpdate();

	const onPropChange = (prop: 'name' | 'description') => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		if (userGroup[prop] !== event.target.value) {
			userGroup[prop] = event.target.value;
			fire(TupleEventTypes.CHANGE_TUPLE_STATE, TupleState.CHANGED);
			forceUpdate();
		}
	};

	// guard data
	userGroup.spaceIds = userGroup.spaceIds || [];
	userGroup.userIds = userGroup.userIds || [];

	return <>
		<TuplePropertyLabel>Group Name:</TuplePropertyLabel>
		<TuplePropertyInput value={userGroup.name || ''} onChange={onPropChange('name')}/>
		<TuplePropertyLabel>Description:</TuplePropertyLabel>
		<TuplePropertyInputLines value={userGroup.description || ''} onChange={onPropChange('description')}/>
		<TuplePropertyLabel>Spaces:</TuplePropertyLabel>
		<SpacePicker label="Assign Space" userGroup={userGroup} codes={spaces}/>
		<TuplePropertyLabel>Users:</TuplePropertyLabel>
		<UserPicker label="Include User" userGroup={userGroup} codes={users}/>
	</>;
};
export const renderEditor = (userGroup: UserGroup, codes?: HoldByUserGroup) => {
	return <UserGroupEditor userGroup={userGroup} codes={codes}/>;
};
