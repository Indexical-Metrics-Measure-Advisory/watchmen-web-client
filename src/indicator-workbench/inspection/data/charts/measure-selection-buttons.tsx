import {ICON_ADD, ICON_BUCKET_ON, ICON_TIME_GROUPING} from '@/widgets/basic/constants';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useState} from 'react';
import {useInspectionChartsEventBus} from './inspection-charts-event-bus';
import {InspectionChartsEventTypes} from './inspection-charts-event-bus-types';
import {ChartParams, ChartUsage} from './types';
import {buildChartUsages} from './utils';
import {ChartGroupButton, MeasureSelector} from './widgets/widgets';

export const MeasureSelectionButtons = (props: ChartParams) => {
	const {inspection, arithmetic} = props;

	const {fire} = useInspectionChartsEventBus();
	const [selectedUsages, setSelectedUsages] = useState<Array<ChartUsage>>(() => {
		const usages = buildChartUsages(inspection, arithmetic);
		if (usages.length === 1) {
			return usages;
		} else {
			return [usages[0]];
		}
	});

	const isUsageSelected = (usage: ChartUsage) => selectedUsages.includes(usage);
	const onUsageSelectionClicked = (usage: ChartUsage) => () => {
		const selected = isUsageSelected(usage);
		if (selected) {
			setSelectedUsages(selectedUsages.filter(existing => existing !== usage));
		} else {
			setSelectedUsages([...selectedUsages, usage]);
		}
		fire(InspectionChartsEventTypes.TOGGLE_CHART, inspection, usage, !selected);
	};

	const usages = buildChartUsages(inspection, arithmetic);

	return usages.length > 1
		? <MeasureSelector>
			<ChartGroupButton onClick={onUsageSelectionClicked(ChartUsage.TIME_GROUPING)}
			                  data-selected={isUsageSelected(ChartUsage.TIME_GROUPING)}>
				<FontAwesomeIcon icon={ICON_TIME_GROUPING}/>
			</ChartGroupButton>
			<ChartGroupButton onClick={onUsageSelectionClicked(ChartUsage.BUCKET_ON)}
			                  data-selected={isUsageSelected(ChartUsage.BUCKET_ON)}>
				<FontAwesomeIcon icon={ICON_BUCKET_ON}/>
			</ChartGroupButton>
			<ChartGroupButton onClick={onUsageSelectionClicked(ChartUsage.BOTH)}
			                  data-selected={isUsageSelected(ChartUsage.BOTH)}>
				<FontAwesomeIcon icon={ICON_TIME_GROUPING}/>
				<FontAwesomeIcon icon={ICON_ADD}/>
				<FontAwesomeIcon icon={ICON_BUCKET_ON}/>
			</ChartGroupButton>
		</MeasureSelector>
		: null;
};
