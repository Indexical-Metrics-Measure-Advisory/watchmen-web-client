import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useIndicatorsEventBus} from '../indicators-event-bus';
import {IndicatorsEventTypes} from '../indicators-event-bus-types';
import {DropMeAndFollowingButton, SinkingLabel, Step, StepTitle, useStep} from '../step-widgets';
import {PrepareStep} from '../types';

const Title = styled(StepTitle)`
`;
const Label = styled(SinkingLabel)`
	text-transform : uppercase;
`;

export const PickTopic = () => {
	const {fire: fireGlobal} = useEventBus();
	const {fire} = useIndicatorsEventBus();
	const [constructed, setConstructed] = useState(false);
	const [visible, setVisible] = useState(false);
	useStep({
		step: PrepareStep.PICK_TOPIC,
		active: () => {
			setConstructed(true);
		}, done: () => {
		}, dropped: () => {
			setVisible(false);
		}
	});
	useEffect(() => {
		if (constructed) {
			setVisible(true);
		}
	}, [constructed]);
	useEffect(() => {
		if (!visible) {
			setTimeout(() => setConstructed(false), 310);
		}
	}, [visible]);

	if (!constructed) {
		return null;
	}

	const onDropMeAndFollowingClicked = () => {
		fireGlobal(EventTypes.SHOW_YES_NO_DIALOG,
			'Are you sure to drop this(#2) and following steps?',
			() => {
				fire(IndicatorsEventTypes.SWITCH_STEP, PrepareStep.CREATE_OR_FIND);
				fireGlobal(EventTypes.HIDE_DIALOG);
			},
			() => fireGlobal(EventTypes.HIDE_DIALOG));
	};

	return <Step index={2} visible={visible}>
		<Title>
			<Label>Pick a factor</Label>
			<DropMeAndFollowingButton onClick={onDropMeAndFollowingClicked}/>
		</Title>
	</Step>;
};