import {ChartType} from '@/services/data/tuples/chart-types';
import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {Dashboard} from '@/services/data/tuples/dashboard-types';
import {Report, ReportId} from '@/services/data/tuples/report-types';
import {AlertLabel} from '@/widgets/alert/widgets';
import {Button} from '@/widgets/basic/button';
import {ICON_REPORT} from '@/widgets/basic/constants';
import {Dropdown} from '@/widgets/basic/dropdown';
import {PageHeaderButton} from '@/widgets/basic/page-header-buttons';
import {ButtonInk, DropdownOption} from '@/widgets/basic/types';
import {DialogBody, DialogFooter, DialogLabel} from '@/widgets/dialog/widgets';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useState} from 'react';
import styled from 'styled-components';
import {useConsoleEventBus} from '../../console-event-bus';
import {ConsoleEventTypes} from '../../console-event-bus-types';
import {useDashboardEventBus} from '../dashboard-event-bus';
import {DashboardEventTypes} from '../dashboard-event-bus-types';

const AddReportDialogBody = styled(DialogBody)`
	flex-direction : column;
	margin-bottom  : var(--margin);
`;
const DashboardDropdown = styled(Dropdown)`
	margin-top : calc(var(--margin) / 4);
`;

interface ReportCandidate {
	reportId: ReportId;
	subjectName: string;
	reportName: string;
	reportType: ChartType;
	report: Report;
}

const ReportSelect = (props: { reports: Array<ReportCandidate>, open: (report: Report) => void }) => {
	const {reports, open} = props;

	const {fire} = useEventBus();
	const [selection, setSelection] = useState<ReportCandidate>(reports[0]);

	const onChange = (option: DropdownOption) => {
		setSelection((option.value as ReportCandidate));
	};
	const onConfirmClicked = () => {
		open(selection.report);
		fire(EventTypes.HIDE_DIALOG);
	};
	const onCancelClicked = () => {
		fire(EventTypes.HIDE_DIALOG);
	};

	const options = reports.map(report => {
		return {
			value: report,
			label: `${report.subjectName} - ${report.reportName}`,
			key: report.reportId
		};
	});

	return <>
		<AddReportDialogBody>
			<DialogLabel>{Lang.CONSOLE.DASHBOARD.SWITCH_DIALOG_LABEL}</DialogLabel>
			<DashboardDropdown value={selection} options={options} onChange={onChange}/>
		</AddReportDialogBody>
		<DialogFooter>
			<Button ink={ButtonInk.PRIMARY} onClick={onConfirmClicked}>{Lang.ACTIONS.CONFIRM}</Button>
			<Button ink={ButtonInk.WAIVE} onClick={onCancelClicked}>{Lang.ACTIONS.CANCEL}</Button>
		</DialogFooter>
	</>;
};

export const HeaderAddReportButton = (props: { dashboard: Dashboard }) => {
	const {dashboard} = props;

	const {fire: fireGlobal} = useEventBus();
	const {fire: fireConsole} = useConsoleEventBus();
	const {fire} = useDashboardEventBus();
	const addReport = (report: Report) => {
		if (!dashboard.reports) {
			dashboard.reports = [];
		}
		dashboard.reports.push({
			reportId: report.reportId,
			funnels: report.funnels,
			rect: {
				x: 32,
				y: 32,
				width: report.rect.width,
				height: report.rect.height
			}
		});
		fire(DashboardEventTypes.REPORT_ADDED, report);
	};
	const onAddReportClicked = () => {
		fireConsole(ConsoleEventTypes.ASK_CONNECTED_SPACES, (connectedSpaces: Array<ConnectedSpace>) => {
			const existsReportIds = (dashboard.reports || []).map(report => report.reportId);

			const candidates = connectedSpaces.map(connectedSpace => {
				return (connectedSpace.subjects || []).map(subject => {
					return (subject.reports || []).map(report => {
						return {subject, report};
					});
				}).flat();
			}).flat().filter(({report}) => {
				// eslint-disable-next-line
				return !existsReportIds.some(reportId => reportId == report.reportId);
			}).map(({subject, report}) => {
				return {
					reportId: report.reportId,
					subjectName: subject.name,
					reportName: report.name,
					reportType: report.chart.type,
					report
				} as ReportCandidate;
			});
			if (candidates.length === 0) {
				// no other
				fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>{Lang.CONSOLE.DASHBOARD.NO_MORE_REPORT}</AlertLabel>);
			} else {
				fireGlobal(EventTypes.SHOW_DIALOG, <ReportSelect reports={candidates} open={addReport}/>);
			}
		});
	};

	return <PageHeaderButton tooltip={Lang.CONSOLE.DASHBOARD.ADD_REPORT} onClick={onAddReportClicked}>
		<FontAwesomeIcon icon={ICON_REPORT}/>
	</PageHeaderButton>;
};