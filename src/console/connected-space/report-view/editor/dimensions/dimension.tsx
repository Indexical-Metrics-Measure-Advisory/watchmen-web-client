import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {Report, ReportDimension} from '@/services/data/tuples/report-types';
import {Subject} from '@/services/data/tuples/subject-types';
import {AlertLabel} from '@/widgets/alert/widgets';
import {ICON_DELETE} from '@/widgets/basic/constants';
import {DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import {ChartHelper} from '@/widgets/report/chart-utils';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {useReportEditEventBus} from '../report-edit-event-bus';
import {ReportEditEventTypes} from '../report-edit-event-bus-types';
import {PropValue, PropValueDropdown} from '../settings-widgets/widgets';
import {isScriptOpenedInChartOrIrrelevant} from '../utils';
import {
	DeleteMeButton,
	DeleteMeContainer,
	DimensionContainer,
	DimensionIndexLabel,
	IncorrectOptionLabel
} from './widgets';

export const DimensionEditor = (props: {
	connectedSpace: ConnectedSpace;
	subject: Subject;
	report: Report;
	dimension: ReportDimension;
	onDelete: (dimension: ReportDimension) => void;
}) => {
	const {connectedSpace, subject, report, dimension, onDelete} = props;
	const {chart} = report;
	const {type: chartType} = chart;

	const {fire: fireGlobal} = useEventBus();
	const {fire} = useReportEditEventBus();
	const forceUpdate = useForceUpdate();

	const onColumnChange = (option: DropdownOption) => {
		const {value} = option;
		dimension.columnId = value;
		// eslint-disable-next-line
		dimension.name = subject.dataset.columns.find(column => column.columnId == value)?.alias ?? '';
		fire(ReportEditEventTypes.DIMENSION_CHANGED, report, dimension);
		forceUpdate();
	};
	const onDeleteClicked = () => {
		const canDelete = ChartHelper[chartType].canReduceDimensions(report);
		if (!canDelete) {
			fireGlobal(EventTypes.SHOW_ALERT,
				<AlertLabel>{Lang.CHART.CAN_NOT_DELETE_DIMENSION}</AlertLabel>);
		} else {
			onDelete(dimension);
		}
	};

	const index = report.dimensions.indexOf(dimension) + 1;
	const {columnId} = dimension;
	const dimensionOptions: Array<DropdownOption> = subject.dataset.columns.map((column, columnIndex) => {
		return {
			value: column.columnId,
			label: () => {
				return {
					node: column.alias ||
						<IncorrectOptionLabel>{Lang.CHART.NONAME_COLUMN} #{columnIndex + 1}</IncorrectOptionLabel>,
					label: column.alias || ''
				};
			}
		};
	});
	// not selected or exists
	// eslint-disable-next-line
	const selectionExists = !columnId || subject.dataset.columns.some(column => column.columnId == columnId);
	if (!selectionExists) {
		dimensionOptions.push({
			value: columnId,
			label: () => {
				return {
					node: <IncorrectOptionLabel>{Lang.CHART.UNKNOWN_COLUMN_NAME}</IncorrectOptionLabel>,
					label: ''
				};
			}
		});
	}

	const scriptOpened = isScriptOpenedInChartOrIrrelevant(connectedSpace, chart);
	const buildLabel = () => {
		// eslint-disable-next-line
		return dimensionOptions.find(option => option.value == columnId)?.label ?? '?';
	};

	return <DimensionContainer removable={scriptOpened}>
		<DimensionIndexLabel>{index}</DimensionIndexLabel>
		{scriptOpened
			? <>
				<PropValue>
					<PropValueDropdown value={columnId} options={dimensionOptions}
					                   placeholder={Lang.CHART.PLEASE_SELECT_DIMENSION}
					                   onValueChange={onColumnChange}/>
				</PropValue>
				<DeleteMeContainer>
					<DeleteMeButton onClick={onDeleteClicked}>
						<FontAwesomeIcon icon={ICON_DELETE}/>
					</DeleteMeButton>
				</DeleteMeContainer>
			</>
			: <PropValue>{buildLabel()}</PropValue>}
	</DimensionContainer>;
};