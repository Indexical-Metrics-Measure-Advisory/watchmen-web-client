import {Button} from '@/widgets/basic/button';
import {ICON_LOADING} from '@/widgets/basic/constants';
import {SettingsSection, SettingsSectionBody, SettingsSectionTitle} from '@/widgets/basic/settings/settings-section';
import {ButtonInk} from '@/widgets/basic/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useState} from 'react';
import {useDataQualityCacheEventBus} from '../cache/cache-event-bus';
import {DataQualityCacheEventTypes} from '../cache/cache-event-bus-types';

export const CacheSettings = () => {
	const {once} = useDataQualityCacheEventBus();

	const [reloading, setReloading] = useState(false);
	const onReloadClicked = () => {
		setReloading(true);
		once(DataQualityCacheEventTypes.REPLY_RELOAD, () => {
			setReloading(false);
		}).fire(DataQualityCacheEventTypes.ASK_RELOAD);
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