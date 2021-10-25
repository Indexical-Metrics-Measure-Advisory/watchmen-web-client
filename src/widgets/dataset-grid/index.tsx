import {DataSetPage} from '@/services/data/console/dataset';
import {useEffect, useState} from 'react';
import {GridWrapper} from './body';
import {useGridEventBus} from './grid-event-bus';
import {GridEventTypes} from './grid-event-bus-types';
import {GridHeader} from './header';
import {ColumnDefs, DataPage, DataSetState} from './types';
import {DataSetGridContainer} from './widgets';

/**
 * structure and data of grid are passed to this component through event {@link GridEventTypes.DATA_LOADED}.<br>
 * if pagination feature is on, handle {@link props.onPageChange} to provide data, also via event {@link GridEventTypes.DATA_LOADED}.<br>
 * for {@link props.simulating}, through toggle and upload button is in grid itself,
 * switch value will be sent by {@link GridEventTypes.SIMULATOR_SWITCHED}, handle it and repaint grid, otherwise ui will not be changed.<br>
 * for {@link GridEventTypes.SIMULATE_DATA_UPLOADED} fired by upload button, handle it and notify grid via event {@link GridEventTypes.DATA_LOADED}.
 *
 * @param props.hasColumns columns exists or not.
 * @param props.simulateEnabled enable simulate feature, disable pageable related features when simulate is on. default false(feature off).
 * @param props.simulating currently is simulated or not
 * @param props.pageable enable pagination, default true(feature on). will be ignored when {@link props.simulateEnabled} is on.
 * @param props.onPageChange invokes when page change, must pass this parameter when pagination is on.
 * @param props.downloadAll invokes when download all button clicked, must pass this parameter when pagination is on.
 * @param props.languagesSupport enable i18n supporting, default true(feature on).
 */
export const Grid = (props: {
	hasColumns: boolean;
	simulateEnabled?: boolean;
	simulating?: boolean;
	pageable?: boolean;
	onPageChange?: (pageNumber: number, columnDefs: ColumnDefs) => void;
	downloadAll?: () => Promise<DataSetPage>;
	languagesSupport?: boolean;
}) => {
	const {
		hasColumns,
		simulateEnabled,
		simulating = false,
		pageable,
		onPageChange,
		downloadAll,
		languagesSupport = true
	} = props;

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

	return <DataSetGridContainer>
		<GridHeader data={data} canSimulate={simulateEnabled} simulating={simulating}
		            pageable={pageable} onPageChange={onPageChange}
		            downloadAll={downloadAll} languagesSupport={languagesSupport}/>
		<GridWrapper data={data} languagesSupport={languagesSupport}/>
	</DataSetGridContainer>;
};