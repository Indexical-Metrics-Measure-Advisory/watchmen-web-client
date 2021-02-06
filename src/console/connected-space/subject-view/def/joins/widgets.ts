import styled from 'styled-components';

export const JoinsContainer = styled.div.attrs<{ active: boolean }>(({ active }) => {
	return {
		'data-widget': 'subject-def-joins',
		style: {
			paddingRight: active ? (void 0) : 0,
			overflowY: active ? (void 0) : 'hidden'
		}
	};
}) <{ active: boolean }>`
	display      : flex;
	position     : relative;
	border-right : var(--border);
`;
