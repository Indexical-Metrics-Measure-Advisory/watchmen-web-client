import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '../../../../basic-widgets/button';
import { ButtonInk } from '../../../../basic-widgets/types';
import { DialogBody, DialogFooter, DialogLabel } from '../../../../dialog/widgets';
import { useEventBus } from '../../../../events/event-bus';
import { EventTypes } from '../../../../events/types';
import { Lang } from '../../../../langs';
import { useReportEventBus } from '../../../../report/report-event-bus';
import { ReportEventTypes } from '../../../../report/report-event-bus-types';
import { Dashboard } from '../../../../services/tuples/dashboard-types';
import { deleteReport } from '../../../../services/tuples/report';
import { Report } from '../../../../services/tuples/report-types';
import { useDashboardEventBus } from '../../dashboard-event-bus';
import { DashboardEventTypes } from '../../dashboard-event-bus-types';

const DeleteDialogBody = styled(DialogBody)`
	flex-direction : column;
	margin-bottom  : var(--margin);
`;
const NameUrl = styled.div`
	color       : var(--info-color);
	font-weight : var(--font-bold);
	padding-top : calc(var(--margin) / 2);
	word-break  : break-all;
	line-height : var(--line-height);
`;

const ReportDelete = (props: { report: Report, onRemoved: () => void }) => {
	const { report, onRemoved } = props;

	const { fire } = useEventBus();

	const onDeleteClicked = async () => {
		fire(EventTypes.HIDE_DIALOG);
		fire(EventTypes.INVOKE_REMOTE_REQUEST,
			async () => await deleteReport(report),
			() => onRemoved())
	};
	const onCancelClicked = () => {
		fire(EventTypes.HIDE_DIALOG);
	};

	return <>
		<DeleteDialogBody>
			<DialogLabel>{Lang.CONSOLE.CONNECTED_SPACE.DELETE_REPORT_DIALOG_LABEL}</DialogLabel>
			<NameUrl>{report.name}</NameUrl>
		</DeleteDialogBody>
		<DialogFooter>
			<Button ink={ButtonInk.DANGER} onClick={onDeleteClicked}>{Lang.ACTIONS.DELETE}</Button>
			<Button ink={ButtonInk.PRIMARY} onClick={onCancelClicked}>{Lang.ACTIONS.CANCEL}</Button>
		</DialogFooter>
	</>;
};

export const ReportRemover = (props: { dashboard: Dashboard }) => {
	const { dashboard } = props;

	const { fire: fireGlobal } = useEventBus();
	const { fire: fireDashboard } = useDashboardEventBus();
	const { on, off } = useReportEventBus();
	useEffect(() => {
		const onDeleted = (report: Report) => async () => {
			if (!dashboard.reports) {
				return;
			}
			// eslint-disable-next-line
			const index = dashboard.reports.findIndex(r => r.reportId == report.reportId);
			if (index !== -1) {
				dashboard.reports.splice(index, 1);
			}
			fireDashboard(DashboardEventTypes.REPORT_REMOVED, report);
		};
		const onDelete = (report: Report) => {
			fireGlobal(EventTypes.SHOW_DIALOG,
				<ReportDelete report={report} onRemoved={onDeleted(report)}/>);
		};
		on(ReportEventTypes.DO_DELETE, onDelete);
		return () => {
			off(ReportEventTypes.DO_DELETE, onDelete);
		};
	});
	return <></>;
};