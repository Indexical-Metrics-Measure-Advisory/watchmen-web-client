import {DataSetPage} from '@/services/data/console/dataset';
import {useEffect, useState} from 'react';
import {GridWrapper} from './body';
import {useGridEventBus} from './grid-event-bus';
import {GridEventTypes} from './grid-event-bus-types';
import {GridHeader} from './header';
import {ColumnDefs, DataPage, DataSetState, SimulateDataSetState} from './types';
import {DataSetGridContainer} from './widgets';

/**
 * structure and data of grid are passed to this component through event {@link GridEventTypes.DATA_LOADED}.
 * if pagination feature is on, handle {@link props.onPageChange} to provide data, also via event {@link GridEventTypes.DATA_LOADED}.
 *
 * @param props.hasColumns columns exists or not.
 * @param props.simulate enable simulate feature, disable pageable related features when simulate is on. default false(feature off).
 * @param props.simulated currently is simulated or not
 * @param props.pageable enable pagination, default true(feature on). will be ignored when {@link props.simulate} is on.
 * @param props.onPageChange invokes when page change, must pass this parameter when pagination is on.
 * @param props.downloadAll invokes when download all button clicked, must pass this parameter when pagination is on.
 * @param props.languagesSupport enable i18n supporting, default true(feature on).
 */
export const Grid = (props: {
	hasColumns: boolean;
	simulate?: boolean;
	simulated?: boolean;
	pageable?: boolean;
	onPageChange?: (pageNumber: number, columnDefs: ColumnDefs) => void;
	downloadAll?: () => Promise<DataSetPage<Array<any>>>;
	languagesSupport?: boolean;
}) => {
	const {
		hasColumns,
		simulate,
		simulated = false,
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
	const [simulateData, setSimulateData] = useState<SimulateDataSetState>({
		enabled: false,
		itemCount: 0,
		pageNumber: 1,
		pageSize: 1,
		pageCount: 1,
		data: [],
		columnDefs: {fixed: [], data: []}
	});
	useEffect(() => {
		if (!hasColumns) {
			return;
		}

		const onDataLoaded = (page: DataPage, columnDefs: ColumnDefs) => {
			setData({...page, loaded: true, columnDefs});
			setSimulateData(data => ({...data, columnDefs}));
		};
		const onSimulatorSwitched = (on: boolean) => {
			setSimulateData(data => ({...data, enabled: on}));
		};
		const onSimulateDataUploaded = (page: DataPage) => {
			setSimulateData(data => ({...page, enabled: data.enabled, columnDefs: data.columnDefs}));
		};

		on(GridEventTypes.DATA_LOADED, onDataLoaded);
		on(GridEventTypes.SIMULATOR_SWITCHED, onSimulatorSwitched);
		on(GridEventTypes.SIMULATE_DATA_UPLOADED, onSimulateDataUploaded);
		return () => {
			off(GridEventTypes.DATA_LOADED, onDataLoaded);
			off(GridEventTypes.SIMULATOR_SWITCHED, onSimulatorSwitched);
			off(GridEventTypes.SIMULATE_DATA_UPLOADED, onSimulateDataUploaded);
		};
	}, [on, off, hasColumns]);

	if (!hasColumns || !data.loaded) {
		return null;
	}

	const gridData = simulateData.enabled ? ({...simulateData, loaded: true}) : data;

	return <DataSetGridContainer>
		<GridHeader data={data} simulate={simulate} simulated={simulated}
		            pageable={pageable} onPageChange={onPageChange}
		            downloadAll={downloadAll} languagesSupport={languagesSupport}/>
		<GridWrapper data={gridData} languagesSupport={languagesSupport}/>
	</DataSetGridContainer>;
};