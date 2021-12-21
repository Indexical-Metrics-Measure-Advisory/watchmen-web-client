import {Navigation, NavigationIndicator} from '@/services/data/tuples/navigation-types';
import {noop} from '@/services/utils';
import {Input} from '@/widgets/basic/input';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {ChangeEvent} from 'react';
import {useNavigationEventBus} from '../../../navigation-event-bus';
import {NavigationEventTypes} from '../../../navigation-event-bus-types';
import {useNavigationEditEventBus} from '../navigation-edit-event-bus';
import {NavigationEditEventTypes} from '../navigation-edit-event-bus-types';
import {IndicatorName} from './widgets';

export const IndicatorNameEditor = (props: {
	navigation: Navigation;
	navigationIndicator: NavigationIndicator;
}) => {
	const {navigation, navigationIndicator} = props;

	const {fire} = useNavigationEventBus();
	const {fire: fireEdit} = useNavigationEditEventBus();
	const forceUpdate = useForceUpdate();

	const onNameChanged = (event: ChangeEvent<HTMLInputElement>) => {
		navigationIndicator.name = event.target.value;
		fireEdit(NavigationEditEventTypes.INDICATOR_NAME_CHANGED, navigation, navigationIndicator);
		fire(NavigationEventTypes.SAVE_NAVIGATION, navigation, noop);
		forceUpdate();
	};

	return <IndicatorName>
		<span>{Lang.INDICATOR_WORKBENCH.NAVIGATION.INDICATOR_NAME}</span>
		<Input value={navigationIndicator.name ?? ''} onChange={onNameChanged}/>
	</IndicatorName>;
};