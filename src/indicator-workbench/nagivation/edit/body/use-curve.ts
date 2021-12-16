import {useLayoutEffect, useRef, useState} from 'react';
import {useNavigationEditEventBus} from './navigation-edit-event-bus';
import {NavigationEditEventTypes} from './navigation-edit-event-bus-types';
import {CurveRect} from './types';
import {isCurveChanged} from './utils';

export const useCurve = (parentId: string) => {
	const ref = useRef<HTMLDivElement>(null);
	const {on, off} = useNavigationEditEventBus();
	const [curve, setCurve] = useState<CurveRect | null>(null);
	useLayoutEffect(() => {
		const computeCurve = () => {
			if (ref.current == null) {
				return;
			}
			const parent = document.getElementById(parentId);
			if (parent == null) {
				return;
			}

			const {startX, startY, startHeight} = (() => {
				const {top, left, width, height} = parent.getBoundingClientRect();
				return {startX: left + width, startY: top, startHeight: height};
			})();
			const {endX, endY, endHeight} = (() => {
				const {top, left, height} = ref.current.getBoundingClientRect();
				return {endX: left, endY: top, endHeight: height};
			})();
			const width = endX - startX;
			const height = startY < endY ? (endY + endHeight - startY) : (startY + startHeight - endY);
			const start = {x: 0, y: startY < endY ? (startHeight / 2) : (height - startHeight / 2)};
			const end = {x: width, y: startY < endY ? (height - endHeight / 2) : (endHeight / 2)};

			const newCurve = {
				top: startY < endY ? (startY - endY) : 0,
				width: endX - startX,
				height: startY < endY ? (endY - startY + endHeight) : (startY - endY + startHeight),
				startX: start.x, startY: start.y, endX: end.x, endY: end.y
			};
			if (curve == null || isCurveChanged(curve, newCurve)) {
				setCurve(newCurve);
			}
		};
		computeCurve();

		const onRepaint = () => computeCurve();

		on(NavigationEditEventTypes.REPAINT, onRepaint);
		return () => {
			off(NavigationEditEventTypes.REPAINT, onRepaint);
		};
	}, [on, off, parentId, curve]);

	return {ref, curve};
};