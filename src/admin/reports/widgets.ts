import styled from 'styled-components';

export const Explanation = styled.div.attrs({'data-widget': 'report-explanation'})`
	grid-column  : span 2;
	font-variant : petite-caps;
	font-weight  : var(--font-demi-bold);
	font-size    : 1.4em;
	+ ol {
		> li {
		}
	}
`;
export const ExplanationUl = styled.ul.attrs({'data-widget': 'report-explanation-ul'})`
	grid-column   : span 2;
	font-size     : 0.9em;
	line-height   : 1.6em;
	margin-bottom : 10px;
`;
export const ExplanationUlLi = styled.li.attrs({'data-widget': 'report-explanation-ul-li'})`
	display      : block;
	position     : relative;
	list-style   : none;
	font-weight  : var(--font-demi-bold);
	padding-left : 20px;
	line-height  : var(--line-height);
	&:before {
		content          : '';
		display          : block;
		position         : absolute;
		top              : calc(var(--line-height) / 2 - 2px);
		left             : 2px;
		width            : 4px;
		height           : 4px;
		background-color : var(--font-color);
		border-radius    : 100%;
	}
	&:first-child {
		margin-top : calc(var(--margin) / -2);
	}
`;
export const ExplanationOl = styled.ol.attrs({'data-widget': 'report-explanation-ol'})`
	grid-column   : span 2;
	font-size     : 0.9em;
	line-height   : 1.6em;
	margin-bottom : 10px;
	counter-reset : item;
`;
export const ExplanationOlLi = styled.li.attrs({'data-widget': 'report-explanation-ol-li'})`
	list-style  : none;
	font-weight : var(--font-demi-bold);
	line-height : var(--line-height);
	&:before {
		display           : inline-block;
		content           : counters(item, '.') '. ';
		counter-increment : item;
		width             : 20px;
	}
	&:first-child {
		margin-top : calc(var(--margin) / -2);
	}
`;
