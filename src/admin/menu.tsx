import React, {useState} from 'react';
import {matchPath, useHistory, useLocation} from 'react-router-dom';
import styled from 'styled-components';
import {
	ICON_CONSOLE,
	ICON_ENUM,
	ICON_HOME,
	ICON_LOGOUT,
	ICON_MONITOR_LOGS,
	ICON_PIPELINE,
	ICON_REPORT,
	ICON_SETTINGS,
	ICON_SPACE,
	ICON_TASK,
	ICON_TOPIC,
	ICON_USER,
	ICON_USER_GROUP,
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

	return <AdminMenuContainer width={menuWidth}>
		<SideMenuLogo title="Watchmen Admin"/>
		<SideMenuItem icon={ICON_HOME} label="Home" showTooltip={showTooltip}
		              active={!!matchPath(location.pathname, Router.ADMIN_HOME)}
		              onClick={onMenuClicked(Router.ADMIN_HOME)}/>
		<SideMenuItem icon={ICON_TOPIC} label="Topics" showTooltip={showTooltip}
		              active={!!matchPath(location.pathname, Router.ADMIN_TOPICS)}
		              onClick={onMenuClicked(Router.ADMIN_TOPICS)}/>
		<SideMenuItem icon={ICON_ENUM} label="Enumerations" showTooltip={showTooltip}
		              active={!!matchPath(location.pathname, Router.ADMIN_ENUMS)}
		              onClick={onMenuClicked(Router.ADMIN_ENUMS)}/>
		<SideMenuItem icon={ICON_REPORT} label="Reports" showTooltip={showTooltip}
		              active={!!matchPath(location.pathname, Router.ADMIN_REPORTS)}
		              onClick={onMenuClicked(Router.ADMIN_REPORTS)}/>
		<SideMenuItem icon={ICON_SPACE} label="Spaces" showTooltip={showTooltip}
		              active={!!matchPath(location.pathname, Router.ADMIN_SPACES)}
		              onClick={onMenuClicked(Router.ADMIN_SPACES)}/>
		<SideMenuItem icon={ICON_PIPELINE} label="Pipelines" showTooltip={showTooltip}
		              active={!!matchPath(location.pathname, Router.ADMIN_PIPELINES)}
		              onClick={onMenuClicked(Router.ADMIN_PIPELINES)}/>
		<SideMenuSeparator width={menuWidth}/>
		<SideMenuItem icon={ICON_USER_GROUP} label="User Groups" showTooltip={showTooltip}
		              active={!!matchPath(location.pathname, Router.ADMIN_USER_GROUPS)}
		              onClick={onMenuClicked(Router.ADMIN_USER_GROUPS)}/>
		<SideMenuItem icon={ICON_USER} label="Users" showTooltip={showTooltip}
		              active={!!matchPath(location.pathname, Router.ADMIN_USERS)}
		              onClick={onMenuClicked(Router.ADMIN_USERS)}/>
		<SideMenuSeparator width={menuWidth}/>
		{/* FEAT hide task menu */}
		<SideMenuItem icon={ICON_TASK} label="Tasks" showTooltip={showTooltip}
		              active={!!matchPath(location.pathname, Router.ADMIN_TASKS)}
		              onClick={onMenuClicked(Router.ADMIN_TASKS)}
		              visible={false}/>
		<SideMenuItem icon={ICON_MONITOR_LOGS} label="Monitor Logs" showTooltip={showTooltip}
		              active={!!matchPath(location.pathname, Router.ADMIN_MONITOR_LOGS)}
		              onClick={onMenuClicked(Router.ADMIN_MONITOR_LOGS)}/>
		<SideMenuPlaceholder/>
		<SideMenuSeparator width={menuWidth}/>
		<SideMenuItem icon={ICON_SETTINGS} label={'Settings'} showTooltip={showTooltip}
		              active={!!matchPath(location.pathname, Router.ADMIN_SETTINGS)}
		              onClick={onMenuClicked(Router.ADMIN_SETTINGS)}/>
		<SideMenuItem icon={ICON_CONSOLE} label={'Switch to Console'} showTooltip={showTooltip}
		              onClick={onMenuClicked(Router.CONSOLE)}/>
		<SideMenuSeparator width={menuWidth}/>
		<SideMenuItem icon={ICON_LOGOUT} label={'Logout'} showTooltip={showTooltip}
		              onClick={onLogoutClicked}/>
		<SideMenuUser name={account.name}/>
		<SideMenuResizeHandle width={menuWidth} onResize={onResize}/>
	</AdminMenuContainer>;
};