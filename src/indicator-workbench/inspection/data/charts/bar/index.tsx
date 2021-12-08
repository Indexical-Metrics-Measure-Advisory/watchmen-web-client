import {Inspection} from '@/services/data/tuples/inspection-types';
import {RowOfAny} from '@/services/data/types';
import {Columns} from '../../../types';
import {ChartContainer, InternalChartContainer} from '../widgets/container';
import {useEChart} from '../widgets/use-echart';

export const Bar = (props: { inspection: Inspection; data: Array<RowOfAny>; columns: Columns }) => {
	const {inspection, data, columns} = props;

	const {containerRef} = useEChart({
		inspection, data, columns, build: params => {
			// TODO
			return null;
		}
	});

	return <ChartContainer>
		<InternalChartContainer ref={containerRef}/>
	</ChartContainer>;
};