import {ExternalWriter} from '@/services/data/tuples/external-writer-types';
import {QueryTenantForHolder} from '@/services/data/tuples/query-tenant-types';
import {DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {TuplePropertyDropdown} from '@/widgets/tuple-workbench/tuple-editor';
import React from 'react';
import {useExternalWriterEventBus} from '../external-writer-event-bus';
import {ExternalWriterEventTypes} from '../external-writer-event-bus-types';

export const ExternalWriterTenantInput = (props: { writer: ExternalWriter, tenants: Array<QueryTenantForHolder> }) => {
	const {writer, tenants} = props;

	const {fire} = useExternalWriterEventBus();
	const forceUpdate = useForceUpdate();

	const onTenantChange = (option: DropdownOption) => {
		writer.tenantId = option.value as string;
		fire(ExternalWriterEventTypes.EXTERNAL_WRITER_TENANT_CHANGED, writer);
		forceUpdate();
	};

	const options: Array<DropdownOption> = tenants.map(candidate => {
		return {value: candidate.tenantId, label: candidate.name};
	});

	return <TuplePropertyDropdown value={writer.tenantId} options={options} onChange={onTenantChange}/>;
};