import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {AlertLabel} from '@/widgets/alert/widgets';
import {
	ICON_CHECK,
	ICON_CHECK_ALL,
	ICON_COLLAPSE_CONTENT,
	ICON_EXPAND_CONTENT,
	ICON_UNCHECK
} from '@/widgets/basic/constants';
import {TooltipAlignment} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect, useState} from 'react';
import {useSimulatorEventBus} from '../../simulator-event-bus';
import {SimulatorEventTypes} from '../../simulator-event-bus-types';
import {getPipelineName, getTopicName} from '../../utils';
import {TopicBlock} from './topic-block';
import {FlowTreePipelineNode} from './utils';
import {
	BlockContainer,
	ChildrenBlock,
	NameBlock,
	PipelineEditButton,
	PipelineEditButtons,
	PipelineName,
	TopicBlockType
} from './widgets';

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
	useEffect(() => {
		fire(SimulatorEventTypes.ASK_PIPELINE_RUN, node.pipeline, (run: boolean) => {
			node.checked = run;
			forceUpdate();
		});
	}, [fire, forceUpdate, node]);

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