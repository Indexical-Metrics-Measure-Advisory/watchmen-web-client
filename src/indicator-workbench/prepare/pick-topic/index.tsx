import {useEffect, useState} from 'react';
import styled from 'styled-components';
import {SinkingLabel, Step, StepTitle, useStep} from '../step-widgets';
import {PrepareStep} from '../types';

const Title = styled(StepTitle)`
`;
const Label = styled(SinkingLabel)`
	text-transform : uppercase;
`;

export const PickTopic = () => {
	const [constructed, setConstructed] = useState(false);
	const [visible, setVisible] = useState(false);
	useStep(PrepareStep.PICK_TOPIC, () => {
		setConstructed(true);
	}, () => {
	});
	useEffect(() => {
		if (constructed) {
			setVisible(true);
		}
	}, [constructed]);

	if (!constructed) {
		return null;
	}

	return <Step index={2} visible={visible}>
		<Title>
			<Label>Pick a factor</Label>
		</Title>
	</Step>;
};