import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {Report, ReportIndicator, ReportIndicatorArithmetic} from '@/services/data/tuples/report-types';
import {Subject} from '@/services/data/tuples/subject-types';
import {AlertLabel} from '@/widgets/alert/widgets';
import {ICON_ADD} from '@/widgets/basic/constants';
import {ButtonInk} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import {ChartHelper} from '@/widgets/report/chart-utils';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {v4} from 'uuid';
import {useReportEditEventBus} from '../report-edit-event-bus';
import {ReportEditEventTypes} from '../report-edit-event-bus-types';
import {useChartType} from '../settings-effect/use-chart-type';
import {Section} from '../settings-widgets/section';
import {isScriptOpenedInChartOrIrrelevant} from '../utils';
import {IndicatorEditor} from './indicator';
import {AddIndicatorButton, AddIndicatorContainer} from './widgets';

export const IndicatorsSection = (props: { connectedSpace: ConnectedSpace, subject: Subject, report: Report }) => {
	const {connectedSpace, subject, report} = props;
	const {chart} = report;
	const {type} = chart;

	const {fire: fireGlobal} = useEventBus();
	const {fire} = useReportEditEventBus();
	const forceUpdate = useForceUpdate();
	useChartType({report});

	const onDelete = (indicator: ReportIndicator) => {
		const index = report.indicators.indexOf(indicator);
		if (index !== -1) {
			report.indicators.splice(index, 1);

			// indicators will not be deleted when switch chart type.
			// so in some case, even displayed indicators was deleted, count of indicator still be more than maximum
			// remove them now.
			// note didn't remove the needless indicators, in case of switch chart type back
			const chartUtils = ChartHelper[type];
			chartUtils.defendIndicatorMaxCount(report);

			fire(ReportEditEventTypes.INDICATOR_REMOVED, report, indicator);
			forceUpdate();
		}
	};
	const onAddIndicatorClicked = () => {
		const chartUtils = ChartHelper[type];
		if (!chartUtils.canAppendIndicators(report)) {
			fireGlobal(EventTypes.SHOW_ALERT,
				<AlertLabel>{Lang.CHART.CAN_NOT_ADD_INDICATOR}</AlertLabel>);
		} else {
			const indicator: ReportIndicator = {columnId: '', name: '', arithmetic: ReportIndicatorArithmetic.NONE};
			report.indicators.push(indicator);
			fire(ReportEditEventTypes.INDICATOR_ADDED, report, indicator);
			forceUpdate();
		}
	};

	/** defend */
	const chartUtils = ChartHelper[type];

	if (!chartUtils.shouldHasIndicator()) {
		return null;
	}

	chartUtils.defend(report);
	const canAddIndicator = chartUtils.canAppendIndicators(report) && isScriptOpenedInChartOrIrrelevant(connectedSpace, chart);

	return <Section title={Lang.CHART.SECTION_TITLE_INDICATORS} defaultExpanded={true}>
		{report.indicators.map((indicator, indicatorIndex) => {
			// ignore needless indicators
			if (indicatorIndex >= chartUtils.getMaxIndicatorCount()) {
				return null;
			}
			return <IndicatorEditor connectedSpace={connectedSpace} subject={subject} report={report}
			                        indicator={indicator}
			                        onDelete={onDelete}
			                        key={v4()}/>;
		})}
		{canAddIndicator
			? <AddIndicatorContainer>
				<AddIndicatorButton ink={ButtonInk.PRIMARY} onClick={onAddIndicatorClicked}>
					<FontAwesomeIcon icon={ICON_ADD}/>
					<span>{Lang.CHART.ADD_INDICATOR}</span>
				</AddIndicatorButton>
			</AddIndicatorContainer>
			: null}
	</Section>;
};