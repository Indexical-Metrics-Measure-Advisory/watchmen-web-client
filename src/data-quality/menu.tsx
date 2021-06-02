import React, {useState} from 'react';
import {matchPath, useHistory, useLocation} from 'react-router-dom';
import styled from 'styled-components';
import {
	ICON_ADMIN,
	ICON_CONSANGUINITY,
	ICON_CONSOLE,
	ICON_HOME,
	ICON_LOGOUT,
	ICON_RULE_DEFINE,
	ICON_SETTINGS, ICON_STATISTICS,
	ICON_SWITCH_WORKBENCH,
	MOCK_ACCOUNT_NAME,
	SIDE_MENU_MAX_WIDTH,
	SIDE_MENU_MIN_WIDTH
} from '../basic-widgets/constants';
import {SideMenuItem} from '../basic-widgets/side-menu/side-menu-item';
import {SideMenuLogo} from '../basic-widgets/side-menu/side-menu-logo';
import {SideMenuPlaceholder} from '../basic-widgets/side-menu/side-menu-placeholder';
import {SideMenuResizeHandle} from '../basic-widgets/side-menu/side-menu-resize-handle';
import {SideMenuSeparator} from '../basic-widgets/side-menu/side-menu-separator';
import {SideMenuUser} from '../basic-widgets/side-menu/side-menu-user';
import {useEventBus} from '../events/event-bus';
import {EventTypes} from '../events/types';
import {Router} from '../routes/types';
import {findAccount, quit} from '../services/account';
import {SideMenuSwitchWorkbench} from '../basic-widgets/side-menu/side-menu-switch-workbench';

const DataQualityMenuContainer = styled.div.attrs<{ width: number }>(({width}) => {
	return {
		'data-widget': 'data-quality-menu',
		style: {width}
	};
})<{ width: number }>`
	display: flex;
	position: relative;
	flex-direction: column;
	align-items: flex-start;
	min-width: var(--console-menu-width);
	height: 100vh;
	top: 0;
	left: 0;
	border-right: var(--border);
	background-color: var(--invert-color);
	overflow: hidden;
	+ main {
		max-width: ${({width}) => `calc(100vw - ${width}px)`};
		div[data-widget="full-width-page"] {
			max-width: ${({width}) => `calc(100vw - ${width}px)`};
		}
	}
`;

export const DataQualityMenu = () => {
	const history = useHistory();
	const location = useLocation();
	const {fire} = useEventBus();
	const [menuWidth, setMenuWidth] = useState(SIDE_MENU_MIN_WIDTH);

	const onResize = (newWidth: number) => {
		setMenuWidth(Math.min(Math.max(newWidth, SIDE_MENU_MIN_WIDTH), SIDE_MENU_MAX_WIDTH));
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

	const workbenches = [
		{label: 'To Console', icon: ICON_CONSOLE, action: () => onMenuClicked(Router.CONSOLE)()},
		{label: 'To Admin', icon: ICON_ADMIN, action: () => onMenuClicked(Router.ADMIN)()}
	];

	return <DataQualityMenuContainer width={menuWidth}>
		<SideMenuLogo title="Data Quality Center"/>
		<SideMenuItem icon={ICON_HOME} label="Home" showTooltip={showTooltip}
		              active={!!matchPath(location.pathname, Router.DATA_QUALITY_HOME)}
		              onClick={onMenuClicked(Router.DATA_QUALITY_HOME)}/>
		<SideMenuItem icon={ICON_CONSANGUINITY} label="Consanguinity" showTooltip={showTooltip}
		              active={!!matchPath(location.pathname, Router.DATA_QUALITY_CONSANGUINITY)}
		              onClick={onMenuClicked(Router.DATA_QUALITY_CONSANGUINITY)}/>
		<SideMenuItem icon={ICON_RULE_DEFINE} label="Monitor Rules" showTooltip={showTooltip}
		              active={!!matchPath(location.pathname, Router.DATA_QUALITY_RULES)}
		              onClick={onMenuClicked(Router.DATA_QUALITY_RULES)}/>
		<SideMenuItem icon={ICON_STATISTICS} label="Statistics" showTooltip={showTooltip}
		              active={!!matchPath(location.pathname, Router.DATA_QUALITY_STATISTICS)}
		              onClick={onMenuClicked(Router.DATA_QUALITY_STATISTICS)}/>
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