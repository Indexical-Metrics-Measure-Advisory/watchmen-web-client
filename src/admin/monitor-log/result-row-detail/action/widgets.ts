import {InputLines} from '@/widgets/basic/input-lines';
import styled from 'styled-components';
import {SectionTitle} from '../widgets';

export const DetailProcessActionContainer = styled.div.attrs({'data-widget': 'monitor-log-detail-process-action'})`
	display        : flex;
	position       : relative;
	flex-direction : column;
	min-height     : var(--height);
`;
export const ActionSectionTitle = styled(SectionTitle)`
	grid-template-columns : 50% 1fr auto;
`;
export const DetailProcessActionBody = styled.div.attrs({'data-widget': 'monitor-log-detail-process-action-body'})`
	display               : grid;
	position              : relative;
	grid-template-columns : 20% calc(80% - var(--margin) / 2);
	grid-column-gap       : calc(var(--margin) / 2);
	border-bottom         : var(--border);
	padding-bottom        : calc(var(--margin) / 2);
`;
export const BodyLabel = styled.div.attrs({'data-widget': 'monitor-log-detail-process-action-body-label'})`
	display      : flex;
	align-self   : start;
	align-items  : center;
	font-variant : petite-caps;
	font-weight  : var(--font-demi-bold);
	padding-left : calc(var(--margin) / 2);
	height       : var(--height);
`;
export const BodyValue = styled.div.attrs<{ emphasis?: boolean }>(({emphasis = false}) => {
	return {
		'data-widget': 'monitor-log-detail-process-action-body-value',
		style: {
			fontVariant: emphasis ? 'petite-caps' : (void 0),
			fontWeight: emphasis ? 'var(--font-demi-bold)' : (void 0)
		}
	};
})<{ emphasis?: boolean }>`
	display     : flex;
	align-items : center;
	min-height  : var(--height);
`;
export const ActionType = styled.div.attrs({'data-widget': 'monitor-log-detail-process-action-type'})`
	display      : flex;
	align-items  : center;
	font-variant : petite-caps;
	font-weight  : var(--font-demi-bold);
	height       : var(--height);
`;
export const ActionStatus = styled.div.attrs({'data-widget': 'monitor-log-detail-process-action-status'})`
	display      : flex;
	align-items  : center;
	font-variant : petite-caps;
	font-weight  : var(--font-demi-bold);
	height       : var(--height);
`;
export const ActionError = styled(InputLines).attrs({
	'data-widget': 'monitor-log-detail-process-action-error',
	'data-v-scroll': '',
	'data-h-scroll': ''
})`
	display     : flex;
	position    : relative;
	align-items : center;
	height      : 200px;
	margin      : 8px calc(var(--margin) / 2) 4px 0;
	white-space : pre;
`;
export const ObjectValue = styled(InputLines).attrs({
	'data-v-scroll': '',
	'data-h-scroll': ''
})`
	display     : flex;
	position    : relative;
	align-items : center;
	height      : 100px;
	margin      : 8px calc(var(--margin) / 2) 4px 0;
	white-space : pre;
`;