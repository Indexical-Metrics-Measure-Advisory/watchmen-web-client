import React from 'react';
import {useForceUpdate} from '../../basic-widgets/utils';
import {QueryUserGroupForHolder} from '../../services/tuples/query-user-group-types';
import {User} from '../../services/tuples/user-types';
import {TuplePropertyInput, TuplePropertyLabel} from '../widgets/tuple-workbench/tuple-editor';
import {useTupleEventBus} from '../widgets/tuple-workbench/tuple-event-bus';
import {TupleEventTypes, TupleState} from '../widgets/tuple-workbench/tuple-event-bus-types';
import {HoldByUser} from './types';
import {UserGroupPicker} from './user-group-picker';

const UserEditor = (props: { user: User, codes?: HoldByUser }) => {
	const {
		user,
		codes: {
			groups = [] as Array<QueryUserGroupForHolder>
		} = {}
	} = props;

	const {fire} = useTupleEventBus();
	const forceUpdate = useForceUpdate();

	const onPropChange = (prop: 'name' | 'nickName') => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		if (user[prop] !== event.target.value) {
			user[prop] = event.target.value;
			fire(TupleEventTypes.CHANGE_TUPLE_STATE, TupleState.CHANGED);
			forceUpdate();
		}
	};

	// guard data
	user.userGroupIds = user.userGroupIds || [];

	return <>
		<TuplePropertyLabel>User Name:</TuplePropertyLabel>
		<TuplePropertyInput value={user.name || ''} onChange={onPropChange('name')}/>
		<TuplePropertyLabel>Nick Name:</TuplePropertyLabel>
		<TuplePropertyInput value={user.nickName || ''} onChange={onPropChange('nickName')}/>
		<TuplePropertyLabel>Groups:</TuplePropertyLabel>
		<UserGroupPicker label="Join Group" user={user} codes={groups}/>
	</>;
};
export const renderEditor = (user: User, codes?: HoldByUser) => {
	return <UserEditor user={user} codes={codes}/>;
};
