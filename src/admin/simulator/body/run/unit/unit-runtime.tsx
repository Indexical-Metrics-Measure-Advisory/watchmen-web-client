import {PipelineRuntimeContext, StageRuntimeContext, UnitRuntimeContext} from '../types';
import React from 'react';
import {useRunUnit} from './use-run-unit';
import {useCompleted} from './use-completed';
import {useRunInternalUnits} from './use-run-internal-units';

export const UnitRuntime = (props: {
	pipelineContext: PipelineRuntimeContext;
	stageContext: StageRuntimeContext;
	context: UnitRuntimeContext;
}) => {
	const {pipelineContext, stageContext, context} = props;

	useRunUnit(pipelineContext, stageContext, context);
	useCompleted(pipelineContext, stageContext, context);
	useRunInternalUnits(pipelineContext, stageContext, context);

	return <></>;
};