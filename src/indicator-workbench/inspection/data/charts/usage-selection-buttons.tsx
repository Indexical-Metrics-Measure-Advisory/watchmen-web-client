import {ICON_ADD, ICON_BUCKET_ON, ICON_TIME_GROUPING} from '@/widgets/basic/constants';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useEffect, useState} from 'react';
import {useInspectionChartsEventBus} from './inspection-charts-event-bus';
import {InspectionChartsEventTypes} from './inspection-charts-event-bus-types';
import {ChartParams, ChartUsage} from './types';
import {buildChartUsages} from './utils';
import {ChartGroupButton, MeasureSelector} from './widgets/widgets';

interface Usages {
	selected: Array<ChartUsage>;
	all: Array<ChartUsage>;
}

export const UsageSelectionButtons = (props: ChartParams) => {
	const {inspection, arithmetic} = props;

	const {on, off, fire} = useInspectionChartsEventBus();
	const [usages, setUsages] = useState<Usages>(() => {
		const all = buildChartUsages(inspection, arithmetic);
		return {all, selected: [all[0]]};
	});
	const currentUsages = buildChartUsages(inspection, arithmetic);
	useEffect(() => {
		if (currentUsages.length !== usages.all.length || currentUsages.some(usage => !usages.all.includes(usage))) {
			// changed, reset state
			setUsages({
				all: currentUsages,
				selected: [currentUsages[0]]
			});
		}
		// run on each time
	}, [currentUsages, usages.all]);
	useEffect(() => {
		const onAskUsageUsed = (usage: ChartUsage, onData: (used: boolean) => void) => {
			onData(usages.selected.includes(usage));
		};
		on(InspectionChartsEventTypes.ASK_USAGE_USED, onAskUsageUsed);
		return () => {
			off(InspectionChartsEventTypes.ASK_USAGE_USED, onAskUsageUsed);
		};
	}, [on, off, usages.selected]);

	const isUsageSelected = (usage: ChartUsage) => usages.selected.includes(usage);
	const onUsageSelectionClicked = (usage: ChartUsage) => () => {
		const selected = isUsageSelected(usage);
		if (selected) {
			setUsages(usages => {
				return {all: usages.all, selected: usages.selected.filter(existing => existing !== usage)};
			});
		} else {
			setUsages(usages => {
				return {all: usages.all, selected: [...usages.selected, usage]};
			});
		}
		fire(InspectionChartsEventTypes.TOGGLE_CHART, inspection, usage, !selected);
	};

	return usages.all.length > 1
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
