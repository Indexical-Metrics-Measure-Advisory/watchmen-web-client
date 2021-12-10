import {Inspection} from '@/services/data/tuples/inspection-types';
import {ICON_CHART_BAR, ICON_CHART_LINE, ICON_CHART_PIE} from '@/widgets/basic/constants';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useEffect, useState} from 'react';
import {barBuild, lineBuild} from './bar-and-line';
import {rebuildParams} from './chart-utils';
import {useInspectionChartsEventBus} from './inspection-charts-event-bus';
import {InspectionChartsEventTypes} from './inspection-charts-event-bus-types';
import {pieBuild} from './pie';
import {ChartOptionsBuilder, ChartParams, ChartType, ChartUsage} from './types';
import {ChartBuilder} from './widgets/chart';
import {ChartContainer, ChartToolbar, ChartTypeButton, ChartTypeButtons} from './widgets/widgets';

interface ChartState {
	type: ChartType;
	build: ChartOptionsBuilder<any>;
}

export const Chart = (props: ChartParams & { usage: ChartUsage, usages: Array<ChartUsage> }) => {
	const {usage, usages, ...params} = props;
	const {inspection} = props;

	const {on, off} = useInspectionChartsEventBus();
	const [visible, setVisible] = useState(usage === usages[0]);
	const [chartState, setChartState] = useState<ChartState>({type: ChartType.BAR, build: barBuild});
	useEffect(() => {
		const onToggleChart = (anInspection: Inspection, anUsage: ChartUsage, visible: boolean) => {
			if (anInspection !== inspection || anUsage !== usage) {
				return;
			}
			setVisible(visible);
		};
		on(InspectionChartsEventTypes.TOGGLE_CHART, onToggleChart);
		return () => {
			off(InspectionChartsEventTypes.TOGGLE_CHART, onToggleChart);
		};
	}, [on, off, inspection, usage]);

	if (!visible) {
		return null;
	}

	const onBarClicked = () => {
		if (chartState.type !== ChartType.BAR) {
			setChartState({type: ChartType.BAR, build: barBuild});
		}
	};
	const onLineClicked = () => {
		if (chartState.type !== ChartType.LINE) {
			setChartState({type: ChartType.LINE, build: lineBuild});
		}
	};
	const onPieClicked = () => {
		if (chartState.type !== ChartType.PIE) {
			setChartState({type: ChartType.PIE, build: pieBuild});
		}
	};

	const rebuiltParams = rebuildParams(params, usage, usages);

	return <ChartContainer>
		<ChartBuilder params={rebuiltParams} build={chartState.build}/>
		<ChartToolbar>
			<ChartTypeButtons>
				<ChartTypeButton data-selected={chartState.type === ChartType.BAR}
				                 onClick={onBarClicked}>
					<FontAwesomeIcon icon={ICON_CHART_BAR}/>
				</ChartTypeButton>
				<ChartTypeButton data-selected={chartState.type === ChartType.LINE}
				                 onClick={onLineClicked}>
					<FontAwesomeIcon icon={ICON_CHART_LINE}/>
				</ChartTypeButton>
				<ChartTypeButton data-selected={chartState.type === ChartType.PIE}
				                 onClick={onPieClicked}>
					<FontAwesomeIcon icon={ICON_CHART_PIE}/>
				</ChartTypeButton>
			</ChartTypeButtons>
		</ChartToolbar>
	</ChartContainer>;
};