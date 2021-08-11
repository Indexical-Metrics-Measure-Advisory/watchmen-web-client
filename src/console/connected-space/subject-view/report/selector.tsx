import React, {useEffect, useState} from 'react';
import {Subject} from '../../../../services/tuples/subject-types';
import {
	NavigatorHeaderButton,
	ReportCandidate,
	SubjectReportList,
	SubjectReportsSelector,
	SubjectSelectReport
} from './widgets';
import {Lang} from '../../../../langs';
import {TooltipAlignment} from '../../../../basic-widgets/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ICON_ADD, ICON_COLLAPSE_PANEL, ICON_EXPAND_PANEL} from '../../../../basic-widgets/constants';
import {createReport} from '../../../utils/tuples';
import {EventTypes} from '../../../../events/types';
import {saveNewReport} from '../../../../services/tuples/report';
import {SubjectEventTypes} from '../subject-event-bus-types';
import {useEventBus} from '../../../../events/event-bus';
import {useSubjectEventBus} from '../subject-event-bus';
import {Report} from '../../../../services/tuples/report-types';

export const ReportsSelector = (props: { subject: Subject; editable: boolean }) => {
	const {subject, editable} = props;

	const {fire: fireGlobal} = useEventBus();
	const {fire, on, off} = useSubjectEventBus();
	const [report, setReport] = useState(() => {
		if (subject.reports && subject.reports.length !== 0) {
			return subject.reports[0];
		} else {
			return null;
		}
	});
	const [expanded, setExpanded] = useState(false);
	useEffect(() => {
		const onReportAdded = (report: Report) => {
			setReport(report);
		};
		const onReportSwitched = (report: Report) => {
			setReport(report);
		};

		on(SubjectEventTypes.REPORT_ADDED, onReportAdded);
		on(SubjectEventTypes.REPORT_SWITCHED, onReportSwitched);
		return () => {
			off(SubjectEventTypes.REPORT_ADDED, onReportAdded);
			off(SubjectEventTypes.REPORT_SWITCHED, onReportSwitched);
		};
	}, [on, off]);

	const onExpandClicked = () => setExpanded(true);
	const onCollapseClicked = () => setExpanded(false);
	const onAddReportClicked = () => {
		const report = createReport();
		fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
			async () => await saveNewReport(report, subject.subjectId),
			() => {
				if (!subject.reports) {
					subject.reports = [];
				}
				subject.reports.push(report);
				fire(SubjectEventTypes.REPORT_ADDED, report);
			});
	};
	const onReportOpenClicked = (report: Report) => () => {
		fire(SubjectEventTypes.REPORT_SWITCHED, report);
	};

	const canExpand = subject.reports && subject.reports.length > 1;

	const candidatesReports = (subject.reports || []).filter(r => r !== report).sort((r1, r2) => {
		return (r1.name || '').toUpperCase().localeCompare((r2.name || '').toUpperCase());
	});

	return <SubjectReportsSelector>
		<SubjectSelectReport>
			<span>{report ? (report.name || 'Noname Report') : 'No Report Defined Yet'}</span>
			{editable
				? <NavigatorHeaderButton
					tooltip={{label: Lang.CONSOLE.CONNECTED_SPACE.ADD_REPORT, alignment: TooltipAlignment.CENTER}}
					onClick={onAddReportClicked}>
					<FontAwesomeIcon icon={ICON_ADD}/>
				</NavigatorHeaderButton>
				: null}
			{canExpand && !expanded
				? <NavigatorHeaderButton
					tooltip={{label: Lang.ACTIONS.EXPAND, alignment: TooltipAlignment.CENTER}}
					onClick={onExpandClicked}>
					<FontAwesomeIcon icon={ICON_EXPAND_PANEL}/>
				</NavigatorHeaderButton>
				: null}
			{expanded
				? <NavigatorHeaderButton
					tooltip={{label: Lang.ACTIONS.COLLAPSE, alignment: TooltipAlignment.CENTER}}
					onClick={onCollapseClicked}>
					<FontAwesomeIcon icon={ICON_COLLAPSE_PANEL}/>
				</NavigatorHeaderButton>
				: null}
		</SubjectSelectReport>
		<SubjectReportList count={candidatesReports.length} visible={expanded}>
			{candidatesReports.map((report, index) => {
				return <ReportCandidate key={report.reportId} onClick={onReportOpenClicked(report)}>
					{index + 1}. {report.name || 'Noname Report'}
				</ReportCandidate>;
			})}
		</SubjectReportList>
	</SubjectReportsSelector>;
};