import {useVariablesEventBus} from './variables-event-bus';
import {useEffect} from 'react';
import {Pipeline} from '../../../../../services/tuples/pipeline-types';
import {PipelineStage} from '../../../../../services/tuples/pipeline-stage-types';
import {PipelineStageUnit} from '../../../../../services/tuples/pipeline-stage-unit-types';
import {PipelineStageUnitAction} from '../../../../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {VariablesEventTypes} from './variables-event-bus-types';
import {
	isCopyToMemoryAction,
	isReadFactorAction,
	isReadFactorsAction,
	isReadRowAction,
	isReadRowsAction,
	isReadTopicAction
} from '../../../../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
import {Topic} from '../../../../../services/tuples/topic-types';
import {computeParameterTypes} from '../../../../../services/tuples/factor-calculator-utils';
import {ParameterKind, TopicFactorParameter, Variable} from '../../../../../services/tuples/factor-calculator-types';

const buildVariables = (
	topics: Array<Topic>,
	pipeline: Pipeline,
	stage?: PipelineStage,
	unit?: PipelineStageUnit,
	action?: PipelineStageUnitAction
): Array<Variable> => {
	let actions: Array<PipelineStageUnitAction>;
	// compute actions before me
	if (stage && unit && action) {
		actions = pipeline.stages.slice(0, pipeline.stages.indexOf(stage)).map(currentStage => {
			let units = currentStage.units || [];
			if (currentStage === stage) {
				units = units.slice(0, stage.units.indexOf(unit));
			}
			return units.map(currentUnit => {
				let actions = currentUnit.do || [];
				if (currentUnit === unit) {
					actions = actions.slice(0, unit.do.indexOf(action));
				}
				return actions.filter(action => isReadTopicAction(action) || isCopyToMemoryAction(action));
			}).flat();
		}).flat();
	} else if (stage && unit) {
		actions = pipeline.stages.slice(0, pipeline.stages.indexOf(stage)).map(currentStage => {
			let units = currentStage.units || [];
			if (currentStage === stage) {
				units = units.slice(0, stage.units.indexOf(unit));
			}
			return units.map(unit => {
				return (unit.do || []).filter(action => isReadTopicAction(action) || isCopyToMemoryAction(action));
			}).flat();
		}).flat();
	} else if (stage) {
		actions = pipeline.stages.slice(0, pipeline.stages.indexOf(stage)).map(stage => {
			return (stage.units || []).map(unit => {
				return (unit.do || []).filter(action => isReadTopicAction(action) || isCopyToMemoryAction(action));
			}).flat();
		}).flat();
	} else {
		// in pipeline, no variable yet
		actions = [];
	}

	const variables: Array<Variable> = [];
	// eslint-disable-next-line
	const triggerTopic = topics.find(t => t.topicId == pipeline.topicId);
	actions.forEach(action => {
		if (isReadFactorAction(action)) {
			variables.push({
				name: action.variableName,
				types: computeParameterTypes({
					kind: ParameterKind.TOPIC,
					topicId: action.topicId,
					factorId: action.factorId
				} as TopicFactorParameter, topics, variables, triggerTopic)
			});
		} else if (isReadFactorsAction(action)) {
			variables.push({
				name: action.variableName,
				types: computeParameterTypes({
					kind: ParameterKind.TOPIC,
					topicId: action.topicId,
					factorId: action.factorId
				} as TopicFactorParameter, topics, variables, triggerTopic).map(t => {
					t.collection = true;
					return t;
				})
			});
		} else if (isReadRowAction(action)) {
			variables.push({
				name: action.variableName,
				types: computeParameterTypes({
					kind: ParameterKind.TOPIC,
					topicId: action.topicId
				} as TopicFactorParameter, topics, variables, triggerTopic)
			});
		} else if (isReadRowsAction(action)) {
			variables.push({
				name: action.variableName,
				types: computeParameterTypes({
					kind: ParameterKind.TOPIC,
					topicId: action.topicId
				} as TopicFactorParameter, topics, variables, triggerTopic).map(t => {
					t.collection = true;
					return t;
				})
			});
		} else if (isCopyToMemoryAction(action)) {
			variables.push({
				name: action.variableName,
				types: computeParameterTypes(action.source, topics, variables, triggerTopic)
			});
		}
	});

	return variables.reduceRight((temp, v) => {
		if (!v.name || !v.name.trim()) {
			// ignore noname
			return temp;
		}
		v.name = v.name.trim();
		// variable might be replaced
		if (!temp.exists[v.name]) {
			temp.all.push(v);
			temp.exists[v.name] = true;
		}
		return temp;
	}, {exists: {}, all: []} as { exists: { [key in string]: any }, all: Array<Variable> }).all.reverse();
};

export const VariablesHelper = (props: {
	pipeline: Pipeline;
	stage?: PipelineStage;
	unit?: PipelineStageUnit;
	action?: PipelineStageUnitAction;
	topics: Array<Topic>;
}) => {
	const {pipeline, stage, unit, action, topics} = props;

	const {fire, on, off} = useVariablesEventBus();
	useEffect(() => {
		const onAskVariables = () => {
			// eslint-disable-next-line
			const triggerTopic = topics.find(t => t.topicId == pipeline.topicId);
			fire(VariablesEventTypes.REPLY_VARIABLES, buildVariables(topics, pipeline, stage, unit, action), topics, triggerTopic);
		};
		on(VariablesEventTypes.ASK_VARIABLES, onAskVariables);
		return () => {
			off(VariablesEventTypes.ASK_VARIABLES, onAskVariables);
		};
	}, [on, off, fire, pipeline, stage, unit, action, topics]);

	return <></>;
};