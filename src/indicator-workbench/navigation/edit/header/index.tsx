import {Navigation} from '@/services/data/tuples/navigation-types';
import {PageHeaderButtons} from '@/widgets/basic/page-header-buttons';
import React from 'react';
import {BackToQueryButton} from './back-to-query';
import {NameEditor} from './name-editor';
import {NavigationEditPageHeaderContainer} from './widgets';

export const NavigationEditPageHeader = (props: { navigation: Navigation }) => {
	const {navigation} = props;

	return <NavigationEditPageHeaderContainer>
		<NameEditor navigation={navigation}/>
		<PageHeaderButtons>
			<BackToQueryButton/>
		</PageHeaderButtons>
	</NavigationEditPageHeaderContainer>;
};