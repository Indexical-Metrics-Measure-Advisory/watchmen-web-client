import React from 'react';
import {VerticalMarginOneUnit} from '../../basic-widgets/margin';
import {FixWidthPage} from '../../basic-widgets/page';
import {PageHeader} from '../../basic-widgets/page-header';
import {CacheSettings} from './cache';
import {ThemeSettings} from '../../common-settings/theme';

export const DataQualitySettings = () => {
	return <FixWidthPage>
		<PageHeader title="Settings"/>
		<VerticalMarginOneUnit/>
		<ThemeSettings/>
		<CacheSettings/>
		<VerticalMarginOneUnit/>
	</FixWidthPage>;
};

const DataQualitySettingsIndex = () => {
	return <DataQualitySettings/>;
};

export default DataQualitySettingsIndex;