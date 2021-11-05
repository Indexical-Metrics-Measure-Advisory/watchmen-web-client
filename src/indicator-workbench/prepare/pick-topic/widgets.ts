import styled from 'styled-components';

export const TopicOrFactorCandidateName = styled.span`
	flex-grow : 1;
`;
export const TopicOrFactorCandidateUsage = styled.span`
	display          : flex;
	position         : relative;
	align-items      : center;
	padding          : 2px calc(var(--margin) / 4);
	border-radius    : var(--border-radius);
	color            : var(--invert-color);
	background-color : var(--waive-color);
	font-variant     : petite-caps;
	font-size        : var(--font-size);
`;
