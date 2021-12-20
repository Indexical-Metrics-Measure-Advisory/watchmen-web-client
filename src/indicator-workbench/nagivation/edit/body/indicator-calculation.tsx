import {Indicator} from '@/services/data/tuples/indicator-types';
import {fetchNavigationIndicatorData} from '@/services/data/tuples/navigation';
import {Navigation, NavigationIndicator} from '@/services/data/tuples/navigation-types';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {useEffect, useState} from 'react';
import {IndicatorCriteriaDefData} from './types';
import {IndicatorCalculationNode, IndicatorPartRelationLine} from './widgets';

interface Values {
	loaded: boolean;
	current?: number;
	previous?: number;
}

const isReadyToCalculation = (navigationIndicator: NavigationIndicator, defData: IndicatorCriteriaDefData): boolean => {
	if (!defData.loaded) {
		return false;
	}

	if (defData.loaded && defData.topic == null) {
		return false;
	}

	if ((navigationIndicator.criteria || []).length === 0) {
		return false;
	}

	return true;
};

export const IndicatorCalculation = (props: {
	navigation: Navigation;
	navigationIndicator: NavigationIndicator;
	indicator: Indicator;
	defData: IndicatorCriteriaDefData;
}) => {
	const {navigation, navigationIndicator, indicator, defData} = props;

	const {fire: fireGlobal} = useEventBus();
	const [values, setValues] = useState<Values>({loaded: false});
	useEffect(() => {
		if (!isReadyToCalculation(navigationIndicator, defData)) {
			return;
		}
		fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
			async () => await fetchNavigationIndicatorData(navigationIndicator, navigationIndicator),
			({current, previous}) => {
				setValues({loaded: true, current, previous});
			}, () => {
				setValues({loaded: true});
			});
	}, [fireGlobal, navigation, navigationIndicator, defData, defData.loaded, defData.topic]);

	if (!isReadyToCalculation(navigationIndicator, defData)) {
		return null;
	}

	return <>
		<IndicatorPartRelationLine/>
		<IndicatorCalculationNode>

		</IndicatorCalculationNode>
	</>;
};