import {VerticalMarginOneUnit} from '@/widgets/basic/margin';
import {FixWidthPage} from '@/widgets/basic/page';
import {PageHeader} from '@/widgets/basic/page-header';
import {PersonalAccessToken} from '@/widgets/common-settings/personal-access-token';
import {ThemeSettings} from '@/widgets/common-settings/theme';
import React from 'react';
import {CacheSettings} from './cache';

export const DataQualitySettings = () => {
	return <FixWidthPage>
		<PageHeader title="Settings"/>
		<VerticalMarginOneUnit/>
		<ThemeSettings/>
		<CacheSettings/>
		<PersonalAccessToken/>
		<VerticalMarginOneUnit/>
	</FixWidthPage>;
};

const DataQualitySettingsIndex = () => {
	return <DataQualitySettings/>;
};

export default DataQualitySettingsIndex;