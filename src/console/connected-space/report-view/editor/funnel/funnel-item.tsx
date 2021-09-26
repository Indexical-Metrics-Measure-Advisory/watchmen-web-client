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
	const {subject, funnel, index} = props;

	const [hover, setHover] = useState(false);
	const forceUpdate = useForceUpdate();
	// eslint-disable-next-line
	const column = subject.dataset.columns.find(column => column.columnId == funnel.columnId);

	const onMouseEntered = () => setHover(true);
	const onMouseLeft = () => setHover(false);
	const onRangeChange = (value: boolean) => {
		funnel.range = value;
		forceUpdate();
	};
	const onEnabledChange = (value: boolean) => {
		funnel.enabled = value;
		forceUpdate();
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