import {ICON_ADD, ICON_BUCKET_ON, ICON_TIME_GROUPING} from '@/widgets/basic/constants';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useEffect, useState} from 'react';
import {buildChartUsages} from './chart-utils';
import {useInspectionChartsEventBus} from './inspection-charts-event-bus';
import {InspectionChartsEventTypes} from './inspection-charts-event-bus-types';
import {ChartParams, ChartUsage} from './types';
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
		// must register event listener here, otherwise cannot reply the correct status
		// when register listener in next lifecycle loop, outdated selected usages will be responded to asker
		// seems lifecycle as below,
		// 1. render UsageSelectionButtons (in lifecycle loop #1),
		// 2. check currentUsages and state usages, if they are different, reset usages state (also in lifecycle loop #1).
		//      in this case, the ASK_USAGE_USED event listener will be re-registered in next lifecycle loop (#2)
		// 3. render Chart (in lifecycle loop #1)
		// 4. after chart rendered, fire ASK_USAGE_USED event (in lifecycle loop #1)
		//     in this case, the listener still is not re-registered yet, which means selected usages is outdated
		// 5. do re-registered event listener (in lifecycle loop #2), selected usages updated.
		// when inspection configuration data is changed, UsageSelectionButtons and all Chart component will be updated,
		// selected usages will be reset because of measures changed,
		// it will lead the lifecycle as above, which means event listener must be registered here.
		if (currentUsages.length !== usages.all.length || currentUsages.some(usage => !usages.all.includes(usage))) {
			// changed, reset state
			const onAskUsageUsed = (usage: ChartUsage, onData: (used: boolean) => void) => {
				onData(currentUsages[0] === usage);
			};
			on(InspectionChartsEventTypes.ASK_USAGE_USED, onAskUsageUsed);
			setUsages({
				all: currentUsages,
				selected: [currentUsages[0]]
			});
			return () => {
				off(InspectionChartsEventTypes.ASK_USAGE_USED, onAskUsageUsed);
			};
		} else {
			// not changed
			const onAskUsageUsed = (usage: ChartUsage, onData: (used: boolean) => void) => {
				onData(usages.selected.includes(usage));
			};
			on(InspectionChartsEventTypes.ASK_USAGE_USED, onAskUsageUsed);
			return () => {
				off(InspectionChartsEventTypes.ASK_USAGE_USED, onAskUsageUsed);
			};
		}
		// run on each time
	}, [on, off, currentUsages, usages]);

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
