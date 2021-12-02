import {RelevantIndicatorType} from '@/services/data/tuples/indicator-types';
import styled from 'styled-components';
import {Lang} from '../langs';

const LabelContainer = styled.span.attrs({'data-widget': 'relevant-type'})`
	display     : flex;
	position    : relative;
	align-items : center;
`;

export const RelevantIndicatorTypeLabels: Record<RelevantIndicatorType, string> = {
	[RelevantIndicatorType.SAME]: Lang.INDICATOR.RELEVANT_TYPE.SAME,
	[RelevantIndicatorType.HIGH_CORRELATED]: Lang.INDICATOR.RELEVANT_TYPE.HIGH_CORRELATED,
	[RelevantIndicatorType.WEAK_CORRELATED]: Lang.INDICATOR.RELEVANT_TYPE.WEAK_CORRELATED,
	[RelevantIndicatorType.THIS_CAUSES_RELEVANT]: Lang.INDICATOR.RELEVANT_TYPE.THIS_CAUSES_RELEVANT,
	[RelevantIndicatorType.RELEVANT_CAUSES_THIS]: Lang.INDICATOR.RELEVANT_TYPE.RELEVANT_CAUSES_THIS
};

export const RelevantIndicatorTypeLabel = (props: { type: RelevantIndicatorType }) => {
	const {type, ...rest} = props;

	return <LabelContainer {...rest}>
		{RelevantIndicatorTypeLabels[type] || ''}
	</LabelContainer>;
};