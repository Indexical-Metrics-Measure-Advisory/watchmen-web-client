import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {AlertLabel} from '../../../../../../alert/widgets';
import {ICON_DELETE} from '../../../../../../basic-widgets/constants';
import {DropdownOption} from '../../../../../../basic-widgets/types';
import {useForceUpdate} from '../../../../../../basic-widgets/utils';
import {useEventBus} from '../../../../../../events/event-bus';
import {EventTypes} from '../../../../../../events/types';
import {Lang} from '../../../../../../langs';
import {ChartHelper} from '../../../../../../report/chart-utils';
import {Report, ReportIndicator, ReportIndicatorArithmetic} from '../../../../../../services/tuples/report-types';
import {Subject} from '../../../../../../services/tuples/subject-types';
import {useReportEditEventBus} from '../report-edit-event-bus';
import {ReportEditEventTypes} from '../report-edit-event-bus-types';
import {PropValueDropdown} from '../settings-widgets/widgets';
import {
	DeleteMeButton,
	DeleteMeContainer,
	IncorrectOptionLabel,
	IndicatorContainer,
	IndicatorIndexLabel,
	IndicatorPropValue
} from './widgets';

export const IndicatorEditor = (props: {
	subject: Subject;
	report: Report;
	indicator: ReportIndicator;
	onDelete: (indicator: ReportIndicator) => void;
}) => {
	const {subject, report, indicator, onDelete} = props;
	const {chart: {type: chartType}} = report;

	const {fire: fireGlobal} = useEventBus();
	const {fire} = useReportEditEventBus();
	const forceUpdate = useForceUpdate();

	const onColumnChange = (option: DropdownOption) => {
		const {value} = option;
		indicator.columnId = value;
		fire(ReportEditEventTypes.INDICATOR_CHANGED, report, indicator);
		forceUpdate();
	};
	const onArithmeticChange = (option: DropdownOption) => {
		const {value} = option;
		indicator.arithmetic = value;
		fire(ReportEditEventTypes.INDICATOR_CHANGED, report, indicator);
		forceUpdate();
	};
	const onDeleteClicked = () => {
		const canDelete = ChartHelper[chartType].canReduceIndicators(report);
		if (!canDelete) {
			fireGlobal(EventTypes.SHOW_ALERT,
				<AlertLabel>{Lang.CHART.CAN_NOT_DELETE_INDICATOR}</AlertLabel>);
		} else {
			onDelete(indicator);
		}
	};

	const index = report.indicators.indexOf(indicator) + 1;
	const {columnId, arithmetic} = indicator;
	const indicatorOptions: Array<DropdownOption> = subject.dataset.columns.map((column, columnIndex) => {
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
		indicatorOptions.push({
			value: columnId, label: () => {
				return {
					node: <IncorrectOptionLabel>{Lang.CHART.UNKNOWN_COLUMN_NAME}</IncorrectOptionLabel>,
					label: ''
				};
			}
		});
	}
	const arithmeticOptions: Array<DropdownOption> = [
		{value: ReportIndicatorArithmetic.NONE, label: Lang.CHART.ARITHMETIC_NONE},
		{value: ReportIndicatorArithmetic.SUMMARY, label: Lang.CHART.ARITHMETIC_SUMMARY},
		{value: ReportIndicatorArithmetic.AVERAGE, label: Lang.CHART.ARITHMETIC_AVERAGE},
		{value: ReportIndicatorArithmetic.COUNT, label: Lang.CHART.ARITHMETIC_COUNT},
		{value: ReportIndicatorArithmetic.MAXIMUM, label: Lang.CHART.ARITHMETIC_MAX},
		{value: ReportIndicatorArithmetic.MINIMUM, label: Lang.CHART.ARITHMETIC_MIN}
	];

	return <IndicatorContainer>
		<IndicatorIndexLabel>{index}</IndicatorIndexLabel>
		<IndicatorPropValue>
			<PropValueDropdown value={columnId} options={indicatorOptions}
			                   onChange={onColumnChange}
			                   please={Lang.CHART.PLEASE_SELECT_INDICATOR}/>
			<PropValueDropdown value={arithmetic || ReportIndicatorArithmetic.NONE} options={arithmeticOptions}
			                   onChange={onArithmeticChange}/>
		</IndicatorPropValue>
		<DeleteMeContainer>
			<DeleteMeButton onClick={onDeleteClicked}>
				<FontAwesomeIcon icon={ICON_DELETE}/>
			</DeleteMeButton>
		</DeleteMeContainer>
	</IndicatorContainer>;
};