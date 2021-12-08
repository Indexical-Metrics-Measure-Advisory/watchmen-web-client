import {Inspection} from '@/services/data/tuples/inspection-types';
import {RowOfAny} from '@/services/data/types';
import {Columns} from '../../../types';
import {ChartContainer, InternalChartContainer} from './container';
import {ChartParams, useEChart} from './use-echart';

export const createChartComponent = <Opt extends any>(build: (params: ChartParams) => Opt) => {
	return (props: { inspection: Inspection; data: Array<RowOfAny>; columns: Columns }) => {
		const {containerRef} = useEChart(props, build);

		return <ChartContainer>
			<InternalChartContainer ref={containerRef}/>
		</ChartContainer>;
	};
};