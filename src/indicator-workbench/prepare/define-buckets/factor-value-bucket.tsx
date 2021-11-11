import {Indicator} from '@/services/data/tuples/indicator-types';
import {Button} from '@/widgets/basic/button';
import {ICON_LIST_ICON_ASTERISK} from '@/widgets/basic/constants';
import {ButtonInk} from '@/widgets/basic/types';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {FactorValueBucketContainer, OrderedLabel} from './widgets';

export const FactorValueBucket = (props: { indicator: Indicator; }) => {
	const {indicator} = props;

	if (indicator.factorId == null) {
		return null;
	}

	const onCreateClicked = () => {
		// TODO
	};

	return <FactorValueBucketContainer>
		<OrderedLabel>
			<FontAwesomeIcon icon={ICON_LIST_ICON_ASTERISK}/>
			<span>{Lang.INDICATOR_WORKBENCH.PREPARE.SELF_VALUE_BUCKET_LABEL}</span>
		</OrderedLabel>
		<Button ink={ButtonInk.PRIMARY} onClick={onCreateClicked}>
			{Lang.INDICATOR_WORKBENCH.PREPARE.CREATE_SELF_VALUE_BUCKET}
		</Button>
	</FactorValueBucketContainer>;
};