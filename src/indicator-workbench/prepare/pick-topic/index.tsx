import {useEffect, useState} from 'react';
import styled from 'styled-components';
import {DropMeAndFollowingButton, SinkingLabel, Step, StepTitle, useStep} from '../step-widgets';
import {PrepareStep} from '../types';

const Title = styled(StepTitle)`
`;
const Label = styled(SinkingLabel)`
	text-transform : uppercase;
`;

export const PickTopic = () => {
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

	return <Step index={2} visible={visible}>
		<Title>
			<Label>Pick a factor</Label>
			<DropMeAndFollowingButton stepIndex={2} previousStep={PrepareStep.CREATE_OR_FIND}/>
		</Title>
	</Step>;
};