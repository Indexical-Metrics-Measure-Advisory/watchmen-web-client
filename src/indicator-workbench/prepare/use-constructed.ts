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
			setConstructed(false);
		}
	}, [visible]);

	return {constructed, setConstructed, visible, setVisible};
};