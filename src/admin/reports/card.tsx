import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {ICON_CREATED_AT, ICON_LAST_MODIFIED_AT} from '../../basic-widgets/constants';
import {TooltipAlignment} from '../../basic-widgets/types';
import {QueryReport} from '../../services/tuples/query-report-types';
import {
	TupleCard,
	TupleCardDescription,
	TupleCardStatistics,
	TupleCardStatisticsItem,
	TupleCardTitle
} from '../widgets/tuple-workbench/tuple-card';
import {useTupleEventBus} from '../widgets/tuple-workbench/tuple-event-bus';
import {TupleEventTypes} from '../widgets/tuple-workbench/tuple-event-bus-types';
import {prettifyDateTimeToMinute} from '../../services/tuples/utils';

const ReportCard = (props: { report: QueryReport }) => {
	const {report} = props;

	const {fire} = useTupleEventBus();
	const onEditClicked = () => {
		fire(TupleEventTypes.DO_EDIT_TUPLE, report);
	};
	return <TupleCard key={report.reportId} onClick={onEditClicked}>
		<TupleCardTitle>{report.name}</TupleCardTitle>
		<TupleCardDescription>{report.description}</TupleCardDescription>
		<TupleCardStatistics>
			<TupleCardStatisticsItem tooltip={{label: 'Created At', alignment: TooltipAlignment.CENTER}}>
				<FontAwesomeIcon icon={ICON_CREATED_AT}/>
				<span>{prettifyDateTimeToMinute(report.createTime)}</span>
			</TupleCardStatisticsItem>
			<TupleCardStatisticsItem tooltip={{label: 'Last Modified At', alignment: TooltipAlignment.CENTER}}>
				<FontAwesomeIcon icon={ICON_LAST_MODIFIED_AT}/>
				<span>{prettifyDateTimeToMinute(report.lastModifyTime)}</span>
			</TupleCardStatisticsItem>
		</TupleCardStatistics>
	</TupleCard>;
};

export const renderCard = (report: QueryReport) => {
	return <ReportCard report={report}/>;
};