import {ICON_CHART_BAR, ICON_CHART_LINE, ICON_CHART_PIE} from '@/widgets/basic/constants';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useState} from 'react';
import {barBuild, lineBuild} from './bar-and-line';
import {pieBuild} from './pie';
import {ChartOptionsBuilder, ChartParams, ChartType, ChartUsing} from './types';
import {ChartBuilder} from './widgets/chart';
import {ChartContainer, ChartToolbar, ChartTypeButton, ChartTypeButtons} from './widgets/widgets';

export const Chart = (props: ChartParams & { using: ChartUsing }) => {
	const {using, ...params} = props;
	const [chartType, setChartType] = useState(ChartType.BAR);
	const [build, setBuild] = useState<ChartOptionsBuilder<any>>(() => barBuild);

	const onBarClicked = () => {
		if (chartType !== ChartType.BAR) {
			setChartType(ChartType.BAR);
			setBuild(barBuild);
		}
	};
	const onLineClicked = () => {
		if (chartType !== ChartType.LINE) {
			setChartType(ChartType.LINE);
			setBuild(lineBuild);
		}
	};
	const onPieClicked = () => {
		if (chartType !== ChartType.PIE) {
			setChartType(ChartType.PIE);
			setBuild(pieBuild);
		}
	};

	return <ChartContainer>
		<ChartBuilder params={params} build={build}/>
		<ChartToolbar>
			<ChartTypeButtons>
				<ChartTypeButton data-selected={chartType === ChartType.BAR}
				                 onClick={onBarClicked}>
					<FontAwesomeIcon icon={ICON_CHART_BAR}/>
				</ChartTypeButton>
				<ChartTypeButton data-selected={chartType === ChartType.LINE}
				                 onClick={onLineClicked}>
					<FontAwesomeIcon icon={ICON_CHART_LINE}/>
				</ChartTypeButton>
				<ChartTypeButton data-selected={chartType === ChartType.PIE}
				                 onClick={onPieClicked}>
					<FontAwesomeIcon icon={ICON_CHART_PIE}/>
				</ChartTypeButton>
			</ChartTypeButtons>
		</ChartToolbar>
	</ChartContainer>;
};