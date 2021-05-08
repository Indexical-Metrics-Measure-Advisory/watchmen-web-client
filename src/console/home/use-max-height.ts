import {RefObject, useLayoutEffect, useState} from 'react';

export const useMaxHeight = (bodyRef: RefObject<HTMLDivElement>) => {
	const [maxHeight, setMaxHeight] = useState(0);

	// use this effect every time
	// eslint-disable-next-line
	useLayoutEffect(() => {
		if (!bodyRef.current) {
			return;
		}
		const {height} = bodyRef.current.getBoundingClientRect();
		// plus 100 to make sure it is height enough
		if (height !== 0 && (height + 100) > maxHeight) {
			setMaxHeight(height + 100);
		}
	});

	return maxHeight;
};