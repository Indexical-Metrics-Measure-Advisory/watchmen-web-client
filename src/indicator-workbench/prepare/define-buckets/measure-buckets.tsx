import {fetchBucketsByMethods} from '@/services/data/tuples/bucket';
import {isEnumMeasureBucket, isMeasureBucket} from '@/services/data/tuples/bucket-utils';
import {Factor, FactorId} from '@/services/data/tuples/factor-types';
import {Indicator, MeasureMethod} from '@/services/data/tuples/indicator-types';
import {
	QueryBucket,
	QueryByBucketMethod,
	QueryByEnumMethod,
	QueryByMeasureMethod
} from '@/services/data/tuples/query-bucket-types';
import {TopicForIndicator} from '@/services/data/tuples/query-indicator-types';
import {isNotNull} from '@/services/data/utils';
import {Button} from '@/widgets/basic/button';
import {ICON_BUCKET, ICON_FACTOR, ICON_LIST_ICON_ASTERISK} from '@/widgets/basic/constants';
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

const FactorMeasureBuckets = (props: { methods: Array<MeasureMethod>; factor: Factor; buckets: Array<QueryBucket> }) => {
	const {methods, factor, buckets} = props;

	const matchedBuckets: Array<QueryBucket> = [...new Set(methods)].map(method => {
		if (method === MeasureMethod.ENUM && factor.enumId != null) {
			// eslint-disable-next-line
			return buckets.filter(bucket => isEnumMeasureBucket(bucket) && bucket.enumId == factor.enumId);
		} else {
			return buckets.filter(bucket => isMeasureBucket(bucket) && bucket.measure === method);
		}
	}).flat().sort((b1, b2) => {
		return (b1.name || '').localeCompare(b2.name || '', void 0, {sensitivity: 'base', caseFirst: 'upper'});
	});

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
					<FontAwesomeIcon icon={ICON_BUCKET}/>
					<span>{bucket.name || 'Noname Bucket'}</span>
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

	const factorGroups = (indicator.measures || []).reduce((groups, {method, factorId}) => {
		let methods = groups[factorId];
		if (methods == null) {
			methods = [];
			groups[factorId] = methods;
		}
		methods.push(method);
		return groups;
	}, {} as Record<FactorId, Array<MeasureMethod>>);

	return <MeasureBucketsContainer>
		<OrderedLabel>
			<FontAwesomeIcon icon={ICON_LIST_ICON_ASTERISK}/>
			<span>{Lang.INDICATOR_WORKBENCH.PREPARE.MEASURE_BUCKET_LABEL}</span>
		</OrderedLabel>
		{shown
			? <MeasureBucketList>
				{Object.keys(factorGroups).map(factorId => {
					// eslint-disable-next-line
					const factor = (topic?.factors || []).find(factor => factor.factorId == factorId);
					if (factor != null) {
						return {factor, methods: factorGroups[factorId]};
					} else {
						return null;
					}
				}).filter(isNotNull).sort(({factor: f1}, {factor: f2}) => {
					return (f1.name || '').localeCompare(f2.name || '', void 0, {
						caseFirst: 'upper',
						sensitivity: 'base'
					});
				}).map(({factor, methods}) => {
					return <FactorMeasureBuckets methods={methods} factor={factor} buckets={buckets}
					                             key={factor.factorId}/>;
				})}
			</MeasureBucketList>
			: null}
		<Button ink={ButtonInk.PRIMARY} onClick={onViewClicked}>
			{Lang.INDICATOR_WORKBENCH.PREPARE.VIEW_MEASURE_BUCKETS}
		</Button>
	</MeasureBucketsContainer>;
};