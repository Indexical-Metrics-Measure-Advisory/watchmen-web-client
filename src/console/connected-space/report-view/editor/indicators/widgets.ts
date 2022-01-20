import {Button, DwarfButton} from '@/widgets/basic/button';
import styled from 'styled-components';
import {PropValue} from '../settings-widgets/widgets';

export const IndicatorContainer = styled.div.attrs<{ removable: boolean }>(({removable}) => {
	return {
		'data-widget': 'report-indicator',
		style: {
			gridTemplateColumns: removable ? (void 0) : '32px 1fr'
		}
	};
})<{ removable: boolean }>`
	display               : grid;
	grid-template-columns : 32px 1fr calc((var(--height) * 1.8 + 1px) * 0.6);
	position              : relative;
	grid-column           : 1 / span 2;
	align-items           : center;
	height                : calc(var(--height) * 1.8 + 1px);
	margin-right          : calc(var(--margin) / 2);
`;
export const IndicatorIndexLabel = styled.div.attrs({'data-widget': 'report-indicator-index'})`
	display         : flex;
	align-items     : center;
	justify-content : center;
	height          : calc(var(--height) * 1.8 + 1px);
	font-weight     : var(--font-demi-bold);
	padding         : 0 calc(var(--margin) / 8);
	white-space     : nowrap;
	overflow        : hidden;
	text-overflow   : ellipsis;
`;
export const IndicatorPropValue = styled(PropValue)`
	display               : grid;
	grid-template-columns : 1fr 80px;
	margin-right          : 0;
	> div[data-widget="dropdown"] {
		width : unset;
		&:first-child {
			border-top-right-radius    : 0;
			border-bottom-right-radius : 0;
			border-right-color         : transparent;
			margin-right               : -1px;
		}
		&:nth-child(2) {
			border-radius      : 0;
			border-right-color : transparent;
			margin-right       : -1px;
		}
	}
`;
export const IncorrectOptionLabel = styled.span.attrs({'data-widget': 'incorrect-option'})`
	color           : var(--danger-color);
	text-decoration : line-through;
`;
export const DeleteMeContainer = styled.div.attrs({'data-widget': 'report-indicator-delete-me'})`
	display     : flex;
	align-items : center;
	height      : 60%;
`;
export const DeleteMeButton = styled(Button)`
	height                    : 100%;
	width                     : 100%;
	padding                   : 0;
	border                    : var(--border);
	border-top-left-radius    : 0;
	border-bottom-left-radius : 0;
	&:hover {
		color        : var(--danger-color);
		border-color : transparent;
		box-shadow   : var(--param-danger-border), var(--danger-hover-shadow);
	}
	> svg {
		font-size : 0.8em;
	}
`;
export const AddIndicatorContainer = styled(PropValue)`
	grid-column     : 1 / span 2;
	display         : flex;
	position        : relative;
	align-items     : center;
	justify-content : flex-end;
	height          : calc(var(--height) * 1.8 + 1px);
`;
export const AddIndicatorButton = styled(DwarfButton)`
	height : 60%;
`;