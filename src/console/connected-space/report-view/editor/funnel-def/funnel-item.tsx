import {useReportEditEventBus} from '@/console/connected-space/report-view/editor/report-edit-event-bus';
import {ReportEditEventTypes} from '@/console/connected-space/report-view/editor/report-edit-event-bus-types';
import {Report, ReportFunnel, ReportFunnelType} from '@/services/data/tuples/report-types';
import {Subject} from '@/services/data/tuples/subject-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import React, {useState} from 'react';
import {FunnelCheckBox, FunnelCheckBoxContainer, FunnelColumnLabel, FunnelIndexLabel} from './widgets';

const Labels: { [key in ReportFunnelType]: string } = {
	[ReportFunnelType.NUMERIC]: Lang.FUNNEL.NUMERIC,
	[ReportFunnelType.DATE]: Lang.FUNNEL.DATE,
	[ReportFunnelType.YEAR]: Lang.FUNNEL.YEAR,
	[ReportFunnelType.MONTH]: Lang.FUNNEL.MONTH,
	[ReportFunnelType.WEEK_OF_MONTH]: Lang.FUNNEL.WEEK_OF_MONTH,
	[ReportFunnelType.DAY_OF_WEEK]: Lang.FUNNEL.DAY_OF_WEEK,
	[ReportFunnelType.ENUM]: Lang.FUNNEL.ENUM
};

export const FunnelItem = (props: { subject: Subject, report: Report; funnel: ReportFunnel; index: number }) => {
	const {subject, report, funnel, index} = props;

	const {fire} = useReportEditEventBus();
	const [hover, setHover] = useState(false);
	const forceUpdate = useForceUpdate();
	// eslint-disable-next-line
	const column = subject.dataset.columns.find(column => column.columnId == funnel.columnId);

	const onMouseEntered = () => setHover(true);
	const onMouseLeft = () => setHover(false);
	const onRangeChange = (value: boolean) => {
		funnel.range = value;
		forceUpdate();
		fire(ReportEditEventTypes.FUNNEL_CHANGED, report, funnel);
	};
	const onEnabledChange = (value: boolean) => {
		funnel.enabled = value;
		forceUpdate();
		if (funnel.enabled) {
			fire(ReportEditEventTypes.FUNNEL_ADDED, report, funnel);
		} else {
			fire(ReportEditEventTypes.FUNNEL_REMOVED, report, funnel);
		}
	};

	return <>
		<FunnelIndexLabel data-hover={hover} onMouseEnter={onMouseEntered} onMouseLeave={onMouseLeft}>
			{index}
		</FunnelIndexLabel>
		<FunnelColumnLabel data-hover={hover} onMouseEnter={onMouseEntered} onMouseLeave={onMouseLeft}>
			{column?.alias} - {Labels[funnel.type]}
		</FunnelColumnLabel>
		<FunnelCheckBoxContainer data-hover={hover} onMouseEnter={onMouseEntered} onMouseLeave={onMouseLeft}>
			<FunnelCheckBox value={funnel.range} onChange={onRangeChange}/>
		</FunnelCheckBoxContainer>
		<FunnelCheckBoxContainer data-hover={hover} onMouseEnter={onMouseEntered} onMouseLeave={onMouseLeft}>
			<FunnelCheckBox value={funnel.enabled} onChange={onEnabledChange}/>
		</FunnelCheckBoxContainer>
	</>;
};