import {IndicatorsData} from '../indicators-event-bus-types';
import {FactorValueBucket} from './factor-value-bucket';
import {BucketsDefContainer} from './widgets';

export const BucketsDef = (props: { data: IndicatorsData; visible: boolean }) => {
	const {data, visible} = props;

	if (!visible || data.indicator == null) {
		return null;
	}

	return <BucketsDefContainer>
		<FactorValueBucket indicator={data.indicator}/>
	</BucketsDefContainer>;
};