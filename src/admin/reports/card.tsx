import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {ICON_SPACE, ICON_TOPIC, ICON_USER_GROUP} from '../../basic-widgets/constants';
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
			<TupleCardStatisticsItem tooltip={{label: 'Topics Count', alignment: TooltipAlignment.CENTER}}>
				<FontAwesomeIcon icon={ICON_TOPIC}/>
				<span>{report.topicCount}</span>
			</TupleCardStatisticsItem>
			<TupleCardStatisticsItem tooltip={{label: 'In User Groups', alignment: TooltipAlignment.CENTER}}>
				<FontAwesomeIcon icon={ICON_USER_GROUP}/>
				<span>{report.groupCount}</span>
			</TupleCardStatisticsItem>
			<TupleCardStatisticsItem tooltip={{label: 'In Spaces', alignment: TooltipAlignment.CENTER}}>
				<FontAwesomeIcon icon={ICON_SPACE}/>
				<span>{report.spaceCount}</span>
			</TupleCardStatisticsItem>
		</TupleCardStatistics>
	</TupleCard>;
};

export const renderCard = (report: QueryReport) => {
	return <ReportCard report={report}/>;
};