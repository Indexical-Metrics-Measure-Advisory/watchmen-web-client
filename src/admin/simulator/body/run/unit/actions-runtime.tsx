import {UnitRuntimeContext} from '../types';
import {ActionRun} from '../action';
import React from 'react';

export const ActionsRuntime = (props: { context: UnitRuntimeContext }) => {
	const {context} = props;

	return <>
		{context.actions.map(context => <ActionRun context={context} key={context.action.actionId}/>)}
	</>;
};