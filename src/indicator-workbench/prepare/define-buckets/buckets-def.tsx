import {IndicatorsData} from '../indicators-event-bus-types';
import {FactorValueBuckets} from './factor-value-buckets';
import {BucketsDefContainer} from './widgets';

export const BucketsDef = (props: { data: IndicatorsData; visible: boolean }) => {
	const {data, visible} = props;

	if (!visible || data.indicator == null) {
		return null;
	}

	return <BucketsDefContainer>
		<FactorValueBuckets indicator={data.indicator}/>
	</BucketsDefContainer>;
};