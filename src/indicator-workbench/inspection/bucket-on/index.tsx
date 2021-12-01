import {BucketId} from '@/services/data/tuples/bucket-types';
import {Inspection, InspectMeasureOn} from '@/services/data/tuples/inspection-types';
import {QueryBucket} from '@/services/data/tuples/query-bucket-types';
import {DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {useEffect, useState} from 'react';
import {useInspectionEventBus} from '../inspection-event-bus';
import {IndicatorForInspection, InspectionEventTypes} from '../inspection-event-bus-types';
import {InspectionLabel} from '../widgets';
import {buildBucketOptions, buildBucketsAskingParams, buildMeasureOnOptions} from './utils';
import {InspectOnDropdown, GroupByContainer} from './widgets';

export const BucketOn = () => {
	const {on, off, fire} = useInspectionEventBus();
	const [visible, setVisible] = useState(false);
	const [inspection, setInspection] = useState<Inspection | null>(null);
	const [indicator, setIndicator] = useState<IndicatorForInspection | null>(null);
	const [buckets, setBuckets] = useState<Array<QueryBucket>>([]);
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const askBuckets = async ({indicator, topic}: IndicatorForInspection): Promise<Array<QueryBucket>> => {
			return new Promise(resolve => {
				fire(InspectionEventTypes.ASK_BUCKETS, buildBucketsAskingParams(indicator, topic), (buckets: Array<QueryBucket>) => {
					resolve(buckets);
				});
			});
		};
		const onIndicatorPicked = async (indicator: IndicatorForInspection) => {
			const buckets = await askBuckets(indicator!);
			setIndicator(indicator);
			setBuckets(buckets);
			setVisible(true);
		};
		const onInspectionPicked = async (inspection: Inspection, indicator?: IndicatorForInspection) => {
			setInspection(inspection);
			if (inspection.indicatorId != null) {
				await onIndicatorPicked(indicator!);
			}
		};
		on(InspectionEventTypes.INDICATOR_PICKED, onIndicatorPicked);
		on(InspectionEventTypes.INSPECTION_PICKED, onInspectionPicked);
		return () => {
			off(InspectionEventTypes.INDICATOR_PICKED, onIndicatorPicked);
			off(InspectionEventTypes.INSPECTION_PICKED, onInspectionPicked);
		};
	}, [on, off, fire]);

	if (!visible) {
		return null;
	}

	const onMeasureOnChange = (option: DropdownOption) => {
		if (option.value === InspectMeasureOn.VALUE) {
			if (inspection?.measureOn === InspectMeasureOn.VALUE) {
				return;
			}
			delete inspection?.measureFactorId;
			inspection!.measureOn = InspectMeasureOn.VALUE;
			delete inspection?.bucketId;
		} else {
			// eslint-disable-next-line
			if (inspection?.measureOn === InspectMeasureOn.OTHER && inspection.measureFactorId == option.value) {
				return;
			}
			inspection!.measureFactorId = option.value;
			inspection!.measureOn = InspectMeasureOn.OTHER;
			delete inspection?.bucketId;
		}
		forceUpdate();
	};
	const onBucketChange = (option: DropdownOption) => {
		inspection!.bucketId = option.value as BucketId;
		forceUpdate();
	};

	const measureOnOptions = buildMeasureOnOptions(indicator!.indicator, indicator!.topic, buckets);
	const measureOn = inspection?.measureOn === InspectMeasureOn.VALUE ? InspectMeasureOn.VALUE : inspection?.measureFactorId;
	const bucketOptions = buildBucketOptions(inspection!, indicator!.topic, buckets);

	return <GroupByContainer>
		<InspectionLabel>{Lang.INDICATOR_WORKBENCH.INSPECTION.SELECT_BUCKETING_ON_LABEL}</InspectionLabel>
		<InspectOnDropdown value={measureOn} options={measureOnOptions} onChange={onMeasureOnChange}
		                   please={Lang.PLAIN.DROPDOWN_PLACEHOLDER}/>
		<InspectOnDropdown value={inspection?.bucketId} options={bucketOptions.options} onChange={onBucketChange}
		                   please={bucketOptions.available ? Lang.PLAIN.DROPDOWN_PLACEHOLDER : Lang.INDICATOR_WORKBENCH.INSPECTION.SELECT_MEASURE_ON_FIRST}/>
	</GroupByContainer>;
};