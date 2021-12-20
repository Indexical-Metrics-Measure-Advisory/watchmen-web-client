import {Navigation} from '@/services/data/tuples/navigation-types';
import {noop} from '@/services/utils';
import {PageTitleEditor} from '@/widgets/basic/page-title-editor';
import {useForceUpdate} from '@/widgets/basic/utils';
import React from 'react';
import {useNavigationEventBus} from '../../navigation-event-bus';
import {NavigationEventTypes} from '../../navigation-event-bus-types';

export const NameEditor = (props: { navigation: Navigation }) => {
	const {navigation} = props;

	const {fire} = useNavigationEventBus();
	const forceUpdate = useForceUpdate();

	const onNameChange = async (name: string) => {
		navigation.name = name;
		forceUpdate();
	};
	const onNameChangeComplete = async (name: string) => {
		navigation.name = name.trim() || 'Noname Navigation';
		forceUpdate();
		fire(NavigationEventTypes.NAME_CHANGED, navigation, noop);
	};

	return <PageTitleEditor title={navigation.name}
	                        defaultTitle="Noname Navigation"
	                        onChange={onNameChange} onChangeComplete={onNameChangeComplete}/>;
};