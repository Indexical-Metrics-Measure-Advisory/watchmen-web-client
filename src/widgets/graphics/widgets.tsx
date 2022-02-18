import styled, {keyframes} from 'styled-components';
import {RelationCurvePoints} from './types';

export const Curve = styled.path.attrs<{ lattice: RelationCurvePoints, fadeOut?: number }>(
	({lattice: {drawn}, fadeOut = 1}) => {
		return {
			d: drawn,
			style: {
				opacity: fadeOut
			}
		};
	})<{ lattice: RelationCurvePoints, fadeOut?: number }>`
	stroke       : var(--waive-color);
	stroke-width : 2px;
	fill         : transparent;
`;

const RelationAnimationFrames = keyframes`
	from {
		offset-distance : 0;
	}
	to {
		offset-distance : 100%;
	}
`;
export const RelationAnimationDot = styled.div.attrs<{ lattice: RelationCurvePoints, visible: boolean }>(
	({lattice: {drawn}, visible}) => {
		return {
			style: {
				display: visible ? 'block' : 'none',
				offsetPath: `path("${drawn}")`
			}
		};
	})<{ lattice: RelationCurvePoints, visible: boolean }>`
	position         : absolute;
	top              : 0;
	left             : 0;
	width            : 8px;
	height           : 8px;
	background-color : var(--info-color);
	border-radius    : 100%;
	offset-distance  : 0;
	animation        : ${RelationAnimationFrames} 2s ease-in-out 0s infinite normal none;
`;
