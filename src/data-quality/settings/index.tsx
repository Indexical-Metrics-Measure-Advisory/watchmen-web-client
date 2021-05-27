import React from 'react';
import {VerticalMarginOneUnit} from '../../basic-widgets/margin';
import {FixWidthPage} from '../../basic-widgets/page';
import {PageHeader} from '../../basic-widgets/page-header';
import {ThemeSettings} from './theme';

export const DataQualitySettings = () => {
	return <FixWidthPage>
		<PageHeader title="Settings"/>
		<VerticalMarginOneUnit/>
		<ThemeSettings/>
		<VerticalMarginOneUnit/>
	</FixWidthPage>;
};

const DataQualitySettingsIndex = () => {
	return <DataQualitySettings/>;
};

export default DataQualitySettingsIndex;