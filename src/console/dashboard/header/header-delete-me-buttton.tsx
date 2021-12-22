import {SAVE_TIMEOUT} from '@/services/constants';
import {deleteDashboard, saveDashboard} from '@/services/data/tuples/dashboard';
import {Dashboard} from '@/services/data/tuples/dashboard-types';
import {Button} from '@/widgets/basic/button';
import {ICON_THROW_AWAY} from '@/widgets/basic/constants';
import {PageHeaderButton} from '@/widgets/basic/page-header-buttons';
import {ButtonInk} from '@/widgets/basic/types';
import {DialogBody, DialogFooter, DialogLabel} from '@/widgets/dialog/widgets';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import {useThrottler} from '@/widgets/throttler';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect} from 'react';
import styled from 'styled-components';
import {useConsoleEventBus} from '../../console-event-bus';
import {ConsoleEventTypes} from '../../console-event-bus-types';
import {useDashboardEventBus} from '../dashboard-event-bus';
import {DashboardEventTypes} from '../dashboard-event-bus-types';

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

const DashboardDelete = (props: { dashboard: Dashboard, onRemoved: () => void }) => {
	const {dashboard, onRemoved} = props;

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
	const {dashboard} = props;

	const {fire: fireGlobal} = useEventBus();
	const {fire: fireConsole} = useConsoleEventBus();
	const {on, off} = useDashboardEventBus();
	const saveQueue = useThrottler();
	useEffect(() => {
		const onSaveDashboard = (d: Dashboard) => {
			if (d !== dashboard) {
				return;
			}
			saveQueue.replace(() => {
				fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST, async () => await saveDashboard(d));
			}, SAVE_TIMEOUT);
		};
		on(DashboardEventTypes.SAVE_DASHBOARD, onSaveDashboard);
		return () => {
			off(DashboardEventTypes.SAVE_DASHBOARD, onSaveDashboard);
		};
	}, [on, off, fireGlobal, dashboard, saveQueue]);
	useEffect(() => saveQueue.clear(true), [dashboard, saveQueue]);

	const onDeleted = async () => {
		saveQueue.clear(false);
		fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST, async () => await deleteDashboard(dashboard), () => {
			fireConsole(ConsoleEventTypes.DASHBOARD_REMOVED_FROM_FAVORITE, dashboard.dashboardId);
			fireConsole(ConsoleEventTypes.DASHBOARD_REMOVED, dashboard);
		});
	};
	const onDeleteClicked = () => {
		fireGlobal(EventTypes.SHOW_DIALOG,
			<DashboardDelete dashboard={dashboard} onRemoved={onDeleted}/>);
	};

	return <PageHeaderButton tooltip={Lang.CONSOLE.DASHBOARD.DELETE_ME} onClick={onDeleteClicked}>
		<FontAwesomeIcon icon={ICON_THROW_AWAY}/>
	</PageHeaderButton>;
};