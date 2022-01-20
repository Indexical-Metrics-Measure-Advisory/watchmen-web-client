import {Button, DwarfButton} from '@/widgets/basic/button';
import styled from 'styled-components';
import {PropValue} from '../settings-widgets/widgets';

export const DimensionContainer = styled.div.attrs<{ removable: boolean }>(({removable}) => {
	return {
		'data-widget': 'report-dimension',
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
	> div[data-widget=chart-settings-prop-value] {
		margin-right : 0;
		> div[data-widget=dropdown] {
			border-top-right-radius    : 0;
			border-bottom-right-radius : 0;
			border-right-color         : transparent;
			margin-right               : -1px;
		}
	}
`;
export const DimensionIndexLabel = styled.div.attrs({'data-widget': 'report-dimension-index'})`
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
export const IncorrectOptionLabel = styled.span.attrs({'data-widget': 'incorrect-option'})`
	color           : var(--danger-color);
	text-decoration : line-through;
`;
export const DeleteMeContainer = styled.div.attrs({'data-widget': 'report-dimension-delete-me'})`
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
export const AddDimensionContainer = styled(PropValue)`
	grid-column     : 1 / span 2;
	display         : flex;
	position        : relative;
	align-items     : center;
	justify-content : flex-end;
	height          : calc(var(--height) * 1.8 + 1px);
`;
export const AddDimensionButton = styled(DwarfButton)`
	height : 60%;
`;