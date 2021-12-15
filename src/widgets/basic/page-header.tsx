import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {ReactNode} from 'react';
import styled from 'styled-components';
import {ICON_SETTINGS} from './constants';
import {TooltipButton} from './tooltip-button';
import {TooltipAlignment} from './types';

// height might changed by language switching, fix it.
export const PageHeaderContainer = styled.div.attrs({'data-widget': 'page-header'})`
	display     : flex;
	align-items : center;
	min-height  : var(--page-header-height);
`;
export const FullWidthPageHeaderContainer = styled(PageHeaderContainer)`
	border-bottom : var(--border);
	padding       : 0 calc(var(--margin) / 2);
`;
export const PageTitle = styled.div.attrs({'data-widget': 'page-header-title'})`
	font-family : var(--title-font-family);
	font-size   : 3em;
`;
const SettingsButton = styled(TooltipButton).attrs({'data-widget': 'page-header-settings'})`
	margin-left : calc(var(--margin) / 2);
	font-size   : 1.4em;
	color       : var(--primary-color);
	width       : var(--height);
	padding     : 0;
	overflow    : hidden;
	&:after {
		content          : '';
		position         : absolute;
		top              : calc(var(--height) * -1);
		left             : calc(var(--height) * -1);
		width            : 100%;
		height           : 100%;
		border-radius    : 100%;
		background-color : var(--waive-color);
		opacity          : 0.2;
		transition       : width 300ms ease-in-out, height 300ms ease-in-out;
		z-index          : 1;
	}
	&:hover {
		:after {
			width  : calc(100% * (1 + ${Math.sqrt(2)}));
			height : calc(100% * (1 + ${Math.sqrt(2)}));
		}
	}
`;

export const PageHeader = (props: { title: string; onSettingsClicked?: () => void; }) => {
	const {title, onSettingsClicked, ...rest} = props;

	return <PageHeaderContainer {...rest}>
		<PageTitle>{title}</PageTitle>
		{onSettingsClicked
			? <SettingsButton tooltip={{label: 'Settings', alignment: TooltipAlignment.CENTER}}
			                  onClick={onSettingsClicked}>
				<FontAwesomeIcon icon={ICON_SETTINGS}/>
			</SettingsButton>
			: null}
	</PageHeaderContainer>;
};

export const PageHeaderHolderContainer = styled.div.attrs({'data-widget': 'page-header'})`
	display               : grid;
	grid-template-columns : auto 1fr;
	align-items           : center;
	min-height            : var(--page-header-height);
	border-bottom         : var(--border);
`;

export const PageHeaderHolder = (props: { children: ReactNode }) => {
	const {children} = props;
	return <PageHeaderHolderContainer>
		{children}
	</PageHeaderHolderContainer>;
};
