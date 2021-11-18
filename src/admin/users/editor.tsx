import {isSuperAdmin} from '@/services/data/account';
import {QueryTenant} from '@/services/data/tuples/query-tenant-types';
import {QueryUserGroupForHolder} from '@/services/data/tuples/query-user-group-types';
import {User, UserRole} from '@/services/data/tuples/user-types';
import {DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {TuplePropertyDropdown, TuplePropertyInput, TuplePropertyLabel} from '@/widgets/tuple-workbench/tuple-editor';
import {useTupleEventBus} from '@/widgets/tuple-workbench/tuple-event-bus';
import {TupleEventTypes, TupleState} from '@/widgets/tuple-workbench/tuple-event-bus-types';
import React, {ChangeEvent} from 'react';
import {HoldByUser} from './types';
import {UserGroupPicker} from './user-group-picker';

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

	const onPropChange = (prop: 'name' | 'nickName' | 'password') => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
		<TuplePropertyInput value={user.password || ''} onChange={onPropChange('password')}
		                    placeholder="Leave empty if keep password unchange"/>
		<TuplePropertyLabel>User Role:</TuplePropertyLabel>
		<TuplePropertyDropdown value={user.role || UserRole.CONSOLE} options={roleOptions} onChange={onRoleChange}/>
		{isSuperAdmin()
			? <>
				<TuplePropertyLabel>Data Zone:</TuplePropertyLabel>
				<TuplePropertyDropdown value={user.tenantId} options={tenantOptions} onChange={onTenantChange}/>
			</>
			: <>
				<TuplePropertyLabel>Groups:</TuplePropertyLabel>
				<UserGroupPicker label="Join Group" user={user} codes={groups}/>
			</>}
	</>;
};
export const renderEditor = (user: User, codes?: HoldByUser) => {
	return <UserEditor user={user} codes={codes}/>;
};
