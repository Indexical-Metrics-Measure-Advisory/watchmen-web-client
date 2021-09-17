import {Conditional} from '@/services/data/tuples/pipeline-super-types';
import {Topic} from '@/services/data/tuples/topic-types';
import React from 'react';
import {Conditional2ParentBridge} from './conditional-2-parent-bridge';
import {ConditionalEventBusProvider} from './conditional-event-bus';
import {JointEventBusProvider} from './event-bus/joint-event-bus';
import {TopFold} from './top-fold';
import {TopJoint} from './top-joint';
import {TopJoint2ConditionalBridge} from './top-joint-2-conditional-bridge';
import {TopType} from './top-type';
import {ConditionalContainer, ConditionalHeader} from './widgets';

export const ConditionalEditor = (props: {
	conditional: Conditional;
	topics: Array<Topic>;
	// true means force have conditional, default is false
	force?: boolean;
	onChange: () => void;
}) => {
	const {conditional, topics, onChange, force = false} = props;

	return <ConditionalEventBusProvider>
		<Conditional2ParentBridge onChange={onChange}/>
		<JointEventBusProvider>
			<TopJoint2ConditionalBridge conditional={conditional}/>
			<ConditionalContainer>
				<ConditionalHeader>
					<TopType conditional={conditional} force={force}/>
					<TopFold conditional={conditional}/>
				</ConditionalHeader>
				<TopJoint conditional={conditional} topics={topics}/>
			</ConditionalContainer>
		</JointEventBusProvider>
	</ConditionalEventBusProvider>;
};