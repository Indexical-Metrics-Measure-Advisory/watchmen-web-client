import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import { Button } from '../../../basic-widgets/button';
import { ICON_THROW_AWAY } from '../../../basic-widgets/constants';
import { PageHeaderButton } from '../../../basic-widgets/page-header-buttons';
import { ButtonInk } from '../../../basic-widgets/types';
import { DialogBody, DialogFooter, DialogLabel } from '../../../dialog/widgets';
import { useEventBus } from '../../../events/event-bus';
import { EventTypes } from '../../../events/types';
import { Lang } from '../../../langs';
import { deleteDashboard } from '../../../services/tuples/dashboard';
import { Dashboard } from '../../../services/tuples/dashboard-types';
import { useConsoleEventBus } from '../../console-event-bus';
import { ConsoleEventTypes } from '../../console-event-bus-types';

const DeleteDialogBody = styled(DialogBody)`
	flex-direction : column;
	margin-bottom  : var(--margin);
`;
const NameUrl = styled.div`
	color       : var(--info-color);
	font-weight : var(--font-bold);
	line-height : calc(var(--line-height) * 2);
`;

const DashboardDelete = (props: { dashboard: Dashboard, onRemoved: () => void }) => {
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
		<DeleteDialogBody>
			<DialogLabel>{Lang.CONSOLE.DASHBOARD.DELETE_DIALOG_LABEL}</DialogLabel>
			<NameUrl>{dashboard.name}</NameUrl>
		</DeleteDialogBody>
		<DialogFooter>
			<Button ink={ButtonInk.DANGER} onClick={onDeleteClicked}>{Lang.ACTIONS.DELETE}</Button>
			<Button ink={ButtonInk.PRIMARY} onClick={onCancelClicked}>{Lang.ACTIONS.CANCEL}</Button>
		</DialogFooter>
	</>;
};

export const HeaderDeleteMeButton = (props: { dashboard: Dashboard }) => {
	const { dashboard } = props;
	const { fire: fireGlobal } = useEventBus();
	const { fire } = useConsoleEventBus();

	const onDeleted = async () => {
		fire(ConsoleEventTypes.DASHBOARD_REMOVED_FROM_FAVORITE, dashboard.dashboardId);
		fire(ConsoleEventTypes.DASHBOARD_REMOVED, dashboard);
	};
	const onDeleteClicked = () => {
		fireGlobal(EventTypes.SHOW_DIALOG,
			<DashboardDelete dashboard={dashboard} onRemoved={onDeleted}/>);
	};

	return <PageHeaderButton tooltip={Lang.CONSOLE.DASHBOARD.DELETE_ME} onClick={onDeleteClicked}>
		<FontAwesomeIcon icon={ICON_THROW_AWAY}/>
	</PageHeaderButton>;
};