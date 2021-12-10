import {ChartOptionsBuilder, ChartParams} from '../types';
import {useEChart} from './use-echart';
import {ChartPalette, ChartWrapper} from './widgets';

export const createChartComponent = <Opt extends any>(build: (params: ChartParams) => Opt) => {
	return (props: ChartParams) => {
		const {containerRef} = useEChart(props, build);

		return <ChartWrapper>
			<ChartPalette ref={containerRef}/>
		</ChartWrapper>;
	};
};

export const ChartBuilder = <Opt extends any>(props: { params: ChartParams, build: ChartOptionsBuilder<Opt> }) => {
	const {params, build} = props;

	const {containerRef} = useEChart(params, build);

	return <ChartWrapper>
		<ChartPalette ref={containerRef}/>
	</ChartWrapper>;
};