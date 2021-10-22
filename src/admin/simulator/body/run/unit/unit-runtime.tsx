import React, {Fragment} from 'react';
import {PipelineRuntimeContext, StageRuntimeContext, UnitRuntimeContext} from '../types';
import {useCompleted} from './use-completed';
import {useRunInternalUnits} from './use-run-internal-units';
import {useRunUnit} from './use-run-unit';

export const UnitRuntime = (props: {
	pipelineContext: PipelineRuntimeContext;
	stageContext: StageRuntimeContext;
	context: UnitRuntimeContext;
}) => {
	const {pipelineContext, stageContext, context} = props;

	useRunUnit(pipelineContext, stageContext, context);
	useCompleted(pipelineContext, stageContext, context);
	useRunInternalUnits(pipelineContext, stageContext, context);

	return <Fragment/>;
};