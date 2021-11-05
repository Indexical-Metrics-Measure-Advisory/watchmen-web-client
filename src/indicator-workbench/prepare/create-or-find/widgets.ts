import styled from 'styled-components';
import {SinkingLabel, StepTitle} from '../step-widgets';

export const Title = styled(StepTitle)`
	> button:first-child {
		margin-right : calc(var(--margin) / 2);
	}
`;
export const Label = styled(SinkingLabel)`
	text-transform : lowercase;
	font-variant   : petite-caps;
	margin-right   : calc(var(--margin) / 2);
`;
