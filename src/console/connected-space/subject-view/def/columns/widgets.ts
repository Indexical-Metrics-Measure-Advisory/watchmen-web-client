import styled from 'styled-components';

export const ColumnsContainer = styled.div.attrs<{ active: boolean }>(({ active }) => {
	return {
		'data-widget': 'subject-def-columns',
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
