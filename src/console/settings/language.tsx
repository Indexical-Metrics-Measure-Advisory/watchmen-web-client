import React from 'react';
import { Dropdown } from '../../basic-widgets/dropdown';
import {
	SettingsSection,
	SettingsSectionBody,
	SettingsSectionTitle
} from '../../basic-widgets/settings/settings-section';
import { DropdownOption } from '../../basic-widgets/types';
import { useForceUpdate } from '../../basic-widgets/utils';
import { useEventBus } from '../../events/event-bus';
import { EventTypes } from '../../events/types';
import { getCurrentLanguageCode, Lang, SupportedLanguages } from '../../langs';
import { saveLastSnapshot } from '../../services/console/last-snapshot';


export const LanguageSettings = () => {
	const { fire } = useEventBus();
	const forceUpdate = useForceUpdate();

	const onLanguageChange = (option: DropdownOption) => {
		const { value: code } = option;
		fire(EventTypes.CHANGE_LANGUAGE, code);
		forceUpdate();
		(async () => {
			await saveLastSnapshot({ language: code });
		})();
	};

	const options = SupportedLanguages.map(({ code, name }) => ({ value: code, label: name }));

	return <SettingsSection>
		<SettingsSectionTitle>{Lang.CONSOLE.SETTINGS.LANGUAGE}</SettingsSectionTitle>
		<SettingsSectionBody>
			<Dropdown value={getCurrentLanguageCode()} options={options} onChange={onLanguageChange}/>
		</SettingsSectionBody>
	</SettingsSection>;
};