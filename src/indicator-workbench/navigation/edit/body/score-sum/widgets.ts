import styled from 'styled-components';
import {NavigationBlock} from '../widgets';

export const ScoreSumNode = styled(NavigationBlock).attrs({'data-widget': 'score-sum-node'})`
	border-color : var(--navigation-score-sum-color);
	color        : var(--navigation-score-sum-color);
	&:before {
		background-color : var(--navigation-score-sum-color);
	}
`;
export const ScoreSumLabel = styled.span.attrs({'data-widget': 'score-sum-label'})`
	display      : flex;
	position     : relative;
	align-items  : center;
	font-variant : petite-caps;
`;

