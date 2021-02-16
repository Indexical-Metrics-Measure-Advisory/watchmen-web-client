import styled from 'styled-components';
import { Button } from '../../../../basic-widgets/button';

export const PipelineBodyContainer = styled.div.attrs({ 'data-widget': 'pipeline-body' })`
	display   : flex;
	position  : relative;
	flex-grow : 1;
`;
export const LeadLabel = styled.div.attrs({ 'data-widget': 'pipeline-editor-lead-label' })`
	display         : flex;
	position        : relative;
	align-items     : center;
	justify-content : flex-end;
	height          : var(--height);
	align-self      : start;
	font-variant    : petite-caps;
	font-weight     : var(--font-demi-bold);
	cursor          : default;
`;
export const FooterLeadLabel = styled(LeadLabel)`
	flex-grow       : 1;
	margin-right    : var(--margin);
	justify-content : center;
	opacity         : 0.5;
`;
export const HeaderButtons = styled.div.attrs({ 'data-widget': 'header-buttons' })`
	display               : grid;
	position              : absolute;
	grid-template-columns : repeat(3, auto);
	right                 : 0;
	top                   : calc((var(--height) - var(--param-height)) / 2);
`;
export const FooterButtons = styled.div.attrs({ 'data-widget': 'footer-buttons' })`
	display               : grid;
	position              : absolute;
	grid-template-columns : repeat(3, auto);
	right                 : 0;
	top                   : calc((var(--height) - var(--param-height)) / 2);
`;
export const HeaderButton = styled(Button)`
	height        : var(--param-height);
	border        : 0;
	border-radius : 0;
	&:first-child {
		border-top-left-radius    : calc(var(--param-height) / 2);
		border-bottom-left-radius : calc(var(--param-height) / 2);
	}
	&:last-child {
		border-top-right-radius    : calc(var(--param-height) / 2);
		border-bottom-right-radius : calc(var(--param-height) / 2);
	}
	&:not(:first-child) {
		&:before {
			content          : '';
			display          : block;
			position         : absolute;
			top              : 30%;
			left             : 0;
			width            : 1px;
			height           : 40%;
			background-color : var(--invert-color);
			opacity          : 0.5;
		}
	}
	&:not([data-ink]) {
		background-color : var(--bg-color);
		box-shadow       : var(--param-border);
		&:hover {
			box-shadow : var(--hover-shadow);
		}
	}
	&[data-ink=primary] {
		&:hover {
			box-shadow : var(--primary-hover-shadow);
		}
	}
	&[data-ink=danger] {
		&:hover {
			box-shadow : var(--danger-hover-shadow);
		}
	}
	> svg {
		font-size : 0.8em;
	}
`;