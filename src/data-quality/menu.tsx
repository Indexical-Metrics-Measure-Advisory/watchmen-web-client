import {Router} from '@/routes/types';
import {findAccount, quit} from '@/services/data/account';
import {
	ICON_ADMIN,
	ICON_CATALOG,
	ICON_CONSANGUINITY,
	ICON_CONSOLE,
	ICON_END_USER,
	ICON_HOME,
	ICON_INDICATOR_WORKBENCH,
	ICON_LOGOUT,
	ICON_RULE_DEFINE,
	ICON_SETTINGS,
	ICON_STATISTICS,
	ICON_SWITCH_WORKBENCH,
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
	isAdminAvailable,
	isConsoleAvailable,
	isIndicatorWorkbenchAvailable
} from '@/widgets/common-settings/workbench-utils';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import React, {useEffect, useState} from 'react';
import {matchPath, useHistory, useLocation} from 'react-router-dom';
import styled from 'styled-components';

const DataQualityMenuContainer = styled.div.attrs<{ width: number }>(({width}) => {
	return {
		'data-widget': 'data-quality-menu',
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

export const DataQualityMenu = () => {
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
	if (isAdminAvailable()) {
		workbenches.push({label: 'To Admin', icon: ICON_ADMIN, action: () => onMenuClicked(Router.ADMIN)()});
	}
	if (isIndicatorWorkbenchAvailable()) {
		workbenches.push({
			label: 'To Indicator Workbench',
			icon: ICON_INDICATOR_WORKBENCH,
			action: () => onMenuClicked(Router.INDICATOR_WORKBENCH)()
		});
	}

	return <DataQualityMenuContainer width={menuWidth}>
		<SideMenuLogo title="Data Quality Center"/>
		<SideMenuItem icon={ICON_HOME} label="Home" showTooltip={showTooltip}
		              active={!!matchPath(location.pathname, Router.DATA_QUALITY_HOME)}
		              onClick={onMenuClicked(Router.DATA_QUALITY_HOME)}
		              visible={false}/>
		<SideMenuItem icon={ICON_STATISTICS} label="Run Statistics" showTooltip={showTooltip}
		              active={!!matchPath(location.pathname, Router.DATA_QUALITY_STATISTICS)}
		              onClick={onMenuClicked(Router.DATA_QUALITY_STATISTICS)}/>
		<SideMenuItem icon={ICON_CONSANGUINITY} label="Consanguinity" showTooltip={showTooltip}
		              active={!!matchPath(location.pathname, Router.DATA_QUALITY_CONSANGUINITY)}
		              onClick={onMenuClicked(Router.DATA_QUALITY_CONSANGUINITY)}/>
		<SideMenuItem icon={ICON_CATALOG} label="Catalog" showTooltip={showTooltip}
		              active={!!matchPath(location.pathname, Router.DATA_QUALITY_CATALOG)}
		              onClick={onMenuClicked(Router.DATA_QUALITY_CATALOG)}/>
		<SideMenuItem icon={ICON_RULE_DEFINE} label="Monitor Rules" showTooltip={showTooltip}
		              active={!!matchPath(location.pathname, Router.DATA_QUALITY_RULES)}
		              onClick={onMenuClicked(Router.DATA_QUALITY_RULES)}/>
		<SideMenuItem icon={ICON_END_USER} label="End User's Console" showTooltip={showTooltip}
		              active={!!matchPath(location.pathname, Router.DATA_QUALITY_END_USER)}
		              onClick={onMenuClicked(Router.DATA_QUALITY_END_USER)}
		              visible={false}/>
		<SideMenuPlaceholder/>
		<SideMenuSeparator width={menuWidth}/>
		<SideMenuItem icon={ICON_SETTINGS} label={'Settings'} showTooltip={showTooltip}
		              active={!!matchPath(location.pathname, Router.DATA_QUALITY_SETTINGS)}
		              onClick={onMenuClicked(Router.DATA_QUALITY_SETTINGS)}/>
		<SideMenuSwitchWorkbench icon={ICON_SWITCH_WORKBENCH}
		                         workbenches={workbenches}/>
		<SideMenuSeparator width={menuWidth}/>
		<SideMenuItem icon={ICON_LOGOUT} label={'Logout'} showTooltip={showTooltip}
		              onClick={onLogoutClicked}/>
		<SideMenuUser name={account.name}/>
		<SideMenuResizeHandle width={menuWidth} onResize={onResize}/>
	</DataQualityMenuContainer>;
};