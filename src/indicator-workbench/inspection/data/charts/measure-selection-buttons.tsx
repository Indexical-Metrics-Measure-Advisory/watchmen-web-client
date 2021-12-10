import {ICON_ADD, ICON_BUCKET_ON, ICON_TIME_GROUPING} from '@/widgets/basic/constants';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useState} from 'react';
import {buildColumnIndexMap, isColumnIndexAssigned} from './chart-utils';
import {useInspectionChartsEventBus} from './inspection-charts-event-bus';
import {InspectionChartsEventTypes} from './inspection-charts-event-bus-types';
import {ChartParams} from './types';
import {ChartGroupButton, MeasureSelector} from './widgets/widgets';

interface MeasureSelection {
	timeGrouping: boolean;
	bucketOn: boolean;
	both: boolean;
}

export const MeasureSelectionButtons = (props: ChartParams) => {
	const {inspection, arithmetic} = props;

	const {fire} = useInspectionChartsEventBus();
	const [measureSelection, setMeasureSelection] = useState<MeasureSelection>({
		timeGrouping: false,
		bucketOn: false,
		both: true
	});

	const columnIndexMap = buildColumnIndexMap(inspection, arithmetic);
	const hasTimeGrouping = isColumnIndexAssigned(columnIndexMap.timeGrouping);
	const hasBucketOn = isColumnIndexAssigned(columnIndexMap.bucketOn);

	const onTimeGroupingSelectionClicked = () => {
		setMeasureSelection({
			...measureSelection,
			timeGrouping: !measureSelection.timeGrouping
		});
		fire(InspectionChartsEventTypes.TOGGLE_TIME_GROUPING_CHART, !measureSelection.timeGrouping);
	};
	const onBucketOnSelectionClicked = () => {
		setMeasureSelection({
			...measureSelection,
			bucketOn: !measureSelection.bucketOn
		});
		fire(InspectionChartsEventTypes.TOGGLE_BUCKET_ON_CHART, !measureSelection.bucketOn);
	};
	const onBothMeasureSelectionClicked = () => {
		setMeasureSelection({
			...measureSelection,
			both: !measureSelection.both
		});
		fire(InspectionChartsEventTypes.TOGGLE_BOTH_CHART, !measureSelection.both);
	};

	return hasTimeGrouping && hasBucketOn
		? <MeasureSelector>
			<ChartGroupButton onClick={onTimeGroupingSelectionClicked}
			                  data-selected={measureSelection.timeGrouping}>
				<FontAwesomeIcon icon={ICON_TIME_GROUPING}/>
			</ChartGroupButton>
			<ChartGroupButton onClick={onBucketOnSelectionClicked}
			                  data-selected={measureSelection.bucketOn}>
				<FontAwesomeIcon icon={ICON_BUCKET_ON}/>
			</ChartGroupButton>
			<ChartGroupButton onClick={onBothMeasureSelectionClicked} data-selected={measureSelection.both}>
				<FontAwesomeIcon icon={ICON_TIME_GROUPING}/>
				<FontAwesomeIcon icon={ICON_ADD}/>
				<FontAwesomeIcon icon={ICON_BUCKET_ON}/>
			</ChartGroupButton>
		</MeasureSelector>
		: null;
};
