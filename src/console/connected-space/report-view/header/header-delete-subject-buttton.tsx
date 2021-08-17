import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import {Button} from '../../../../basic-widgets/button';
import {ICON_THROW_AWAY} from '../../../../basic-widgets/constants';
import {PageHeaderButton} from '../../../../basic-widgets/page-header-buttons';
import {ButtonInk} from '../../../../basic-widgets/types';
import {DialogBody, DialogFooter, DialogLabel} from '../../../../dialog/widgets';
import {useEventBus} from '../../../../events/event-bus';
import {EventTypes} from '../../../../events/types';
import {Lang} from '../../../../langs';
import {toSubjectReport, toSubjectReports} from '../../../../routes/utils';
import {ConnectedSpace} from '../../../../services/tuples/connected-space-types';
import {Subject} from '../../../../services/tuples/subject-types';
import {Report} from '../../../../services/tuples/report-types';
import {deleteReport} from '../../../../services/tuples/report';

const DeleteDialogBody = styled(DialogBody)`
	flex-direction: column;
	margin-bottom: var(--margin);
`;
const NameUrl = styled.div`
	color: var(--info-color);
	font-weight: var(--font-bold);
	padding-top: calc(var(--margin) / 2);
	word-break: break-all;
	line-height: var(--line-height);
`;

const ReportDelete = (props: { report: Report, onRemoved: () => void }) => {
	const {report, onRemoved} = props;

	const {fire} = useEventBus();

	const onDeleteClicked = async () => {
		fire(EventTypes.HIDE_DIALOG);
		fire(EventTypes.INVOKE_REMOTE_REQUEST,
			async () => await deleteReport(report),
			() => onRemoved());
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

export const HeaderDeleteReportButton = (props: { connectedSpace: ConnectedSpace, subject: Subject, report: Report }) => {
	const {connectedSpace, subject, report} = props;

	const history = useHistory();
	const {fire: fireGlobal} = useEventBus();

	const onDeleted = async () => {
		if (!subject.reports) {
			return;
		}
		// eslint-disable-next-line
		const index = subject.reports.findIndex(r => r.reportId == report.reportId);
		if (index !== -1) {
			subject.reports.splice(index, 1);
		}
		if (subject.reports.length === 0) {
			history.replace(toSubjectReports(connectedSpace.connectId, subject.subjectId));
		} else {
			history.replace(toSubjectReport(connectedSpace.connectId, subject.subjectId, subject.reports[0].reportId));
		}
	};
	const onDeleteClicked = () => {
		fireGlobal(EventTypes.SHOW_DIALOG,
			<ReportDelete report={report} onRemoved={onDeleted}/>);
	};

	return <PageHeaderButton tooltip={Lang.CONSOLE.CONNECTED_SPACE.DELETE_ME} onClick={onDeleteClicked}>
		<FontAwesomeIcon icon={ICON_THROW_AWAY}/>
	</PageHeaderButton>;
};