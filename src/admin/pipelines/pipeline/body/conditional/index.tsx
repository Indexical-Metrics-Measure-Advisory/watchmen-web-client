import React from 'react';
import { Conditional } from '../../../../../services/tuples/pipeline-super-types';
import { Conditional2ParentBridge } from './conditional-2-parent-bridge';
import { ConditionalEventBusProvider } from './conditional-event-bus';
import { JointEventBusProvider } from './event-bus/joint-event-bus';
import { TopFold } from './top-fold';
import { TopJoint } from './top-joint';
import { TopJoint2ConditionalBridge } from './top-joint-2-conditional-bridge';
import { TopType } from './top-type';
import { ConditionalContainer, ConditionalHeader } from './widgets';

export const ConditionalEditor = (props: {
	conditional: Conditional;
	onChange: () => void;
}) => {
	const { conditional, onChange } = props;

	return <ConditionalEventBusProvider>
		<Conditional2ParentBridge onChange={onChange}/>
		<JointEventBusProvider>
			<TopJoint2ConditionalBridge conditional={conditional}/>
			<ConditionalContainer>
				<ConditionalHeader>
					<TopType conditional={conditional}/>
					<TopFold conditional={conditional}/>
				</ConditionalHeader>
				<TopJoint conditional={conditional}/>
			</ConditionalContainer>
		</JointEventBusProvider>
	</ConditionalEventBusProvider>;
};