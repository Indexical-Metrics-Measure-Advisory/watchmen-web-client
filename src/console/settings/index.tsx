import {VerticalMarginOneUnit} from '@/widgets/basic/margin';
import {FixWidthPage} from '@/widgets/basic/page';
import {PageHeader} from '@/widgets/basic/page-header';
import {DropdownOption} from '@/widgets/basic/types';
import {PersonalAccessToken} from '@/widgets/common-settings/personal-access-token';
import {ThemeSettings} from '@/widgets/common-settings/theme';
import {Lang} from '@/widgets/langs';
import React from 'react';
import {LanguageSettings} from './language';

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