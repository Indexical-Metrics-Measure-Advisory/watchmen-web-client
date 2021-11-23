import {fetchBucketsByMethods} from '@/services/data/tuples/bucket';
import {isEnumMeasureBucket, isMeasureBucket} from '@/services/data/tuples/bucket-utils';
import {Indicator, IndicatorMeasure, MeasureMethod} from '@/services/data/tuples/indicator-types';
import {
	QueryBucket,
	QueryByBucketMethod,
	QueryByEnumMethod,
	QueryByMeasureMethod
} from '@/services/data/tuples/query-bucket-types';
import {TopicForIndicator} from '@/services/data/tuples/query-indicator-types';
import {Button} from '@/widgets/basic/button';
import {ICON_FACTOR, ICON_LIST_ICON_ASTERISK} from '@/widgets/basic/constants';
import {ButtonInk} from '@/widgets/basic/types';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useState} from 'react';
import {
	MatchedMeasureBucketLabel,
	MatchedMeasureBuckets,
	MeasurableFactor,
	MeasureBucketList,
	MeasureBucketsContainer,
	OrderedLabel
} from './widgets';

const FactorMeasureBuckets = (props: { measure: IndicatorMeasure; topic?: TopicForIndicator; buckets: Array<QueryBucket> }) => {
	const {measure: {method, factorId}, topic, buckets} = props;

	if (topic == null) {
		return null;
	}

	// eslint-disable-next-line
	const factor = (topic.factors || []).find(factor => factor.factorId == factorId);
	if (factor == null) {
		return null;
	}

	const matchedBuckets: Array<QueryBucket> = (() => {
		if (method === MeasureMethod.ENUM && factor.enumId != null) {
			// eslint-disable-next-line
			return buckets.filter(bucket => isEnumMeasureBucket(bucket) && bucket.enumId == factor.enumId);
		} else {
			return buckets.filter(bucket => isMeasureBucket(bucket) && bucket.measure === method);
		}
	})();

	if (matchedBuckets.length === 0) {
		return null;
	}

	return <>
		<MeasurableFactor>
			<FontAwesomeIcon icon={ICON_FACTOR}/>
			<span>{factor.name || factor.label || 'Noname Factor'}</span>
		</MeasurableFactor>
		<MatchedMeasureBuckets>
			{matchedBuckets.map(bucket => {
				return <MatchedMeasureBucketLabel key={bucket.bucketId}>
					{bucket.name || 'Noname Bucket'}
				</MatchedMeasureBucketLabel>;
			})}
		</MatchedMeasureBuckets>
	</>;
};

export const MeasureBuckets = (props: { indicator: Indicator; topic?: TopicForIndicator }) => {
	const {indicator, topic} = props;

	const {fire: fireGlobal} = useEventBus();
	const [shown, setShown] = useState(false);
	const [buckets, setBuckets] = useState<Array<QueryBucket>>([]);

	const onViewClicked = () => {
		fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
			async () => {
				const methods = [...new Set((indicator.measures || []).map(measure => {
					if (measure.method !== MeasureMethod.ENUM) {
						return {method: measure.method} as QueryByMeasureMethod;
					} else {
						const factorId = measure.factorId;
						if (factorId != null) {
							// eslint-disable-next-line
							const factor = (topic?.factors || []).find(factor => factor.factorId == factorId);
							if (factor != null && factor.enumId != null) {
								return {method: MeasureMethod.ENUM, enumId: factor.enumId} as QueryByEnumMethod;
							}
						}
						return null;
					}
				}).filter(x => x) as Array<QueryByBucketMethod>)];
				return await fetchBucketsByMethods(methods);
			},
			(buckets: Array<QueryBucket>) => {
				setBuckets(buckets);
				setShown(true);
			});
	};

	return <MeasureBucketsContainer>
		<OrderedLabel>
			<FontAwesomeIcon icon={ICON_LIST_ICON_ASTERISK}/>
			<span>{Lang.INDICATOR_WORKBENCH.PREPARE.MEASURE_BUCKET_LABEL}</span>
		</OrderedLabel>
		{shown
			? <MeasureBucketList>
				{(indicator.measures || []).map(measure => {
					return <FactorMeasureBuckets measure={measure} topic={topic} buckets={buckets}/>;
				})}
			</MeasureBucketList>
			: null}
		<Button ink={ButtonInk.PRIMARY} onClick={onViewClicked}>
			{Lang.INDICATOR_WORKBENCH.PREPARE.VIEW_MEASURE_BUCKETS}
		</Button>
	</MeasureBucketsContainer>;
};