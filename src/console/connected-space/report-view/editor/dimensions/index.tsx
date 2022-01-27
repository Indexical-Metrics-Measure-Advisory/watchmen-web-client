import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {Report, ReportDimension} from '@/services/data/tuples/report-types';
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
import {DimensionEditor} from './dimension';
import {AddDimensionButton, AddDimensionContainer} from './widgets';

export const DimensionsSection = (props: { connectedSpace: ConnectedSpace, subject: Subject, report: Report }) => {
	const {connectedSpace, subject, report} = props;
	const {chart} = report;
	const {type} = chart;

	const {fire: fireGlobal} = useEventBus();
	const {fire} = useReportEditEventBus();
	const forceUpdate = useForceUpdate();
	useChartType({report});

	const onDelete = (dimension: ReportDimension) => {
		const index = report.dimensions.indexOf(dimension);
		if (index !== -1) {
			report.dimensions.splice(index, 1);

			// dimensions will not be deleted when switch chart type.
			// so in some case, even displayed dimension was deleted, count of dimension still be more than maximum
			// remove them now.
			// note didn't remove the needless dimensions, in case of switch chart type back
			const chartUtils = ChartHelper[type];
			chartUtils.defendDimensionMaxCount(report);

			fire(ReportEditEventTypes.DIMENSION_REMOVED, report, dimension);
			forceUpdate();
		}
	};
	const onAddDimensionClicked = () => {
		const chartUtils = ChartHelper[type];
		if (!chartUtils.canAppendDimensions(report)) {
			fireGlobal(EventTypes.SHOW_ALERT,
				<AlertLabel>{Lang.CHART.CAN_NOT_ADD_DIMENSION}</AlertLabel>);
		} else {
			const dimension: ReportDimension = {columnId: '', name: ''};
			report.dimensions.push(dimension);
			fire(ReportEditEventTypes.DIMENSION_ADDED, report, dimension);
			forceUpdate();
		}
	};

	/** defend */
	const chartUtils = ChartHelper[type];

	if (!chartUtils.shouldHasDimension()) {
		return null;
	}

	chartUtils.defend(report);
	const canAddDimension = chartUtils.canAppendDimensions(report) && isScriptOpenedInChartOrIrrelevant(connectedSpace, chart);

	return <Section title={Lang.CHART.SECTION_TITLE_DIMENSIONS} defaultExpanded={true}>
		{report.dimensions.map((dimension, dimensionIndex) => {
			// ignore needless dimensions
			if (dimensionIndex >= chartUtils.getMaxDimensionCount()) {
				return null;
			}
			return <DimensionEditor connectedSpace={connectedSpace} subject={subject} report={report}
			                        dimension={dimension}
			                        onDelete={onDelete}
			                        key={v4()}/>;
		})}
		{canAddDimension
			? <AddDimensionContainer>
				<AddDimensionButton ink={ButtonInk.PRIMARY} onClick={onAddDimensionClicked}>
					<FontAwesomeIcon icon={ICON_ADD}/>
					<span>{Lang.CHART.ADD_DIMENSION}</span>
				</AddDimensionButton>
			</AddDimensionContainer>
			: null}
	</Section>;
};