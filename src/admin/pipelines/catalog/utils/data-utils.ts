import { SystemActionType } from '../../../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import { isWriteTopicAction } from '../../../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
import {
	AlarmAction,
	AlarmActionSeverity
} from '../../../../services/tuples/pipeline-stage-unit-action/system-actions-types';
import { Pipeline, PipelineTriggerType } from '../../../../services/tuples/pipeline-types';
import { generateUuid } from '../../../../services/tuples/utils';
import { getCurrentTime } from '../../../../services/utils';

export const computeRelatedTopicIds = (pipeline: Pipeline): Array<{ source: string, target: string }> => {
	const sourceTopicId = pipeline.topicId;

	return pipeline.stages.map(stage => {
		return stage.units.map(unit => {
			return unit.do.map(action => {
				if (!isWriteTopicAction(action)) {
					return null;
				}

				const { topicId } = action;
				return topicId;
			}).filter(x => !!x) as Array<string>;
		}).flat();
	}).flat().map(targetTopicId => {
		return { source: sourceTopicId, target: targetTopicId };
	});
};

export const createPipeline = (topicId: string, name?: string): Pipeline => {
	const pipelineId = generateUuid();
	return {
		pipelineId,
		topicId,
		name: name || 'Noname Pipeline',
		type: PipelineTriggerType.INSERT_OR_MERGE,
		conditional: false,
		stages: [
			{
				name: '', conditional: false,
				units: [ {
					conditional: false,
					do: [ {
						type: SystemActionType.ALARM,
						conditional: false,
						severity: AlarmActionSeverity.MEDIUM,
						message: ''
					} as AlarmAction ]
				} ]
			}
		],
		enabled: false,
		createTime: getCurrentTime(),
		lastModifyTime: getCurrentTime()
	};
};
