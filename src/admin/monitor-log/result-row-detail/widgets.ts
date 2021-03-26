import styled from 'styled-components';
import { Button } from '../../../basic-widgets/button';

export const RowDetailContainer = styled.div.attrs({ 'data-widget': 'monitor-log-detail' })`
	display               : grid;
	grid-template-columns : 800px 1fr;
	position              : relative;
	grid-column           : 1 / span 7;
	height                : 400px;
	border-top            : var(--border);
`;
export const TriggerDataContainer = styled.div.attrs({ 'data-widget': 'monitor-log-detail-trigger-data' })`
	display               : grid;
	grid-template-columns : 1fr auto;
	align-self            : stretch;
	justify-self          : stretch;
	align-content         : start;
	border-right          : var(--border);
`;
export const TriggerType = styled.div.attrs({ 'data-widget': 'monitor-log-detail-trigger-type' })`
	display       : flex;
	align-items   : center;
	padding       : 0 calc(var(--margin) / 2);
	font-variant  : petite-caps;
	font-weight   : var(--font-demi-bold);
	height        : var(--height);
	border-bottom : var(--border);
	> span {
		text-transform : capitalize;
		margin-left    : 3px;
	}
`;
export const ShowUnchanged = styled.div.attrs({ 'data-widget': 'monitor-log-detail-unchanged' })`
	display       : flex;
	align-items   : center;
	padding       : 0 calc(var(--margin) / 2);
	height        : var(--height);
	border-bottom : var(--border);
	> span {
		margin-left  : calc(var(--margin) / 4);
		font-variant : petite-caps;
		font-weight  : var(--font-demi-bold);
	}
`;
export const Diff = styled.div.attrs({
	'data-widget': 'monitor-log-detail-data-diff',
	'data-h-scroll': '',
	'data-v-scroll': ''
})`
	display      : block;
	position     : relative;
	grid-column  : 1 / span 2;
	justify-self : stretch;
	align-self   : stretch;
	padding      : calc(var(--margin) / 2);
	max-height   : calc(400px - var(--height));
	overflow-y   : scroll;
	.jsondiffpatch-property-name {
		color       : var(--primary-color);
		font-weight : var(--font-bold);
		&:after {
			color       : var(--font-color);
			font-weight : 400;
		}
	}
`;
export const CloseButton = styled(Button)`
	display  : block;
	position : absolute;
	top      : 4px;
	right    : 4px;
`;