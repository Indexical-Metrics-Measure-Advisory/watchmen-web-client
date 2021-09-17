import {saveLastSnapshot} from '@/services/data/account/last-snapshot';
import {Dropdown} from '@/widgets/basic/dropdown';
import {SettingsSection, SettingsSectionBody, SettingsSectionTitle} from '@/widgets/basic/settings/settings-section';
import {DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {getCurrentLanguageCode, Lang, SupportedLanguages} from '@/widgets/langs';
import React from 'react';

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
		<SettingsSectionTitle>{Lang.CONSOLE.SETTINGS.LANGUAGE}</SettingsSectionTitle>
		<SettingsSectionBody>
			<Dropdown value={getCurrentLanguageCode()} options={options} onChange={onLanguageChange}/>
		</SettingsSectionBody>
	</SettingsSection>;
};