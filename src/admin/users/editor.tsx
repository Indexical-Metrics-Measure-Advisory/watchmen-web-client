import React from 'react';
import {useForceUpdate} from '../../basic-widgets/utils';
import {QueryUserGroupForHolder} from '../../services/tuples/query-user-group-types';
import {User, UserRole} from '../../services/tuples/user-types';
import {TuplePropertyDropdown, TuplePropertyInput, TuplePropertyLabel} from '../widgets/tuple-workbench/tuple-editor';
import {useTupleEventBus} from '../widgets/tuple-workbench/tuple-event-bus';
import {TupleEventTypes, TupleState} from '../widgets/tuple-workbench/tuple-event-bus-types';
import {HoldByUser} from './types';
import {UserGroupPicker} from './user-group-picker';
import {QueryTenant} from '../../services/tuples/query-tenant-types';
import {DropdownOption} from '../../basic-widgets/types';
import {isSuperAdmin} from '../../services/account';

const UserEditor = (props: { user: User, codes?: HoldByUser }) => {
	const {
		user,
		codes: {
			groups = [] as Array<QueryUserGroupForHolder>,
			tenants = [] as Array<QueryTenant>
		} = {}
	} = props;

	const {fire} = useTupleEventBus();
	const forceUpdate = useForceUpdate();

	const onPropChange = (prop: 'name' | 'nickName' | 'pwd') => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		if (user[prop] !== event.target.value) {
			user[prop] = event.target.value;
			fire(TupleEventTypes.CHANGE_TUPLE_STATE, TupleState.CHANGED);
			forceUpdate();
		}
	};
	const onRoleChange = (option: DropdownOption) => {
		user.role = option.value as UserRole;
		fire(TupleEventTypes.CHANGE_TUPLE_STATE, TupleState.CHANGED);
		forceUpdate();
	};
	const onTenantChange = (option: DropdownOption) => {
		user.tenantId = option.value as string;
		fire(TupleEventTypes.CHANGE_TUPLE_STATE, TupleState.CHANGED);
		forceUpdate();
	};

	// guard data
	user.userGroupIds = user.userGroupIds || [];
	const roleOptions: Array<DropdownOption> = [
		{label: 'Console User', value: UserRole.CONSOLE},
		{label: 'Administrator', value: UserRole.ADMIN}
	];
	const tenantOptions: Array<DropdownOption> = tenants.map(tenant => {
		return {label: tenant.name, value: tenant.tenantId};
	});

	return <>
		<TuplePropertyLabel>User Name:</TuplePropertyLabel>
		<TuplePropertyInput value={user.name || ''} onChange={onPropChange('name')}/>
		<TuplePropertyLabel>Nick Name:</TuplePropertyLabel>
		<TuplePropertyInput value={user.nickName || ''} onChange={onPropChange('nickName')}/>
		<TuplePropertyLabel>Password:</TuplePropertyLabel>
		<TuplePropertyInput value={user.password || ''} onChange={onPropChange('pwd')}
		                    placeholder="Leave empty if keep password unchange"/>
		<TuplePropertyLabel>User Role:</TuplePropertyLabel>
		<TuplePropertyDropdown value={user.role || UserRole.CONSOLE} options={roleOptions} onChange={onRoleChange}/>
		{isSuperAdmin()
			? <>
				<TuplePropertyLabel>Tenant:</TuplePropertyLabel>
				<TuplePropertyDropdown value={user.tenantId} options={tenantOptions} onChange={onTenantChange}/>
			</>
			: null}
		<TuplePropertyLabel>Groups:</TuplePropertyLabel>
		<UserGroupPicker label="Join Group" user={user} codes={groups}/>
	</>;
};
export const renderEditor = (user: User, codes?: HoldByUser) => {
	return <UserEditor user={user} codes={codes}/>;
};
