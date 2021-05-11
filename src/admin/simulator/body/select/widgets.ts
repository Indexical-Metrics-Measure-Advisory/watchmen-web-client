import styled from 'styled-components';
import {SimulatorBodyPartLabel} from '../widgets';

export const StartFromRow = styled.div`
	display: grid;
	grid-template-columns: auto auto auto auto auto 1fr;
	grid-column-gap: calc(var(--margin) / 2);
	align-items: center;
	padding: 0 calc(var(--margin) / 2);
	margin-top: calc(var(--margin) / 2);
`;

export const StartFromRowLabel = SimulatorBodyPartLabel;