import {Inspection} from '@/services/data/tuples/inspection-types';
import {Grid} from '@/widgets/dataset-grid';

export const DataGrid = (props: { inspection: Inspection }) => {
	const {inspection} = props;

	const hasColumns = inspection.indicatorId != null;

	return <Grid hasColumns={hasColumns} pageable={false}/>;
};