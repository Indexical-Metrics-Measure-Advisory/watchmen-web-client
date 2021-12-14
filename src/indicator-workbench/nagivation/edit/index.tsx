import {Navigation} from '@/services/data/tuples/navigation-types';
import {FixWidthPage} from '@/widgets/basic/page';
import {PageHeader} from '@/widgets/basic/page-header';
import React from 'react';

export const NavigationEdit = (props: { navigation: Navigation }) => {
	const {navigation} = props;

	return <FixWidthPage maxWidth="80%">
		<PageHeader title={navigation.name || 'Noname'}/>
	</FixWidthPage>;
};