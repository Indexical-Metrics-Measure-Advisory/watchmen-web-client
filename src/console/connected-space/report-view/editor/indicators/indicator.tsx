import {ChartType} from '@/services/data/tuples/chart-types';
import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {MathFactorTypes} from '@/services/data/tuples/factor-types';
import {isTopicFactorParameter} from '@/services/data/tuples/parameter-utils';
import {Report, ReportIndicator, ReportIndicatorArithmetic} from '@/services/data/tuples/report-types';
import {Subject} from '@/services/data/tuples/subject-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {AlertLabel} from '@/widgets/alert/widgets';
import {ICON_DELETE} from '@/widgets/basic/constants';
import {DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import {ChartHelper} from '@/widgets/report/chart-utils';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect, useState} from 'react';
// noinspection ES6PreferShortImport
import {useConsoleEventBus} from '../../../../console-event-bus';
// noinspection ES6PreferShortImport
import {ConsoleEventTypes} from '../../../../console-event-bus-types';
import {useReportEditEventBus} from '../report-edit-event-bus';
import {ReportEditEventTypes} from '../report-edit-event-bus-types';
import {PropValueDropdown} from '../settings-widgets/widgets';
import {isScriptOpenedInChartOrIrrelevant} from '../utils';
import {
	DeleteMeButton,
	DeleteMeContainer,
	IncorrectOptionLabel,
	IndicatorContainer,
	IndicatorIndexLabel,
	IndicatorPropValue
} from './widgets';

export const IndicatorEditor = (props: {
	connectedSpace: ConnectedSpace;
	subject: Subject;
	report: Report;
	indicator: ReportIndicator;
	onDelete: (indicator: ReportIndicator) => void;
}) => {
	const {connectedSpace, subject, report, indicator, onDelete} = props;
	const {chart} = report;
	const {type: chartType} = chart;

	const {fire: fireGlobal} = useEventBus();
	const {fire: fireConsole} = useConsoleEventBus();
	const {fire} = useReportEditEventBus();
	const [availableTopics, setAvailableTopic] = useState<Array<Topic>>([]);
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		fireConsole(ConsoleEventTypes.ASK_AVAILABLE_TOPICS, (availableTopics: Array<Topic>) => {
			setAvailableTopic(availableTopics);
			forceUpdate();
		});
	}, [fireConsole, forceUpdate, subject, report]);

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
	const availableColumns = subject.dataset.columns.filter(column => {
		if (column.parameter == null) {
			return false;
		} else if (isTopicFactorParameter((column.parameter))) {
			const {topicId, factorId} = column.parameter;
			// eslint-disable-next-line
			const topic = availableTopics.find(topic => topic.topicId == topicId);
			// eslint-disable-next-line
			const factor = topic?.factors.find(factor => factor.factorId == factorId);
			if (factor == null) {
				return false;
			} else {
				return MathFactorTypes.includes(factor.type);
			}
		} else {
			// any parameter constant or computed is available
			return true;
		}
	});
	const indicatorOptions: Array<DropdownOption> = availableColumns.map((column, columnIndex) => {
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
	const selectionExists = !columnId || availableColumns.some(column => column.columnId == columnId);
	if (!selectionExists) {
		indicatorOptions.push({
			value: columnId,
			label: () => {
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

	const scriptOpened = isScriptOpenedInChartOrIrrelevant(connectedSpace, chart);
	const buildLabel = () => {
		// eslint-disable-next-line
		const columnLabel = indicatorOptions.find(option => option.value == columnId)?.label ?? '?';
		if (arithmetic == null || arithmetic === ReportIndicatorArithmetic.NONE) {
			return columnLabel;
		} else {
			const arithmeticLabel = arithmeticOptions.find(a => a.value === arithmetic)?.label;
			return <>{arithmeticLabel}({columnLabel})</>;
		}
	};

	return <IndicatorContainer removable={scriptOpened}>
		<IndicatorIndexLabel>{index}</IndicatorIndexLabel>
		{scriptOpened
			? <>
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
			</>
			: <IndicatorPropValue>
				{buildLabel()}
			</IndicatorPropValue>}
	</IndicatorContainer>;
};