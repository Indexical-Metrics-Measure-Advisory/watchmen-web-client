import styled from 'styled-components';
import { DwarfButton } from '../../../basic-widgets/button';
import { TooltipButton } from '../../../basic-widgets/tooltip-button';

export const RowDetailContainer = styled.div.attrs({ 'data-widget': 'monitor-log-detail' })`
	display               : grid;
	grid-template-columns : 50% 50%;
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
export const Title = styled.div.attrs({ 'data-widget': 'monitor-log-detail-title' })`
	display       : flex;
	position      : relative;
	align-items   : center;
	padding       : 0 calc(var(--margin) / 2);
	font-variant  : petite-caps;
	font-weight   : var(--font-demi-bold);
	min-height    : var(--height);
	max-height    : var(--height);
	border-bottom : var(--border);
	&:after {
		content          : '';
		display          : block;
		position         : absolute;
		top              : 0;
		left             : 0;
		width            : 100%;
		height           : 100%;
		background-color : var(--primary-color);
		opacity          : 0.1;
		pointer-events   : none;
	}
	> span {
		text-transform : capitalize;
	}
`;
export const PipelineTypeLabel = styled.span`
	color       : var(--primary-color);
	font-weight : var(--font-bold);
	margin-left : 4px;
`;
export const ShowUnchanged = styled.div.attrs({ 'data-widget': 'monitor-log-detail-unchanged' })`
	display       : flex;
	position      : relative;
	align-items   : center;
	padding       : 0 calc(var(--margin) / 2);
	height        : var(--height);
	border-bottom : var(--border);
	&:after {
		content          : '';
		display          : block;
		position         : absolute;
		top              : 0;
		left             : 0;
		width            : 100%;
		height           : 100%;
		background-color : var(--primary-color);
		opacity          : 0.1;
		pointer-events   : none;
	}
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
	overflow     : auto;
	.jsondiffpatch-property-name {
		color       : var(--primary-color);
		font-weight : var(--font-bold);
		&:after {
			color       : var(--font-color);
			font-weight : 400;
		}
	}
`;
export const DetailProcessContainer = styled.div.attrs({ 'data-widget': 'monitor-log-detail-process' })`
	display               : grid;
	grid-template-columns : 1fr auto;
	align-self            : stretch;
	justify-self          : stretch;
	align-content         : start;
	justify-content       : start;
`;
export const CloseButton = styled(DwarfButton)`
	display : block;
`;
export const DetailProcessBody = styled.div.attrs({
	'data-widget': 'monitor-log-detail-process-body',
	'data-v-scroll': '',
	'data-h-scroll': ''
})`
	grid-column : 1 / span 2;
	max-height  : calc(400px - var(--height));
	overflow    : auto;
`;
export const SectionTitle = styled.div.attrs({ 'data-widget': 'monitor-log-detail-process-title' })`
	display               : grid;
	grid-template-columns : 50% 50%;
	height                : var(--height);
	align-items           : center;
	font-variant          : petite-caps;
	padding               : 0 calc(var(--margin) / 2);
	border-bottom         : var(--border);
`;
export const TitleLabel = styled.span`
`;
export const TitleNameLabel = styled.span`
	font-weight  : var(--font-demi-bold);
	margin-right : calc(var(--margin) / 2);
`;
export const TitleExecutionLabel = styled.span`
	color       : var(--primary-color);
	font-weight : var(--font-bold);
	&[data-ignored=true] {
		color : var(--danger-color);
	}
`;
export const ExpandToggleButton = styled(TooltipButton)`
	display      : block;
	justify-self : flex-end;
	padding      : 0;
	width        : var(--button-height-in-form);
	height       : var(--button-height-in-form);
`;
