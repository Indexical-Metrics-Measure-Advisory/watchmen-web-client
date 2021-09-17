import styled from 'styled-components';

const PageSize = styled.div`
	display       : block;
	position      : absolute;
	top           : 0;
	left          : 0;
	font-size     : 5em;
	font-weight   : var(--font-boldest);
	opacity       : 0.15;
	border-radius : 2px;
	z-index       : -1;
	@media print {
		display : none;
	}
	&:before {
		display  : block;
		position : absolute;
		right    : calc(var(--margin) / 2);
		bottom   : 0;
	}
`;
export const PortraitA4 = styled(PageSize).attrs({'data-widget': 'portrait-a4'})`
	color  : var(--primary-color);
	border : 2px dashed var(--primary-color);
	height : calc(29.7cm - 3.3cm);
	width  : calc(21cm - 3cm);
	&:before {
		content : 'A4 Portrait';
	}
`;
export const LandscapeA4 = styled(PageSize).attrs({'data-widget': 'landscape-a4'})`
	color  : var(--success-color);
	border : 2px dashed var(--success-color);
	height : calc(21cm - 3cm);
	width  : calc(29.7cm - 3.3cm);
	&:before {
		content : 'A4 Landscape';
	}
`;
export const PortraitA3 = styled(PageSize).attrs({'data-widget': 'portrait-a3'})`
	color  : var(--warn-color);
	border : 2px dashed var(--warn-color);
	height : calc(42.0cm - 6cm);
	width  : calc(29.7cm - 4.6cm);
	&:before {
		content : 'A3 Portrait';
	}
`;
export const LandscapeA3 = styled(PageSize).attrs({'data-widget': 'landscape-a3'})`
	color  : var(--danger-color);
	border : 2px dashed var(--danger-color);
	height : calc(29.7cm - 4.6cm);
	width  : calc(42.0cm - 6cm);
	&:before {
		content : 'A3 Landscape';
	}
`;