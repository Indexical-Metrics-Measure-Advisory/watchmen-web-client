import React from 'react';
import {VerticalMarginOneUnit} from '../../basic-widgets/margin';
import {FixWidthPage} from '../../basic-widgets/page';
import {PageHeader} from '../../basic-widgets/page-header';
import {Lang} from '../../langs';
import {LanguageSettings} from './language';
import {ThemeSettings} from './theme';

export const ConsoleSettings = () => {
	return <FixWidthPage>
		<PageHeader title={Lang.CONSOLE.SETTINGS.TITLE}/>
		<VerticalMarginOneUnit/>
		<LanguageSettings/>
		<ThemeSettings/>
	</FixWidthPage>;
};

const ConsoleSettingsIndex = () => {
	return <ConsoleSettings/>;
};

export default ConsoleSettingsIndex;