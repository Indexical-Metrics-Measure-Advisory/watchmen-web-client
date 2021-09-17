import {DataSetPage} from '@/services/data/console/dataset';
import {useEffect, useState} from 'react';
import {GridWrapper} from './body';
import {GridEventBusProvider, useGridEventBus} from './grid-event-bus';
import {GridEventTypes} from './grid-event-bus-types';
import {GridHeader} from './header';
import {ColumnDefs, DataPage, DataSetState} from './types';
import {DataSetGridContainer} from './widgets';

export const Grid = (props: {
	hasColumns: boolean;
	pageable?: boolean;
	onPageChange?: (pageNumber: number, columnDefs: ColumnDefs) => void;
	downloadAll?: () => Promise<DataSetPage<Array<any>>>
}) => {
	const {hasColumns, pageable, onPageChange, downloadAll} = props;

	const {on, off} = useGridEventBus();
	const [data, setData] = useState<DataSetState>({
		itemCount: 0,
		pageNumber: 1,
		pageSize: 1,
		pageCount: 1,
		data: [],
		loaded: false,
		columnDefs: {fixed: [], data: []}
	});
	useEffect(() => {
		if (!hasColumns) {
			return;
		}

		const onDataLoaded = (page: DataPage, columnDefs: ColumnDefs) => {
			setData({...page, loaded: true, columnDefs});
		};

		on(GridEventTypes.DATA_LOADED, onDataLoaded);
		return () => {
			off(GridEventTypes.DATA_LOADED, onDataLoaded);
		};
	}, [on, off, hasColumns]);

	if (!hasColumns || !data.loaded) {
		return null;
	}

	return <GridEventBusProvider>
		<DataSetGridContainer>
			<GridHeader data={data} pageable={pageable} onPageChange={onPageChange} downloadAll={downloadAll}/>
			<GridWrapper data={data}/>
		</DataSetGridContainer>
	</GridEventBusProvider>;
};