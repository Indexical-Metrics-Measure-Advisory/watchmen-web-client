import {VerticalMarginOneUnit} from '@/widgets/basic/margin';
import {SettingsPage} from '@/widgets/basic/page';
import {PageHeader} from '@/widgets/basic/page-header';
import {LanguageSettings} from '@/widgets/common-settings/language';
import {PersonalAccessToken} from '@/widgets/common-settings/personal-access-token';
import {ThemeSettings} from '@/widgets/common-settings/theme';
import {Lang} from '@/widgets/langs';
import React from 'react';

export const IndicatorWorkbenchSettings = () => {
	return <SettingsPage>
		<PageHeader title={Lang.SETTINGS.TITLE}/>
		<VerticalMarginOneUnit/>
		<LanguageSettings/>
		<ThemeSettings en={false}/>
		<PersonalAccessToken title={Lang.SETTINGS.PAT.TITLE}
		                     createLabel={Lang.SETTINGS.PAT.CREATE}
		                     description={Lang.SETTINGS.PAT.DESCRIPTION}
		                     beforeDeleteConfirm={Lang.SETTINGS.PAT.DELETE_CONFIRM}
		                     inputPlaceholder={Lang.SETTINGS.PAT.INPUT_PLACEHOLDER}
		                     noteRequired={Lang.SETTINGS.PAT.NOTE_REQUIRED}/>
		<VerticalMarginOneUnit/>
	</SettingsPage>;
};

const IndicatorWorkbenchSettingsIndex = () => {
	return <IndicatorWorkbenchSettings/>;
};

export default IndicatorWorkbenchSettingsIndex;