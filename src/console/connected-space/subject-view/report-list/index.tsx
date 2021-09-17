import {toSubjectReport} from '@/routes/utils';
import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {Report} from '@/services/data/tuples/report-types';
import {Subject} from '@/services/data/tuples/subject-types';
import {ICON_DIMENSION, ICON_FILTER, ICON_INDICATOR} from '@/widgets/basic/constants';
import {TooltipAlignment} from '@/widgets/basic/types';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {useHistory} from 'react-router-dom';
import {
	ReportCard,
	ReportCardDescription,
	ReportCardStatistics,
	ReportCardStatisticsItem,
	ReportCardTitle,
	ReportListContainer,
	ReportListScroller
} from './widgets';

export const ReportList = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const {connectedSpace, subject} = props;

	const history = useHistory();
	const onEditClicked = (report: Report) => () => {
		history.push(toSubjectReport(connectedSpace.connectId, subject.subjectId, report.reportId));
	};

	const reports = subject.reports || [];

	return <ReportListScroller>
		<ReportListContainer>
			{reports.map(report => {
				return <ReportCard key={report.reportId} onClick={onEditClicked(report)}>
					<ReportCardTitle>
						<span>{report.name || Lang.PLAIN.DEFAULT_REPORT_NAME}</span>
					</ReportCardTitle>
					<ReportCardDescription>{report.description}</ReportCardDescription>
					<ReportCardStatistics>
						<ReportCardStatisticsItem
							tooltip={{label: Lang.CHART.INDICATORS, alignment: TooltipAlignment.CENTER}}>
							<FontAwesomeIcon icon={ICON_INDICATOR}/>
							<span>{(report.indicators || []).length}</span>
						</ReportCardStatisticsItem>
						<ReportCardStatisticsItem
							tooltip={{label: Lang.CHART.DIMENSIONS, alignment: TooltipAlignment.CENTER}}>
							<FontAwesomeIcon icon={ICON_DIMENSION}/>
							<span>{(report.dimensions || []).length}</span>
						</ReportCardStatisticsItem>
						<ReportCardStatisticsItem
							tooltip={{label: Lang.CHART.FILTERS, alignment: TooltipAlignment.CENTER}}>
							<FontAwesomeIcon icon={ICON_FILTER}/>
							<span>{(report.filters && report.filters.filters && report.filters.filters.length !== 0) ? Lang.STANDARD.YES : Lang.STANDARD.NO}</span>
						</ReportCardStatisticsItem>
					</ReportCardStatistics>
				</ReportCard>;
			})}
		</ReportListContainer>
	</ReportListScroller>;
};