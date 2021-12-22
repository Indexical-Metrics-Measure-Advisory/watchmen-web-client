import {isEnumMeasureBucket, isMeasureBucket} from '@/services/data/tuples/bucket-utils';
import {Factor} from '@/services/data/tuples/factor-types';
import {Indicator} from '@/services/data/tuples/indicator-types';
import {isTimePeriodMeasure, tryToTransformToMeasures} from '@/services/data/tuples/indicator-utils';
import {Navigation, NavigationIndicator} from '@/services/data/tuples/navigation-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {useEffect} from 'react';
import {v4} from 'uuid';
import {useNavigationEditEventBus} from '../navigation-edit-event-bus';
import {NavigationEditEventTypes} from '../navigation-edit-event-bus-types';
import {IndicatorCriteriaDefData} from '../types';
import {Expandable, useIndicatorPartExpandable} from '../use-indicator-part-expandable';
import {IndicatorCriteriaEditor} from './indicator-criteria-editor';
import {IndicatorNameEditor} from './indicator-name-editor';
import {IndicatorCriteriaEditContentContainer} from './widgets';

export const IndicatorCriteriaEditContent = (props: {
	navigation: Navigation;
	navigationIndicator: NavigationIndicator;
	indicator: Indicator;
	defData: IndicatorCriteriaDefData;
}) => {
	const {navigation, navigationIndicator, indicator, defData} = props;

	const {on: onEdit, off: offEdit} = useNavigationEditEventBus();
	const {containerRef, expanded} = useIndicatorPartExpandable({
		navigation,
		navigationIndicator,
		expandable: Expandable.CRITERIA
	});
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

	return <IndicatorCriteriaEditContentContainer expanded={expanded} ref={containerRef}>
		<IndicatorNameEditor navigation={navigation} navigationIndicator={navigationIndicator}/>
		{displayCriteria.map(criteria => {
			return <IndicatorCriteriaEditor navigation={navigation} navigationIndicator={navigationIndicator}
			                                criteria={criteria}
			                                indicator={indicator} factorCandidates={criteriaFactorOptions}
			                                defData={defData}
			                                key={v4()}/>;
		})}
	</IndicatorCriteriaEditContentContainer>;
};