import {Bucket} from '@/services/data/tuples/bucket-types';
import {Indicator, MeasureMethod} from '@/services/data/tuples/indicator-types';
import {tryToTransformToMeasures} from '@/services/data/tuples/indicator-utils';
import {Navigation, NavigationIndicator} from '@/services/data/tuples/navigation-types';
import {QueryByBucketMethod, QueryByEnumMethod, QueryByMeasureMethod} from '@/services/data/tuples/query-bucket-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {useEffect, useState} from 'react';
import {useNavigationEventBus} from '../../../navigation-event-bus';
import {NavigationEventTypes} from '../../../navigation-event-bus-types';
import {IndicatorCalculation} from '../indicator-calculation';
import {IndicatorCriteria} from '../indicator-criteria';
import {IndicatorCriteriaDefData} from '../types';

export const IndicatorContent = (props: {
	navigation: Navigation;
	navigationIndicator: NavigationIndicator;
	indicator: Indicator;
	id: string;
}) => {
	const {navigation, navigationIndicator, indicator, id} = props;

	const {fire} = useNavigationEventBus();
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

	return <>
		<IndicatorCriteria navigation={navigation} navigationIndicator={navigationIndicator}
		                   indicator={indicator}
		                   defData={defData}/>
		{defData.loaded
			? <IndicatorCalculation id={id} navigation={navigation} navigationIndicator={navigationIndicator}
			                        indicator={indicator}
			                        defData={defData}/>
			: null}
	</>;
};