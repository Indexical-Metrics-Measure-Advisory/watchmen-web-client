import {ChartContainer, InternalChartContainer} from './container';
import {ChartParams, useEChart} from './use-echart';

export const createChartComponent = <Opt extends any>(build: (params: ChartParams) => Opt) => {
	return (props: ChartParams) => {
		const {containerRef} = useEChart(props, build);

		return <ChartContainer>
			<InternalChartContainer ref={containerRef}/>
		</ChartContainer>;
	};
};