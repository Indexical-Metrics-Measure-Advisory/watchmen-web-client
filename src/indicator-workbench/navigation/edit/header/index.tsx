import {Navigation} from '@/services/data/tuples/navigation-types';
import {PageHeaderButtons, PageHeaderButtonSeparator} from '@/widgets/basic/page-header-buttons';
import React from 'react';
import {BackToQueryButton} from './back-to-query';
import {NameEditor} from './name-editor';
import {SwitchIndicatorCandidatesButton} from './switch-indicator-candidates-button';
import {NavigationEditPageHeaderContainer} from './widgets';

export const NavigationEditPageHeader = (props: { navigation: Navigation }) => {
	const {navigation} = props;

	return <NavigationEditPageHeaderContainer>
		<NameEditor navigation={navigation}/>
		<PageHeaderButtons>
			<BackToQueryButton/>
			<PageHeaderButtonSeparator/>
			<SwitchIndicatorCandidatesButton navigation={navigation}/>
		</PageHeaderButtons>
	</NavigationEditPageHeaderContainer>;
};