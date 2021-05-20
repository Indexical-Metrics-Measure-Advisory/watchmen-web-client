import {ButtonInk} from '../../basic-widgets/types';
import {
	SettingsSection,
	SettingsSectionBody,
	SettingsSectionTitle
} from '../../basic-widgets/settings/settings-section';
import React, {useState} from 'react';
import {Button} from '../../basic-widgets/button';
import {clearSimulatorDB} from '../../local-persist/db';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ICON_LOADING} from '../../basic-widgets/constants';

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