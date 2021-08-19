import {ConnectedSpace} from '../../../../services/tuples/connected-space-types';
import {Subject} from '../../../../services/tuples/subject-types';
import {
	ReportCard,
	ReportCardDescription,
	ReportCardStatistics,
	ReportCardStatisticsItem,
	ReportCardTitle,
	ReportListContainer,
	ReportListScroller
} from './widgets';
import {TooltipAlignment} from '../../../../basic-widgets/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ICON_DIMENSION, ICON_FILTER, ICON_INDICATOR} from '../../../../basic-widgets/constants';
import React from 'react';
import {Report} from '../../../../services/tuples/report-types';
import {useHistory} from 'react-router-dom';
import {toSubjectReport} from '../../../../routes/utils';
import {Lang} from '../../../../langs';

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