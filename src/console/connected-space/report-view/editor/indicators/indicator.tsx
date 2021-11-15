import {ChartType} from '@/services/data/tuples/chart-types';
import {Report, ReportIndicator, ReportIndicatorArithmetic} from '@/services/data/tuples/report-types';
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
		// eslint-disable-next-line
		indicator.name = subject.dataset.columns.find(column => column.columnId == value)?.alias ?? '';
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
		chartType !== ChartType.COUNT ? {
			value: ReportIndicatorArithmetic.NONE,
			label: Lang.CHART.ARITHMETIC_NONE
		} : null,
		{value: ReportIndicatorArithmetic.SUMMARY, label: Lang.CHART.ARITHMETIC_SUMMARY},
		{value: ReportIndicatorArithmetic.AVERAGE, label: Lang.CHART.ARITHMETIC_AVERAGE},
		{value: ReportIndicatorArithmetic.COUNT, label: Lang.CHART.ARITHMETIC_COUNT},
		{value: ReportIndicatorArithmetic.MAXIMUM, label: Lang.CHART.ARITHMETIC_MAX},
		{value: ReportIndicatorArithmetic.MINIMUM, label: Lang.CHART.ARITHMETIC_MIN}
	].filter(x => x) as Array<DropdownOption>;

	return <IndicatorContainer>
		<IndicatorIndexLabel>{index}</IndicatorIndexLabel>
		<IndicatorPropValue>
			<PropValueDropdown value={columnId} options={indicatorOptions}
			                   placeholder={Lang.CHART.PLEASE_SELECT_INDICATOR}
			                   onValueChange={onColumnChange}/>
			<PropValueDropdown value={arithmetic || ReportIndicatorArithmetic.NONE} options={arithmeticOptions}
			                   onValueChange={onArithmeticChange}/>
		</IndicatorPropValue>
		<DeleteMeContainer>
			<DeleteMeButton onClick={onDeleteClicked}>
				<FontAwesomeIcon icon={ICON_DELETE}/>
			</DeleteMeButton>
		</DeleteMeContainer>
	</IndicatorContainer>;
};