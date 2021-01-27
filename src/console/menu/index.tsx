import React, { useState } from 'react';
import { matchPath, useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import {
	ICON_ADD,
	ICON_ADMIN,
	ICON_DASHBOARD,
	ICON_HOME,
	ICON_MAIL,
	ICON_NOTIFICATION,
	ICON_SETTINGS,
	ICON_TIMELINE,
	MOCK_ACCOUNT_NAME,
	SIDE_MENU_MAX_WIDTH,
	SIDE_MENU_MIN_WIDTH
} from '../../basic-widgets/constants';
import { SideMenuConnectSpace } from '../../basic-widgets/side-menu/side-menu-connect-space';
import { SideMenuItem } from '../../basic-widgets/side-menu/side-menu-item';
import { SideMenuLogo } from '../../basic-widgets/side-menu/side-menu-logo';
import { SideMenuPlaceholder } from '../../basic-widgets/side-menu/side-menu-placeholder';
import { SideMenuResizeHandle } from '../../basic-widgets/side-menu/side-menu-resize-handle';
import { SideMenuSeparator } from '../../basic-widgets/side-menu/side-menu-separator';
import { SideMenuUser } from '../../basic-widgets/side-menu/side-menu-user';
import { Lang } from '../../langs';
import { Router } from '../../routes/types';
import { findAccount, isAdmin } from '../../services/account';
import { FavoriteMenu } from './side-menu-favorite';
import { SideMenuSpaces } from './side-menu-spaces';

const ConsoleMenuContainer = styled.div.attrs<{ width: number }>(({ width }) => {
	return {
		'data-widget': 'console-menu',
		style: { width }
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
`;

export const ConsoleMenu = () => {
	const history = useHistory();
	const location = useLocation();
	const [ menuWidth, setMenuWidth ] = useState(SIDE_MENU_MIN_WIDTH);

	const onResize = (newWidth: number) => {
		setMenuWidth(Math.min(Math.max(newWidth, SIDE_MENU_MIN_WIDTH), SIDE_MENU_MAX_WIDTH));
	};
	const onMenuClicked = (path: string) => () => {
		if (!matchPath(location.pathname, path)) {
			history.push(path);
		}
	};
	const onSpaceConnectClicked = () => {
	};

	const account = findAccount() || { name: MOCK_ACCOUNT_NAME };
	const showTooltip = menuWidth / SIDE_MENU_MIN_WIDTH <= 1.5;

	return <ConsoleMenuContainer width={menuWidth}>
		<SideMenuLogo title={Lang.CONSOLE.MENU.TITLE}/>
		<SideMenuItem icon={ICON_HOME} label={Lang.CONSOLE.MENU.HOME} showTooltip={showTooltip}
		              active={!!matchPath(location.pathname, Router.CONSOLE_HOME)}
		              onClick={onMenuClicked(Router.CONSOLE_HOME)}/>
		<SideMenuItem icon={ICON_DASHBOARD} label={Lang.CONSOLE.MENU.DASHBOARDS} showTooltip={showTooltip}
		              active={!!matchPath(location.pathname, Router.CONSOLE_DASHBOARDS)}
		              onClick={onMenuClicked(Router.CONSOLE_DASHBOARDS)}/>
		<FavoriteMenu showTooltip={showTooltip}/>
		{/* TODO hide message menus */}
		<SideMenuSeparator width={menuWidth} visible={false}/>
		{/* TODO hide notification menu */}
		<SideMenuItem icon={ICON_NOTIFICATION} label={Lang.CONSOLE.MENU.NOTIFICATIONS} showTooltip={showTooltip}
		              active={!!matchPath(location.pathname, Router.CONSOLE_NOTIFICATION)}
		              onClick={onMenuClicked(Router.CONSOLE_NOTIFICATION)}
		              visible={false}/>
		{/* TODO hide mail menu */}
		<SideMenuItem icon={ICON_MAIL} label={Lang.CONSOLE.MENU.MAILS} showTooltip={showTooltip}
		              active={!!matchPath(location.pathname, Router.CONSOLE_MAIL)}
		              onClick={onMenuClicked(Router.CONSOLE_MAIL)}
		              visible={false}/>
		{/* TODO hide timeline menu */}
		<SideMenuItem icon={ICON_TIMELINE} label={Lang.CONSOLE.MENU.TIMELINE} showTooltip={showTooltip}
		              active={!!matchPath(location.pathname, Router.CONSOLE_TIMELINE)}
		              onClick={onMenuClicked(Router.CONSOLE_TIMELINE)}
		              visible={false}/>
		<SideMenuSeparator width={menuWidth}/>
		<SideMenuSpaces showTooltip={showTooltip}/>
		<SideMenuConnectSpace icon={ICON_ADD} label={Lang.CONSOLE.MENU.CONNECT_SPACE} showTooltip={showTooltip}
		                      onClick={onSpaceConnectClicked}/>
		<SideMenuPlaceholder/>
		<SideMenuSeparator width={menuWidth}/>
		<SideMenuItem icon={ICON_SETTINGS} label={Lang.CONSOLE.MENU.SETTINGS} showTooltip={showTooltip}
		              active={!!matchPath(location.pathname, Router.CONSOLE_SETTINGS)}
		              onClick={onMenuClicked(Router.CONSOLE_SETTINGS)}/>
		<SideMenuItem icon={ICON_ADMIN} label={Lang.CONSOLE.MENU.TO_ADMIN} showTooltip={showTooltip}
		              onClick={onMenuClicked(Router.ADMIN)}
		              visible={isAdmin()}/>
		<SideMenuUser name={account.name}/>
		<SideMenuResizeHandle width={menuWidth} onResize={onResize}/>
	</ConsoleMenuContainer>;
};