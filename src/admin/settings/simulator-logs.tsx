import {clearSimulatorDB} from '@/services/local-persist/db';
import {Button} from '@/widgets/basic/button';
import {ICON_LOADING} from '@/widgets/basic/constants';
import {SettingsSection, SettingsSectionBody, SettingsSectionTitle} from '@/widgets/basic/settings/settings-section';
import {ButtonInk} from '@/widgets/basic/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useState} from 'react';

export const SimulatorLogsSettings = () => {
	const [reloading, setReloading] = useState(false);
	const onClearClicked = async () => {
		setReloading(true);
		await clearSimulatorDB();
		setTimeout(() => {
			setReloading(false);
		}, 2000);
	};

	return <SettingsSection>
		<SettingsSectionTitle>Simulator Logs</SettingsSectionTitle>
		<SettingsSectionBody>
			<Button ink={ButtonInk.WARN} onClick={onClearClicked}>
				{!reloading ? null : <FontAwesomeIcon icon={ICON_LOADING} spin={true}/>}
				<span>Clear</span>
			</Button>
			<span>
				Should takes a while on clearing.
			</span>
		</SettingsSectionBody>
	</SettingsSection>;
};