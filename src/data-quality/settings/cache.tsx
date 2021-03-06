import {ButtonInk} from '../../basic-widgets/types';
import {
	SettingsSection,
	SettingsSectionBody,
	SettingsSectionTitle
} from '../../basic-widgets/settings/settings-section';
import React, {useState} from 'react';
import {Button} from '../../basic-widgets/button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ICON_LOADING} from '../../basic-widgets/constants';
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