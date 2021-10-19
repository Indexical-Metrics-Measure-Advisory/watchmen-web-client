import {saveLastSnapshot} from '@/services/data/account/last-snapshot';
import React from 'react';
import {Dropdown} from '../basic/dropdown';
import {SettingsSection, SettingsSectionBody, SettingsSectionTitle} from '../basic/settings/settings-section';
import {DropdownOption} from '../basic/types';
import {useForceUpdate} from '../basic/utils';
import {useEventBus} from '../events/event-bus';
import {EventTypes} from '../events/types';
import {Lang} from '../langs';
import {getCurrentThemeCode} from '../theme/theme-wrapper';

export const SupportedThemes: Array<DropdownOption> = [
	{value: 'light', label: Lang.SETTINGS.THEME_LIGHT},
	{value: 'dark', label: Lang.SETTINGS.THEME_DARK}
];

export const ThemeSettings = (props: { en?: boolean }) => {
	const {en = true} = props;

	const title = en ? 'Theme' : Lang.SETTINGS.THEME;
	const options = en
		? [
			{value: 'light', label: 'Light'},
			{value: 'dark', label: 'Dark'}
		]
		: SupportedThemes;

	const {fire} = useEventBus();
	const forceUpdate = useForceUpdate();

	const onThemeChange = (option: DropdownOption) => {
		const {value: code} = option;
		fire(EventTypes.CHANGE_THEME, code);
		forceUpdate();
		(async () => {
			try {
				await saveLastSnapshot({theme: code});
			} catch (e: any) {
				// ignore
				console.info(e);
			}
		})();
	};

	return <SettingsSection>
		<SettingsSectionTitle>{title}</SettingsSectionTitle>
		<SettingsSectionBody>
			<Dropdown value={getCurrentThemeCode()} options={options} onChange={onThemeChange}/>
		</SettingsSectionBody>
	</SettingsSection>;
};