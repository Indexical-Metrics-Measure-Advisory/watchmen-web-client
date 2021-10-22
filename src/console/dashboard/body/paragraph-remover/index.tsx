import {Dashboard} from '@/services/data/tuples/dashboard-types';
import {Paragraph} from '@/services/data/tuples/paragraph';
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

const ParagraphDelete = (props: { onRemoved: () => void }) => {
	const {onRemoved} = props;

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
			<DialogLabel>{Lang.CONSOLE.DASHBOARD.DELETE_PARAGRAPH_DIALOG_LABEL}</DialogLabel>
		</DeleteDialogBody>
		<DialogFooter>
			<Button ink={ButtonInk.DANGER} onClick={onDeleteClicked}>{Lang.ACTIONS.DELETE}</Button>
			<Button ink={ButtonInk.PRIMARY} onClick={onCancelClicked}>{Lang.ACTIONS.CANCEL}</Button>
		</DialogFooter>
	</>;
};

export const ParagraphRemover = (props: { dashboard: Dashboard }) => {
	const {dashboard} = props;

	const {fire: fireGlobal} = useEventBus();
	const {fire: fireDashboard} = useDashboardEventBus();
	const {on, off} = useReportEventBus();
	useEffect(() => {
		const onDeleted = (paragraph: Paragraph) => async () => {
			if (!dashboard.paragraphs) {
				return;
			}
			// eslint-disable-next-line
			const index = dashboard.paragraphs.findIndex(p => p === paragraph);
			if (index !== -1) {
				dashboard.paragraphs.splice(index, 1);
			}
			fireDashboard(DashboardEventTypes.PARAGRAPH_REMOVED, paragraph);
		};
		const onDelete = (paragraph: Paragraph) => {
			fireGlobal(EventTypes.SHOW_DIALOG,
				<ParagraphDelete onRemoved={onDeleted(paragraph)}/>);
		};
		on(ReportEventTypes.DO_DELETE_PARAGRAPH, onDelete);
		return () => {
			off(ReportEventTypes.DO_DELETE_PARAGRAPH, onDelete);
		};
	});
	return <Fragment/>;
};