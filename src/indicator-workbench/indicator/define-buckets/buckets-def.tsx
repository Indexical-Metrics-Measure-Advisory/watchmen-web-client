import {IndicatorsData} from '../indicators-event-bus-types';
import {IndicatorFactorBuckets} from './indicator-factor-buckets';
import {MeasureBuckets} from './measure-buckets';
import {BucketsDefContainer} from './widgets';

export const BucketsDef = (props: { data: IndicatorsData }) => {
	const {data} = props;

	if (data.indicator == null) {
		return null;
	}

	return <BucketsDefContainer>
		<IndicatorFactorBuckets indicator={data.indicator}/>
		<MeasureBuckets indicator={data.indicator} topic={data.topic} enums={data.enums}/>
	</BucketsDefContainer>;
};