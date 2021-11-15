import {ExternalWriter} from '@/services/data/tuples/external-writer-types';
import {QueryTenantForHolder} from '@/services/data/tuples/query-tenant-types';
import {TuplePropertyLabel} from '@/widgets/tuple-workbench/tuple-editor';
import React from 'react';
import {ExternalWriterEventBusProvider} from './external-writer-event-bus';
import {ExternalWriterCodeInput} from './external-writer/external-writer-code-input';
import {ExternalWriterConnectInput} from './external-writer/external-writer-connection-input';
import {ExternalWriterTenantInput} from './external-writer/external-writer-tenant-input';
import {ExternalWriterTypeInput} from './external-writer/external-writer-type-input';
import {HoldByExternalWriter} from './types';

const ExternalWriterEditor = (props: { writer: ExternalWriter; tenants: Array<QueryTenantForHolder>; }) => {
	const {writer, tenants} = props;

	return <ExternalWriterEventBusProvider>
		<TuplePropertyLabel>External Writer Code:</TuplePropertyLabel>
		<ExternalWriterCodeInput writer={writer}/>
		<TuplePropertyLabel>External Writer Type:</TuplePropertyLabel>
		<ExternalWriterTypeInput writer={writer}/>
		<TuplePropertyLabel>Data Zone:</TuplePropertyLabel>
		<ExternalWriterTenantInput writer={writer} tenants={tenants}/>
		<TuplePropertyLabel>Url:</TuplePropertyLabel>
		<ExternalWriterConnectInput writer={writer} propName="url"/>
		<TuplePropertyLabel>Personal Access Token:</TuplePropertyLabel>
		<ExternalWriterConnectInput writer={writer} propName="pat"/>
	</ExternalWriterEventBusProvider>;
};

export const renderEditor = (writer: ExternalWriter, codes?: HoldByExternalWriter) => {
	const tenants: Array<QueryTenantForHolder> = (codes?.tenants || []);
	return <ExternalWriterEditor writer={writer} tenants={tenants}/>;
};
