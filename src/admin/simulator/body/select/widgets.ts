import styled from 'styled-components';
import {SimulatorBodyPartLabel} from '../widgets';

export const StartFromRow = styled.div`
	display: grid;
	grid-template-columns: auto auto auto auto auto 1fr;
	grid-column-gap: calc(var(--margin) / 2);
	align-items: center;
`;

export const StartFromRowLabel = SimulatorBodyPartLabel;