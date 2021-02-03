import styled from 'styled-components';
import { RelationCurvePoints } from '../types';

export const Curve = styled.path.attrs<{ lattice: RelationCurvePoints }>(({ lattice: { drawn } }) => {
	return { d: drawn };
})<{ lattice: RelationCurvePoints }>`
	stroke       : var(--waive-color);
	stroke-width : 2px;
	fill         : transparent;
`;
