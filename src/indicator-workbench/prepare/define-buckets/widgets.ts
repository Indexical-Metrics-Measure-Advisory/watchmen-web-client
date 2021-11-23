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
	> div[data-widget=search-text] {
		margin-top   : calc(var(--margin) / 2);
		margin-right : var(--margin);
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
	padding     : calc(var(--margin) / 2) var(--margin) 0 calc(var(--margin) / 4);
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
	height        : calc(var(--height) * 0.8);
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
	&:hover > span:last-child {
		left : calc(var(--height) * -0.1);
	}
	> svg {
		margin-right : calc(var(--margin) / 4);
		font-size    : 0.7em;
		opacity      : 0.7;
	}
	> span:nth-child(2) {
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
	> span:last-child {
		display          : flex;
		position         : relative;
		align-items      : center;
		justify-content  : center;
		height           : calc(var(--height) * 0.64);
		min-width        : calc(var(--height) * 0.64);
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
	> button:last-child {
		margin-top    : calc(var(--margin) / 2);
		align-self    : flex-start;
		border-radius : calc(var(--height) / 2);
	}
`;
export const MeasureBucketList = styled.div.attrs({'data-widget': 'measure-bucket-list'})`
	display               : grid;
	position              : relative;
	grid-template-columns : auto 1fr auto 1fr;
	margin-top            : calc(var(--margin) / 4);
	padding-right         : var(--margin);
`;
export const MeasurableFactor = styled.span.attrs({'data-widget': 'measurable-factor'})`
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
		content          : '';
		display          : block;
		position         : absolute;
		top              : 0;
		left             : 0;
		width            : 100%;
		height           : 100%;
		background-color : var(--info-color);
		opacity          : 0.3;
		z-index          : -1;
	}
	> svg {
		margin-top   : 2px;
		margin-right : calc(var(--margin) / 4);
		font-size    : 0.7em;
		opacity      : 0.7;
	}
`;
export const MatchedMeasureBuckets = styled.div.attrs({'data-widget': 'measure-buckets'})`
	display   : flex;
	position  : relative;
	flex-wrap : wrap;
`;
export const MatchedMeasureBucketLabel = styled.span.attrs({'data-widget': 'measure-bucket'})`
	display        : flex;
	position       : relative;
	align-items    : center;
	padding        : 0 calc(var(--margin) / 2);
	margin         : calc(var(--height) * 0.2) 0 calc(var(--height) * 0.2) calc(var(--margin) / 2);
	height         : calc(var(--height) * 0.8);
	border-radius  : var(--border-radius);
	text-transform : capitalize;
	font-variant   : petite-caps;
	overflow       : hidden;
	&:after {
		content          : '';
		display          : block;
		position         : absolute;
		top              : 0;
		left             : 0;
		width            : 100%;
		height           : 100%;
		background-color : var(--primary-color);
		opacity          : 0.3;
		z-index          : -1;
	}
	> svg {
		margin-right : calc(var(--margin) / 4);
		font-size    : 0.7em;
		opacity      : 0.7;
	}
`;
