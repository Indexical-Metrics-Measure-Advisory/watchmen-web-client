import {tryToTransformToMeasures} from '@/services/data/tuples/indicator-utils';
import {Inspection} from '@/services/data/tuples/inspection-types';
import {TopicForIndicator} from '@/services/data/tuples/query-indicator-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {FilterBuilders} from './filter-builder';
import {tryToGetTopTimeMeasure} from './utils';
import {TimePeriodFilterDropdown} from './widgets';

export const TimePeriodFilterSelector = (props: { inspection: Inspection; topic: TopicForIndicator; valueChanged: () => void }) => {
	const {inspection, topic, valueChanged} = props;

	const forceUpdate = useForceUpdate();

	const factor = inspection.firstTimeFactorId == null
		? null
		// eslint-disable-next-line
		: (topic.factors || []).find(factor => factor.factorId == inspection.firstTimeFactorId);

	if (factor == null) {
		return null;
	}

	const measures = tryToTransformToMeasures(factor);
	const topMeasure = tryToGetTopTimeMeasure(measures);
	if (topMeasure == null) {
		return null;
	}

	const onValueChanged = () => {
		valueChanged();
		forceUpdate();
	};
	const {options, selection, onValueChange} = FilterBuilders[topMeasure](inspection, onValueChanged);

	return <TimePeriodFilterDropdown value={''} options={options} display={selection} onChange={onValueChange}/>;
};