import styled from 'styled-components';

export const BucketsDefContainer = styled.div.attrs({'data-widget': 'buckets-def'})`
	display        : flex;
	position       : relative;
	flex-direction : column;
	+ div[data-widget=step-body-buttons] {
		margin-top : var(--margin);
	}
`;
export const FactorValueBucketsContainer = styled.div.attrs({'data-widget': 'factor-value-buckets'})`
	display        : flex;
	position       : relative;
	flex-direction : column;
	padding-left   : calc(var(--margin) / 2);
	counter-reset  : factor-value-bucket;
	> button:last-child {
		margin-top    : calc(var(--margin) / 2);
		align-self    : flex-start;
		border-radius : calc(var(--height) / 2);
	}
`;
export const OrderedLabel = styled.div`
	display     : flex;
	position    : relative;
	align-items : center;
	font-size   : 1.2em;
	height      : var(--height);
	> svg {
		margin  : 2px calc(var(--margin) / 4) 0 calc(var(--margin) / -2);
		width   : calc(var(--margin) / 4);
		opacity : 0.7;
	}
`;
export const FactorValueBucketContainer = styled.div.attrs({'data-widget': 'factor-value-bucket'})`
	display               : grid;
	position              : relative;
	grid-template-columns : 32px auto 1fr auto;
	grid-column-gap       : var(--margin);
	grid-row-gap          : calc(var(--margin) / 4);
	margin-top            : calc(var(--margin) / 2);
	padding               : calc(var(--margin) / 2);
	border-radius         : calc(var(--border-radius) * 4);
	overflow              : hidden;
	&:after {
		content          : '';
		display          : block;
		position         : absolute;
		top              : 0;
		left             : 0;
		width            : 100%;
		height           : 100%;
		background-color : var(--warn-color);
		opacity          : 0.1;
		z-index          : -1;
	}
	&:hover > button:nth-child(4) {
		opacity        : 1;
		pointer-events : auto;
	}
	> button:nth-child(4) {
		opacity        : 0;
		pointer-events : none;
		border-radius  : calc(var(--height) / 2);
	}
	> span:nth-child(5) {
		grid-column : 2;
	}
	> div:nth-child(6) {
		justify-self : start;
		width        : auto;
	}
`;
export const Label = styled.span`
	display     : flex;
	position    : relative;
	align-items : center;
	font-size   : 1.1em;
	height      : var(--height);
`;
export const FactorValueBucketIndexLabel = styled(Label)`
	counter-increment : factor-value-bucket;
	font-weight       : var(--font-bold);
	&:before {
		content : counter(factor-value-bucket, lower-roman) ".";
	}
`;

