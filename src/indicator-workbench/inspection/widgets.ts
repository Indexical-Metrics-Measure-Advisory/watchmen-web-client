import {Button} from '@/widgets/basic/button';
import {Dropdown} from '@/widgets/basic/dropdown';
import styled from 'styled-components';

export const InspectionContainer = styled.div.attrs({'data-widget': 'inspection'})`
	display        : flex;
	position       : relative;
	flex-direction : column;
	margin-top     : var(--margin);
	padding-bottom : var(--margin);
	font-size      : calc(var(--font-size) * 1.2);
`;
export const InspectionLabel = styled.span.attrs({'data-widget': 'inspection-label'})`
	display      : flex;
	position     : relative;
	align-items  : center;
	font-weight  : var(--font-demi-bold);
	font-variant : petite-caps;
	white-space  : nowrap;
`;
export const OrLabel = styled(InspectionLabel)`
	opacity : 0.7;
`;
export const InspectionDropdown = styled(Dropdown).attrs({'data-widget': 'inspection-dropdown'})`
	height  : var(--tall-height);
	padding : 0 calc(var(--margin) / 2);
	> svg {
		margin-left : calc(var(--margin) / 2);
	}
	> div[data-widget=dropdown-options-container] > span[data-widget=dropdown-option] {
		padding : 0 calc(var(--margin) / 2);
	}
`;
export const InspectionButton = styled(Button).attrs({'data-widget': 'inspection-button'})`
	height        : var(--tall-height);
	border-radius : calc(var(--tall-height) / 2);
	font-size     : calc(var(--font-size) * 1.2);
	padding       : 0 calc(var(--margin) / 4 * 3);
`;