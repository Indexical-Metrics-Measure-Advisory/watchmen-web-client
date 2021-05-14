import React from 'react';
import {StageRuntimeContext} from '../types';
import {StageRuntime} from './stage-runtime';
import {UnitsRuntime} from './units-runtime';

export const StageRun = (props: { context: StageRuntimeContext }) => {
	const {context} = props;

	return <>
		<StageRuntime context={context}/>
		<UnitsRuntime context={context}/>
	</>;
};