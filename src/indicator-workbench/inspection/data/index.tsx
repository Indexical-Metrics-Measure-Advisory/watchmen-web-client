import {GridEventBusProvider} from '@/widgets/dataset-grid/grid-event-bus';
import {useVisibleOnII} from '../use-visible-on-ii';
import {DataGrid} from './data-grid';
import {DataHandler} from './data-handler';
import {DataContainer} from './widgets';

export const Data = () => {
	const {visible, inspection, indicator} = useVisibleOnII();

	if (!visible) {
		return null;
	}

	return <GridEventBusProvider>
		<DataContainer>
			<DataGrid inspection={inspection!}/>
		</DataContainer>
		<DataHandler inspection={inspection!} indicator={indicator!}/>
	</GridEventBusProvider>;
};