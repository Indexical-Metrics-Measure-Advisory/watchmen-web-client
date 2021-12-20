import {Bucket} from '@/services/data/tuples/bucket-types';
import {Indicator, MeasureMethod} from '@/services/data/tuples/indicator-types';
import {tryToTransformToMeasures} from '@/services/data/tuples/indicator-utils';
import {Navigation, NavigationIndicator} from '@/services/data/tuples/navigation-types';
import {QueryByBucketMethod, QueryByEnumMethod, QueryByMeasureMethod} from '@/services/data/tuples/query-bucket-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {useEffect, useState} from 'react';
import {useNavigationEventBus} from '../../navigation-event-bus';
import {NavigationEventTypes} from '../../navigation-event-bus-types';
import {IndicatorCriteriaWrapper} from './indicator-criteria-wrapper';
import {useNavigationEditEventBus} from './navigation-edit-event-bus';
import {NavigationEditEventTypes} from './navigation-edit-event-bus-types';
import {IndicatorCriteriaDefData} from './types';
import {IndicatorCalculationNode, IndicatorCriteriaNode, IndicatorPartRelationLine} from './widgets';

const MissedTopic = (props: { topic?: Topic }) => {
	const {topic} = props;

	if (topic != null) {
		return null;
	}

	return <>
		{Lang.INDICATOR_WORKBENCH.NAVIGATION.MISSED_INDICATOR_TOPIC}
	</>;
};

const ExpressionCountLabel = (props: {
	navigation: Navigation;
	navigationIndicator: NavigationIndicator;
	topic?: Topic;
}) => {
	const {navigation, navigationIndicator, topic} = props;
	const {criteria = []} = navigationIndicator;

	const {on, off} = useNavigationEditEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onIndicatorCriteriaAdded = (aNavigation: Navigation, aNavigationIndicator: NavigationIndicator) => {
			if (aNavigation !== navigation || aNavigationIndicator !== navigationIndicator) {
				return;
			}
			forceUpdate();
		};
		on(NavigationEditEventTypes.INDICATOR_CRITERIA_ADDED, onIndicatorCriteriaAdded);
		return () => {
			off(NavigationEditEventTypes.INDICATOR_CRITERIA_ADDED, onIndicatorCriteriaAdded);
		};
	}, [on, off, forceUpdate, navigation, navigationIndicator]);

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
	const {fire: fireEdit} = useNavigationEditEventBus();
	const [defData, setDefData] = useState<IndicatorCriteriaDefData>({
		loaded: false,
		valueBuckets: [],
		measureBuckets: []
	});
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

	if (!defData.loaded) {
		return <>
			<IndicatorPartRelationLine/>
			<IndicatorCriteriaNode>
				{Lang.INDICATOR_WORKBENCH.NAVIGATION.LOADING_CRITERIA_DEF}
			</IndicatorCriteriaNode>
		</>;
	}

	const onMouseEnter = () => {
		fireEdit(NavigationEditEventTypes.EXPAND_CRITERIA, navigation, navigationIndicator);
	};

	const error = defData.loaded && defData.topic == null;
	const criteria = (navigationIndicator.criteria || []);
	const warn = criteria.length === 0;

	return <>
		<IndicatorPartRelationLine/>
		<IndicatorCriteriaNode error={error} warn={warn} onMouseEnter={onMouseEnter}>
			<MissedTopic topic={defData.topic}/>
			<ExpressionCountLabel navigation={navigation} navigationIndicator={navigationIndicator}
			                      topic={defData.topic}/>
			<IndicatorCriteriaWrapper navigation={navigation} navigationIndicator={navigationIndicator}
			                          indicator={indicator}
			                          defData={defData}/>
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