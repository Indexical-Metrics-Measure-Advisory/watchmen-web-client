import {VerticalMarginOneUnit} from '@/widgets/basic/margin';
import {FixWidthPage} from '@/widgets/basic/page';
import {PageHeader} from '@/widgets/basic/page-header';
import {PersonalAccessToken} from '@/widgets/common-settings/personal-access-token';
import {ThemeSettings} from '@/widgets/common-settings/theme';
import React from 'react';
import {CacheSettings} from './cache';
import {SimulatorLogsSettings} from './simulator-logs';

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