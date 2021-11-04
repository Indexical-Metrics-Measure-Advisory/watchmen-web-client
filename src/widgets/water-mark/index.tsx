import {Fragment, useEffect} from 'react';

const createWaterMarkImage = (text: string, text2: string) => {
	const width = 400;
	const height = width * 0.5;
	const canvas = document.createElement('canvas');
	canvas.setAttribute('width', `${width}px`);
	canvas.setAttribute('height', `${height}px`);
	const ctx = canvas.getContext('2d');
	if (ctx == null) {
		return '';
	}
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.font = '16px system-ui';
	ctx.fillStyle = 'var(--primary-color)';
	ctx.rotate(Math.PI / 180 * 15);
	ctx.fillText(text, width / 2, 50);
	ctx.fillText(text2, width / 2 + 30, 72);

	return canvas.toDataURL('png', {pixelRatio: window.devicePixelRatio});
};
const reset = (expression: () => void) => setTimeout(() => expression(), 0);
let waterMark: HTMLDivElement | null = null;

/**
 * water mark for demo enterprise features.
 * DO NOT REMOVE THIS FOR ANY PURPOSE UNTIL YOU GET COMMERCIAL PERMIT FROM MATRYOSHKA.
 */
export const WaterMark = (props: { text?: string; text2?: string }) => {
	const {text = 'Watchmen Enterprise', text2 = '© Matryoshka'} = props;

	useEffect(() => {
		const observer = new MutationObserver((records: MutationRecord[]) => {
			const record = records[0];
			if (record.type === 'attributes' && record.attributeName === 'style') {
				observer.disconnect();
				reset(paint);
			} else if (record.type === 'characterData') {
				observer.disconnect();
				reset(paint);
			}
		});
		const bodyObserver = new MutationObserver(() => {
			if (waterMark?.parentElement == null) {
				bodyObserver.disconnect();
				reset(paint);
			}
		});
		bodyObserver.observe(document.body, {childList: true});

		const paint = (hideWaterMark: boolean = false) => {
			if (waterMark != null && waterMark.parentElement != null) {
				waterMark.parentElement.removeChild(waterMark);
			}

			waterMark = document.createElement('div');
			waterMark.setAttribute('data-widget', 'water-mark');
			const style = waterMark.style;
			style.display = 'block';
			style.position = 'absolute';
			style.top = '0';
			style.left = '0';
			style.width = '100%';
			style.height = '100%';
			style.backgroundImage = hideWaterMark ? '' : `url(${createWaterMarkImage(text, text2)})`;
			style.backgroundRepeat = 'repeat';
			style.opacity = '0.08';
			style.pointerEvents = 'none';
			style.zIndex = '-10000';
			document.body.appendChild(waterMark);

			const onHideWaterMark = () => {
				paint(!hideWaterMark);
			};
			waterMark.removeEventListener('hwm', onHideWaterMark);
			waterMark.addEventListener('hwm', onHideWaterMark);

			// setWaterMark(div);
			observer.observe(waterMark, {
				childList: true,
				attributes: true,
				subtree: true,
				characterData: true,
				characterDataOldValue: true
			});
		};
		paint();
		return () => {
			bodyObserver.disconnect();
			observer.disconnect();
			if (waterMark != null && waterMark.parentElement != null) {
				waterMark.parentElement.removeChild(waterMark);
			}
		};
	}, [text, text2]);

	return <Fragment/>;
};
