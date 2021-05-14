import {StageRuntimeContext} from '../types';
import {UnitRun} from '../unit';
import React from 'react';

export const UnitsRuntime = (props: {context: StageRuntimeContext}) => {
	const {context} = props;

	return <>
		{context.units.map(context => <UnitRun context={context} key={context.unit.unitId}/>)}
	</>
}