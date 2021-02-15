import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ICON_DELETE } from '../../../../../../basic-widgets/constants';
import { ParameterJoint } from '../../../../../../services/tuples/factor-calculator-types';
import { JointEventBusProvider } from '../event-bus/joint-event-bus';
import { JointBody } from '../joint-body';
import { JointElements } from '../joint-elements';
import { JointFold } from '../joint-fold';
import { JointOperators } from '../joint-operators';
import { JointType } from '../joint-type';
import { RemoveMeButton } from '../widgets';
import { JointContainer, JointHeader } from './widgets';

export const Joint = (props: { joint: ParameterJoint, removeMe: () => void }) => {
	const { joint, removeMe } = props;

	return <JointEventBusProvider>
		<JointContainer>
			<JointHeader>
				<JointType joint={joint}/>
				<JointFold/>
				<RemoveMeButton onClick={removeMe}>
					<FontAwesomeIcon icon={ICON_DELETE}/>
				</RemoveMeButton>
			</JointHeader>
			<JointBody>
				<JointElements joint={joint}/>
				<JointOperators joint={joint}/>
			</JointBody>
		</JointContainer>
	</JointEventBusProvider>;
};