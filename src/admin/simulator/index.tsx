import {AdminMain} from '../pipelines/widgets';
import {FullWidthPage} from '../../basic-widgets/page';
import React from 'react';
import {SimulatorHeader} from './header';
import {SimulatorEventBusProvider} from './simulator-event-bus';
import {SimulatorBody} from './body';

const AdminDebugIndex = () => {
	return <AdminMain>
		<SimulatorEventBusProvider>
			<FullWidthPage>
				<SimulatorHeader/>
				<SimulatorBody/>
			</FullWidthPage>
		</SimulatorEventBusProvider>
	</AdminMain>;
};

export default AdminDebugIndex;