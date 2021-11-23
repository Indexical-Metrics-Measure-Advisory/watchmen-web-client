import {fetchBucketsByIds} from '@/services/data/tuples/bucket';
import {BucketId} from '@/services/data/tuples/bucket-types';
import {Indicator} from '@/services/data/tuples/indicator-types';
import {QueryBucket} from '@/services/data/tuples/query-bucket-types';
import {ICON_DELETE} from '@/widgets/basic/constants';
import {useForceUpdate} from '@/widgets/basic/utils';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useEffect, useState} from 'react';
import {useIndicatorsEventBus} from '../indicators-event-bus';
import {IndicatorsEventTypes} from '../indicators-event-bus-types';
import {LinkedIndicatorFactorBucket, LinkedIndicatorFactorBucketsContainer} from './widgets';

export const LinkedIndicatorFactorBuckets = (props: { indicator: Indicator }) => {
	const {indicator} = props;

	const {fire: fireGlobal} = useEventBus();
	const {on, off, fire} = useIndicatorsEventBus();
	const [buckets, setBuckets] = useState<Array<QueryBucket>>([]);
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onIndicatorValueBucketPicked = (anIndicator: Indicator, bucket: QueryBucket) => {
			if (anIndicator !== indicator) {
				return;
			}
			// eslint-disable-next-line
			if (buckets.every(b => b.bucketId != bucket.bucketId)) {
				setBuckets([...buckets, bucket]);
			} else {
				forceUpdate();
			}
		};
		on(IndicatorsEventTypes.INDICATOR_VALUE_BUCKET_PICKED, onIndicatorValueBucketPicked);
		return () => {
			off(IndicatorsEventTypes.INDICATOR_VALUE_BUCKET_PICKED, onIndicatorValueBucketPicked);
		};
	}, [on, off, forceUpdate, indicator, buckets]);
	useEffect(() => {
		if (indicator.valueBuckets == null || indicator.valueBuckets.length === 0) {
			return;
		}

		fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
			async () => await fetchBucketsByIds(indicator.valueBuckets!),
			(buckets: Array<QueryBucket>) => setBuckets(buckets));
	}, [fireGlobal, indicator]);

	const onRemoveClicked = (bucketId: BucketId) => () => {
		if (indicator.valueBuckets == null) {
			return;
		}
		// eslint-disable-next-line
		const index = indicator.valueBuckets.findIndex(existsBucketId => existsBucketId == bucketId);
		if (index !== -1) {
			indicator.valueBuckets.splice(index, 1);
			forceUpdate();
			fire(IndicatorsEventTypes.INDICATOR_VALUE_BUCKET_UNPICKED, indicator, bucketId);
		}
	};

	return <LinkedIndicatorFactorBucketsContainer>
		{(indicator.valueBuckets || []).map(bucketId => {
			// eslint-disable-next-line
			const bucket = buckets.find(bucket => bucket.bucketId == bucketId);
			return <LinkedIndicatorFactorBucket key={bucketId}>
				<span>{bucket?.name || 'Noname Bucket'}</span>
				<span onClick={onRemoveClicked(bucketId)}>
					<FontAwesomeIcon icon={ICON_DELETE}/>
				</span>
			</LinkedIndicatorFactorBucket>;
		})}
	</LinkedIndicatorFactorBucketsContainer>;
};