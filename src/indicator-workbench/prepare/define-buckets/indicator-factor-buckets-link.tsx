import {fetchBucketsForIndicatorValue} from '@/services/data/tuples/bucket';
import {BucketId} from '@/services/data/tuples/bucket-types';
import {Indicator} from '@/services/data/tuples/indicator-types';
import {QueryBucket} from '@/services/data/tuples/query-bucket-types';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import {useIndicatorsEventBus} from '../indicators-event-bus';
import {IndicatorsEventTypes} from '../indicators-event-bus-types';
import {SearchItem, SearchText} from '../search-text';
import {useSearchTextEventBus} from '../search-text/search-text-event-bus';
import {SearchTextEventTypes} from '../search-text/search-text-event-bus-types';

interface BucketCandidate extends SearchItem {
	bucketId: BucketId;
	bucket: QueryBucket;
}

export const IndicatorFactorBucketsLink = (props: { indicator: Indicator }) => {
	const {indicator} = props;

	const {fire: fireGlobal} = useEventBus();
	const {fire: fireIndicator} = useIndicatorsEventBus();
	const {fire: fireSearch} = useSearchTextEventBus();

	const search = async (text: string): Promise<Array<BucketCandidate>> => {
		return new Promise<Array<BucketCandidate>>(resolve => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await fetchBucketsForIndicatorValue(text),
				(candidates: Array<QueryBucket>) => {
					const linked = indicator.valueBuckets || [];
					resolve(candidates.filter(candidate => {
						// eslint-disable-next-line
						return linked.every(bucketId => bucketId != candidate.bucketId);
					}).map(candidate => {
						return {
							bucketId: candidate.bucketId,
							key: candidate.bucketId,
							text: candidate.name,
							bucket: candidate
						};
					}));
				}, () => resolve([]));
		});
	};
	const onSelectionChange = async (item: BucketCandidate) => {
		if (indicator.valueBuckets == null) {
			indicator.valueBuckets = [];
		}
		// eslint-disable-next-line
		if (indicator.valueBuckets.every(bucketId => bucketId != item.bucketId)) {
			indicator.valueBuckets.push(item.bucketId);
		}

		fireIndicator(IndicatorsEventTypes.INDICATOR_VALUE_BUCKET_PICKED, indicator, item.bucket);
		fireSearch(SearchTextEventTypes.HIDE_SEARCH);
	};

	return <SearchText search={search} onSelectionChange={onSelectionChange}
	                   openText={Lang.INDICATOR_WORKBENCH.PREPARE.LINK_INDICATOR_VALUE_BUCKETS}
	                   closeText={Lang.INDICATOR_WORKBENCH.PREPARE.DISCARD_LINK_INDICATOR_VALUE_BUCKETS}
	                   placeholder={Lang.PLAIN.FIND_INDICATOR_VALUE_BUCKETS_PLACEHOLDER}/>;
};