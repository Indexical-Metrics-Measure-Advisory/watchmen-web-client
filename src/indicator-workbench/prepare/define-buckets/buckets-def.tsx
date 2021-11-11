import {IndicatorsData} from '../indicators-event-bus-types';
import {FactorValueBuckets} from './factor-value-buckets';
import {MeasureBuckets} from './measure-buckets';
import {BucketsDefContainer} from './widgets';

export const BucketsDef = (props: { data: IndicatorsData }) => {
	const {data} = props;

	if (data.indicator == null) {
		return null;
	}

	return <BucketsDefContainer>
		<FactorValueBuckets indicator={data.indicator}/>
		<MeasureBuckets indicator={data.indicator}/>
	</BucketsDefContainer>;
};