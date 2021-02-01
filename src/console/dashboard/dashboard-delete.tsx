import React from 'react';
import styled from 'styled-components';
import { Button } from '../../basic-widgets/button';
import { ButtonInk } from '../../basic-widgets/types';
import { DialogBody, DialogFooter, DialogLabel } from '../../dialog/widgets';
import { useEventBus } from '../../events/event-bus';
import { EventTypes } from '../../events/types';
import { Lang } from '../../langs';
import { deleteDashboard } from '../../services/tuples/dashboard';
import { Dashboard } from '../../services/tuples/dashboard-types';

const ShareDialogBody = styled(DialogBody)`
	flex-direction : column;
	margin-bottom  : var(--margin);
`;
const NameUrl = styled.div`
	color       : var(--info-color);
	font-weight : var(--font-bold);
	line-height : calc(var(--line-height) * 2);
`;

export const DashboardDelete = (props: { dashboard: Dashboard, onRemoved: () => void }) => {
	const { dashboard, onRemoved } = props;

	const { fire: fireGlobal } = useEventBus();

	const onDeleteClicked = async () => {
		await deleteDashboard(dashboard);
		onRemoved();
		fireGlobal(EventTypes.HIDE_DIALOG);
	};
	const onCancelClicked = () => {
		fireGlobal(EventTypes.HIDE_DIALOG);
	};

	return <>
		<ShareDialogBody>
			<DialogLabel>{Lang.CONSOLE.DASHBOARD.DELETE_DIALOG_LABEL}</DialogLabel>
			<NameUrl>{dashboard.name}</NameUrl>
		</ShareDialogBody>
		<DialogFooter>
			<Button ink={ButtonInk.DANGER} onClick={onDeleteClicked}>{Lang.ACTIONS.DELETE}</Button>
			<Button ink={ButtonInk.PRIMARY} onClick={onCancelClicked}>{Lang.ACTIONS.CANCEL}</Button>
		</DialogFooter>
	</>;
};