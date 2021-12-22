import {TuplePage} from '@/services/data/query/tuple-page';
import {Bucket, BucketId} from '@/services/data/tuples/bucket-types';
import {Indicator} from '@/services/data/tuples/indicator-types';
import {Navigation} from '@/services/data/tuples/navigation-types';
import {QueryByBucketMethod} from '@/services/data/tuples/query-bucket-types';
import {Topic, TopicId} from '@/services/data/tuples/topic-types';
import {QueryTuple} from '@/services/data/tuples/tuple-types';

export enum NavigationEventTypes {
	NAVIGATION_PICKED = 'navigation-picked',
	ASK_NAVIGATION = 'ask-navigation',
	NAVIGATION_SEARCHED = 'navigation-searched',
	ASK_NAVIGATION_QUERY_PAGE_DATA = 'ask-navigation-query-page-data',

	TO_EDIT_NAVIGATION = 'to-edit-navigation',
	SWITCH_INDICATOR_CANDIDATES = 'switch-indicator_candidates',
	BACK_TO_QUERY = 'back-to-query',

	NAME_CHANGED = 'name-changed',

	SAVE_NAVIGATION = 'save-navigation',
	NAVIGATION_SAVED = 'navigation-saved',

	ASK_INDICATORS = 'ask-indicators',
	ASK_TOPIC = 'ask-topic',
	ASK_VALUE_BUCKETS = 'ask-value-buckets',
	ASK_MEASURE_BUCKETS = 'ask-measure-buckets'
}

export interface NavigationEventBus {
	fire(type: NavigationEventTypes.NAVIGATION_PICKED, navigation: Navigation): this;
	on(type: NavigationEventTypes.NAVIGATION_PICKED, listener: (navigation: Navigation) => void): this;
	off(type: NavigationEventTypes.NAVIGATION_PICKED, listener: (navigation: Navigation) => void): this;

	fire(type: NavigationEventTypes.ASK_NAVIGATION, onData: (navigation?: Navigation) => void): this;
	on(type: NavigationEventTypes.ASK_NAVIGATION, listener: (onData: (navigation?: Navigation) => void) => void): this;
	off(type: NavigationEventTypes.ASK_NAVIGATION, listener: (onData: (navigation?: Navigation) => void) => void): this;

	fire(type: NavigationEventTypes.NAVIGATION_SEARCHED, page: TuplePage<QueryTuple>, searchText: string): this;
	on(type: NavigationEventTypes.NAVIGATION_SEARCHED, listener: (page: TuplePage<QueryTuple>, searchText: string) => void): this;
	off(type: NavigationEventTypes.NAVIGATION_SEARCHED, listener: (page: TuplePage<QueryTuple>, searchText: string) => void): this;

	fire(type: NavigationEventTypes.ASK_NAVIGATION_QUERY_PAGE_DATA, onData: (page?: TuplePage<QueryTuple>, searchText?: string) => void): this;
	on(type: NavigationEventTypes.ASK_NAVIGATION_QUERY_PAGE_DATA, listener: (onData: (page?: TuplePage<QueryTuple>, searchText?: string) => void) => void): this;
	off(type: NavigationEventTypes.ASK_NAVIGATION_QUERY_PAGE_DATA, listener: (onData: (page?: TuplePage<QueryTuple>, searchText?: string) => void) => void): this;

	fire(type: NavigationEventTypes.TO_EDIT_NAVIGATION, navigation: Navigation): this;
	on(type: NavigationEventTypes.TO_EDIT_NAVIGATION, listener: (navigation: Navigation) => void): this;
	off(type: NavigationEventTypes.TO_EDIT_NAVIGATION, listener: (navigation: Navigation) => void): this;

	fire(type: NavigationEventTypes.SWITCH_INDICATOR_CANDIDATES, navigation: Navigation, view: boolean): this;
	on(type: NavigationEventTypes.SWITCH_INDICATOR_CANDIDATES, listener: (navigation: Navigation, view: boolean) => void): this;
	off(type: NavigationEventTypes.SWITCH_INDICATOR_CANDIDATES, listener: (navigation: Navigation, view: boolean) => void): this;

	fire(type: NavigationEventTypes.BACK_TO_QUERY): this;
	on(type: NavigationEventTypes.BACK_TO_QUERY, listener: () => void): this;
	off(type: NavigationEventTypes.BACK_TO_QUERY, listener: () => void): this;

	fire(type: NavigationEventTypes.NAME_CHANGED, navigation: Navigation, onSaved: (navigation: Navigation, saved: boolean) => void): this;
	on(type: NavigationEventTypes.NAME_CHANGED, listener: (navigation: Navigation, onSaved: (navigation: Navigation, saved: boolean) => void) => void): this;
	off(type: NavigationEventTypes.NAME_CHANGED, listener: (navigation: Navigation, onSaved: (navigation: Navigation, saved: boolean) => void) => void): this;

	fire(type: NavigationEventTypes.SAVE_NAVIGATION, navigation: Navigation, onSaved: (navigation: Navigation, saved: boolean) => void): this;
	on(type: NavigationEventTypes.SAVE_NAVIGATION, listener: (navigation: Navigation, onSaved: (navigation: Navigation, saved: boolean) => void) => void): this;
	off(type: NavigationEventTypes.SAVE_NAVIGATION, listener: (navigation: Navigation, onSaved: (navigation: Navigation, saved: boolean) => void) => void): this;

	fire(type: NavigationEventTypes.NAVIGATION_SAVED, navigation: Navigation): this;
	on(type: NavigationEventTypes.NAVIGATION_SAVED, listener: (navigation: Navigation) => void): this;
	off(type: NavigationEventTypes.NAVIGATION_SAVED, listener: (navigation: Navigation) => void): this;

	fire(type: NavigationEventTypes.ASK_INDICATORS, onData: (indicators: Array<Indicator>) => void): this;
	on(type: NavigationEventTypes.ASK_INDICATORS, listener: (onData: (indicators: Array<Indicator>) => void) => void): this;
	off(type: NavigationEventTypes.ASK_INDICATORS, listener: (onData: (indicators: Array<Indicator>) => void) => void): this;

	fire(type: NavigationEventTypes.ASK_TOPIC, topicId: TopicId, onData: (topic?: Topic) => void): this;
	on(type: NavigationEventTypes.ASK_TOPIC, listener: (topicId: TopicId, onData: (topic?: Topic) => void) => void): this;
	off(type: NavigationEventTypes.ASK_TOPIC, listener: (topicId: TopicId, onData: (topic?: Topic) => void) => void): this;

	fire(type: NavigationEventTypes.ASK_VALUE_BUCKETS, bucketIds: Array<BucketId>, onData: (buckets: Array<Bucket>) => void): this;
	on(type: NavigationEventTypes.ASK_VALUE_BUCKETS, listener: (bucketIds: Array<BucketId>, onData: (buckets: Array<Bucket>) => void) => void): this;
	off(type: NavigationEventTypes.ASK_VALUE_BUCKETS, listener: (bucketIds: Array<BucketId>, onData: (buckets: Array<Bucket>) => void) => void): this;

	fire(type: NavigationEventTypes.ASK_MEASURE_BUCKETS, methods: Array<QueryByBucketMethod>, onData: (buckets: Array<Bucket>) => void): this;
	on(type: NavigationEventTypes.ASK_MEASURE_BUCKETS, listener: (methods: Array<QueryByBucketMethod>, onData: (buckets: Array<Bucket>) => void) => void): this;
	off(type: NavigationEventTypes.ASK_MEASURE_BUCKETS, listener: (methods: Array<QueryByBucketMethod>, onData: (buckets: Array<Bucket>) => void) => void): this;
}