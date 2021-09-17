import styled from 'styled-components';

export const SettingsSection = styled.div.attrs({'data-widget': 'settings-section'})`
	display        : flex;
	flex-direction : column;
	margin-top     : calc(var(--margin) / 2);
	&:hover {
		> div[data-widget='settings-section-title'] {
			:before {
				opacity : 0.5;
			}
		}
	}
`;

export const SettingsSectionTitle = styled.div.attrs({'data-widget': 'settings-section-title'})`
	display       : flex;
	position      : relative;
	align-items   : center;
	font-family   : var(--title-font-family);
	font-size     : 1.5em;
	margin-bottom : calc(var(--margin) / 2);
	&:before {
		content                    : '';
		display                    : block;
		position                   : absolute;
		top                        : 50%;
		left                       : -16px;
		width                      : 8px;
		height                     : 10px;
		transform                  : translateY(-50%);
		background-color           : var(--primary-color);
		border-top-right-radius    : 50%;
		border-bottom-right-radius : 50%;
		opacity                    : 0;
		pointer-events             : none;
		transition                 : all 300ms ease-in-out;
	}
`;

export const SettingsSectionBody = styled.div.attrs({'data-widget': 'settings-section-body'})`
	display               : grid;
	grid-template-columns : auto 1fr;
	grid-column-gap       : calc(var(--margin) / 2);
	grid-auto-rows        : minmax(var(--grid-tall-row-height), auto);
	align-items           : center;
	> div[data-widget=dropdown] {
		min-width : 200px;
	}
`;
