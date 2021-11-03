import {useIndicatorsEventBus} from '@/indicator-workbench/prepare/indicators-event-bus';
import {IndicatorsEventTypes} from '@/indicator-workbench/prepare/indicators-event-bus-types';
import {useEffect, useState} from 'react';
import styled from 'styled-components';
import {SinkingLabel, Step, StepTitle} from '../step-widgets';

const Title = styled(StepTitle)`
`;
const Label = styled(SinkingLabel)`
	text-transform : uppercase;
`;

export const PickTopic = () => {
	const {on, off} = useIndicatorsEventBus();
	const [constructed, setConstructed] = useState(false);
	const [visible, setVisible] = useState(false);
	useEffect(() => {
		const onDoCreateIndicator = () => {
			setConstructed(true);
		};
		on(IndicatorsEventTypes.DO_CREATE_INDICATOR, onDoCreateIndicator);
		return () => {
			off(IndicatorsEventTypes.DO_CREATE_INDICATOR, onDoCreateIndicator);
		};
	}, [on, off]);
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