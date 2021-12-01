import {useVisibleOnII} from '../use-visible-on-ii';
import {TimePeriodContainer} from './widgets';

export const TimePeriod = () => {
	const {visible, inspection, indicator} = useVisibleOnII();

	if (!visible) {
		return null;
	}

	return <TimePeriodContainer>

	</TimePeriodContainer>;
};