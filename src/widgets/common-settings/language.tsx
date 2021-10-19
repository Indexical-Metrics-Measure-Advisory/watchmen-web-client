import {saveLastSnapshot} from '@/services/data/account/last-snapshot';
import React from 'react';
import {Dropdown} from '../basic/dropdown';
import {SettingsSection, SettingsSectionBody, SettingsSectionTitle} from '../basic/settings/settings-section';
import {DropdownOption} from '../basic/types';
import {useForceUpdate} from '../basic/utils';
import {useEventBus} from '../events/event-bus';
import {EventTypes} from '../events/types';
import {getCurrentLanguageCode, Lang, SupportedLanguages} from '../langs';

export const LanguageSettings = () => {
	const {fire} = useEventBus();
	const forceUpdate = useForceUpdate();

	const onLanguageChange = (option: DropdownOption) => {
		const {value: code} = option;
		fire(EventTypes.CHANGE_LANGUAGE, code);
		forceUpdate();
		(async () => {
			try {
				await saveLastSnapshot({language: code});
			} catch (e: any) {
				// ignore
				console.info(e);
			}
		})();
	};

	const options = SupportedLanguages.map(({code, name}) => ({value: code, label: name}));

	return <SettingsSection>
		<SettingsSectionTitle>{Lang.SETTINGS.LANGUAGE}</SettingsSectionTitle>
		<SettingsSectionBody>
			<Dropdown value={getCurrentLanguageCode()} options={options} onChange={onLanguageChange}/>
		</SettingsSectionBody>
	</SettingsSection>;
};