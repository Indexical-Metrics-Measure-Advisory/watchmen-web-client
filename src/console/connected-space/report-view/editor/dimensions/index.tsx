import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {v4} from 'uuid';
import {AlertLabel} from '../../../../../alert/widgets';
import {ICON_ADD} from '../../../../../basic-widgets/constants';
import {ButtonInk} from '../../../../../basic-widgets/types';
import {useForceUpdate} from '../../../../../basic-widgets/utils';
import {useEventBus} from '../../../../../events/event-bus';
import {EventTypes} from '../../../../../events/types';
import {Lang} from '../../../../../langs';
import {ChartHelper} from '../../../../../report/chart-utils';
import {Report, ReportDimension} from '../../../../../services/tuples/report-types';
import {Subject} from '../../../../../services/tuples/subject-types';
import {useReportEditEventBus} from '../report-edit-event-bus';
import {ReportEditEventTypes} from '../report-edit-event-bus-types';
import {useChartType} from '../settings-effect/use-chart-type';
import {Section} from '../settings-widgets/section';
import {DimensionEditor} from './dimension';
import {AddDimensionButton, AddDimensionContainer} from './widgets';

export const DimensionsSection = (props: { subject: Subject, report: Report }) => {
	const {subject, report} = props;
	const {chart: {type}} = report;

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
	const canAddDimension = chartUtils.canAppendDimensions(report);

	return <Section title={Lang.CHART.SECTION_TITLE_DIMENSIONS}>
		{report.dimensions.map((dimension, dimensionIndex) => {
			// ignore needless dimensions
			if (dimensionIndex >= chartUtils.getMaxDimensionCount()) {
				return null;
			}
			return <DimensionEditor subject={subject} report={report} dimension={dimension}
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