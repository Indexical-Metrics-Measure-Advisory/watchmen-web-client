import { PipelineStage } from '../../services/tuples/pipeline-stage-types';
import { SystemActionType } from '../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {
	AlarmAction,
	AlarmActionSeverity
} from '../../services/tuples/pipeline-stage-unit-action/system-actions-types';
import { PipelineStageUnit } from '../../services/tuples/pipeline-stage-unit-types';
import { Pipeline, PipelineTriggerType } from '../../services/tuples/pipeline-types';
import { generateUuid } from '../../services/tuples/utils';
import { getCurrentTime } from '../../services/utils';

export const createAction = (): AlarmAction => {
	return {
		type: SystemActionType.ALARM,
		conditional: false,
		severity: AlarmActionSeverity.MEDIUM,
		message: ''
	};
};
export const createUnit = (): PipelineStageUnit => {
	return {
		conditional: false,
		do: [ createAction() ]
	};
};
export const createStage = (): PipelineStage => {
	return {
		name: 'Noname Stage',
		conditional: false,
		units: [ createUnit() ]
	};
};

export const createPipeline = (topicId: string, name?: string): Pipeline => {
	const pipelineId = generateUuid();
	return {
		pipelineId,
		topicId,
		name: name || 'Noname Pipeline',
		type: PipelineTriggerType.INSERT_OR_MERGE,
		conditional: false,
		stages: [ createStage() ],
		enabled: false,
		createTime: getCurrentTime(),
		lastModifyTime: getCurrentTime()
	};
};
