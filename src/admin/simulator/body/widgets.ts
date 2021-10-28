import {Button} from '@/widgets/basic/button';
import styled from 'styled-components';

export const SimulatorBodyContainer = styled.div.attrs({
	'data-widget': 'simulator-body'
})`
	display        : flex;
	flex-direction : column;
	position       : relative;
	flex-grow      : 1;
`;

export const SimulatorBodyPart = styled.div.attrs<{ collapsed: boolean }>(({collapsed}) => {
	return {
		'data-widget': 'simulator-body-part',
		style: {
			flexGrow: collapsed ? 0 : 1
		}
	};
})<{ collapsed: boolean }>`
	display        : flex;
	flex-direction : column;
	&:last-child > div[data-widget='simulator-body-part-header'] {
		border-bottom : ${({collapsed}) => collapsed ? 0 : (void 0)};
	}
`;

export const SimulatorBodyPartHeader = styled.div.attrs({'data-widget': 'simulator-body-part-header'})`
	display               : grid;
	grid-template-columns : auto 1fr;
	grid-column-gap       : calc(var(--margin) / 2);
	height                : var(--header-height);
	padding               : 0 calc(var(--margin) / 2);
	align-items           : center;
	border-bottom         : var(--border);
`;

export const SimulatorBodyPartHeaderTitle = styled.div.attrs({'data-widget': 'simulator-body-part-header-title'})`
	font-size     : 1.6em;
	font-weight   : var(--font-semi-bold);
	font-family   : var(--title-font-family);
	overflow      : hidden;
	white-space   : nowrap;
	text-overflow : ellipsis;
`;
export const SimulatorBodyPartHeaderButtons = styled.div.attrs({'data-widget': 'simulator-body-part-header-buttons'})`
	display         : flex;
	justify-content : flex-start;
	> button {
		border-radius : calc(var(--height) / 2);
	}
`;
export const SimulatorBodyPartBody = styled.div.attrs({
	'data-widget': 'simulator-body-part-body',
	'data-v-scroll': '',
	'data-h-scroll': ''
})`
	flex-grow             : 1;
	display               : grid;
	grid-template-columns : 1fr;
	grid-auto-rows        : var(--grid-row-height);
	padding               : calc(var(--margin) / 4);
	border-bottom         : var(--border);
	max-height            : calc(100vh - var(--page-header-height) - 3 * 40px);
	overflow              : auto;
`;
export const SimulatorBodyPartRow = styled.div`
	display               : grid;
	position              : relative;
	grid-template-columns : auto auto auto auto auto 1fr;
	grid-column-gap       : calc(var(--margin) / 2);
	align-items           : center;
`;
export const SimulatorBodyPartLabel = styled.span`
	font-weight  : var(--font-bold);
	font-variant : petite-caps;
`;
export const NextStepButton = styled(Button).attrs({'data-widget': 'next-step-button'})`
	border-radius : calc(var(--height) / 2);
	font-variant  : petite-caps;
	font-weight   : var(--font-bold);
`;