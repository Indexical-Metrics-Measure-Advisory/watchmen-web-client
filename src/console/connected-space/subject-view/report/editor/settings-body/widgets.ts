import styled from 'styled-components';
import { BODY_MAX_HEIGHT_ON_HEADER_NAME_EDITOR } from '../../../../../../admin/pipelines/pipeline/header/widgets';

export const SettingsBodyContainer = styled.div.attrs({
	'data-widget': 'report-editor-settings-body',
	'data-v-scroll': ''
})`
	display               : grid;
	position              : relative;
	grid-template-columns : 120px 1fr;
	align-content         : start;
	overflow-y            : auto;
	height                : calc(${BODY_MAX_HEIGHT_ON_HEADER_NAME_EDITOR} - var(--header-height));
`;
