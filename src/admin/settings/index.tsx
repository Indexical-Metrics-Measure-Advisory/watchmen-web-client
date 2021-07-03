import React from 'react';
import {VerticalMarginOneUnit} from '../../basic-widgets/margin';
import {FixWidthPage} from '../../basic-widgets/page';
import {PageHeader} from '../../basic-widgets/page-header';
import {CacheSettings} from './cache';
import {SimulatorLogsSettings} from './simulator-logs';
import {ThemeSettings} from '../../common-settings/theme';
import {PersonalAccessToken} from '../../common-settings/personal-access-token';

export const AdminSettings = () => {
	return <FixWidthPage>
		<PageHeader title="Settings"/>
		<VerticalMarginOneUnit/>
		<ThemeSettings/>
		<CacheSettings/>
		<SimulatorLogsSettings/>
		<PersonalAccessToken/>
		<VerticalMarginOneUnit/>
	</FixWidthPage>;
};

const AdminSettingsIndex = () => {
	return <AdminSettings/>;
};

export default AdminSettingsIndex;