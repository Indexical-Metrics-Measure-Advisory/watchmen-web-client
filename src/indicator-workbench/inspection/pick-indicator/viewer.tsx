import {Indicator} from '@/services/data/tuples/indicator-types';
import {Inspection} from '@/services/data/tuples/inspection-types';
import {Lang} from '@/widgets/langs';
import {InspectionEntityLabel, InspectionLabel} from '../widgets';
import {PickIndicatorContainer} from './widgets';

export const Viewer = (props: { inspection: Inspection; indicator?: Indicator }) => {
	const {indicator} = props;

	return <PickIndicatorContainer>
		<InspectionLabel>{Lang.INDICATOR_WORKBENCH.INSPECTION.INSPECTING_ON_INDICATOR_LABEL}</InspectionLabel>
		<InspectionEntityLabel>{indicator?.name || 'Noname Indicator'}</InspectionEntityLabel>
	</PickIndicatorContainer>;
};
