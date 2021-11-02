import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {Fragment, useEffect, useState} from 'react';
import {useSimulatorEventBus} from '../../simulator-event-bus';
import {SimulatorEventTypes} from '../../simulator-event-bus-types';
import {DataRow} from '../../types';
import {ActiveStep, SimulateStart, SimulatorState, StartFrom, TopicsData} from './types';

export const SimulatorStates = () => {
	const {on, off, fire} = useSimulatorEventBus();
	const [state, setState] = useState<SimulatorState>({
		step: ActiveStep.SELECT,

		startFrom: StartFrom.PIPELINE,
		startTopic: null,
		startPipeline: null,

		runPipelines: [],
		topicsData: {}
	});

	useEffect(() => {
		const onStartFromChanged = (startFrom: StartFrom) => {
			setState(state => {
				return {...state, startFrom, startTopic: null, startPipeline: null, runPipelines: [], topicsData: {}};
			});
		};
		const onStartPipelineChanged = (pipeline: Pipeline | null) => {
			setState(state => {
				return {...state, startTopic: null, startPipeline: pipeline, runPipelines: [], topicsData: {}};
			});
		};
		const onStartTopicChanged = (topic: Topic | null) => {
			setState(state => {
				return {...state, startTopic: topic, startPipeline: null, runPipelines: [], topicsData: {}};
			});
		};
		const onActiveStepChanged = (step: ActiveStep) => {
			setState(state => ({...state, step}));
		};
		on(SimulatorEventTypes.START_FROM_CHANGED, onStartFromChanged);
		on(SimulatorEventTypes.START_PIPELINE_CHANGED, onStartPipelineChanged);
		on(SimulatorEventTypes.START_TOPIC_CHANGED, onStartTopicChanged);
		on(SimulatorEventTypes.ACTIVE_STEP_CHANGED, onActiveStepChanged);
		return () => {
			off(SimulatorEventTypes.START_FROM_CHANGED, onStartFromChanged);
			off(SimulatorEventTypes.START_PIPELINE_CHANGED, onStartPipelineChanged);
			off(SimulatorEventTypes.START_TOPIC_CHANGED, onStartTopicChanged);
			off(SimulatorEventTypes.ACTIVE_STEP_CHANGED, onActiveStepChanged);
		};
	}, [on, off]);

	useEffect(() => {
		const onAskStart = (onStart: (start: SimulateStart) => void) => {
			onStart({
				startFrom: state.startFrom,
				startTopic: state.startTopic,
				startPipeline: state.startPipeline
			});
		};
		on(SimulatorEventTypes.ASK_START, onAskStart);
		return () => {
			off(SimulatorEventTypes.ASK_START, onAskStart);
		};
	}, [on, off, fire, state.startFrom, state.startTopic, state.startPipeline]);

	useEffect(() => {
		const onAskPipelineRun = (pipeline: Pipeline, onRunGet: (run: boolean) => void) => {
			onRunGet(state.runPipelines.includes(pipeline));
		};
		on(SimulatorEventTypes.ASK_PIPELINE_RUN, onAskPipelineRun);
		return () => {
			off(SimulatorEventTypes.ASK_PIPELINE_RUN, onAskPipelineRun);
		};
	}, [on, off, fire, state.runPipelines]);
	useEffect(() => {
		const onPipelineRunChanged = (pipeline: Pipeline, run: boolean) => {
			if (run) {
				setState(state => ({...state, runPipelines: Array.from(new Set([...state.runPipelines, pipeline]))}));
			} else {
				setState(state => ({...state, runPipelines: state.runPipelines.filter(p => p !== pipeline)}));
			}
		};
		on(SimulatorEventTypes.PIPELINE_RUN_CHANGED, onPipelineRunChanged);
		return () => {
			off(SimulatorEventTypes.PIPELINE_RUN_CHANGED, onPipelineRunChanged);
		};
	}, [on, off]);

	useEffect(() => {
		const onAskTopicData = (topic: Topic, onData: (rows: Array<DataRow>) => void) => {
			const rows = state.topicsData[topic.topicId] || [];
			onData(rows);
		};
		on(SimulatorEventTypes.ASK_TOPIC_DATA, onAskTopicData);
		return () => {
			off(SimulatorEventTypes.ASK_TOPIC_DATA, onAskTopicData);
		};
	}, [on, off, fire, state.topicsData]);
	useEffect(() => {
		const onTopicDataChanged = (topic: Topic, rows: Array<DataRow>) => {
			setState(state => {
				return {
					...state,
					topicsData: {
						...state.topicsData,
						[topic.topicId]: rows
					}
				};
			});
		};
		on(SimulatorEventTypes.TOPIC_DATA_CHANGED, onTopicDataChanged);
		return () => {
			off(SimulatorEventTypes.TOPIC_DATA_CHANGED, onTopicDataChanged);
		};
	}, [on, off]);

	useEffect(() => {
		const onAskRunMaterial = (onMaterial: (topicData: TopicsData, pipelines: Array<Pipeline>) => void) => {
			// serialize and deserialize rows to break relation with original data
			onMaterial(JSON.parse(JSON.stringify(state.topicsData)), state.runPipelines);
		};
		on(SimulatorEventTypes.ASK_RUN_MATERIAL, onAskRunMaterial);
		return () => {
			off(SimulatorEventTypes.ASK_RUN_MATERIAL, onAskRunMaterial);
		};
	}, [on, off, fire, state.topicsData, state.runPipelines]);

	return <Fragment/>;
};