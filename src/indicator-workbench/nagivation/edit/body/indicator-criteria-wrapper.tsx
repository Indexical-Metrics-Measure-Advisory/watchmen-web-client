import {isEnumMeasureBucket, isMeasureBucket} from '@/services/data/tuples/bucket-utils';
import {Factor} from '@/services/data/tuples/factor-types';
import {Indicator} from '@/services/data/tuples/indicator-types';
import {isTimePeriodMeasure, tryToTransformToMeasures} from '@/services/data/tuples/indicator-utils';
import {Navigation, NavigationIndicator} from '@/services/data/tuples/navigation-types';
import {useCollapseFixedThing, useForceUpdate} from '@/widgets/basic/utils';
import {useEffect, useRef, useState} from 'react';
import {v4} from 'uuid';
import {IndicatorCriteriaEditor} from './indicator-criteria-editor';
import {useNavigationEditEventBus} from './navigation-edit-event-bus';
import {NavigationEditEventTypes} from './navigation-edit-event-bus-types';
import {IndicatorCriteriaDefData} from './types';
import {IndicatorCriteriaContent} from './widgets';

export const IndicatorCriteriaWrapper = (props: {
	navigation: Navigation;
	navigationIndicator: NavigationIndicator;
	indicator: Indicator;
	defData: IndicatorCriteriaDefData;
}) => {
	const {navigation, navigationIndicator, indicator, defData} = props;

	const containerRef = useRef<HTMLDivElement>(null);
	const {on: onEdit, off: offEdit, fire: fireEdit} = useNavigationEditEventBus();
	const [expanded, setExpanded] = useState(false);
	useCollapseFixedThing({containerRef, visible: expanded, hide: () => setExpanded(false)});
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onIndicatorCriteriaChanged = (aNavigation: Navigation, aNavigationIndicator: NavigationIndicator) => {
			if (aNavigation !== navigation || aNavigationIndicator !== navigationIndicator) {
				return;
			}
			forceUpdate();
		};
		onEdit(NavigationEditEventTypes.INDICATOR_CRITERIA_ADDED, onIndicatorCriteriaChanged);
		onEdit(NavigationEditEventTypes.INDICATOR_CRITERIA_REMOVED, onIndicatorCriteriaChanged);
		return () => {
			offEdit(NavigationEditEventTypes.INDICATOR_CRITERIA_ADDED, onIndicatorCriteriaChanged);
			offEdit(NavigationEditEventTypes.INDICATOR_CRITERIA_REMOVED, onIndicatorCriteriaChanged);
		};
	});
	useEffect(() => {
		const onExpandCriteria = (aNavigation: Navigation, aNavigationIndicator: NavigationIndicator) => {
			if (aNavigation !== navigation || aNavigationIndicator !== navigationIndicator) {
				return;
			}
			setExpanded(true);
			fireEdit(NavigationEditEventTypes.CRITERIA_EXPANDED, navigation, navigationIndicator);
		};
		onEdit(NavigationEditEventTypes.EXPAND_CRITERIA, onExpandCriteria);
		return () => {
			offEdit(NavigationEditEventTypes.EXPAND_CRITERIA, onExpandCriteria);
		};
	}, [onEdit, offEdit, fireEdit, navigation, navigationIndicator]);
	useEffect(() => {
		const onCriteriaExpanded = (aNavigation: Navigation, aNavigationIndicator: NavigationIndicator) => {
			if (aNavigation !== navigation) {
				return;
			}
			if (aNavigationIndicator !== navigationIndicator) {
				setExpanded(false);
			}
		};
		onEdit(NavigationEditEventTypes.CRITERIA_EXPANDED, onCriteriaExpanded);
		return () => {
			offEdit(NavigationEditEventTypes.CRITERIA_EXPANDED, onCriteriaExpanded);
		};
	}, [onEdit, offEdit, navigation, navigationIndicator]);

	const criteria = (navigationIndicator.criteria || []);
	const displayCriteria = [...criteria, {}];

	// factors which defined as buckets in indicator and factors which has time measure
	// can be used as navigation indicator criteria
	const isFactorSupported = (factor: Factor): boolean => {
		const measures = tryToTransformToMeasures(factor);
		if (measures.some(isTimePeriodMeasure)) {
			return true;
		}
		// eslint-disable-next-line
		if (factor.enumId != null && defData.measureBuckets.some(bucket => isEnumMeasureBucket(bucket) && bucket.enumId == factor.enumId)) {
			// enumeration factor, matches enumeration bucket
			return true;
		} else {
			// not an enumeration factor, at least one bucket is matched
			return factor.enumId == null && defData.measureBuckets.some(bucket => isMeasureBucket(bucket) && measures.includes(bucket.measure));
		}
	};

	const criteriaFactorOptions = (defData.topic?.factors || []).filter(factor => {
		// eslint-disable-next-line
		return indicator.factorId == factor.factorId || isFactorSupported(factor);
	}).sort((f1, f2) => {
		return (f1.label || f1.name || '').localeCompare(f2.label || f2.name || '', void 0, {
			sensitivity: 'base',
			caseFirst: 'upper'
		});
	}).map(factor => {
		return {
			value: factor.factorId,
			label: factor.label || factor.name || 'Noname Factor'
		};
	});

	return <IndicatorCriteriaContent expanded={expanded} ref={containerRef}>
		{displayCriteria.map((criteria, index) => {
			return <IndicatorCriteriaEditor navigation={navigation} navigationIndicator={navigationIndicator}
			                                criteria={criteria}
			                                indicator={indicator} factorCandidates={criteriaFactorOptions}
			                                defData={defData}
			                                index={index} key={v4()}/>;
		})}
	</IndicatorCriteriaContent>;
};