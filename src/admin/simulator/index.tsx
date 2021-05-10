import {AdminMain} from '../pipelines/widgets';
import {FullWidthPage} from '../../basic-widgets/page';
import React from 'react';
import {SimulatorHeader} from './header';
import {SimulatorEventBusProvider} from './simulator-event-bus';

const AdminDebugIndex = () => {
	return <AdminMain>
		<SimulatorEventBusProvider>
			<FullWidthPage>
				<SimulatorHeader/>
			</FullWidthPage>
		</SimulatorEventBusProvider>
	</AdminMain>;
};

export default AdminDebugIndex;