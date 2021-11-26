import styled from 'styled-components';
import {InspectionLabel} from '../widgets';

export const PickIndicatorContainer = styled.div.attrs({'date-widget': 'inspection-pick-indicator'})`
	display               : grid;
	position              : relative;;
	grid-template-columns : auto auto auto auto auto 1fr;
	grid-column-gap       : calc(var(--margin) / 2);
	> div[data-widget=inspection-dropdown] {
		min-width : 250px;
	}
`;

export const InspectingIndicatorLabel = styled(InspectionLabel)`
	color            : var(--invert-color);
	background-color : var(--primary-color);
	border-radius    : calc(var(--tall-height) / 2);
	padding          : 0 var(--margin);
`;
