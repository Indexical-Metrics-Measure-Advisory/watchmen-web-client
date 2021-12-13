import {ChartOptionsBuilder, ChartParams} from '../types';
import {useEChart} from './use-echart';
import {ChartPalette, ChartWrapper} from './widgets';

/**
 * do not compare inspection object with any event, it might be a faked one by parent.
 */
export const ChartBuilder = <Opt extends any>(props: { params: ChartParams, build: ChartOptionsBuilder<Opt> }) => {
	const {params, build} = props;

	const {containerRef} = useEChart(params, build);

	return <ChartWrapper>
		<ChartPalette ref={containerRef}/>
	</ChartWrapper>;
};