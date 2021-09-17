import {FactorTypeLabel} from '@/widgets/basic/factor-type-label';
import styled from 'styled-components';

export const TopicBodyContainer = styled.div.attrs<{ visible: boolean }>(({visible}) => {
	return {
		'data-widget': 'pipelines-navigator-topic',
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
export const FactorRowContainer = styled.div.attrs({'data-widget': 'pipelines-navigator-topic-factor'})`
	display               : grid;
	position              : relative;
	grid-template-columns : auto auto 1fr;
	padding               : 0 calc(var(--margin) / 2);
	transition            : background-color 300ms ease-in-out;
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
export const FactorName = styled.div.attrs({'data-widget': 'pipelines-navigator-topic-factor-name'})`
	display     : flex;
	align-items : center;
`;
export const FactorTypeSmall = styled(FactorTypeLabel)`
	font-variant     : petite-caps;
	opacity          : 0.7;
	transform        : scale(0.8);
	transform-origin : left;
	margin-left      : calc(var(--margin) / 2);
`;
export const NoFactor = styled.div.attrs({'data-widget': 'pipelines-navigator-topic-no-factor'})`
	display      : flex;
	align-items  : center;
	grid-row     : 1 / span 2;
	font-variant : petite-caps;
	font-weight  : var(--font-demi-bold);
	padding      : 0 calc(var(--margin) / 2);
	opacity      : 0.7;
`;