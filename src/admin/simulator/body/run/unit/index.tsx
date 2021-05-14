import React from 'react';
import {UnitRuntimeContext} from '../types';
import {UnitRuntime} from './unit-runtime';
import {ActionsRuntime} from './actions-runtime';

export const UnitRun = (props: { context: UnitRuntimeContext }) => {
	const {context} = props;

	return <>
		<UnitRuntime context={context}/>
		<ActionsRuntime context={context}/>
	</>;
};