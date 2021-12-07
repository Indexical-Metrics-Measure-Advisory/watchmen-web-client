import {useVisibleOnII} from '../use-visible-on-ii';
import {DataGrid} from './data-grid';
import {DataHandler} from './data-handler';
import {DataContainer} from './widgets';

export const Data = () => {
	const {visible, inspection, indicator} = useVisibleOnII();

	if (!visible) {
		return null;
	}

	return <>
		<DataContainer>
			<DataGrid inspection={inspection!} indicator={indicator!}/>
		</DataContainer>
		<DataHandler inspection={inspection!}/>
	</>;
};