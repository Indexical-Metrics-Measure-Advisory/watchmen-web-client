import styled from 'styled-components';

export const BucketsDefContainer = styled.div.attrs({'data-widget': 'buckets-def'})`
	display        : flex;
	position       : relative;
	flex-direction : column;
	+ div[data-widget=step-body-buttons] {
		margin-top : var(--margin);
	}
`;
export const FactorValueBucketContainer = styled.div.attrs({'data-widget': 'factor-value-bucket'})`
	display        : flex;
	position       : relative;
	flex-direction : column;
	padding-left   : calc(var(--margin) / 2);
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
