import styled from 'styled-components';
import {BODY_MAX_HEIGHT_ON_HEADER_NAME_EDITOR} from '../../../../../admin/pipelines/pipeline/header/widgets';

export const SettingsBodyContainer = styled.div.attrs<{ favoritePin: boolean }>(({favoritePin}) => {
	return {
		'data-widget': 'report-editor-settings-body',
		'data-v-scroll': '',
		style: {
			height: favoritePin ? `calc(${BODY_MAX_HEIGHT_ON_HEADER_NAME_EDITOR} - var(--header-height) - var(--pin-favorite-height)` : (void 0)
		}
	};
})<{ favoritePin: boolean }>`
	display: grid;
	position: relative;
	grid-template-columns: 135px 1fr;
	grid-column-gap: calc(var(--margin) / 2);
	align-content: start;
	overflow-y: auto;
	height: calc(${BODY_MAX_HEIGHT_ON_HEADER_NAME_EDITOR} - var(--height) * 2);
`;
