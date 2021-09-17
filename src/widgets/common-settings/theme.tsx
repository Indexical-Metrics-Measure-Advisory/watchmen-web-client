import {saveLastSnapshot} from '@/services/data/account/last-snapshot';
import React from 'react';
import {Dropdown} from '../basic/dropdown';
import {SettingsSection, SettingsSectionBody, SettingsSectionTitle} from '../basic/settings/settings-section';
import {DropdownOption} from '../basic/types';
import {useForceUpdate} from '../basic/utils';
import {useEventBus} from '../events/event-bus';
import {EventTypes} from '../events/types';
import {getCurrentThemeCode} from '../theme/theme-wrapper';

export const ThemeSettings = (props: {
	title?: string;
	themeOptions?: Array<DropdownOption>;
}) => {
	const {
		title = 'Theme',
		themeOptions = [
			{value: 'light', label: 'Light'},
			{value: 'dark', label: 'Dark'}
		]
	} = props;

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
			<Dropdown value={getCurrentThemeCode()} options={themeOptions} onChange={onThemeChange}/>
		</SettingsSectionBody>
	</SettingsSection>;
};