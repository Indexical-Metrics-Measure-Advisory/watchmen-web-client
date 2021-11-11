import {Indicator, RangeBucketValueIncluding} from '@/services/data/tuples/indicator-types';
import {generateUuid} from '@/services/data/tuples/utils';
import {RequiredBy} from '@/services/types';
import {Button} from '@/widgets/basic/button';
import {ICON_LIST_ICON_ASTERISK} from '@/widgets/basic/constants';
import {ButtonInk} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useEffect} from 'react';
import {useBucketsEventBus} from './buckets-event-bus';
import {BucketsEventTypes} from './buckets-event-bus-types';
import {FactorValueBucket} from './factor-value-bucket';
import {FactorValueBucketsContainer, OrderedLabel} from './widgets';

const initValueBuckets = (indicator: Indicator): RequiredBy<Indicator, 'valueBuckets'> => {
	if (indicator.valueBuckets == null) {
		indicator.valueBuckets = [];
	}
	return indicator as RequiredBy<Indicator, 'valueBuckets'>;
};

export const FactorValueBuckets = (props: { indicator: Indicator }) => {
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
		return null;
	}

	const onCreateClicked = () => {
		initValueBuckets(indicator).valueBuckets.push({
			bucketId: generateUuid(),
			name: '',
			include: RangeBucketValueIncluding.INCLUDE_MIN
		});
		forceUpdate();
	};

	return <FactorValueBucketsContainer>
		<OrderedLabel>
			<FontAwesomeIcon icon={ICON_LIST_ICON_ASTERISK}/>
			<span>{Lang.INDICATOR_WORKBENCH.PREPARE.SELF_VALUE_BUCKET_LABEL}</span>
		</OrderedLabel>
		{(indicator.valueBuckets || []).map(bucket => {
			return <FactorValueBucket indicator={indicator} bucket={bucket} key={bucket.bucketId}/>;
		})}
		<Button ink={ButtonInk.PRIMARY} onClick={onCreateClicked}>
			{Lang.INDICATOR_WORKBENCH.PREPARE.CREATE_SELF_VALUE_BUCKET}
		</Button>
	</FactorValueBucketsContainer>;
};