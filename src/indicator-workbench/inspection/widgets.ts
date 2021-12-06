import {Button} from '@/widgets/basic/button';
import {Dropdown} from '@/widgets/basic/dropdown';
import {Input} from '@/widgets/basic/input';
import styled from 'styled-components';

export const InspectionContainer = styled.div.attrs({'data-widget': 'inspection'})`
	display               : grid;
	position              : relative;
	grid-template-columns : 1fr;
	grid-row-gap          : calc(var(--margin) / 2);
	margin-top            : var(--margin);
	padding-bottom        : var(--margin);
	font-size             : calc(var(--font-size) * 1.2);
`;
export const IndicatorContainer = styled.div.attrs({'data-widget': 'indicator'})`
	display               : grid;
	position              : relative;
	grid-template-columns : auto 1fr;
`;
export const InspectionLabel = styled.span.attrs({'data-widget': 'inspection-label'})`
	display      : flex;
	position     : relative;
	align-items  : center;
	min-height   : var(--tall-height);
	font-weight  : var(--font-demi-bold);
	font-variant : petite-caps;
	white-space  : nowrap;
`;
export const OrLabel = styled(InspectionLabel)`
	opacity : 0.7;
`;
export const LoadingLabel = styled(InspectionLabel)`
	opacity : 0.7;
	> svg {
		font-size : 0.8em;
	}
	> svg + span {
		margin-left : calc(var(--margin) / 4);
	}
`;
export const InspectionEntityLabel = styled.span.attrs({'data-widget': 'inspection-entity-label'})`
	display          : flex;
	position         : relative;
	align-items      : center;
	min-height       : var(--tall-height);
	padding          : 0 var(--margin);
	border-radius    : var(--border-radius); //calc(var(--tall-height) / 2);
	background-color : var(--success-color);
	color            : var(--invert-color);
	font-variant     : petite-caps;
	white-space      : nowrap;
`;
export const InspectionDropdown = styled(Dropdown).attrs({'data-widget': 'inspection-dropdown'})`
	height  : var(--tall-height);
	padding : 0 calc(var(--margin) / 2);
	> svg {
		margin-left : calc(var(--margin) / 2);
	}
	> div[data-widget=dropdown-options-container] {
		max-height : calc(var(--tall-height) * 8 + 2px);
		> span[data-widget=dropdown-option] {
			padding : 0 calc(var(--margin) / 2);
			height  : var(--tall-height);
		}
	}
`;
export const InspectionButton = styled(Button).attrs({'data-widget': 'inspection-button'})`
	height        : var(--tall-height);
	border-radius : calc(var(--tall-height) / 2);
	font-size     : calc(var(--font-size) * 1.2);
	padding       : 0 var(--margin);
`;

export const InspectionInput = styled(Input).attrs({'data-widget': 'inspection-input'})`
	font-size     : calc(var(--font-size) * 1.2);
	padding       : 0 calc(var(--margin) / 2);
	border        : 0;
	border-bottom : var(--border);
	border-radius : 0;
`;