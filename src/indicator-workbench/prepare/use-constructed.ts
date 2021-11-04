import {useEffect, useState} from 'react';

export const useConstructed = () => {
	const [constructed, setConstructed] = useState(false);
	const [visible, setVisible] = useState(false);
	useEffect(() => {
		if (constructed) {
			setVisible(true);
		}
	}, [constructed]);
	useEffect(() => {
		if (!visible) {
			setTimeout(() => setConstructed(false), 310);
		}
	}, [visible]);

	return {constructed, setConstructed, visible, setVisible};
};