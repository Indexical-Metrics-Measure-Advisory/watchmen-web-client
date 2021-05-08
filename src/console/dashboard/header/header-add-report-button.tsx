import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useState} from 'react';
import styled from 'styled-components';
import {AlertLabel} from '../../../alert/widgets';
import {Button} from '../../../basic-widgets/button';
import {ICON_REPORT} from '../../../basic-widgets/constants';
import {Dropdown} from '../../../basic-widgets/dropdown';
import {PageHeaderButton} from '../../../basic-widgets/page-header-buttons';
import {ButtonInk, DropdownOption} from '../../../basic-widgets/types';
import {DialogBody, DialogFooter, DialogLabel} from '../../../dialog/widgets';
import {useEventBus} from '../../../events/event-bus';
import {EventTypes} from '../../../events/types';
import {Lang} from '../../../langs';
import {ChartType} from '../../../services/tuples/chart-types';
import {ConnectedSpace} from '../../../services/tuples/connected-space-types';
import {Dashboard} from '../../../services/tuples/dashboard-types';
import {Report} from '../../../services/tuples/report-types';
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
	reportId: string;
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
			label: (option: DropdownOption) => {
				const report = option.value as ReportCandidate;
				const name = `${report.subjectName} - ${report.reportName}`;
				return {
					node: name,
					label: name
				};
			},
			key: (option: DropdownOption) => (option.value as ReportCandidate).reportId
		};
	});

	return <>
		<AddReportDialogBody>
			<DialogLabel>{Lang.CONSOLE.DASHBOARD.SWITCH_DIALOG_LABEL}</DialogLabel>
			<DashboardDropdown value={selection} options={options} onChange={onChange}/>
		</AddReportDialogBody>
		<DialogFooter>
			<Button ink={ButtonInk.PRIMARY} onClick={onConfirmClicked}>{Lang.ACTIONS.CONFIRM}</Button>
			<Button ink={ButtonInk.PRIMARY} onClick={onCancelClicked}>{Lang.ACTIONS.CANCEL}</Button>
		</DialogFooter>
	</>;
};

export const HeaderAddReportButton = (props: { dashboard: Dashboard }) => {
	const {dashboard} = props;

	const {fire: fireGlobal} = useEventBus();
	const {once: onceConsole} = useConsoleEventBus();
	const {fire} = useDashboardEventBus();
	const addReport = (report: Report) => {
		if (!dashboard.reports) {
			dashboard.reports = [];
		}
		dashboard.reports.push({
			reportId: report.reportId,
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
		onceConsole(ConsoleEventTypes.REPLY_CONNECTED_SPACES, (connectedSpaces: Array<ConnectedSpace>) => {
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
		}).fire(ConsoleEventTypes.ASK_CONNECTED_SPACES);
	};

	return <PageHeaderButton tooltip={Lang.CONSOLE.DASHBOARD.ADD_REPORT} onClick={onAddReportClicked}>
		<FontAwesomeIcon icon={ICON_REPORT}/>
	</PageHeaderButton>;
};