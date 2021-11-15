import {Enum} from '@/services/data/tuples/enum-types';
import {QueryEnumForHolder} from '@/services/data/tuples/query-enum-types';
import {TuplePropertyLabel} from '@/widgets/tuple-workbench/tuple-editor';
import React from 'react';
import {EnumEventBusProvider} from './enum-event-bus';
import {EnumDescriptionInput} from './enum/enum-description-input';
import {EnumNameInput} from './enum/enum-name-input';
import {EnumParentInput} from './enum/enum-parent-input';
import {Items} from './items';
import {HoldByEnum} from './types';

const EnumEditor = (props: {
	enumeration: Enum;
	parents: Array<QueryEnumForHolder>;
}) => {
	const {enumeration, parents} = props;

	return <EnumEventBusProvider>
		<TuplePropertyLabel>Enum Name:</TuplePropertyLabel>
		<EnumNameInput enumeration={enumeration}/>
		<TuplePropertyLabel>Parent Enum:</TuplePropertyLabel>
		<EnumParentInput enumeration={enumeration} parents={parents}/>
		<TuplePropertyLabel>Description:</TuplePropertyLabel>
		<EnumDescriptionInput enumeration={enumeration}/>
		<Items enumeration={enumeration}/>
	</EnumEventBusProvider>;
};

export const renderEditor = (enumeration: Enum, codes?: HoldByEnum) => {
	const parents = (codes?.parents || []);
	return <EnumEditor enumeration={enumeration} parents={parents}/>;
};
