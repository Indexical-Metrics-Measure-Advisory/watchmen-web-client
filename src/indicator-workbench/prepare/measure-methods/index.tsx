import {Step, useStep} from '../step-widgets';
import {PrepareStep} from '../types';
import {useConstructed} from '../use-constructed';

export const MeasureMethods = () => {
	const {constructed, setConstructed, visible, setVisible} = useConstructed();
	useStep({
		step: PrepareStep.MEASURE_METHODS,
		active: () => setConstructed(true),
		done: () => setConstructed(true),
		dropped: () => setVisible(false)
	});

	if (!constructed) {
		return null;
	}

	return <Step index={3} visible={visible}>
	</Step>;
};