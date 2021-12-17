import {Bucket} from '@/services/data/tuples/bucket-types';
import {isEnumMeasureBucket, isMeasureBucket} from '@/services/data/tuples/bucket-utils';
import {Factor, FactorId} from '@/services/data/tuples/factor-types';
import {Indicator, MeasureMethod} from '@/services/data/tuples/indicator-types';
import {isTimePeriodMeasure, tryToTransformToMeasures} from '@/services/data/tuples/indicator-utils';
import {Navigation, NavigationIndicator, NavigationIndicatorCriteria} from '@/services/data/tuples/navigation-types';
import {QueryByBucketMethod, QueryByEnumMethod, QueryByMeasureMethod} from '@/services/data/tuples/query-bucket-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {noop} from '@/services/utils';
import {Dropdown} from '@/widgets/basic/dropdown';
import {DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {Fragment, useEffect, useState} from 'react';
import {v4} from 'uuid';
import {useNavigationEventBus} from '../../navigation-event-bus';
import {NavigationEventTypes} from '../../navigation-event-bus-types';
import {useNavigationEditEventBus} from './navigation-edit-event-bus';
import {NavigationEditEventTypes} from './navigation-edit-event-bus-types';
import {
	IndicatorCalculationNode,
	IndicatorCriteriaContent,
	IndicatorCriteriaFactor,
	IndicatorCriteriaIndex,
	IndicatorCriteriaNode,
	IndicatorPartRelationLine
} from './widgets';

interface DefData {
	loaded: boolean;
	topic?: Topic;
	valueBuckets: Array<Bucket>;
	measureBuckets: Array<Bucket>;
}

const MissedTopic = (props: { topic?: Topic }) => {
	const {topic} = props;

	if (topic != null) {
		return null;
	}

	return <>
		{Lang.INDICATOR_WORKBENCH.NAVIGATION.MISSED_INDICATOR_TOPIC}
	</>;
};

const ExpressionCountLabel = (props: { navigationIndicator: NavigationIndicator, topic?: Topic }) => {
	const {navigationIndicator: {criteria = []}, topic} = props;

	if (topic == null) {
		return null;
	}

	if (criteria.length === 0) {
		return <>
			{Lang.INDICATOR_WORKBENCH.NAVIGATION.NO_INDICATOR_CRITERIA_DEFINED}
		</>;
	} else {
		return <span>
			{criteria.length} {Lang.INDICATOR_WORKBENCH.NAVIGATION.INDICATOR_CRITERIA_DEFINED}
		</span>;
	}
};

export const NavigationIndicatorContent = (props: {
	navigation: Navigation;
	navigationIndicator: NavigationIndicator;
	indicator: Indicator;
}) => {
	const {navigation, navigationIndicator, indicator} = props;

	const {fire} = useNavigationEventBus();
	const {on: onEdit, off: offEdit, fire: fireEdit} = useNavigationEditEventBus();
	const [expanded, setExpanded] = useState(false);
	const [defData, setDefData] = useState<DefData>({loaded: false, valueBuckets: [], measureBuckets: []});
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		(async () => {
			const [topic, valueBuckets] = await Promise.all([
				new Promise<Topic | undefined>(resolve => {
					fire(NavigationEventTypes.ASK_TOPIC, indicator.topicId, (topic?: Topic) => {
						resolve(topic);
					});
				}),
				new Promise<Array<Bucket>>(resolve => {
					fire(NavigationEventTypes.ASK_VALUE_BUCKETS, indicator.valueBuckets || [], (buckets: Array<Bucket>) => {
						resolve(buckets);
					});
				})
			]);
			if (topic != null) {
				fire(NavigationEventTypes.ASK_MEASURE_BUCKETS, (topic.factors || []).reduce((measures, factor) => {
					tryToTransformToMeasures(factor).forEach(method => {
						if (method !== MeasureMethod.ENUM) {
							measures.push({method} as QueryByMeasureMethod);
						} else if (factor.enumId != null) {
							measures.push({enumId: factor.enumId, method: MeasureMethod.ENUM} as QueryByEnumMethod);
						}
					});
					return measures;
				}, [] as Array<QueryByBucketMethod>), (buckets: Array<Bucket>) => {
					setDefData({loaded: true, topic, valueBuckets, measureBuckets: buckets});
				});
			} else {
				setDefData({loaded: true, topic, valueBuckets, measureBuckets: []});
			}
		})();
	}, [fire, indicator]);
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

	if (!defData.loaded) {
		return <>
			<IndicatorPartRelationLine/>
			<IndicatorCriteriaNode>
				Loading...
			</IndicatorCriteriaNode>
		</>;
	}

	const onMouseEnter = () => {
		setExpanded(true);
		fireEdit(NavigationEditEventTypes.CRITERIA_EXPANDED, navigation, navigationIndicator);
	};
	// const onCloseCriteriaContent = () => setExpanded(false);
	const onCriteriaFactorChanged = (criteria: NavigationIndicatorCriteria) => (option: DropdownOption) => {
		criteria.factorId = option.value as FactorId;
		if (navigationIndicator.criteria == null) {
			navigationIndicator.criteria = [];
		}
		if (!navigationIndicator.criteria.includes(criteria)) {
			navigationIndicator.criteria.push(criteria);
		}
		fire(NavigationEventTypes.SAVE_NAVIGATION, navigation, noop);
		forceUpdate();
	};

	const error = defData.loaded && defData.topic == null;
	const criteria = (navigationIndicator.criteria || []);
	const warn = criteria.length === 0;

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

	return <>
		<IndicatorPartRelationLine/>
		<IndicatorCriteriaNode error={error} warn={warn} onMouseEnter={onMouseEnter}>
			<MissedTopic topic={defData.topic}/>
			<ExpressionCountLabel navigationIndicator={navigationIndicator} topic={defData.topic}/>
			<IndicatorCriteriaContent expanded={expanded}>
				{displayCriteria.map((criteria, index) => {
					return <Fragment key={v4()}>
						<IndicatorCriteriaIndex>{index + 1}</IndicatorCriteriaIndex>
						<IndicatorCriteriaFactor>
							<Dropdown value={criteria.factorId} options={criteriaFactorOptions}
							          onChange={onCriteriaFactorChanged(criteria)}
							          please={Lang.INDICATOR_WORKBENCH.NAVIGATION.PLEASE_SELECT_CRITERIA_FACTOR}/>
						</IndicatorCriteriaFactor>
					</Fragment>;
				})}
			</IndicatorCriteriaContent>
		</IndicatorCriteriaNode>
		{error || warn
			? null
			: <>
				<IndicatorPartRelationLine/>
				<IndicatorCalculationNode>

				</IndicatorCalculationNode>
			</>}
	</>;
};