import styled from 'styled-components';

export const IndicatorsContainer = styled.div.attrs({'data-widget': 'indicators'})`
	display        : flex;
	position       : relative;
	flex-direction : column;
	margin-top     : var(--margin);
	padding-bottom : var(--margin);
`;

export const ItemBlock = styled.span`
	display        : flex;
	position       : relative;
	align-items    : center;
	justify-self   : start;
	padding        : 0 calc(var(--margin) / 2);
	margin         : calc(var(--height) * 0.2) 0 calc(var(--height) * 0.2) calc(var(--margin) / 2);
	height         : calc(var(--height) * 0.8);
	border-radius  : var(--border-radius);
	text-transform : capitalize;
	font-variant   : petite-caps;
	overflow       : hidden;
	&:after {
		content  : '';
		display  : block;
		position : absolute;
		top      : 0;
		left     : 0;
		width    : 100%;
		height   : 100%;
		opacity  : 0.3;
		z-index  : -1;
	}
	> span {
		white-space   : nowrap;
		text-overflow : ellipsis;
		overflow      : hidden;
	}
	> svg {
		margin-right : calc(var(--margin) / 4);
		font-size    : 0.7em;
		opacity      : 0.7;
	}
`;
