import styled from 'styled-components';

export const BucketsDefContainer = styled.div.attrs({'data-widget': 'buckets-def'})`
	display        : flex;
	position       : relative;
	flex-direction : column;
	+ div[data-widget=step-body-buttons] {
		margin-top : var(--margin);
	}
`;
export const IndicatorFactorBucketsContainer = styled.div.attrs({'data-widget': 'indicator-factor-buckets'})`
	display        : flex;
	position       : relative;
	flex-direction : column;
	padding-left   : calc(var(--margin) / 2);
	counter-reset  : factor-value-bucket;
	> div[data-widget=search-text] {
		margin-top : calc(var(--margin) / 2);
		> input[data-widget=search-input],
		> button[data-widget=search-button] {
			font-size   : 1em;
			height      : var(--height);
			line-height : var(--height);
		}
		> div[data-widget=search-popup] {
			min-height : calc(var(--height) + 4px);
			max-height : calc(var(--height) * 8 + 4px);
			> div[data-widget=search-candidate-item],
			> div[data-widget=search-on-searching] {
				font-size  : 1em;
				min-height : var(--height);
			}
		}
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
export const LinkedIndicatorFactorBucketsContainer = styled.div.attrs({'data-widget': 'linked-indicator-value-buckets'})`
	display     : flex;
	position    : relative;
	flex-wrap   : wrap;
	align-items : center;
	margin-left : calc(var(--margin) / -4);
	padding-top : calc(var(--margin) / 2);
	&:empty {
		padding-top : 0;
	}
`;
export const LinkedIndicatorFactorBucket = styled.span.attrs({'data-widget': 'linked-indicator-value-bucket'})`
	display       : flex;
	position      : relative;
	align-items   : center;
	padding       : 0 0 0 calc(var(--margin) / 2);
	margin-left   : calc(var(--margin) / 4);
	margin-bottom : calc(var(--margin) / 4);
	height        : var(--height);
	border-radius : var(--border-radius);
	overflow      : hidden;
	&:after {
		content          : '';
		display          : block;
		position         : absolute;
		top              : 0;
		left             : 0;
		width            : 100%;
		height           : 100%;
		background-color : var(--primary-color);
		opacity          : 0.2;
		z-index          : 0;
	}
	&:hover > span:last-child:not(:first-child) {
		left : calc(var(--height) * -0.1);
	}
	> span:first-child {
		padding-right : calc(var(--margin) / 2);
		font-variant  : petite-caps;
		font-weight   : var(--font-demi-bold);
		white-space   : nowrap;
		text-overflow : ellipsis;
		overflow      : hidden;
		z-index       : 1;
		&:last-child {
			margin-right : calc(var(--margin) / 2);
		}
	}
	> span:last-child:not(:first-child) {
		display          : flex;
		position         : relative;
		align-items      : center;
		justify-content  : center;
		height           : calc(var(--height) * 0.8);
		min-width        : calc(var(--height) * 0.8);
		left             : var(--height);
		color            : var(--invert-color);
		background-color : var(--danger-color);
		opacity          : 0.7;
		cursor           : pointer;
		border-radius    : var(--border-radius);
		transition       : background-color 300ms ease-in-out, left 300ms ease-in-out;
		z-index          : 1;
	}
`;
export const MeasureBucketsContainer = styled.div.attrs({'data-widget': 'measure-buckets'})`
	display        : flex;
	position       : relative;
	flex-direction : column;
	margin-top     : calc(var(--margin) / 2);
	padding-left   : calc(var(--margin) / 2);
	counter-reset  : factor-value-bucket;
	> button:last-child {
		margin-top    : calc(var(--margin) / 2);
		align-self    : flex-start;
		border-radius : calc(var(--height) / 2);
	}
`;

