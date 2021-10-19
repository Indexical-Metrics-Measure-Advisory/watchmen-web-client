import {VerticalMarginOneUnit} from '@/widgets/basic/margin';
import {FixWidthPage} from '@/widgets/basic/page';
import {PageHeader} from '@/widgets/basic/page-header';
import {LanguageSettings} from '@/widgets/common-settings/language';
import {ThemeSettings} from '@/widgets/common-settings/theme';
import {Lang} from '@/widgets/langs';
import React from 'react';

export const IndicatorWorkbenchSettings = () => {
	return <FixWidthPage>
		<PageHeader title={Lang.SETTINGS.TITLE}/>
		<VerticalMarginOneUnit/>
		<LanguageSettings/>
		<ThemeSettings en={false}/>
		<VerticalMarginOneUnit/>
	</FixWidthPage>;
};

const IndicatorWorkbenchSettingsIndex = () => {
	return <IndicatorWorkbenchSettings/>;
};

export default IndicatorWorkbenchSettingsIndex;