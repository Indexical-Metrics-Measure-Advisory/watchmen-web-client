import React, {useState} from 'react';
import {
	BlockContainer,
	ChildrenBlock,
	NameBlock,
	PipelineEditButton,
	PipelineEditButtons,
	PipelineName,
	TopicBlockType
} from './widgets';
import {getPipelineName, getTopicName} from '../../utils';
import {
	ICON_CHECK,
	ICON_CHECK_ALL,
	ICON_COLLAPSE_CONTENT,
	ICON_EXPAND_CONTENT,
	ICON_UNCHECK
} from '../../../../basic-widgets/constants';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Pipeline} from '../../../../services/tuples/pipeline-types';
import {Topic} from '../../../../services/tuples/topic-types';
import {TopicBlock} from './topic-block';
import {TooltipAlignment} from '../../../../basic-widgets/types';
import {useSimulatorEventBus} from '../../simulator-event-bus';
import {SimulatorEventTypes} from '../../simulator-event-bus-types';
import {FlowTreePipelineNode} from './utils';
import {useForceUpdate} from '../../../../basic-widgets/utils';
import {useEventBus} from '../../../../events/event-bus';
import {EventTypes} from '../../../../events/types';
import {AlertLabel} from '../../../../alert/widgets';

export const PipelineBlock = (props: {
	node: FlowTreePipelineNode;
	pipelines: Array<Pipeline>;
	topics: Map<string, Topic>;
}) => {
	const {node, pipelines, topics} = props;

	const {fire: fireGlobal} = useEventBus();
	const {fire} = useSimulatorEventBus();
	const [expanded, setExpanded] = useState(true);
	const forceUpdate = useForceUpdate();

	const onNameClicked = () => {
		setExpanded(!expanded);
	};
	const doCheckDescendants = (node: FlowTreePipelineNode, checked: boolean) => {
		node.writeTopics.forEach(t => {
			t.pipelines.forEach(p => {
				p.checked = checked;
				fire(SimulatorEventTypes.PIPELINE_RUN_CHANGED, p.pipeline, checked);
				doCheckDescendants(p, checked);
			});
		});
	};
	const onRunMeClicked = () => {
		if (!node.checked) {
			// currently ignored, want to add into run list, parent must be checked
			const parent = node.parent.parent;
			if (parent && !parent.checked) {
				fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>
					Pipeline can be added into run list only when parent already added.
				</AlertLabel>);
			}
		}

		node.checked = !node.checked;
		fire(SimulatorEventTypes.PIPELINE_RUN_CHANGED, node.pipeline, node.checked);
		if (!node.checked) {
			// ignore me, then ignore all descendants
			doCheckDescendants(node, false);
		}
		forceUpdate();
	};
	const onRunAllClicked = () => {
		node.checked = true;
		fire(SimulatorEventTypes.PIPELINE_RUN_CHANGED, node.pipeline, true);
		doCheckDescendants(node, true);
		forceUpdate();
	};
	const writeTopics = node.writeTopics.map(t => t.topic);
	const readTopics = node.readTopics.map(t => t.topic);
	const touchedTopics = Array.from(new Set([
		...writeTopics,
		...readTopics
	])).sort((t1, t2) => {
		return getTopicName(t1).toLowerCase().localeCompare(getTopicName(t2).toLowerCase());
	});

	return <BlockContainer>
		<NameBlock onClick={onNameClicked} expanded={expanded}>
			<FontAwesomeIcon icon={expanded ? ICON_COLLAPSE_CONTENT : ICON_EXPAND_CONTENT}/>
			<PipelineName run={node.checked}>Pipeline: {getPipelineName(node.pipeline)}</PipelineName>
		</NameBlock>
		<PipelineEditButtons>
			<PipelineEditButton
				tooltip={{
					label: node.checked ? 'Ignore Me & All Descendants' : 'Me Only',
					alignment: TooltipAlignment.CENTER
				}}
				onClick={onRunMeClicked}>
				<FontAwesomeIcon icon={node.checked ? ICON_UNCHECK : ICON_CHECK}/>
			</PipelineEditButton>
			<PipelineEditButton tooltip={{label: 'Me & All Descendants', alignment: TooltipAlignment.CENTER}}
			                    onClick={onRunAllClicked}>
				<FontAwesomeIcon icon={ICON_CHECK_ALL}/>
			</PipelineEditButton>
		</PipelineEditButtons>
		{expanded
			? <ChildrenBlock>
				{touchedTopics.map(topic => {
					const write = writeTopics.includes(topic);
					const read = readTopics.includes(topic);
					const topicNode = node.writeTopics.find(t => t.topic === topic) ?? node.readTopics.find(t => t.topic === topic)!;
					let type = (read && write) ? TopicBlockType.READ_WRITE : (read ? TopicBlockType.READ_ONLY : TopicBlockType.WRITE_ONLY);
					return <TopicBlock node={topicNode} type={type}
					                   key={topic.topicId}
					                   pipelines={pipelines} topics={topics}/>;
				})}
			</ChildrenBlock>
			: null
		}
	</BlockContainer>;
};