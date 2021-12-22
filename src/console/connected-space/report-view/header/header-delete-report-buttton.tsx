import {toSubjectReport, toSubjectReports} from '@/routes/utils';
import {SAVE_TIMEOUT} from '@/services/constants';
import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {deleteReport, saveReport} from '@/services/data/tuples/report';
import {Report} from '@/services/data/tuples/report-types';
import {Subject} from '@/services/data/tuples/subject-types';
import {Button} from '@/widgets/basic/button';
import {ICON_THROW_AWAY} from '@/widgets/basic/constants';
import {PageHeaderButton} from '@/widgets/basic/page-header-buttons';
import {ButtonInk} from '@/widgets/basic/types';
import {DialogBody, DialogFooter, DialogLabel} from '@/widgets/dialog/widgets';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import {useReportEventBus} from '@/widgets/report/report-event-bus';
import {ReportEventTypes} from '@/widgets/report/report-event-bus-types';
import {FireTiming, useThrottler} from '@/widgets/throttler';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';

interface ReportDataState {
	styleChanged: boolean;
	structureChanged: boolean;
	thumbnailChanged: boolean;
}

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
	const {on, off, fire} = useReportEventBus();
	const [changed, setChanged] = useState<ReportDataState>({
		styleChanged: false,
		structureChanged: false,
		thumbnailChanged: false
	});
	const saveQueue = useThrottler();
	useEffect(() => saveQueue.clear(true), [report, saveQueue]);
	useEffect(() => {
		const onStyleChanged = (aReport: Report) => {
			if (aReport !== report) {
				return;
			}
			setChanged(state => {
				return {...state, styleChanged: true};
			});
		};
		const onStructureChanged = (aReport: Report) => {
			if (aReport !== report) {
				return;
			}
			setChanged(state => {
				return {...state, structureChanged: true};
			});
			window.setTimeout(() => {
				fire(ReportEventTypes.DO_RELOAD_DATA_ON_EDITING, report);
				// wait 30 milliseconds for state changed into component
			}, 30);
		};
		const onThumbnailCaught = (aReport: Report) => {
			if (aReport !== report) {
				return;
			}
			// console.log(report.simulateThumbnail);
			setChanged(state => {
				return {...state, thumbnailChanged: true};
			});
		};

		on(ReportEventTypes.STYLE_CHANGED, onStyleChanged);
		on(ReportEventTypes.STRUCTURE_CHANGED, onStructureChanged);
		on(ReportEventTypes.THUMBNAIL_CAUGHT, onThumbnailCaught);
		return () => {
			off(ReportEventTypes.STYLE_CHANGED, onStyleChanged);
			off(ReportEventTypes.STRUCTURE_CHANGED, onStructureChanged);
			off(ReportEventTypes.THUMBNAIL_CAUGHT, onThumbnailCaught);
		};
	}, [on, off, fire, report]);
	useEffect(() => {
		const onAskReportChanged = (aReport: Report, onChangedGet: (changed: boolean) => void) => {
			if (aReport !== report) {
				return;
			}
			onChangedGet(changed.structureChanged);
		};
		on(ReportEventTypes.ASK_REPORT_STRUCTURE_CHANGED, onAskReportChanged);
		return () => {
			off(ReportEventTypes.ASK_REPORT_STRUCTURE_CHANGED, onAskReportChanged);
		};
	}, [on, off, fire, report, changed]);
	useEffect(() => {
		if (!changed.styleChanged && !changed.structureChanged && !changed.thumbnailChanged) {
			// nothing changed
			return;
		}

		saveQueue.replace((time: FireTiming) => {
			// console.log(time);
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await saveReport(report),
				() => {
					fire(ReportEventTypes.DATA_SAVED, report);
					if (time !== FireTiming.UNMOUNT) {
						setChanged({styleChanged: false, structureChanged: false, thumbnailChanged: false});
					}
				});
		}, SAVE_TIMEOUT);
	}, [
		fireGlobal, fire, report, saveQueue,
		changed.styleChanged, changed.structureChanged, changed.thumbnailChanged
	]);

	const onDeleted = async () => {
		fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST, async () => {
			saveQueue.clear(false);
			await deleteReport(report);
		}, () => {
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
		});
	};
	const onDeleteClicked = () => {
		fireGlobal(EventTypes.SHOW_DIALOG, <ReportDelete report={report} onRemoved={onDeleted}/>);
	};

	return <PageHeaderButton tooltip={Lang.CONSOLE.CONNECTED_SPACE.DELETE_ME} onClick={onDeleteClicked}>
		<FontAwesomeIcon icon={ICON_THROW_AWAY}/>
	</PageHeaderButton>;
};