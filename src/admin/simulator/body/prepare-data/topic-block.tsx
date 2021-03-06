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
	PlayButton,
	RowDeleteButton,
	TopicBlockType,
	TopicEditButton
} from './widgets';
import {getTopicName} from '../../utils';
import {
	ICON_COLLAPSE_CONTENT,
	ICON_DELETE,
	ICON_EXPAND_CONTENT,
	ICON_LOOP,
	ICON_PLAY
} from '../../../../basic-widgets/constants';
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
import {SimulatorEventTypes} from '../../simulator-event-bus-types';
import {AlertLabel} from '../../../../alert/widgets';
import {ActiveStep} from '../state/types';
import {v4} from 'uuid';
import JSON5 from 'json5';
import {DataRow} from '../../types';

const DataCell = (props: { row: DataRow, factor: Factor }) => {
	const {row, factor} = props;

	const forceUpdate = useForceUpdate();
	const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const {value} = event.target;
		const v = value.trim();
		try {
			if (v.startsWith('{') && v.endsWith('}')) {
				row[factor.name] = JSON.parse(v);
			} else if (v.startsWith('[') && v.endsWith(']')) {
				row[factor.name] = JSON.parse(v);
			} else {
				row[factor.name] = value;
			}
		} catch {
			row[factor.name] = value;
		}
		forceUpdate();
	};

	let value = row[factor.name] ?? '';
	if (typeof value === 'object') {
		value = JSON.stringify(value);
	}

	return <DataTableBodyCell key={factor.factorId}>
		<Input value={value} onChange={onInputChange}/>
	</DataTableBodyCell>;
};
const DataDialog = (props: {
	topic: Topic,
	rows: Array<DataRow>;
	onConfirm: (rows: Array<DataRow>) => void
}) => {
	const {topic, rows: data, onConfirm} = props;

	const {fire} = useEventBus();
	const [rows, setRows] = useState<Array<DataRow>>(() => {
		try {
			return JSON.parse(JSON.stringify(data));
		} catch {
			return [];
		}
	});

	const onRemoveRowClicked = (row: DataRow) => () => {
		setRows(rows.filter(r => r !== row));
	};
	const onAddRowClicked = () => {
		setRows([...rows, {}]);
	};
	const onAddRows = (rows: Array<any>) => {
		const validRows = rows.filter(row => row != null && typeof row === 'object')
			.map((row) => {
				return topic.factors.reduce((data, factor) => {
					data[factor.name] = row[factor.name];
					return data;
				}, {} as DataRow);
			});
		console.log(validRows);
		setRows(rows => {
			return [...rows, ...validRows];
		});
	};
	const onFileSelected = (input: HTMLInputElement) => async () => {
		if (!input.files || input.files.length === 0) {
			return;
		}
		const file = input.files.item(0);
		if (!file) {
			return;
		}
		const content = await file.text();
		try {
			const data = JSON5.parse(content);
			if (data == null) {
				fire(EventTypes.SHOW_ALERT, <AlertLabel>There is no data in selected file.</AlertLabel>);
			} else if (Array.isArray(data)) {
				onAddRows(data);
			} else if (data.data && Array.isArray(data.data)) {
				onAddRows(data.data);
			} else {
				fire(EventTypes.SHOW_ALERT, <AlertLabel>Cannot determine data from selected file.</AlertLabel>);
			}
		} catch {
			fire(EventTypes.SHOW_ALERT, <AlertLabel>
				Cannot parse the selected file, make sure it is on well-formed json or json5 format.
			</AlertLabel>);
		}
	};
	const onUploadClicked = () => {
		const input = document.createElement('input');
		input.type = 'file';
		input.multiple = false;
		input.accept = '.json,.json5';
		input.onchange = onFileSelected(input);
		input.click();
	};
	const onDownloadClicked = () => {
		const content = [topic.factors.reduce((data, factor) => {
			data[factor.name] = null;
			return data;
		}, {} as DataRow)];

		const link = document.createElement('a');
		link.href = 'data:application/json;charset=utf-8,' + encodeURI(JSON.stringify(content));
		link.target = '_blank';
		link.download = `topic-data-template.json`;
		link.click();
	};
	const onConfirmClicked = () => {
		onConfirm(rows);
	};

	// only top level factors
	// use json object/array string for raw topic
	// eslint-disable-next-line
	const availableFactors = topic.factors.filter(f => f.name.indexOf('.') == -1);

	return <>
		<DialogHeader>
			<DialogTitle>Prepare Data for Topic[{getTopicName(topic)}]</DialogTitle>
		</DialogHeader>
		<DialogBody>
			<DataTable>
				<DataTableHeader columnCount={availableFactors.length}>
					<DataTableHeaderCell>#</DataTableHeaderCell>
					{availableFactors.map(factor => {
						return <DataTableHeaderCell key={factor.factorId}>{factor.name}</DataTableHeaderCell>;
					})}
				</DataTableHeader>
				{rows.map((row, rowIndex) => {
					return <DataTableBodyRow columnCount={availableFactors.length} key={v4()}>
						<RowDeleteButton ink={ButtonInk.DANGER} onClick={onRemoveRowClicked(row)}>
							<FontAwesomeIcon icon={ICON_DELETE}/>
						</RowDeleteButton>
						<DataTableBodyCell>{rowIndex + 1}</DataTableBodyCell>
						{availableFactors.map(factor => {
							return <DataCell key={factor.factorId} row={row} factor={factor}/>;
						})}
					</DataTableBodyRow>;
				})}
			</DataTable>
		</DialogBody>
		<DialogFooter>
			<Button ink={ButtonInk.PRIMARY} onClick={onDownloadClicked}>Download Template</Button>
			<Button ink={ButtonInk.PRIMARY} onClick={onUploadClicked}>Upload Rows</Button>
			<div style={{flexGrow: 1}}/>
			<Button ink={ButtonInk.PRIMARY} onClick={onAddRowClicked}>Add Row</Button>
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

	const {fire: fireGlobal} = useEventBus();
	const {once, fire} = useSimulatorEventBus();
	const [expanded, setExpanded] = useState(true);

	const onNameClicked = () => {
		if (node.pipelines.length !== 0) {
			setExpanded(!expanded);
		}
	};
	const onNextClicked = async () => {
		let has = false;
		node.pipelines.some(p => {
			if (has) {
				// previous is checked
				return true;
			}
			once(SimulatorEventTypes.REPLY_PIPELINE_RUN, (run: boolean) => {
				has = has || run;
			}).fire(SimulatorEventTypes.ASK_PIPELINE_RUN, p.pipeline);
			return false;
		});

		if (!has) {
			fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>No pipeline is selected.</AlertLabel>);
			return;
		}

		once(SimulatorEventTypes.REPLY_TOPIC_DATA, (rows: Array<DataRow>) => {
			if (rows.length === 0) {
				fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>No trigger data prepared.</AlertLabel>);
			} else {
				fire(SimulatorEventTypes.ACTIVE_STEP_CHANGED, ActiveStep.RUN);
			}
		}).fire(SimulatorEventTypes.ASK_TOPIC_DATA, node.topic);
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
		{node.parent == null
			? <PlayButton ink={ButtonInk.PRIMARY} onClick={onNextClicked}>
				<FontAwesomeIcon icon={ICON_PLAY}/>
				<span>Next</span>
			</PlayButton>
			: null}
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