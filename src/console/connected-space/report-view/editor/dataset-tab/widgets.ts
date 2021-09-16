import styled from 'styled-components';

export const ReportDataSetContainer = styled.div.attrs({'data-widget': 'report-dataset'})`
	display        : flex;
	position       : relative;
	flex-direction : column;
	flex-grow      : 1;
	height         : calc(100% - var(--height) * 1.5 - 1px);
	overflow       : hidden;
	div[data-widget=dataset-header] {
		justify-content : flex-end;
	}
`;
export const ReportDataSetNoColumn = styled.div.attrs({'data-widget': 'report-dataset-no-column'})`
	display         : flex;
	position        : absolute;
	align-items     : center;
	justify-content : center;
	top             : 0;
	left            : 0;
	width           : 100%;
	height          : 100%;
	font-family     : var(--title-font-family);
	font-size       : 2em;
	opacity         : 0.7;
	> span {
		margin-top : -10%;
	}
`;
export const ReportDataSetLoading = styled.div.attrs<{ visible: boolean }>(({visible}) => {
	return {
		'data-widget': 'report-dataset-loading',
		style: {display: visible ? 'flex' : 'none'}
	};
})<{ visible: boolean }>`
	position        : absolute;
	align-items     : center;
	justify-content : center;
	top             : 40px;
	left            : 0;
	height          : calc(100% - 40px);
	width           : 100%;
	font-size       : 1.4em;
	z-index         : 1;
	&:before {
		content          : '';
		display          : block;
		position         : absolute;
		top              : 0;
		left             : 0;
		width            : 100%;
		height           : 100%;
		background-color : var(--invert-color);
		opacity          : 0.3;
	}
	> svg {
		margin-top : -10%;
		font-size  : 5em;
		opacity    : 0.3;
	}
`;
export const ReportDataSetGridContainer = styled.div.attrs({'data-widget': 'report-dataset-grid'})`
	display          : flex;
	position         : absolute;
	flex-direction   : column;
	top              : 0;
	left             : 0;
	width            : 100%;
	height           : 100%;
	background-color : var(--bg-color);
	overflow         : hidden;
`;
