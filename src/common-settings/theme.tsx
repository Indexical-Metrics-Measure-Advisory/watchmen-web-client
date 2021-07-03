import React from 'react';
import {DropdownOption} from '../basic-widgets/types';
import {useForceUpdate} from '../basic-widgets/utils';
import {Dropdown} from '../basic-widgets/dropdown';
import {getCurrentThemeCode} from '../theme/theme-wrapper';
import {EventTypes} from '../events/types';
import {useEventBus} from '../events/event-bus';
import {saveLastSnapshot} from '../services/console/last-snapshot';
import {SettingsSection, SettingsSectionBody, SettingsSectionTitle} from '../basic-widgets/settings/settings-section';

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
			} catch (e) {
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