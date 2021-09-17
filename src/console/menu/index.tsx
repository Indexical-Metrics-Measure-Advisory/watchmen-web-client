import {isDataQualityCenterEnabled} from '@/feature-switch';
import {Router} from '@/routes/types';
import {toDashboard} from '@/routes/utils';
import {findAccount, isAdmin, quit} from '@/services/data/account';
import {saveLastSnapshot} from '@/services/data/account/last-snapshot';
import {LastSnapshot} from '@/services/data/account/last-snapshot-types';
import {saveDashboard} from '@/services/data/tuples/dashboard';
import {Dashboard} from '@/services/data/tuples/dashboard-types';
import {
	ICON_ADD,
	ICON_ADMIN,
	ICON_DASHBOARD,
	ICON_DATA_QUALITY,
	ICON_HOME,
	ICON_LOGOUT,
	ICON_MAIL,
	ICON_NOTIFICATION,
	ICON_SETTINGS,
	ICON_SWITCH_WORKBENCH,
	ICON_TIMELINE,
	MOCK_ACCOUNT_NAME,
	SIDE_MENU_MAX_WIDTH,
	SIDE_MENU_MIN_WIDTH
} from '@/widgets/basic/constants';
import {SideMenuConnectSpace} from '@/widgets/basic/side-menu/side-menu-connect-space';
import {SideMenuItem} from '@/widgets/basic/side-menu/side-menu-item';
import {SideMenuLogo} from '@/widgets/basic/side-menu/side-menu-logo';
import {SideMenuPlaceholder} from '@/widgets/basic/side-menu/side-menu-placeholder';
import {SideMenuResizeHandle} from '@/widgets/basic/side-menu/side-menu-resize-handle';
import {SideMenuSeparator} from '@/widgets/basic/side-menu/side-menu-separator';
import {SideMenuSwitchWorkbench} from '@/widgets/basic/side-menu/side-menu-switch-workbench';
import {SideMenuUser} from '@/widgets/basic/side-menu/side-menu-user';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import React, {useEffect, useState} from 'react';
import {matchPath, useHistory, useLocation} from 'react-router-dom';
import styled from 'styled-components';
import {useConsoleEventBus} from '../console-event-bus';
import {ConsoleEventTypes} from '../console-event-bus-types';
import {createDashboard} from '../utils/tuples';
import {useConnectSpace} from '../widgets/use-connect-space';
import {FavoriteMenu} from './side-menu-favorite';
import {SideMenuSpaces} from './side-menu-spaces';

const ConsoleMenuContainer = styled.div.attrs<{ width: number }>(({width}) => {
	return {
		'data-widget': 'console-menu',
		style: {width}
	};
})<{ width: number }>`
	display          : flex;
	position         : relative;
	flex-direction   : column;
	align-items      : flex-start;
	min-width        : var(--console-menu-width);
	height           : 100vh;
	top              : 0;
	left             : 0;
	border-right     : var(--border);
	background-color : var(--invert-color);
	overflow         : hidden;
	+ main {
		max-width : ${({width}) => `calc(100vw - ${width}px)`};
		div[data-widget="full-width-page"] {
			max-width : ${({width}) => `calc(100vw - ${width}px)`};
		}
	}
	@media print {
		display : none;
		+ main {
			max-width : unset;
			div[data-widget="full-width-page"] {
				max-width : unset;
			}
		}
	}
`;

export const ConsoleMenu = () => {
	const history = useHistory();
	const location = useLocation();
	const {on: onGlobal, off: offGlobal, fire: fireGlobal} = useEventBus();
	const {once, fire} = useConsoleEventBus();
	const [menuWidth, setMenuWidth] = useState(SIDE_MENU_MIN_WIDTH);
	const onConnectSpaceClicked = useConnectSpace();
	useEffect(() => {
		const onAskMenuWidth = () => {
			fireGlobal(EventTypes.REPLY_SIDE_MENU_WIDTH, menuWidth);
		};
		onGlobal(EventTypes.ASK_SIDE_MENU_WIDTH, onAskMenuWidth);
		return () => {
			offGlobal(EventTypes.ASK_SIDE_MENU_WIDTH, onAskMenuWidth);
		};
	}, [onGlobal, offGlobal, fireGlobal, menuWidth]);

	const onResize = (newWidth: number) => {
		const width = Math.min(Math.max(newWidth, SIDE_MENU_MIN_WIDTH), SIDE_MENU_MAX_WIDTH);
		setMenuWidth(width);
		fireGlobal(EventTypes.SIDE_MENU_RESIZED, width);
	};
	const onMenuClicked = (path: string) => () => {
		if (!matchPath(location.pathname, path)) {
			history.push(path);
		}
	};
	const onDashboardClicked = () => {
		once(ConsoleEventTypes.REPLY_DASHBOARDS, (dashboards: Array<Dashboard>) => {
			const allDashboardIds = [...dashboards].map(dashboard => dashboard.dashboardId);
			once(ConsoleEventTypes.REPLY_LAST_SNAPSHOT, async ({lastDashboardId}: LastSnapshot) => {
				// eslint-disable-next-line
				if (lastDashboardId && allDashboardIds.some(id => id == lastDashboardId)) {
					// exists and found in list
					history.push(toDashboard(lastDashboardId));
				} else if (dashboards && dashboards.length > 0) {
					// pick the latest visited one
					const {dashboardId: firstDashboardId} = [...dashboards].sort((d1, d2) => {
						return (d2.lastVisitTime || '').localeCompare((d1.lastVisitTime || ''));
					})[0];
					history.push(toDashboard(firstDashboardId));
					try {
						await saveLastSnapshot({lastDashboardId: firstDashboardId});
					} catch (e: any) {
						// ignore
					}
				} else {
					// no dashboards created
					const dashboard = createDashboard();
					fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
						async () => await saveDashboard(dashboard),
						() => {
							fire(ConsoleEventTypes.DASHBOARD_CREATED, dashboard);
							history.push(toDashboard(dashboard.dashboardId));
						});
				}
			}).fire(ConsoleEventTypes.ASK_LAST_SNAPSHOT);
		}).fire(ConsoleEventTypes.ASK_DASHBOARDS);
	};
	const onLogoutClicked = () => {
		fireGlobal(EventTypes.SHOW_YES_NO_DIALOG,
			Lang.CONSOLE.BYE,
			() => {
				fireGlobal(EventTypes.HIDE_DIALOG);
				quit();
				history.push(Router.LOGIN);
			},
			() => fireGlobal(EventTypes.HIDE_DIALOG));
	};

	const account = findAccount() || {name: MOCK_ACCOUNT_NAME};
	const showTooltip = menuWidth / SIDE_MENU_MIN_WIDTH <= 1.5;
	const workbenches = [
		{label: Lang.CONSOLE.MENU.TO_ADMIN, icon: ICON_ADMIN, action: () => onMenuClicked(Router.ADMIN)()}
	];
	if (isDataQualityCenterEnabled()) {
		workbenches.push({
			label: Lang.CONSOLE.MENU.TO_DATA_QUALITY,
			icon: ICON_DATA_QUALITY,
			action: () => onMenuClicked(Router.DATA_QUALITY)()
		});
	}

	return <ConsoleMenuContainer width={menuWidth}>
		<SideMenuLogo title={Lang.CONSOLE.MENU.TITLE}/>
		<SideMenuItem icon={ICON_HOME} label={Lang.CONSOLE.MENU.HOME} showTooltip={showTooltip}
		              active={!!matchPath(location.pathname, Router.CONSOLE_HOME)}
		              onClick={onMenuClicked(Router.CONSOLE_HOME)}/>
		<SideMenuItem icon={ICON_DASHBOARD} label={Lang.CONSOLE.MENU.DASHBOARDS} showTooltip={showTooltip}
		              active={!!matchPath(location.pathname, Router.CONSOLE_DASHBOARD)}
		              onClick={onDashboardClicked}/>
		<FavoriteMenu showTooltip={showTooltip}/>
		{/* FEAT hide message menus */}
		<SideMenuSeparator width={menuWidth} visible={false}/>
		{/* FEAT hide notification menu */}
		<SideMenuItem icon={ICON_NOTIFICATION} label={Lang.CONSOLE.MENU.NOTIFICATIONS} showTooltip={showTooltip}
		              active={!!matchPath(location.pathname, Router.CONSOLE_NOTIFICATION)}
		              onClick={onMenuClicked(Router.CONSOLE_NOTIFICATION)}
		              visible={false}/>
		{/* FEAT hide mail menu */}
		<SideMenuItem icon={ICON_MAIL} label={Lang.CONSOLE.MENU.MAILS} showTooltip={showTooltip}
		              active={!!matchPath(location.pathname, Router.CONSOLE_MAIL)}
		              onClick={onMenuClicked(Router.CONSOLE_MAIL)}
		              visible={false}/>
		{/* FEAT hide timeline menu */}
		<SideMenuItem icon={ICON_TIMELINE} label={Lang.CONSOLE.MENU.TIMELINE} showTooltip={showTooltip}
		              active={!!matchPath(location.pathname, Router.CONSOLE_TIMELINE)}
		              onClick={onMenuClicked(Router.CONSOLE_TIMELINE)}
		              visible={false}/>
		<SideMenuSeparator width={menuWidth}/>
		<SideMenuSpaces showTooltip={showTooltip}/>
		<SideMenuConnectSpace icon={ICON_ADD} label={Lang.CONSOLE.MENU.CONNECT_SPACE} showTooltip={showTooltip}
		                      onClick={onConnectSpaceClicked}/>
		<SideMenuPlaceholder/>
		<SideMenuSeparator width={menuWidth}/>
		<SideMenuItem icon={ICON_SETTINGS} label={Lang.CONSOLE.MENU.SETTINGS} showTooltip={showTooltip}
		              active={!!matchPath(location.pathname, Router.CONSOLE_SETTINGS)}
		              onClick={onMenuClicked(Router.CONSOLE_SETTINGS)}/>
		<SideMenuSwitchWorkbench icon={ICON_SWITCH_WORKBENCH}
		                         workbenches={workbenches}
		                         visible={isAdmin()}/>
		<SideMenuSeparator width={menuWidth}/>
		<SideMenuItem icon={ICON_LOGOUT} label={'Logout'} showTooltip={showTooltip}
		              onClick={onLogoutClicked}/>
		<SideMenuUser name={account.name}/>
		<SideMenuResizeHandle width={menuWidth} onResize={onResize}/>
	</ConsoleMenuContainer>;
};