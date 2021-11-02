import {Button} from '@/widgets/basic/button';
import {ICON_LOADING} from '@/widgets/basic/constants';
import {SettingsSection, SettingsSectionBody, SettingsSectionTitle} from '@/widgets/basic/settings/settings-section';
import {ButtonInk} from '@/widgets/basic/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useState} from 'react';
import {useAdminCacheEventBus} from '../cache/cache-event-bus';
import {AdminCacheEventTypes} from '../cache/cache-event-bus-types';

export const CacheSettings = () => {
	const {fire} = useAdminCacheEventBus();

	const [reloading, setReloading] = useState(false);
	const onReloadClicked = () => {
		setReloading(true);
		fire(AdminCacheEventTypes.ASK_RELOAD, () => setReloading(false));
	};

	return <SettingsSection>
		<SettingsSectionTitle>Local Cache</SettingsSectionTitle>
		<SettingsSectionBody>
			<Button ink={ButtonInk.WARN} onClick={onReloadClicked}>
				{!reloading ? null : <FontAwesomeIcon icon={ICON_LOADING} spin={true}/>}
				<span>Reload</span>
			</Button>
			<span>
				Should takes a while on reloading, please don't leave current page until reloaded.
			</span>
		</SettingsSectionBody>
	</SettingsSection>;
};