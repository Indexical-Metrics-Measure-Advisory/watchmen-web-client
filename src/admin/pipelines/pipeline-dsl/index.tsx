import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {ICON_CLOSE} from '@/widgets/basic/constants';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect, useReducer, useState} from 'react';
import {usePipelineEventBus} from '../pipeline/pipeline-event-bus';
import {PipelineEventTypes} from '../pipeline/pipeline-event-bus-types';
import {Dsl, EmptyLine, LineComment} from './dsl-widgets';
import {PipelinePart} from './pipeline-part';
import {StagesPart} from './stages-part';
import {CloseButton, DslBottomGap, DslContainer} from './widgets';

export const PipelineDsl = (props: { pipeline: Pipeline, topics: Array<Topic> }) => {
	const {pipeline, topics} = props;

	const {on, off} = usePipelineEventBus();
	const [visible, setVisible] = useState(false);
	const [status, forceUpdate] = useReducer(x => x <= 1 ? x + 1 : x - 1, 0);
	useEffect(() => {
		const onShowDsl = (ordered: Pipeline) => {
			if (ordered !== pipeline) {
				return;
			}
			forceUpdate();
		};
		on(PipelineEventTypes.SHOW_DSL, onShowDsl);
		return () => {
			off(PipelineEventTypes.SHOW_DSL, onShowDsl);
		};
	}, [on, off, pipeline]);
	useEffect(() => {
		if (status % 2 === 1) {
			setVisible(true);
		}
	}, [status]);

	if (status % 2 === 0) {
		return null;
	}

	const onTransitionEnd = () => {
		if (!visible) {
			forceUpdate();
		}
	};
	const onCloseClicked = () => {
		setVisible(false);
	};

	const topicsMap = topics.reduce((map, topic) => {
		map.set(topic.topicId, topic);
		return map;
	}, new Map<string, Topic>());

	return <DslContainer visible={visible} onTransitionEnd={onTransitionEnd}>
		<CloseButton onClick={onCloseClicked}>
			<FontAwesomeIcon icon={ICON_CLOSE}/>
		</CloseButton>
		<Dsl>
			<PipelinePart pipeline={pipeline} topicsMap={topicsMap}/>
			<StagesPart pipeline={pipeline} topicsMap={topicsMap}/>
			<EmptyLine/>
			<LineComment>End of Pipeline Definition</LineComment>
			<EmptyLine/>
		</Dsl>
		<DslBottomGap/>
	</DslContainer>;
};

export const PurePipelineDsl = (props: { pipeline: Pipeline, topics: Array<Topic> }) => {
	const {pipeline, topics} = props;

	const topicsMap = topics.reduce((map, topic) => {
		map.set(topic.topicId, topic);
		return map;
	}, new Map<string, Topic>());

	return <DslContainer visible={true}>
		<Dsl>
			<PipelinePart pipeline={pipeline} topicsMap={topicsMap}/>
			<StagesPart pipeline={pipeline} topicsMap={topicsMap}/>
			<EmptyLine/>
			<LineComment>End of Pipeline Definition</LineComment>
			<EmptyLine/>
		</Dsl>
	</DslContainer>;
};