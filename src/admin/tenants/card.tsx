import {QueryTenant} from '@/services/data/tuples/query-tenant-types';
import {TupleCard, TupleCardDescription, TupleCardTitle} from '@/widgets/tuple-workbench/tuple-card';
import {useTupleEventBus} from '@/widgets/tuple-workbench/tuple-event-bus';
import {TupleEventTypes} from '@/widgets/tuple-workbench/tuple-event-bus-types';
import React from 'react';

const TenantCard = (props: { tenant: QueryTenant }) => {
	const {tenant} = props;

	const {fire} = useTupleEventBus();
	const onEditClicked = () => {
		fire(TupleEventTypes.DO_EDIT_TUPLE, tenant);
	};
	return <TupleCard key={tenant.tenantId} onClick={onEditClicked}>
		<TupleCardTitle>{tenant.name}</TupleCardTitle>
		<TupleCardDescription>{tenant.name}</TupleCardDescription>
	</TupleCard>;
};

export const renderCard = (tenant: QueryTenant) => {
	return <TenantCard tenant={tenant}/>;
};