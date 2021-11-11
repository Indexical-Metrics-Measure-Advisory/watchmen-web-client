import {Indicator} from '@/services/data/tuples/indicator-types';
import {ICON_LIST_ICON_ASTERISK} from '@/widgets/basic/constants';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {MeasureBucketsContainer, OrderedLabel} from './widgets';

export const MeasureBuckets = (props: { indicator: Indicator }) => {
	const {indicator} = props;

	return <MeasureBucketsContainer>
		<OrderedLabel>
			<FontAwesomeIcon icon={ICON_LIST_ICON_ASTERISK}/>
			<span>{Lang.INDICATOR_WORKBENCH.PREPARE.MEASURE_BUCKET_LABEL}</span>
		</OrderedLabel>
	</MeasureBucketsContainer>;
};