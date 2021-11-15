import {Indicator} from '@/services/data/tuples/indicator-types';
import {Button} from '@/widgets/basic/button';
import {ICON_LIST_ICON_ASTERISK} from '@/widgets/basic/constants';
import {ButtonInk} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useEffect} from 'react';
import {useBucketsEventBus} from './buckets-event-bus';
import {BucketsEventTypes} from './buckets-event-bus-types';
import {FactorValueBucketsContainer, OrderedLabel} from './widgets';

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
		return <FactorValueBucketsContainer>
			<OrderedLabel>
				<FontAwesomeIcon icon={ICON_LIST_ICON_ASTERISK}/>
				<span>{Lang.INDICATOR_WORKBENCH.PREPARE.SELF_VALUE_BUCKET_ONLY_ON_FACTOR_LABEL}</span>
			</OrderedLabel>
		</FactorValueBucketsContainer>;
	}

	const onLinkClicked = () => {
		// TODO
		forceUpdate();
	};

	return <FactorValueBucketsContainer>
		<OrderedLabel>
			<FontAwesomeIcon icon={ICON_LIST_ICON_ASTERISK}/>
			<span>{Lang.INDICATOR_WORKBENCH.PREPARE.SELF_VALUE_BUCKET_LABEL}</span>
		</OrderedLabel>
		<Button ink={ButtonInk.PRIMARY} onClick={onLinkClicked}>
			{Lang.INDICATOR_WORKBENCH.PREPARE.LINK_SELF_VALUE_BUCKETS}
		</Button>
	</FactorValueBucketsContainer>;
};