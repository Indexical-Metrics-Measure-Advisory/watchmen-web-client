import React, {useState} from 'react';
import {BlockContainer, ChildrenBlock, NameBlock, TopicBlockType} from './widgets';
import {getPipelineName, getTopicName} from '../../utils';
import {ICON_COLLAPSE_CONTENT, ICON_EXPAND_CONTENT} from '../../../../basic-widgets/constants';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Pipeline} from '../../../../services/tuples/pipeline-types';
import {
	isReadTopicAction,
	isWriteTopicAction
} from '../../../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
import {Topic} from '../../../../services/tuples/topic-types';
import {TopicBlock} from './topic-block';

export const PipelineBlock = (props: {
	pipeline: Pipeline;
	pipelines: Array<Pipeline>;
	topics: Map<string, Topic>;
}) => {
	const {pipeline, pipelines, topics} = props;

	const [expanded, setExpanded] = useState(true);

	const onNameClicked = () => {
		setExpanded(!expanded);
	};

	const writeTopics: Map<string, Topic> = new Map();
	const readTopics: Map<string, Topic> = new Map();

	pipeline.stages.forEach(stage => {
		stage.units.forEach(unit => {
			unit.do.forEach(action => {
				if (isWriteTopicAction(action)) {
					const topicId = action.topicId;
					writeTopics.set(topicId, topics.get(topicId)!);
				} else if (isReadTopicAction(action)) {
					const topicId = action.topicId;
					readTopics.set(topicId, topics.get(topicId)!);
				}
			});
		});
	});
	const touchedTopics = Array.from(new Set([
		...writeTopics.values(),
		...readTopics.values()
	])).sort((t1, t2) => {
		return getTopicName(t1).toLowerCase().localeCompare(getTopicName(t2).toLowerCase());
	});

	return <BlockContainer>
		<NameBlock onClick={onNameClicked} expanded={expanded}>
			<FontAwesomeIcon icon={expanded ? ICON_COLLAPSE_CONTENT : ICON_EXPAND_CONTENT}/>
			<span>Pipeline: {getPipelineName(pipeline)}</span>
		</NameBlock>
		{expanded
			? <ChildrenBlock>
				{touchedTopics.map(t => {
					const write = writeTopics.has(t.topicId);
					const read = readTopics.has(t.topicId);
					let type = (read && write) ? TopicBlockType.READ_WRITE : (read ? TopicBlockType.READ_ONLY : TopicBlockType.WRITE_ONLY);
					return <TopicBlock topic={t} type={type}
					                   key={t.topicId}
					                   pipelines={pipelines} topics={topics}/>;
				})}
			</ChildrenBlock>
			: null
		}
	</BlockContainer>;
};