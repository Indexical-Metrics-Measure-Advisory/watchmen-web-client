import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

export const PickTopicsContainer = styled.div.attrs<{ active: boolean }>(({ active }) => {
	return {
		'data-widget': 'subject-def-pick-topics',
		'data-v-scroll': '',
		style: {
			paddingRight: active ? (void 0) : 0
		}
	};
}) <{ active: boolean }>`
	display               : grid;
	grid-template-columns : 1fr 1fr 1fr;
	grid-column-gap       : var(--margin);
	grid-row-gap          : calc(var(--margin));
	align-content         : start;
	padding               : var(--margin);
	overflow-y            : auto;
	border-right          : var(--border);
`;
export const AvailableTopicCard = styled.div.attrs({ 'data-widget': 'subject-def-available-topic' })`
	display       : flex;
	padding       : calc(var(--margin) / 2) var(--margin);
	position      : relative;
	border-radius : calc(var(--border-radius) * 2);
	box-shadow    : var(--shadow);
	cursor        : pointer;
	transition    : all 300ms ease-in-out;
	&:hover {
		box-shadow : var(--hover-shadow);
	}
`;
export const TopicName = styled.div.attrs({ 'data-widget': 'subject-def-available-topic-name' })`
	display     : flex;
	flex-grow   : 1;
	align-items : center;
	font-family : var(--title-font-family);
	font-size   : 1.6em;
`;
export const TopicPicked = styled(FontAwesomeIcon).attrs<{ 'data-picked': boolean }>(({ 'data-picked': picked }) => {
	return {
		style: {
			color: picked ? 'var(--primary-color)' : 'var(--waive-color)',
			opacity: picked ? 1 : 0.5
		}
	};
})<{ 'data-picked': boolean }>`
	font-size  : 2em;
	transition : color 300ms ease-in-out, opacity 300ms ease-in-out;
`;