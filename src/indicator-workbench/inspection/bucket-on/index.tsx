import {BucketId} from '@/services/data/tuples/bucket-types';
import {Inspection, InspectMeasureOn} from '@/services/data/tuples/inspection-types';
import {QueryBucket} from '@/services/data/tuples/query-bucket-types';
import {ICON_LOADING} from '@/widgets/basic/constants';
import {DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useEffect, useState} from 'react';
import {useInspectionEventBus} from '../inspection-event-bus';
import {IndicatorForInspection, InspectionEventTypes} from '../inspection-event-bus-types';
import {InspectionLabel, LoadingLabel} from '../widgets';
import {buildBucketOptions, buildBucketsAskingParams, buildMeasureOnOptions} from './utils';
import {BucketOnContainer, BucketOnDropdown} from './widgets';

interface Buckets {
	loaded: boolean;
	data: Array<QueryBucket>;
}

export const BucketOn = () => {
	const {on, off, fire} = useInspectionEventBus();
	const [visible, setVisible] = useState(false);
	const [inspection, setInspection] = useState<Inspection | null>(null);
	const [indicator, setIndicator] = useState<IndicatorForInspection | null>(null);
	const [buckets, setBuckets] = useState<Buckets>({loaded: false, data: []});
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const askBuckets = async ({indicator, topic}: IndicatorForInspection): Promise<Array<QueryBucket>> => {
			return new Promise(resolve => {
				fire(InspectionEventTypes.ASK_BUCKETS, buildBucketsAskingParams(indicator, topic), (buckets: Array<QueryBucket>) => {
					resolve(buckets);
				});
			});
		};
		const loadBuckets = async (indicator: IndicatorForInspection) => {
			const buckets = await askBuckets(indicator);
			setBuckets({loaded: true, data: buckets});
		};
		const onIndicatorPicked = async (indicator: IndicatorForInspection) => {
			setIndicator(indicator);
			setVisible(true);
			await loadBuckets(indicator);
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

	if (!buckets.loaded) {
		return <BucketOnContainer>
			<InspectionLabel>{Lang.INDICATOR_WORKBENCH.INSPECTION.SELECT_BUCKETING_ON_LABEL}</InspectionLabel>
			<LoadingLabel>
				<FontAwesomeIcon icon={ICON_LOADING} spin={true}/>
				<span>{Lang.PLAIN.LOADING}</span>
			</LoadingLabel>
		</BucketOnContainer>;
	}

	const onMeasureOnChange = (option: DropdownOption) => {
		if (option.value === InspectMeasureOn.VALUE) {
			if (inspection?.measureOn === InspectMeasureOn.VALUE) {
				return;
			}
			delete inspection?.measureOnFactorId;
			inspection!.measureOn = InspectMeasureOn.VALUE;
			delete inspection?.measureOnBucketId;
		} else {
			// eslint-disable-next-line
			if (inspection?.measureOn === InspectMeasureOn.OTHER && inspection.measureOnFactorId == option.value) {
				return;
			}
			inspection!.measureOnFactorId = option.value;
			inspection!.measureOn = InspectMeasureOn.OTHER;
			delete inspection?.measureOnBucketId;
		}
		forceUpdate();
	};
	const onBucketChange = (option: DropdownOption) => {
		inspection!.measureOnBucketId = option.value as BucketId;
		forceUpdate();
	};

	const measureOnOptions = buildMeasureOnOptions(indicator!.indicator, indicator!.topic, buckets.data);
	const measureOn = inspection?.measureOn === InspectMeasureOn.VALUE ? InspectMeasureOn.VALUE : inspection?.measureOnFactorId;
	const bucketOptions = buildBucketOptions(inspection!, indicator!.topic, buckets.data);

	return <BucketOnContainer>
		<InspectionLabel>{Lang.INDICATOR_WORKBENCH.INSPECTION.SELECT_BUCKETING_ON_LABEL}</InspectionLabel>
		<BucketOnDropdown value={measureOn} options={measureOnOptions} onChange={onMeasureOnChange}
		                  please={Lang.PLAIN.DROPDOWN_PLACEHOLDER}/>
		<BucketOnDropdown value={inspection?.measureOnBucketId} options={bucketOptions.options} onChange={onBucketChange}
		                  please={bucketOptions.available ? Lang.PLAIN.DROPDOWN_PLACEHOLDER : Lang.INDICATOR_WORKBENCH.INSPECTION.SELECT_MEASURE_ON_FIRST}/>
	</BucketOnContainer>;
};