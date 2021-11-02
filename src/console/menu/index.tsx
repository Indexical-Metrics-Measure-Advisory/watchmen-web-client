import {Router} from '@/routes/types';
import {findAccount, isAdmin, quit} from '@/services/data/account';
import {
	ICON_ADD,
	ICON_ADMIN,
	ICON_DASHBOARD,
	ICON_DATA_QUALITY,
	ICON_HOME,
	ICON_INDICATOR_WORKBENCH,
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
import {
	isAdminAvailable,
	isDataQualityAvailable,
	isIndicatorWorkbenchAvailable
} from '@/widgets/common-settings/workbench-utils';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import React, {useEffect, useState} from 'react';
import {matchPath, useHistory, useLocation} from 'react-router-dom';
import styled from 'styled-components';
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
	const [menuWidth, setMenuWidth] = useState(SIDE_MENU_MIN_WIDTH);
	const onConnectSpaceClicked = useConnectSpace();
	useEffect(() => {
		const onAskMenuWidth = (onWidthGet: (width: number) => void) => {
			onWidthGet(menuWidth);
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
	const workbenches = [];
	if (isAdminAvailable()) {
		workbenches.push({
			label: Lang.CONSOLE.MENU.TO_ADMIN,
			icon: ICON_ADMIN,
			action: () => onMenuClicked(Router.ADMIN)()
		});
	}
	if (isIndicatorWorkbenchAvailable()) {
		workbenches.push({
			label: Lang.CONSOLE.MENU.TO_INDICATOR_WORKBENCH,
			icon: ICON_INDICATOR_WORKBENCH,
			action: () => onMenuClicked(Router.INDICATOR_WORKBENCH)()
		});
	}
	if (isDataQualityAvailable()) {
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
		              active={!!matchPath(location.pathname, Router.CONSOLE_DASHBOARD_AUTO)}
		              onClick={onMenuClicked(Router.CONSOLE_DASHBOARD_AUTO)}/>
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
		<SideMenuItem icon={ICON_LOGOUT} label={Lang.CONSOLE.MENU.LOGOUT} showTooltip={showTooltip}
		              onClick={onLogoutClicked}/>
		<SideMenuUser name={account.name}/>
		<SideMenuResizeHandle width={menuWidth} onResize={onResize}/>
	</ConsoleMenuContainer>;
};