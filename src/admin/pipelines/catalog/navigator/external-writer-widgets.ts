import styled from 'styled-components';

export const ExternalWriterBodyContainer = styled.div.attrs<{ visible: boolean }>(({visible}) => {
	return {
		'data-widget': 'pipelines-navigator-external-writer',
		'data-v-scroll': '',
		'data-h-scroll': '',
		style: {
			height: visible ? (void 0) : 0,
			flexGrow: visible ? 1 : 0,
			borderBottom: visible ? 'var(--border)' : 0
		}
	};
})<{ visible: boolean }>`
	display               : grid;
	position              : relative;
	grid-template-columns : 1fr;
	grid-auto-rows        : var(--tall-height);
	overflow              : auto;
`;
export const WriterRow = styled.div.attrs({'data-widget': 'pipelines-navigator-external-writer'})`
	display     : flex;
	position    : relative;
	align-items : center;
	padding     : 0 calc(var(--margin) / 2);
	transition  : background-color 300ms ease-in-out;
	&:after {
		content          : '';
		display          : block;
		position         : absolute;
		width            : 100%;
		height           : 1px;
		top              : calc(100% - 1px);
		left             : 0;
		background-color : var(--border-color);
		opacity          : 0.5;
	}
	&:hover {
		background-color : var(--hover-color);
	}
`;
export const NoExternalWriter = styled.div.attrs({'data-widget': 'pipelines-navigator-no-external-writer'})`
	display      : flex;
	align-items  : center;
	font-variant : petite-caps;
	font-weight  : var(--font-demi-bold);
	padding      : 0 calc(var(--margin) / 2);
	opacity      : 0.7;
`;