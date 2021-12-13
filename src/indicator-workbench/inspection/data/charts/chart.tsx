import {Inspection} from '@/services/data/tuples/inspection-types';
import {
	ICON_CHART_BAR,
	ICON_CHART_GROWTH_OF_TIME_GROUPING,
	ICON_CHART_GROWTH_OF_TIME_RANGE,
	ICON_CHART_LINE,
	ICON_CHART_PIE
} from '@/widgets/basic/constants';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useEffect, useState} from 'react';
import {barBuild, barWithTimeGroupingGrowthBuild, lineBuild} from './bar-and-line';
import {buildChartGrowthTypes, rebuildParams} from './chart-utils';
import {useInspectionChartsEventBus} from './inspection-charts-event-bus';
import {InspectionChartsEventTypes} from './inspection-charts-event-bus-types';
import {pieBuild} from './pie';
import {ChartGrowthType, ChartOptionsBuilder, ChartParams, ChartType, ChartUsage} from './types';
import {ChartBuilder} from './widgets/chart';
import {ChartContainer, ChartToolbar, ChartTypeButton, ChartTypeButtons} from './widgets/widgets';

interface ChartState {
	type: ChartType;
	growth: Array<ChartGrowthType>;
	build: ChartOptionsBuilder<any>;
}

const getChartBuild = (type: ChartType, growth: Array<ChartGrowthType>): ChartOptionsBuilder<any> => {
	switch (true) {
		case type === ChartType.LINE:
			return lineBuild;
		case type === ChartType.PIE:
			return pieBuild;
		case  type === ChartType.BAR && growth.length === 0:
			return barBuild;
		case  type === ChartType.BAR && growth.length === 2:
			return barBuild;
		case  type === ChartType.BAR && growth.includes(ChartGrowthType.TIME_GROUPING):
			return barWithTimeGroupingGrowthBuild;
		case  type === ChartType.BAR && growth.includes(ChartGrowthType.TIME_RANGE):
			return barBuild;
	}
	throw new Error(`Chart[type=${type}, growth=${growth}] is not supported yet.`);
};

export const Chart = (props: ChartParams & { usage: ChartUsage, usages: Array<ChartUsage> }) => {
	const {usage, usages, ...params} = props;
	const {inspection} = props;

	const {on, off, fire} = useInspectionChartsEventBus();
	const [visible, setVisible] = useState(false);
	const [chartState, setChartState] = useState<ChartState>({
		type: ChartType.BAR,
		growth: [],
		build: barBuild
	});
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
	useEffect(() => {
		fire(InspectionChartsEventTypes.ASK_USAGE_USED, usage, used => {
			(used !== visible) && setVisible(used);
		});
	}, [fire, visible, usage]);

	if (!visible) {
		return null;
	}

	const onBarClicked = () => {
		if (chartState.type !== ChartType.BAR) {
			setChartState({
				type: ChartType.BAR,
				growth: [],
				build: getChartBuild(ChartType.BAR, [])
			});
		}
	};
	const onLineClicked = () => {
		if (chartState.type !== ChartType.LINE) {
			setChartState({
				type: ChartType.LINE,
				growth: [],
				build: getChartBuild(ChartType.LINE, [])
			});
		}
	};
	const onPieClicked = () => {
		if (chartState.type !== ChartType.PIE) {
			setChartState({
				type: ChartType.PIE,
				growth: [],
				build: getChartBuild(ChartType.PIE, [])
			});
		}
	};

	const onGrowthOfTimeGroupingClicked = () => {
		const growth = chartState.growth.includes(ChartGrowthType.TIME_GROUPING)
			? chartState.growth.filter(growth => growth !== ChartGrowthType.TIME_GROUPING)
			: [...chartState.growth, ChartGrowthType.TIME_GROUPING];
		setChartState({type: ChartType.BAR, growth, build: getChartBuild(ChartType.BAR, growth)});
	};
	const onGrowthOfTimeRangeClicked = () => {
	};

	const rebuiltParams = rebuildParams({params, usage, usages});
	const growthTypes = buildChartGrowthTypes(inspection, chartState.type, usage);

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
			{growthTypes.length !== 0
				? <ChartTypeButtons>
					{growthTypes.includes(ChartGrowthType.TIME_GROUPING)
						? <ChartTypeButton data-selected={chartState.growth.includes(ChartGrowthType.TIME_GROUPING)}
						                   onClick={onGrowthOfTimeGroupingClicked}>
							<FontAwesomeIcon icon={ICON_CHART_GROWTH_OF_TIME_GROUPING}/>
						</ChartTypeButton>
						: null}
					{growthTypes.includes(ChartGrowthType.TIME_RANGE)
						? <ChartTypeButton data-selected={chartState.growth.includes(ChartGrowthType.TIME_RANGE)}
						                   onClick={onGrowthOfTimeRangeClicked}>
							<FontAwesomeIcon icon={ICON_CHART_GROWTH_OF_TIME_RANGE}/>
						</ChartTypeButton>
						: null}
				</ChartTypeButtons>
				: null}
		</ChartToolbar>
	</ChartContainer>;
};