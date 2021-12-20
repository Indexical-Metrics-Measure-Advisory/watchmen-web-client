import {RefObject, useEffect, useState} from 'react';

export const useConstructed = (ref: RefObject<HTMLDivElement>) => {
	const [constructed, setConstructed] = useState(false);
	const [visible, setVisible] = useState(false);
	useEffect(() => {
		if (constructed) {
			ref.current?.scrollIntoView({behavior: 'smooth'});
			setVisible(true);
		}
	}, [constructed, ref]);
	useEffect(() => {
		if (!visible) {
			setConstructed(false);
		}
	}, [visible]);

	return {constructed, setConstructed, visible, setVisible};
};