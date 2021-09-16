import styled from 'styled-components';

export const TopicFactorFinderContainer = styled.div.attrs({'data-widget': 'topic-factor-finder'})`
	display               : grid;
	position              : relative;
	grid-template-columns : auto 1fr;
	> div[data-widget="parameter-topic-factor-edit"] {
		margin-left : 0;
		&:before {
			display : none;
		}
	}
`;