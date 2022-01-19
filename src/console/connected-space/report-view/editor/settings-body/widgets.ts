import styled from 'styled-components';

export const SettingsBodyContainer = styled.div.attrs<{ favoritePin: boolean }>(({favoritePin}) => {
	return {
		'data-widget': 'report-editor-settings-body',
		'data-v-scroll': '',
		style: {
			height: favoritePin ? `calc(100vh - var(--page-header-height) - var(--height) * 2 - var(--pin-favorite-height)` : (void 0)
		}
	};
})<{ favoritePin: boolean }>`
	display               : grid;
	position              : relative;
	grid-template-columns : 135px 1fr;
	grid-column-gap       : calc(var(--margin) / 2);
	align-content         : start;
	overflow-y            : auto;
	height                : calc(100vh - var(--page-header-height) - var(--height) * 2);
`;
