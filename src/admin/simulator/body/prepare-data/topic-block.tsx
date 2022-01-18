import {Factor} from '@/services/data/tuples/factor-types';
import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {AlertLabel} from '@/widgets/alert/widgets';
import {Button} from '@/widgets/basic/button';
import {ICON_COLLAPSE_CONTENT, ICON_DELETE, ICON_EXPAND_CONTENT, ICON_LOOP, ICON_PLAY} from '@/widgets/basic/constants';
import {Input} from '@/widgets/basic/input';
import {ButtonInk, TooltipAlignment} from '@/widgets/basic/types';
import {uploadFile, UploadFileAcceptsJson} from '@/widgets/basic/utils';
import {DialogBody, DialogFooter} from '@/widgets/dialog/widgets';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import JSON5 from 'json5';
import React, {ChangeEvent, useEffect, useState} from 'react';
import {v4} from 'uuid';
import {useSimulatorEventBus} from '../../simulator-event-bus';
import {SimulatorEventTypes} from '../../simulator-event-bus-types';
import {DataRow} from '../../types';
import {getTopicName} from '../../utils';
import {ActiveStep} from '../state/types';
import {PipelineBlock} from './pipeline-block';
import {FlowTreeTopicNode} from './utils';
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

const DataCell = (props: { row: DataRow, factor: Factor }) => {
	const {row, factor} = props;

	const [value, setValue] = useState(() => {
		const value = row[factor.name];
		if (value == null || value === '') {
			return '';
		} else {
			return JSON5.stringify(value);
		}
	});
	// const forceUpdate = useForceUpdate();
	const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const {value} = event.target;
		const v = value.trim();
		try {
			if (v.startsWith('{') && v.endsWith('}')) {
				row[factor.name] = JSON5.parse(v);
			} else if (v.startsWith('[') && v.endsWith(']')) {
				row[factor.name] = JSON5.parse(v);
			} else {
				row[factor.name] = value;
			}
		} catch {
			row[factor.name] = value;
		}
		setValue(value);
	};

	// let value = row[factor.name] ?? '';
	// if (typeof value === 'object') {
	// 	value = JSON5.stringify(value);
	// }

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
		// console.log(validRows);
		setRows(rows => {
			return [...rows, ...validRows];
		});
	};
	const onFileSelected = async (file: File) => {
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
		uploadFile(UploadFileAcceptsJson, onFileSelected);
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
	const {on, off, fire} = useSimulatorEventBus();
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
		fire(SimulatorEventTypes.ASK_TOPIC_DATA, node.topic, (rows: Array<DataRow>) => {
			setDataRowsCount(rows.length);
		});
	}, [fire, node.topic]);

	const onConfirmClicked = (rows: Array<DataRow>) => {
		fire(SimulatorEventTypes.TOPIC_DATA_CHANGED, node.topic, rows);
		fireGlobal(EventTypes.HIDE_DIALOG);
	};
	const onDataClicked = () => {
		fire(SimulatorEventTypes.ASK_TOPIC_DATA, node.topic, (rows: Array<DataRow>) => {
			fireGlobal(EventTypes.SHOW_DIALOG,
				<DataDialog topic={node.topic} rows={rows} onConfirm={onConfirmClicked}/>,
				{
					marginTop: '5vh',
					marginLeft: '10%',
					width: '80%',
					height: '90vh'
				});
		});
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
	const {fire} = useSimulatorEventBus();
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
			fire(SimulatorEventTypes.ASK_PIPELINE_RUN, p.pipeline, (run: boolean) => {
				has = has || run;
			});
			return false;
		});

		if (!has) {
			fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>No pipeline is selected.</AlertLabel>);
			return;
		}

		fire(SimulatorEventTypes.ASK_TOPIC_DATA, node.topic, (rows: Array<DataRow>) => {
			if (rows.length === 0) {
				fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>No trigger data prepared.</AlertLabel>);
			} else {
				fire(SimulatorEventTypes.ACTIVE_STEP_CHANGED, ActiveStep.RUN);
			}
		});
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