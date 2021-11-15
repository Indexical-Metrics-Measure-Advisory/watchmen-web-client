import {Indicator} from '@/services/data/tuples/indicator-types';
import {Button} from '@/widgets/basic/button';
import {ICON_LIST_ICON_ASTERISK} from '@/widgets/basic/constants';
import {ButtonInk} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {MeasureBucketsContainer, OrderedLabel} from './widgets';

export const MeasureBuckets = (props: { indicator: Indicator }) => {
	// const {indicator} = props;

	const forceUpdate = useForceUpdate();

	const onViewClicked = () => {
		// TODO
		forceUpdate();
	};

	return <MeasureBucketsContainer>
		<OrderedLabel>
			<FontAwesomeIcon icon={ICON_LIST_ICON_ASTERISK}/>
			<span>{Lang.INDICATOR_WORKBENCH.PREPARE.MEASURE_BUCKET_LABEL}</span>
		</OrderedLabel>
		<Button ink={ButtonInk.PRIMARY} onClick={onViewClicked}>
			{Lang.INDICATOR_WORKBENCH.PREPARE.VIEW_MEASURE_BUCKETS}
		</Button>
	</MeasureBucketsContainer>;
};