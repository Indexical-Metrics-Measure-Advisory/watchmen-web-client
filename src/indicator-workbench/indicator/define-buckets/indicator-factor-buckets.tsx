import {Indicator} from '@/services/data/tuples/indicator-types';
import {ICON_LIST_ICON_ASTERISK} from '@/widgets/basic/constants';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useEffect} from 'react';
import {SearchTextEventBusProvider} from '../../search-text/search-text-event-bus';
import {useBucketsEventBus} from './buckets-event-bus';
import {BucketsEventTypes} from './buckets-event-bus-types';
import {IndicatorFactorBucketsLink} from './indicator-factor-buckets-link';
import {LinkedIndicatorFactorBuckets} from './linked-indicator-factor-buckets';
import {IndicatorFactorBucketsContainer, OrderedLabel} from './widgets';

export const IndicatorFactorBuckets = (props: { indicator: Indicator }) => {
	const {indicator} = props;

	const {on, off} = useBucketsEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onValueBucketDeleted = () => forceUpdate();
		on(BucketsEventTypes.VALUE_BUCKET_DELETED, onValueBucketDeleted);
		return () => {
			off(BucketsEventTypes.VALUE_BUCKET_DELETED, onValueBucketDeleted);
		};
	}, [on, off, forceUpdate]);

	if (indicator.factorId == null) {
		return <IndicatorFactorBucketsContainer>
			<OrderedLabel>
				<FontAwesomeIcon icon={ICON_LIST_ICON_ASTERISK}/>
				<span>{Lang.INDICATOR_WORKBENCH.INDICATOR.INDICATOR_VALUE_BUCKET_ONLY_ON_FACTOR_LABEL}</span>
			</OrderedLabel>
		</IndicatorFactorBucketsContainer>;
	}

	return <IndicatorFactorBucketsContainer>
		<OrderedLabel>
			<FontAwesomeIcon icon={ICON_LIST_ICON_ASTERISK}/>
			<span>{Lang.INDICATOR_WORKBENCH.INDICATOR.INDICATOR_VALUE_BUCKET_LABEL}</span>
		</OrderedLabel>
		<SearchTextEventBusProvider>
			<LinkedIndicatorFactorBuckets indicator={indicator}/>
			<IndicatorFactorBucketsLink indicator={indicator}/>
		</SearchTextEventBusProvider>
	</IndicatorFactorBucketsContainer>;
};