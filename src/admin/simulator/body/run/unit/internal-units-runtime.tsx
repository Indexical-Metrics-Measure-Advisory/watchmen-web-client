import React, {useEffect, useState} from 'react';
import {useRuntimeEventBus} from '../runtime/runtime-event-bus';
import {RuntimeEventTypes} from '../runtime/runtime-event-bus-types';
import {PipelineRuntimeContext, StageRuntimeContext, UnitRuntimeContext} from '../types';
import {buildInternalUnitRuntimeContext} from '../utils';
import {InternalUnitRun} from './internal';

export const InternalUnitsRuntime = (props: {
	pipelineContext: PipelineRuntimeContext;
	stageContext: StageRuntimeContext;
	context: UnitRuntimeContext;
}) => {
	const {pipelineContext, stageContext, context: unitContext} = props;

	const [built, setBuilt] = useState(false);

	// get loop variable value to check loop is needed or not
	const {on, off, fire} = useRuntimeEventBus();
	useEffect(() => {
		const onRunUnit = (c: UnitRuntimeContext) => {
			if (c !== unitContext) {
				// only first one handle the pipeline start event
				return;
			}
			const loopVariableName = unitContext.unit.loopVariableName;
			if (!loopVariableName || loopVariableName.trim().length === 0) {
				// no loop declared, fire event to run internal units
				fire(RuntimeEventTypes.RUN_INTERNAL_UNITS, unitContext);
			} else {
				const value = pipelineContext.variables[loopVariableName.trim()];
				if (!value || !Array.isArray(value)) {
					// no loop because of value is not an array, fire event to run internal units
					fire(RuntimeEventTypes.RUN_INTERNAL_UNITS, unitContext);
				} else {
					// construct unit runtime context delegate to run loop
					unitContext.internals = value.map((item, index) => {
						return buildInternalUnitRuntimeContext(unitContext.unit, index, {[loopVariableName.trim()]: item});
					});
					// trigger ui render
					setBuilt(true);
				}
			}
		};
		on(RuntimeEventTypes.BUILD_INTERNAL_UNITS, onRunUnit);
		return () => {
			off(RuntimeEventTypes.BUILD_INTERNAL_UNITS, onRunUnit);
		};
	}, [on, off, fire, pipelineContext.variables, unitContext]);
	useEffect(() => {
		if (!built) {
			return;
		}

		fire(RuntimeEventTypes.RUN_INTERNAL_UNITS, unitContext);
	}, [fire, built, unitContext]);

	return <>
		{unitContext.internals.map((context, index) => {
			return <InternalUnitRun pipelineContext={pipelineContext} stageContext={stageContext}
			                        unitContext={unitContext} context={context}
			                        key={`${context.unit.unitId}-${index}`}/>;
		})}
	</>;
};