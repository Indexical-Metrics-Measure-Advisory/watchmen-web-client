import { DispatchWithoutAction, RefObject, useEffect, useReducer } from 'react';

export const useForceUpdate = (): DispatchWithoutAction => {
	const [ , forceUpdate ] = useReducer(x => !x, true);
	return forceUpdate;
};

export const notInMe = (me: HTMLOrSVGElement, target: EventTarget | null): boolean => {
	const body = document.body;
	if (target === window) {
		return true;
	}
	let parent: HTMLElement | null | undefined = target as HTMLElement;
	while (true) {
		if (parent === me) {
			return false;
		}
		if (parent === body || parent == null) {
			return true;
		}
		parent = parent?.parentElement;
	}
};

export const useCollapseFixedThing = (options: {
	containerRef: RefObject<HTMLOrSVGElement>;
	hide: () => void;
	events?: Array<'scroll' | 'focus' | 'click'>
}) => {
	const { containerRef, hide, events = [ 'focus', 'click' ] } = options;

	useEffect(() => {
		const collapse = (event: Event) => {
			if (notInMe(containerRef.current!, event.target)) {
				hide();
			}
		};
		events.forEach(event => {
			window.addEventListener(event, collapse, true);
		});
		return () => {
			events.forEach(event => {
				window.removeEventListener(event, collapse, true);
			});
		};
	}, [ containerRef, events, hide ]);
};
