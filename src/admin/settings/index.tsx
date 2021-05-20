import React from 'react';
import {VerticalMarginOneUnit} from '../../basic-widgets/margin';
import {FixWidthPage} from '../../basic-widgets/page';
import {PageHeader} from '../../basic-widgets/page-header';
import {ThemeSettings} from './theme';
import {CacheSettings} from './cache';
import {SimulatorLogsSettings} from './simulator-logs';

export const AdminSettings = () => {
	return <FixWidthPage>
		<PageHeader title="Settings"/>
		<VerticalMarginOneUnit/>
		<ThemeSettings/>
		<CacheSettings/>
		<SimulatorLogsSettings/>
	</FixWidthPage>;
};

const AdminSettingsIndex = () => {
	return <AdminSettings/>;
};

export default AdminSettingsIndex;