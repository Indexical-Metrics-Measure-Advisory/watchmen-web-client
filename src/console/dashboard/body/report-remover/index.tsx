import {Dashboard} from '@/services/data/tuples/dashboard-types';
import {Report} from '@/services/data/tuples/report-types';
import {Button} from '@/widgets/basic/button';
import {ButtonInk} from '@/widgets/basic/types';
import {DialogBody, DialogFooter, DialogLabel} from '@/widgets/dialog/widgets';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import {useReportEventBus} from '@/widgets/report/report-event-bus';
import {ReportEventTypes} from '@/widgets/report/report-event-bus-types';
import React, {Fragment, useEffect} from 'react';
import styled from 'styled-components';
import {useDashboardEventBus} from '../../dashboard-event-bus';
import {DashboardEventTypes} from '../../dashboard-event-bus-types';

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
	const {report, onRemoved} = props;

	const {fire} = useEventBus();

	const onDeleteClicked = async () => {
		fire(EventTypes.HIDE_DIALOG);
		onRemoved();
	};
	const onCancelClicked = () => {
		fire(EventTypes.HIDE_DIALOG);
	};

	return <>
		<DeleteDialogBody>
			<DialogLabel>{Lang.CONSOLE.DASHBOARD.DELETE_REPORT_DIALOG_LABEL}</DialogLabel>
			<NameUrl>{report.name}</NameUrl>
		</DeleteDialogBody>
		<DialogFooter>
			<Button ink={ButtonInk.DANGER} onClick={onDeleteClicked}>{Lang.ACTIONS.DELETE}</Button>
			<Button ink={ButtonInk.PRIMARY} onClick={onCancelClicked}>{Lang.ACTIONS.CANCEL}</Button>
		</DialogFooter>
	</>;
};

export const ReportRemover = (props: { dashboard: Dashboard }) => {
	const {dashboard} = props;

	const {fire: fireGlobal} = useEventBus();
	const {fire: fireDashboard} = useDashboardEventBus();
	const {on, off} = useReportEventBus();
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
		on(ReportEventTypes.DO_DELETE_REPORT, onDelete);
		return () => {
			off(ReportEventTypes.DO_DELETE_REPORT, onDelete);
		};
	});
	return <Fragment/>;
};