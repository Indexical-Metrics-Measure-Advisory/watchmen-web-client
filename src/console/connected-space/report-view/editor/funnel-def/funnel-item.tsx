import {Report, ReportFunnel} from '@/services/data/tuples/report-types';
import {Subject} from '@/services/data/tuples/subject-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {ReportFunnelLabels} from '@/widgets/funnel/widgets';
import React, {useState} from 'react';
import {useReportEditEventBus} from '../report-edit-event-bus';
import {ReportEditEventTypes} from '../report-edit-event-bus-types';
import {FunnelCheckBox, FunnelCheckBoxContainer, FunnelColumnLabel, FunnelIndexLabel} from './widgets';

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
		fire(ReportEditEventTypes.FUNNEL_RANGE_CHANGED, report, funnel);
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
			{column?.alias} - {ReportFunnelLabels[funnel.type]}
		</FunnelColumnLabel>
		<FunnelCheckBoxContainer data-hover={hover} onMouseEnter={onMouseEntered} onMouseLeave={onMouseLeft}>
			<FunnelCheckBox value={funnel.range} onChange={onRangeChange}/>
		</FunnelCheckBoxContainer>
		<FunnelCheckBoxContainer data-hover={hover} onMouseEnter={onMouseEntered} onMouseLeave={onMouseLeft}>
			<FunnelCheckBox value={funnel.enabled} onChange={onEnabledChange}/>
		</FunnelCheckBoxContainer>
	</>;
};