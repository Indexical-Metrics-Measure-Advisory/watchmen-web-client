import {RelationCurvePoints} from '@/widgets/graphics/types';
import {Curve} from '@/widgets/graphics/widgets';
import React from 'react';
import {NavigationBlockPosition} from './types';
import {BlockCurvesContainer} from './widgets';

interface BlockCurve {
	id: string;
	start: NavigationBlockPosition;
	end: NavigationBlockPosition;
}

const computeCurvePoints = (start: NavigationBlockPosition, end: NavigationBlockPosition): RelationCurvePoints => {
	let drawn = `M${start.left},${start.top} L${end.left},${end.top}`;
	// switch (true) {
	// 	case targetPoints.left.x - sourcePoints.right.x <= 200 && targetPoints.left.x - sourcePoints.right.x >= 0:
	// 		// target on right of source, no overlap, small distance
	// 		switch (true) {
	// 			case  sourcePoints.bottom.y <= targetPoints.top.y:
	// 				// target on bottom right, no overlap
	// 				drawn = `M${sourcePoints.bottom.x},${sourcePoints.bottom.y} Q${sourcePoints.bottom.x},${targetPoints.left.y} ${targetPoints.left.x},${targetPoints.left.y}`;
	// 				break;
	// 			case sourcePoints.top.y >= targetPoints.bottom.y:
	// 				// target on bottom top, no overlap
	// 				drawn = `M${sourcePoints.top.x},${sourcePoints.top.y} Q${sourcePoints.top.x},${targetPoints.left.y} ${targetPoints.left.x},${targetPoints.left.y}`;
	// 				break;
	// 			default:
	// 				// vertical has overlap
	// 				drawn = `M${sourcePoints.right.x},${sourcePoints.right.y} L${targetPoints.left.x},${targetPoints.left.y}`;
	// 		}
	// 		break;
	// 	case targetPoints.left.x - sourcePoints.right.x > 200:
	// 		// target on right of source, no overlap, large distance
	// 		switch (true) {
	// 			case sourcePoints.bottom.y <= targetPoints.top.y:
	// 			case sourcePoints.top.y >= targetPoints.bottom.y:
	// 				// target on bottom/top right, no overlap
	// 				drawn = [
	// 					`M${sourcePoints.right.x},${sourcePoints.right.y}`,
	// 					`C${sourcePoints.right.x + (targetPoints.left.x - sourcePoints.right.x) / 6},${sourcePoints.right.y}`,
	// 					`${sourcePoints.right.x + (targetPoints.left.x - sourcePoints.right.x) / 3},${sourcePoints.right.y}`,
	// 					`${sourcePoints.right.x + (targetPoints.left.x - sourcePoints.right.x) / 2},${(sourcePoints.right.y + targetPoints.left.y) / 2}`,
	// 					`C${sourcePoints.right.x + (targetPoints.left.x - sourcePoints.right.x) / 3 * 2},${targetPoints.left.y}`,
	// 					`${sourcePoints.right.x + (targetPoints.left.x - sourcePoints.right.x) / 6 * 5},${targetPoints.left.y}`,
	// 					`${targetPoints.left.x},${targetPoints.left.y}`
	// 				].join(' ');
	// 				break;
	// 			default:
	// 				// vertical has overlap
	// 				drawn = `M${sourcePoints.right.x},${sourcePoints.right.y} L${targetPoints.left.x},${targetPoints.left.y}`;
	// 		}
	// 		break;
	// 	case sourcePoints.left.x - targetPoints.right.x <= 200 && sourcePoints.left.x - targetPoints.right.x >= 0:
	// 		// target on left of source, no overlap, small distance
	// 		switch (true) {
	// 			case  sourcePoints.bottom.y <= targetPoints.top.y:
	// 				// target on bottom left, no overlap
	// 				drawn = `M${sourcePoints.bottom.x},${sourcePoints.bottom.y} Q${sourcePoints.bottom.x},${targetPoints.right.y} ${targetPoints.right.x},${targetPoints.right.y}`;
	// 				break;
	// 			case sourcePoints.top.y >= targetPoints.bottom.y:
	// 				// target on bottom top, no overlap
	// 				drawn = `M${sourcePoints.top.x},${sourcePoints.top.y} Q${sourcePoints.top.x},${targetPoints.right.y} ${targetPoints.right.x},${targetPoints.right.y}`;
	// 				break;
	// 			default:
	// 				// vertical has overlap
	// 				drawn = `M${sourcePoints.left.x},${sourcePoints.left.y} L${targetPoints.right.x},${targetPoints.right.y}`;
	// 		}
	// 		break;
	// 	case sourcePoints.left.x - targetPoints.right.x > 200:
	// 		// target on left of source, no overlap, large distance
	// 		switch (true) {
	// 			case sourcePoints.bottom.y <= targetPoints.top.y:
	// 			case sourcePoints.top.y >= targetPoints.bottom.y:
	// 				// target on bottom/top right, no overlap
	// 				drawn = [
	// 					`M${sourcePoints.left.x},${sourcePoints.left.y}`,
	// 					`C${targetPoints.right.x + (sourcePoints.left.x - targetPoints.right.x) / 6 * 5},${sourcePoints.left.y}`,
	// 					`${targetPoints.right.x + (sourcePoints.left.x - targetPoints.right.x) / 3 * 2},${sourcePoints.left.y}`,
	// 					`${targetPoints.right.x + (sourcePoints.left.x - targetPoints.right.x) / 2},${(sourcePoints.left.y + targetPoints.right.y) / 2}`,
	// 					`C${targetPoints.right.x + (sourcePoints.left.x - targetPoints.right.x) / 3},${targetPoints.right.y}`,
	// 					`${targetPoints.right.x + (sourcePoints.left.x - targetPoints.right.x) / 6},${targetPoints.right.y}`,
	// 					`${targetPoints.right.x},${targetPoints.right.y}`
	// 				].join(' ');
	// 				break;
	// 			default:
	// 				// vertical has overlap
	// 				drawn = `M${sourcePoints.left.x},${sourcePoints.left.y} L${targetPoints.right.x},${targetPoints.right.y}`;
	// 		}
	// 		break;
	// 	case targetPoints.top.y - sourcePoints.bottom.y <= 100 && targetPoints.top.y - sourcePoints.bottom.y >= 0:
	// 	case sourcePoints.top.y - targetPoints.bottom.y <= 100 && sourcePoints.top.y - targetPoints.bottom.y >= 0:
	// 		// target on top/bottom of source, has horizontal overlap and no vertical overlap, small distance
	// 		const controlX = Math.min(sourcePoints.left.x, targetPoints.left.x) - 150;
	// 		let useRightSide = false;
	// 		if (controlX <= 5) {
	// 			useRightSide = true;
	// 		}
	// 		if (useRightSide) {
	// 			drawn = [
	// 				`M${sourcePoints.right.x},${sourcePoints.right.y}`,
	// 				`Q${Math.min(sourcePoints.right.x, targetPoints.right.x) + 150},${(sourcePoints.right.y + targetPoints.right.y) / 2}`,
	// 				`${targetPoints.right.x},${targetPoints.right.y}`
	// 			].join(' ');
	// 		} else {
	// 			drawn = [
	// 				`M${sourcePoints.left.x},${sourcePoints.left.y}`,
	// 				`Q${controlX},${(sourcePoints.left.y + targetPoints.left.y) / 2}`,
	// 				`${targetPoints.left.x},${targetPoints.left.y}`
	// 			].join(' ');
	// 		}
	// 		break;
	// 	case targetPoints.top.y - sourcePoints.bottom.y > 100:
	// 		// target on top of source, has horizontal overlap and no vertical overlap, large distance
	// 		drawn = `M${sourcePoints.bottom.x},${sourcePoints.bottom.y} L${targetPoints.top.x},${targetPoints.top.y}`;
	// 		break;
	// 	case sourcePoints.top.y - targetPoints.bottom.y > 100:
	// 		// target on bottom of source, has horizontal overlap and no vertical overlap, large distance
	// 		drawn = `M${sourcePoints.top.x},${sourcePoints.top.y} L${targetPoints.bottom.x},${targetPoints.bottom.y}`;
	// 		break;
	// 	case targetPoints.top.y >= sourcePoints.top.y:
	// 		// overlap anyway
	// 		drawn = [
	// 			`M${sourcePoints.top.x},${sourcePoints.top.y}`,
	// 			`C${sourcePoints.top.x - 300},${sourcePoints.top.y - 300}`,
	// 			`${targetPoints.bottom.x - 300},${targetPoints.bottom.y + 300}`,
	// 			`${targetPoints.bottom.x},${targetPoints.bottom.y}`
	// 		].join(' ');
	// 		break;
	// 	case targetPoints.top.y < sourcePoints.top.y:
	// 		drawn = [
	// 			`M${sourcePoints.bottom.x},${sourcePoints.bottom.y}`,
	// 			`C${sourcePoints.bottom.x + 300},${sourcePoints.bottom.y + 300}`,
	// 			`${targetPoints.top.x + 300},${targetPoints.top.y - 300}`,
	// 			`${targetPoints.top.x},${targetPoints.top.y}`
	// 		].join(' ');
	// 		break;
	// }
	return {drawn};
};

export const BlockCurves = (props: { curves: Array<BlockCurve> }) => {
	const {curves} = props;

	return <BlockCurvesContainer>
		<svg>
			{Object.values(curves).map(({id, start, end}) => {
				return <g data-id={id} key={id}>
					<Curve lattice={computeCurvePoints(start, end)} data-id={id}/>
				</g>;
			})}
		</svg>
	</BlockCurvesContainer>;
};