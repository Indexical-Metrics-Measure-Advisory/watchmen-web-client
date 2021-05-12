import React, {ChangeEvent, useEffect, useState} from 'react';
import {Topic} from '../../../../services/tuples/topic-types';
import {
	BlockContainer,
	ChildrenBlock,
	DataTable,
	DataTableBodyCell,
	DataTableBodyRow,
	DataTableHeader,
	DataTableHeaderCell,
	DialogHeader,
	DialogTitle,
	LoopButton,
	NameBlock,
	TopicBlockType,
	TopicEditButton
} from './widgets';
import {getTopicName} from '../../utils';
import {ICON_COLLAPSE_CONTENT, ICON_EXPAND_CONTENT, ICON_LOOP} from '../../../../basic-widgets/constants';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Pipeline} from '../../../../services/tuples/pipeline-types';
import {PipelineBlock} from './pipeline-block';
import {ButtonInk, TooltipAlignment} from '../../../../basic-widgets/types';
import {FlowTreeTopicNode} from './utils';
import {useEventBus} from '../../../../events/event-bus';
import {EventTypes} from '../../../../events/types';
import {DialogBody, DialogFooter} from '../../../../dialog/widgets';
import {Button} from '../../../../basic-widgets/button';
import {Input} from '../../../../basic-widgets/input';
import {Factor} from '../../../../services/tuples/factor-types';
import {useForceUpdate} from '../../../../basic-widgets/utils';
import {useSimulatorEventBus} from '../../simulator-event-bus';
import {DataRow, SimulatorEventTypes} from '../../simulator-event-bus-types';

const DataCell = (props: { row: DataRow, factor: Factor }) => {
	const {row, factor} = props;

	const forceUpdate = useForceUpdate();
	const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		row[factor.name] = event.target.value;
		forceUpdate();
	};
	return <DataTableBodyCell key={factor.factorId}>
		<Input value={row[factor.name] ?? ''} onChange={onInputChange}/>
	</DataTableBodyCell>;
};
const DataDialog = (props: {
	topic: Topic,
	rows: Array<DataRow>;
	onConfirm: (rows: Array<DataRow>) => void
}) => {
	const {topic, rows: data, onConfirm} = props;

	const [rows, setRows] = useState<Array<DataRow>>(() => {
		try {
			return JSON.parse(JSON.stringify(data));
		} catch {
			return [];
		}
	});

	const onAddRowClicked = () => {
		setRows([...rows, {}]);
	};
	const onUploadClicked = () => {

	};
	const onConfirmClicked = () => {
		onConfirm(rows);
	};

	return <>
		<DialogHeader>
			<DialogTitle>Prepare Data for Topic[{getTopicName(topic)}]</DialogTitle>
		</DialogHeader>
		<DialogBody>
			<DataTable>
				<DataTableHeader columnCount={topic.factors.length}>
					<DataTableHeaderCell>#</DataTableHeaderCell>
					{topic.factors.map(factor => {
						return <DataTableHeaderCell key={factor.factorId}>{factor.name}</DataTableHeaderCell>;
					})}
				</DataTableHeader>
				{rows.map((row, rowIndex) => {
					return <DataTableBodyRow columnCount={topic.factors.length} key={rowIndex}>
						<DataTableBodyCell>{rowIndex + 1}</DataTableBodyCell>
						{topic.factors.map(factor => {
							return <DataCell key={factor.factorId} row={row} factor={factor}/>;
						})}
					</DataTableBodyRow>;
				})}
			</DataTable>
		</DialogBody>
		<DialogFooter>
			<Button ink={ButtonInk.PRIMARY} onClick={onAddRowClicked}>Add Row</Button>
			<Button ink={ButtonInk.PRIMARY} onClick={onUploadClicked}>Upload Rows</Button>
			<Button ink={ButtonInk.PRIMARY} onClick={onConfirmClicked}>OK</Button>
		</DialogFooter>
	</>;
};

export const TopicDataEdit = (props: { node: FlowTreeTopicNode }) => {
	const {node} = props;

	const {fire: fireGlobal} = useEventBus();
	const {once, on, off, fire} = useSimulatorEventBus();
	const [dataRowsCount, setDataRowsCount] = useState(0);
	useEffect(() => {
		const onTopicDataChanged = (topic: Topic, rows: Array<DataRow>) => {
			// eslint-disable-next-line
			if (topic.topicId == node.topic.topicId) {
				setDataRowsCount(rows.length);
			}
		};
		on(SimulatorEventTypes.TOPIC_DATA_CHANGED, onTopicDataChanged);
		return () => {
			off(SimulatorEventTypes.TOPIC_DATA_CHANGED, onTopicDataChanged);
		};
	}, [on, off, node.topic.topicId]);
	useEffect(() => {
		once(SimulatorEventTypes.REPLY_TOPIC_DATA, (rows: Array<DataRow>) => {
			setDataRowsCount(rows.length);
		}).fire(SimulatorEventTypes.ASK_TOPIC_DATA, node.topic);
	}, [once, node.topic]);

	const onConfirmClicked = (rows: Array<DataRow>) => {
		fire(SimulatorEventTypes.TOPIC_DATA_CHANGED, node.topic, rows);
		fireGlobal(EventTypes.HIDE_DIALOG);
	};
	const onDataClicked = () => {
		once(SimulatorEventTypes.REPLY_TOPIC_DATA, (rows: Array<DataRow>) => {
			fireGlobal(EventTypes.SHOW_DIALOG,
				<DataDialog topic={node.topic} rows={rows} onConfirm={onConfirmClicked}/>,
				{
					marginTop: '5vh',
					marginLeft: '10%',
					width: '80%',
					height: '90vh'
				});
		}).fire(SimulatorEventTypes.ASK_TOPIC_DATA, node.topic);
	};

	return <TopicEditButton onClick={onDataClicked}>{dataRowsCount}</TopicEditButton>;
};
export const TopicBlock = (props: {
	node: FlowTreeTopicNode;
	pipelines: Array<Pipeline>;
	topics: Map<string, Topic>;
	type: TopicBlockType;
}) => {
	const {node, pipelines, topics, type} = props;

	const [expanded, setExpanded] = useState(true);

	const onNameClicked = () => {
		if (node.pipelines.length !== 0) {
			setExpanded(!expanded);
		}
	};

	return <BlockContainer>
		<NameBlock onClick={onNameClicked} expanded={expanded}>
			{node.pipelines.length === 0
				? null
				: <FontAwesomeIcon icon={expanded ? ICON_COLLAPSE_CONTENT : ICON_EXPAND_CONTENT}/>
			}
			<span>{type.toLowerCase()}: {getTopicName(node.topic)}</span>
		</NameBlock>
		<TopicDataEdit node={node}/>
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