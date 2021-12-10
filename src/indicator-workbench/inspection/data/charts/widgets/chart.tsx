import {ChartOptionsBuilder, ChartParams} from '../types';
import {ChartContainer, InternalChartContainer} from './container';
import {useEChart} from './use-echart';

export const createChartComponent = <Opt extends any>(build: (params: ChartParams) => Opt) => {
	return (props: ChartParams) => {
		const {containerRef} = useEChart(props, build);

		return <ChartContainer>
			<InternalChartContainer ref={containerRef}/>
		</ChartContainer>;
	};
};

export const ChartBuilder = <Opt extends any>(props: { params: ChartParams, build: ChartOptionsBuilder<Opt> }) => {
	const {params, build} = props;

	const {containerRef} = useEChart(params, build);

	return <ChartContainer>
		<InternalChartContainer ref={containerRef}/>
	</ChartContainer>;
};