import {isMultipleDataSourcesEnabled, isWriteExternalEnabled} from '@/feature-switch';
import {Router} from '@/routes/types';
import {findAccount, isSuperAdmin, quit} from '@/services/data/account';
import {
	ICON_CONSOLE,
	ICON_DATA_QUALITY,
	ICON_DATA_SOURCE,
	ICON_ENUM,
	ICON_EXTERNAL_WRITERS,
	ICON_HOME,
	ICON_INDICATOR_WORKBENCH,
	ICON_LOGOUT,
	ICON_MONITOR_LOGS,
	ICON_PIPELINE,
	ICON_PIPELINE_DEBUG,
	ICON_REPORT,
	ICON_SETTINGS,
	ICON_SPACE,
	ICON_SWITCH_WORKBENCH,
	ICON_TASK,
	ICON_TENANT,
	ICON_TOPIC,
	ICON_USER,
	ICON_USER_GROUP,
	MOCK_ACCOUNT_NAME,
	SIDE_MENU_MAX_WIDTH,
	SIDE_MENU_MIN_WIDTH
} from '@/widgets/basic/constants';
import {SideMenuItem} from '@/widgets/basic/side-menu/side-menu-item';
import {SideMenuLogo} from '@/widgets/basic/side-menu/side-menu-logo';
import {SideMenuPlaceholder} from '@/widgets/basic/side-menu/side-menu-placeholder';
import {SideMenuResizeHandle} from '@/widgets/basic/side-menu/side-menu-resize-handle';
import {SideMenuSeparator} from '@/widgets/basic/side-menu/side-menu-separator';
import {SideMenuSwitchWorkbench} from '@/widgets/basic/side-menu/side-menu-switch-workbench';
import {SideMenuUser} from '@/widgets/basic/side-menu/side-menu-user';
import {
	isConsoleAvailable,
	isDataQualityAvailable,
	isIndicatorWorkbenchAvailable
} from '@/widgets/common-settings/workbench-utils';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import React, {useEffect, useState} from 'react';
import {matchPath, useHistory, useLocation} from 'react-router-dom';
import styled from 'styled-components';

const AdminMenuContainer = styled.div.attrs<{ width: number }>(({width}) => {
	return {
		'data-widget': 'admin-menu',
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
`;

export const AdminMenu = () => {
	const history = useHistory();
	const location = useLocation();
	const {on, off, fire} = useEventBus();
	const [menuWidth, setMenuWidth] = useState(SIDE_MENU_MIN_WIDTH);
	useEffect(() => {
		const onAskMenuWidth = (onWidthGet: (width: number) => void) => {
			onWidthGet(menuWidth);
		};
		on(EventTypes.ASK_SIDE_MENU_WIDTH, onAskMenuWidth);
		return () => {
			off(EventTypes.ASK_SIDE_MENU_WIDTH, onAskMenuWidth);
		};
	}, [on, off, fire, menuWidth]);

	const onResize = (newWidth: number) => {
		const width = Math.min(Math.max(newWidth, SIDE_MENU_MIN_WIDTH), SIDE_MENU_MAX_WIDTH);
		setMenuWidth(width);
		fire(EventTypes.SIDE_MENU_RESIZED, width);
	};
	const onMenuClicked = (path: string) => () => {
		if (!matchPath(location.pathname, path)) {
			history.push(path);
		}
	};
	const onLogoutClicked = () => {
		fire(EventTypes.SHOW_YES_NO_DIALOG,
			'Bye-bye now?',
			() => {
				fire(EventTypes.HIDE_DIALOG);
				quit();
				history.push(Router.LOGIN);
			},
			() => fire(EventTypes.HIDE_DIALOG));
	};

	const account = findAccount() || {name: MOCK_ACCOUNT_NAME};
	const showTooltip = menuWidth / SIDE_MENU_MIN_WIDTH <= 1.5;
	const workbenches = [];
	if (isConsoleAvailable()) {
		workbenches.push({label: 'To Console', icon: ICON_CONSOLE, action: () => onMenuClicked(Router.CONSOLE)()});
	}
	if (isIndicatorWorkbenchAvailable()) {
		workbenches.push({
			label: 'To Indicator Workbench',
			icon: ICON_INDICATOR_WORKBENCH,
			action: () => onMenuClicked(Router.INDICATOR_WORKBENCH)()
		});
	}
	if (isDataQualityAvailable()) {
		workbenches.push({
			label: 'To Data Quality Center',
			icon: ICON_DATA_QUALITY,
			action: () => onMenuClicked(Router.DATA_QUALITY)()
		});
	}

	return <AdminMenuContainer width={menuWidth}>
		<SideMenuLogo title="Watchmen Admin"/>
		<SideMenuItem icon={ICON_HOME} label="Home" showTooltip={showTooltip}
		              active={!!matchPath(location.pathname, Router.ADMIN_HOME)}
		              onClick={onMenuClicked(Router.ADMIN_HOME)}
		              visible={!isSuperAdmin()}/>
		<SideMenuItem icon={ICON_TOPIC} label="Topics" showTooltip={showTooltip}
		              active={!!matchPath(location.pathname, Router.ADMIN_TOPICS)}
		              onClick={onMenuClicked(Router.ADMIN_TOPICS)}
		              visible={!isSuperAdmin()}/>
		<SideMenuItem icon={ICON_ENUM} label="Enumerations" showTooltip={showTooltip}
		              active={!!matchPath(location.pathname, Router.ADMIN_ENUMS)}
		              onClick={onMenuClicked(Router.ADMIN_ENUMS)}
		              visible={!isSuperAdmin()}/>
		<SideMenuItem icon={ICON_REPORT} label="Reports" showTooltip={showTooltip}
		              active={!!matchPath(location.pathname, Router.ADMIN_REPORTS)}
		              onClick={onMenuClicked(Router.ADMIN_REPORTS)}
		              visible={false}/>
		<SideMenuItem icon={ICON_SPACE} label="Spaces" showTooltip={showTooltip}
		              active={!!matchPath(location.pathname, Router.ADMIN_SPACES)}
		              onClick={onMenuClicked(Router.ADMIN_SPACES)}
		              visible={!isSuperAdmin()}/>
		<SideMenuItem icon={ICON_PIPELINE} label="Pipelines" showTooltip={showTooltip}
		              active={!!matchPath(location.pathname, Router.ADMIN_PIPELINES)}
		              onClick={onMenuClicked(Router.ADMIN_PIPELINES)}
		              visible={!isSuperAdmin()}/>
		<SideMenuSeparator width={menuWidth} visible={!isSuperAdmin()}/>
		<SideMenuItem icon={ICON_USER_GROUP} label="User Groups" showTooltip={showTooltip}
		              active={!!matchPath(location.pathname, Router.ADMIN_USER_GROUPS)}
		              onClick={onMenuClicked(Router.ADMIN_USER_GROUPS)}
		              visible={!isSuperAdmin()}/>
		<SideMenuItem icon={ICON_TENANT} label="Data Zones" showTooltip={showTooltip}
		              active={!!matchPath(location.pathname, Router.ADMIN_TENANTS)}
		              onClick={onMenuClicked(Router.ADMIN_TENANTS)}
		              visible={isSuperAdmin()}/>
		<SideMenuItem icon={ICON_DATA_SOURCE} label="Data Sources" showTooltip={showTooltip}
		              active={!!matchPath(location.pathname, Router.ADMIN_DATA_SOURCES)}
		              onClick={onMenuClicked(Router.ADMIN_DATA_SOURCES)}
		              visible={isSuperAdmin() && isMultipleDataSourcesEnabled()}/>
		<SideMenuItem icon={ICON_EXTERNAL_WRITERS} label="External Writers" showTooltip={showTooltip}
		              active={!!matchPath(location.pathname, Router.ADMIN_EXTERNAL_WRITERS)}
		              onClick={onMenuClicked(Router.ADMIN_EXTERNAL_WRITERS)}
		              visible={isSuperAdmin() && isWriteExternalEnabled()}/>
		<SideMenuItem icon={ICON_USER} label="Users" showTooltip={showTooltip}
		              active={!!matchPath(location.pathname, Router.ADMIN_USERS)}
		              onClick={onMenuClicked(Router.ADMIN_USERS)}/>
		<SideMenuSeparator width={menuWidth} visible={!isSuperAdmin()}/>
		<SideMenuItem icon={ICON_PIPELINE_DEBUG} label="Simulator" showTooltip={showTooltip}
		              active={!!matchPath(location.pathname, Router.ADMIN_SIMULATOR)}
		              onClick={onMenuClicked(Router.ADMIN_SIMULATOR)}
		              visible={!isSuperAdmin()}/>
		<SideMenuSeparator width={menuWidth} visible={!isSuperAdmin()}/>
		{/* FEAT hide task menu */}
		<SideMenuItem icon={ICON_TASK} label="Tasks" showTooltip={showTooltip}
		              active={!!matchPath(location.pathname, Router.ADMIN_TASKS)}
		              onClick={onMenuClicked(Router.ADMIN_TASKS)}
		              visible={false}/>
		<SideMenuItem icon={ICON_MONITOR_LOGS} label="Monitor Logs" showTooltip={showTooltip}
		              active={!!matchPath(location.pathname, Router.ADMIN_MONITOR_LOGS)}
		              onClick={onMenuClicked(Router.ADMIN_MONITOR_LOGS)}
		              visible={!isSuperAdmin()}/>
		<SideMenuPlaceholder/>
		<SideMenuSeparator width={menuWidth}/>
		<SideMenuItem icon={ICON_SETTINGS} label={'Settings'} showTooltip={showTooltip}
		              active={!!matchPath(location.pathname, Router.ADMIN_SETTINGS)}
		              onClick={onMenuClicked(Router.ADMIN_SETTINGS)}
		              visible={!isSuperAdmin()}/>
		<SideMenuSwitchWorkbench icon={ICON_SWITCH_WORKBENCH}
		                         workbenches={workbenches}
		                         visible={!isSuperAdmin()}/>
		<SideMenuSeparator width={menuWidth}/>
		<SideMenuItem icon={ICON_LOGOUT} label={'Logout'} showTooltip={showTooltip}
		              onClick={onLogoutClicked}/>
		<SideMenuUser name={account.name}/>
		<SideMenuResizeHandle width={menuWidth} onResize={onResize}/>
	</AdminMenuContainer>;
};