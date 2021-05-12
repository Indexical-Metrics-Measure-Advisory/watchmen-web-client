import React, {useState} from 'react';
import {Topic} from '../../../../services/tuples/topic-types';
import {BlockContainer, ChildrenBlock, LoopButton, NameBlock, TopicBlockType, TopicEditButton} from './widgets';
import {getTopicName} from '../../utils';
import {ICON_COLLAPSE_CONTENT, ICON_EXPAND_CONTENT, ICON_LOOP} from '../../../../basic-widgets/constants';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Pipeline} from '../../../../services/tuples/pipeline-types';
import {PipelineBlock} from './pipeline-block';
import {ButtonInk, TooltipAlignment} from '../../../../basic-widgets/types';
import {FlowTreeTopicNode} from './utils';
import {useEventBus} from '../../../../events/event-bus';
import {EventTypes} from '../../../../events/types';
import {DialogBody, DialogFooter, DialogLabel} from '../../../../dialog/widgets';
import {Button} from '../../../../basic-widgets/button';

const DataDialog = (props: { topic: Topic }) => {
	return <>
		<DialogBody>
			<DialogLabel>Hello</DialogLabel>
		</DialogBody>
		<DialogFooter>
			<Button ink={ButtonInk.PRIMARY}>OK</Button>
		</DialogFooter>
	</>;
};

export const TopicBlock = (props: {
	node: FlowTreeTopicNode;
	pipelines: Array<Pipeline>;
	topics: Map<string, Topic>;
	type: TopicBlockType;
}) => {
	const {node, pipelines, topics, type} = props;

	const {fire: fireGlobal} = useEventBus();
	const [expanded, setExpanded] = useState(true);

	const onNameClicked = () => {
		if (node.pipelines.length !== 0) {
			setExpanded(!expanded);
		}
	};
	const onDataClicked = () => {
		fireGlobal(EventTypes.SHOW_DIALOG, <DataDialog topic={node.topic}/>, {
			marginTop: '5vh',
			marginLeft: '10%',
			width: '80%',
			height: '90vh'
		});
	};

	return <BlockContainer>
		<NameBlock onClick={onNameClicked} expanded={expanded}>
			{node.pipelines.length === 0
				? null
				: <FontAwesomeIcon icon={expanded ? ICON_COLLAPSE_CONTENT : ICON_EXPAND_CONTENT}/>
			}
			<span>{type.toLowerCase()} Topic: {getTopicName(node.topic)}</span>
		</NameBlock>
		<TopicEditButton onClick={onDataClicked}>0</TopicEditButton>
		{node.loop
			? <LoopButton tooltip={{label: 'Loop Found', alignment: TooltipAlignment.CENTER}}>
				<FontAwesomeIcon icon={ICON_LOOP}/>
			</LoopButton>
			: null}
		{expanded && node.pipelines.length !== 0
			? <ChildrenBlock>
				{node.pipelines.map(p => {
					return <PipelineBlock node={p} key={p.pipeline.pipelineId}
					                      pipelines={pipelines} topics={topics}/>;
				})}
			</ChildrenBlock>
			: null
		}
	</BlockContainer>;
};