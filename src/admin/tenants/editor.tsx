import React from 'react';
import {useForceUpdate} from '../../basic-widgets/utils';
import {TuplePropertyInput, TuplePropertyLabel} from '../widgets/tuple-workbench/tuple-editor';
import {useTupleEventBus} from '../widgets/tuple-workbench/tuple-event-bus';
import {TupleEventTypes, TupleState} from '../widgets/tuple-workbench/tuple-event-bus-types';
import {Tenant} from '../../services/tuples/tenant-types';

const TenantEditor = (props: { tenant: Tenant }) => {
	const {tenant} = props;

	const {fire} = useTupleEventBus();
	const forceUpdate = useForceUpdate();

	const onPropChange = (prop: 'name') => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		if (tenant[prop] !== event.target.value) {
			tenant[prop] = event.target.value;
			fire(TupleEventTypes.CHANGE_TUPLE_STATE, TupleState.CHANGED);
			forceUpdate();
		}
	};

	return <>
		<TuplePropertyLabel>Zone Name:</TuplePropertyLabel>
		<TuplePropertyInput value={tenant.name || ''} onChange={onPropChange('name')}/>
	</>;
};
export const renderEditor = (tenant: Tenant) => {
	return <TenantEditor tenant={tenant}/>;
};
