import React, {useEffect} from 'react';
import {useForceUpdate} from '@/basic-widgets/utils';
import {Conditional} from '@/services/tuples/pipeline-super-types';
import {Topic} from '@/services/tuples/topic-types';
import {useConditionalEventBus} from '../conditional-event-bus';
import {ConditionalEventTypes} from '../conditional-event-bus-types';
import {JointBody} from '../joint-body';
import {JointElements} from '../joint-elements';
import {JointOperators} from '../joint-operators';

export const TopJoint = (props: { conditional: Conditional, topics: Array<Topic> }) => {
	const {conditional, topics} = props;

	const {on, off} = useConditionalEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(ConditionalEventTypes.TOP_TYPE_CHANGED, forceUpdate);
		return () => {
			off(ConditionalEventTypes.TOP_TYPE_CHANGED, forceUpdate);
		};
	}, [on, off, forceUpdate]);

	if (!conditional.on) {
		return null;
	}

	return <JointBody>
		<JointElements joint={conditional.on} topics={topics}/>
		<JointOperators joint={conditional.on}/>
	</JointBody>;
};