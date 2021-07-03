import React from 'react';
import {VerticalMarginOneUnit} from '../../basic-widgets/margin';
import {FixWidthPage} from '../../basic-widgets/page';
import {PageHeader} from '../../basic-widgets/page-header';
import {ThemeSettings} from '../../common-settings/theme';
import {Lang} from '../../langs';
import {LanguageSettings} from './language';
import {DropdownOption} from '../../basic-widgets/types';
import {PersonalAccessToken} from '../../common-settings/personal-access-token';

const SupportedThemes: Array<DropdownOption> = [
	{value: 'light', label: Lang.CONSOLE.SETTINGS.THEME_LIGHT},
	{value: 'dark', label: Lang.CONSOLE.SETTINGS.THEME_DARK}
];
export const ConsoleSettings = () => {
	return <FixWidthPage>
		<PageHeader title={Lang.CONSOLE.SETTINGS.TITLE}/>
		<VerticalMarginOneUnit/>
		<LanguageSettings/>
		<ThemeSettings title={Lang.CONSOLE.SETTINGS.THEME} themeOptions={SupportedThemes}/>
		<PersonalAccessToken title={Lang.CONSOLE.SETTINGS.PAT.TITLE}
		                     createLabel={Lang.CONSOLE.SETTINGS.PAT.CREATE}
		                     description={Lang.CONSOLE.SETTINGS.PAT.DESCRIPTION}
		                     beforeDeleteConfirm={Lang.CONSOLE.SETTINGS.PAT.DELETE_CONFIRM}
		                     inputPlaceholder={Lang.CONSOLE.SETTINGS.PAT.INPUT_PLACEHOLDER}
		                     noteRequired={Lang.CONSOLE.SETTINGS.PAT.NOTE_REQUIRED}/>
		<VerticalMarginOneUnit/>
	</FixWidthPage>;
};

const ConsoleSettingsIndex = () => {
	return <ConsoleSettings/>;
};

export default ConsoleSettingsIndex;