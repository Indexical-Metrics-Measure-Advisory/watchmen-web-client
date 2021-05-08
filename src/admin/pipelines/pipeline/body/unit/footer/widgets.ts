import styled from 'styled-components';

export const UnitFooterContainer = styled.div.attrs({'data-widget': 'unit-footer'})`
	grid-column : 1 / span 2;
	display     : flex;
	position    : relative;
	align-items : center;
	overflow    : hidden;
	margin      : calc(var(--margin) / -4) calc(var(--margin) / -2);
	padding     : calc(var(--margin) / 4) calc(var(--margin) / 2);
	> div[data-widget="footer-buttons"] {
		top   : calc((var(--margin) / 2 + var(--height) - var(--param-height)) / 2);
		right : calc(var(--margin) / 2);
	}
`;
