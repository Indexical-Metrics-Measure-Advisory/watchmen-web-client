import styled from 'styled-components';

export const DatePickerContainer = styled.div`
	display               : grid;
	grid-template-columns : auto 1fr;
	cursor                : default;
`;
export const DatePickerShortcut = styled.div`
	display        : flex;
	flex-direction : column;
	grid-row       : span 2;
	border-right   : var(--border);
`;
export const DatePickerShortcutButton = styled.span`
	display      : flex;
	align-items  : center;
	height       : 32px;
	padding      : 0 calc(var(--margin) / 2);
	font-variant : petite-caps;
	cursor       : pointer;
	user-select  : none;
	transition   : all 300ms ease-in-out;
	&:hover {
		background-color : var(--hover-color);
	}
`;
export const DatePickerHeader = styled.div`
	display         : flex;
	align-items     : center;
	justify-content : space-between;
	height          : 32px;
	padding         : 0 calc(var(--margin) / 2);
`;
export const DatePickerHeaderYearMonth = styled.span`
	font-weight  : var(--font-bold);
	font-variant : petite-caps;
`;
export const DatePickerHeaderOperators = styled.div`
	display     : flex;
	align-items : center;
`;
const DatePickerHeaderButton = styled.span`
	display         : flex;
	align-items     : center;
	justify-content : center;
	font-weight     : var(--font-bold);
	border-radius   : var(--border-radius);
	user-select     : none;
	transition      : all 300ms ease-in-out;
	cursor          : pointer;
	&:hover {
		background-color : var(--hover-color);
	}
`;
export const DatePickerHeaderTodayButton = styled(DatePickerHeaderButton)`
	transform        : scale(0.8);
	transform-origin : right;
	padding          : 2px 6px;
	font-variant     : petite-caps;
`;
export const DatePickerHeaderMonthChangeButton = styled(DatePickerHeaderButton)`
	height : 20px;
	width  : 24px;
`;
export const DatePickerBody = styled.div`
	display               : grid;
	grid-template-columns : repeat(7, 32px);
	grid-template-rows    : repeat(7, 32px);
`;
export const DatePickerBodyHeaderCell = styled.span`
	display         : flex;
	align-items     : center;
	justify-content : center;
	position        : relative;
	text-align      : center;
	color           : var(--primary-color);
	font-weight     : var(--font-bold);
	opacity         : 0.7;
	cursor          : default;
	&:first-child,
	&:nth-child(7) {
		color : var(--danger-color);
	}
`;
export const DatePickerBodyDateCell = styled.span`
	display         : flex;
	align-items     : center;
	justify-content : center;
	position        : relative;
	text-align      : center;
	cursor          : pointer;
	&:before {
		content          : '';
		display          : block;
		position         : absolute;
		top              : 4px;
		left             : 4px;
		height           : 24px;
		width            : 24px;
		border-radius    : 100%;
		background-color : var(--hover-color);
		opacity          : 0;
		z-index          : -1;
		transition       : all 300ms ease-in-out;
	}
	&:hover:before {
		opacity : 1;
	}
	&[data-current-month=false] {
		color : var(--hover-color);
		&:hover {
			color : var(--primary-color);
		}
	}
	&[data-today=true] {
		font-weight : var(--font-bold);
		color       : var(--primary-color);
	}
	&[data-current=true] {
		color : var(--invert-color);
		&:before {
			background-color : var(--invert-color);
			box-shadow       : 0 0 11px 0 rgba(0, 0, 0, 0.1);
			opacity          : 1;
			z-index          : -2;
		}
		&:after {
			content          : '';
			display          : block;
			position         : absolute;
			top              : 7px;
			left             : 7px;
			height           : 18px;
			width            : 18px;
			border-radius    : 100%;
			background-color : var(--primary-color);
			z-index          : -1;
		}
	}
`;
export const DatePickerButtons = styled.div`
	display  : flex;
	position : absolute;
	bottom   : -1px;
	right    : -1px;
`;
const DatePickerButton = styled.div`
	display          : flex;
	position         : relative;
	align-items      : center;
	justify-content  : center;
	padding          : 0 calc(var(--margin) / 3);
	min-width        : 80px;
	height           : 32px;
	background-color : var(--primary-color);
	color            : var(--invert-color);
	font-variant     : petite-caps;
	box-shadow       : 0 0 11px 0 rgba(0, 0, 0, 0.1);
	cursor           : pointer;
	z-index          : 1;
`;
export const DatePickerClearButton = styled(DatePickerButton)`
	border-top-left-radius : var(--border-radius);
`;
export const DatePickerConfirmButton = styled(DatePickerButton)`
	border-bottom-right-radius : var(--border-radius);
	&:before {
		content          : '';
		display          : block;
		position         : absolute;
		top              : 30%;
		left             : 0;
		width            : 1px;
		height           : 40%;
		background-color : var(--invert-color);
		opacity          : 0.7;
	}
`;
