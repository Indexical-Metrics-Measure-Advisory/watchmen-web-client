import React, {useState} from 'react';
import {Topic} from '../../../../services/tuples/topic-types';
import {BlockContainer, ChildrenBlock, EditButton, NameBlock, TopicBlockType, TopicRole} from './widgets';
import {getPipelineName, getTopicName} from '../../utils';
import {ICON_COLLAPSE_CONTENT, ICON_EDIT, ICON_EXPAND_CONTENT} from '../../../../basic-widgets/constants';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Pipeline} from '../../../../services/tuples/pipeline-types';
import {PipelineBlock} from './pipeline-block';

export const TopicBlock = (props: {
	topic: Topic;
	pipelines: Array<Pipeline>;
	topics: Map<string, Topic>;
	type: TopicBlockType;
}) => {
	const {topic, pipelines, topics, type} = props;

	const [expanded, setExpanded] = useState(true);

	const onNameClicked = () => {
		if (outgoingPipelines.length !== 0) {
			setExpanded(!expanded);
		}
	};
	// eslint-disable-next-line
	const outgoingPipelines = pipelines.filter(p => p.topicId == topic.topicId).sort((p1, p2) => {
		return getPipelineName(p1).toLowerCase().localeCompare(getPipelineName(p2).toLowerCase());
	});

	return <BlockContainer>
		<NameBlock onClick={onNameClicked} expanded={expanded}>
			{outgoingPipelines.length === 0
				? null
				: <FontAwesomeIcon icon={expanded ? ICON_COLLAPSE_CONTENT : ICON_EXPAND_CONTENT}/>
			}
			<span>Topic<TopicRole type={type}/>: {getTopicName(topic)}</span>
		</NameBlock>
		<EditButton>
			<FontAwesomeIcon icon={ICON_EDIT}/>
		</EditButton>
		{expanded && outgoingPipelines.length !== 0
			? <ChildrenBlock>
				{outgoingPipelines.map(p => {
					return <PipelineBlock pipeline={p} key={p.pipelineId}
					                      pipelines={pipelines} topics={topics}/>;
				})}
			</ChildrenBlock>
			: null
		}
	</BlockContainer>;
};