import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ICON_DELETE } from '../../../../../../basic-widgets/constants';
import { ParameterJoint } from '../../../../../../services/tuples/factor-calculator-types';
import { Topic } from '../../../../../../services/tuples/topic-types';
import { JointBody } from '../joint-body';
import { JointElements } from '../joint-elements';
import { JointFold } from '../joint-fold';
import { JointOperators } from '../joint-operators';
import { JointType } from '../joint-type';
import { RemoveMeButton } from '../widgets';
import { JointContainer, JointHeader } from './widgets';

export const Joint = (props: { joint: ParameterJoint, topics: Array<Topic>, removeMe: () => void }) => {
	const { joint, topics, removeMe } = props;

	return <JointContainer>
		<JointHeader>
			<JointType joint={joint}/>
			<JointFold/>
			<RemoveMeButton onClick={removeMe}>
				<FontAwesomeIcon icon={ICON_DELETE}/>
			</RemoveMeButton>
		</JointHeader>
		<JointBody>
			<JointElements joint={joint} topics={topics}/>
			<JointOperators joint={joint}/>
		</JointBody>
	</JointContainer>;
};