import {DeclaredVariables} from '@/services/data/tuples/factor-calculator-types';
import {PipelineStage} from '@/services/data/tuples/pipeline-stage-types';
import {
	PipelineStageUnitAction
} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {
	isCopyToMemoryAction,
	isReadTopicAction
} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
import {PipelineStageUnit} from '@/services/data/tuples/pipeline-stage-unit-types';
import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {buildVariables} from '@/services/data/tuples/pipeline-validation-utils';
import {Topic} from '@/services/data/tuples/topic-types';
import {Fragment, useEffect} from 'react';
import {usePipelineEventBus} from '../../pipeline-event-bus';
import {PipelineEventTypes} from '../../pipeline-event-bus-types';
import {useVariablesEventBus} from './variables-event-bus';
import {VariablesEventTypes} from './variables-event-bus-types';

export const VariablesHelper = (props: {
	pipeline: Pipeline;
	stage?: PipelineStage;
	unit?: PipelineStageUnit;
	action?: PipelineStageUnitAction;
	topics: Array<Topic>;
}) => {
	const {pipeline, stage, unit, action, topics} = props;

	const {on: onPipeline, off: offPipeline} = usePipelineEventBus();
	const {fire, on, off} = useVariablesEventBus();
	useEffect(() => {
		const onAskVariables = (onData: (variables: DeclaredVariables, topics: Array<Topic>, triggerTopic?: Topic) => void) => {
			// eslint-disable-next-line
			const triggerTopic = topics.find(t => t.topicId == pipeline.topicId);
			onData(buildVariables(topics, pipeline, stage, unit, action), topics, triggerTopic);
		};
		on(VariablesEventTypes.ASK_VARIABLES, onAskVariables);
		return () => {
			off(VariablesEventTypes.ASK_VARIABLES, onAskVariables);
		};
	}, [on, off, fire, pipeline, stage, unit, action, topics]);
	useEffect(() => {
		if (!stage) {
			// this is on pipeline level, no action change can impact this
			return;
		}
		const onActionChanged = (p: Pipeline, s: PipelineStage, u: PipelineStageUnit, a: PipelineStageUnitAction) => {
			// only read topic action and copy to memory action impact the constant validation
			if (p !== pipeline || (!isReadTopicAction(a) && !isCopyToMemoryAction(a))) {
				return;
			}
			const myStageIndex = p.stages.indexOf(stage);
			const changedStageIndex = p.stages.indexOf(s);
			if (changedStageIndex > myStageIndex) {
				// action change occurs after this stage, no impact
				return;
			} else if (changedStageIndex === myStageIndex) {
				if (!unit) {
					// this is on stage level, action change occurs in this stage caused no impact
					return;
				}
				const myUnitIndex = s.units.indexOf(unit);
				const changedUnitIndex = s.units.indexOf(u);
				if (changedUnitIndex > myUnitIndex) {
					// action changed occurs after this unit, no impact
					return;
				} else if (changedUnitIndex === myUnitIndex) {
					if (!action) {
						// this is on unit level, action change occurs in this unit caused no impact
						return;
					}
					const myActionIndex = u.do.indexOf(action);
					const changedActionIndex = u.do.indexOf(a);
					if (changedActionIndex >= myActionIndex) {
						// change action is this or after this, no impact
						return;
					}
				}
			} else {
				// action change occurs before this stage, impact, need fire event
			}

			// delay for 100ms
			setTimeout(() => fire(VariablesEventTypes.VARIABLE_CHANGED), 100);
		};
		onPipeline(PipelineEventTypes.ACTION_CHANGED, onActionChanged);
		return () => {
			offPipeline(PipelineEventTypes.ACTION_CHANGED, onActionChanged);
		};
	}, [onPipeline, offPipeline, fire, pipeline, stage, unit, action]);

	return <Fragment/>;
};