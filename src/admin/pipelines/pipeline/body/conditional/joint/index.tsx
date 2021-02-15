import React from 'react';
import { ParameterJoint } from '../../../../../../services/tuples/factor-calculator-types';
import { JointEventBusProvider } from '../event-bus/joint-event-bus';
import { JointElements } from '../joint-elements';
import { JointOperators } from '../joint-operators';
import { JointType } from './joint-type';
import { JointContainer } from './widgets';

export const Joint = (props: { joint: ParameterJoint, removeMe: () => void }) => {
	const { joint, removeMe } = props;

	return <JointEventBusProvider>
		<JointContainer>
			<JointType joint={joint} removeMe={removeMe}/>
			<JointElements joint={joint}/>
			<JointOperators joint={joint}/>
		</JointContainer>
	</JointEventBusProvider>;
};