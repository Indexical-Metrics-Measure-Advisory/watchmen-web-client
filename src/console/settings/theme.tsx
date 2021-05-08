import React from 'react';
import {Dropdown} from '../../basic-widgets/dropdown';
import {
    SettingsSection,
    SettingsSectionBody,
    SettingsSectionTitle
} from '../../basic-widgets/settings/settings-section';
import {DropdownOption} from '../../basic-widgets/types';
import {useForceUpdate} from '../../basic-widgets/utils';
import {useEventBus} from '../../events/event-bus';
import {EventTypes} from '../../events/types';
import {Lang} from '../../langs';
import {saveLastSnapshot} from '../../services/console/last-snapshot';
import {getCurrentThemeCode} from '../../theme/theme-wrapper';

const SupportedThemes: Array<DropdownOption> = [
    {value: 'light', label: Lang.CONSOLE.SETTINGS.THEME_LIGHT},
    {value: 'dark', label: Lang.CONSOLE.SETTINGS.THEME_DARK},
]
export const ThemeSettings = () => {
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
        <SettingsSectionTitle>{Lang.CONSOLE.SETTINGS.THEME}</SettingsSectionTitle>
        <SettingsSectionBody>
            <Dropdown value={getCurrentThemeCode()} options={SupportedThemes} onChange={onThemeChange}/>
        </SettingsSectionBody>
    </SettingsSection>;
};