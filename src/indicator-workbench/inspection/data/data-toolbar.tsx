import {Inspection} from '@/services/data/tuples/inspection-types';
import {RowOfAny} from '@/services/data/types';
import {ButtonInk} from '@/widgets/basic/types';
import {Lang} from '@/widgets/langs';
import {useEffect, useState} from 'react';
import {useInspectionEventBus} from '../inspection-event-bus';
import {InspectionEventTypes} from '../inspection-event-bus-types';
import {InspectionButton} from '../widgets';
import {DataToolbarContainer} from './widgets';

export const DataToolbar = (props: { inspection: Inspection }) => {
	const {inspection} = props;

	const {on, off, fire} = useInspectionEventBus();
	const [visible, setVisible] = useState(false);
	const [gridVisible, setGridVisible] = useState(true);
	const [chartsVisible, setChartsVisible] = useState(false);
	useEffect(() => {
		const onDataLoaded = (anInspection: Inspection, data: Array<RowOfAny>) => {
			if (anInspection !== inspection) {
				return;
			}

			setVisible(data.length !== 0);
		};
		on(InspectionEventTypes.DISPLAY_DATA_READY, onDataLoaded);
		return () => {
			off(InspectionEventTypes.DISPLAY_DATA_READY, onDataLoaded);
		};
	}, [on, off, inspection]);

	if (!visible) {
		return null;
	}

	const onHideDataGridClicked = () => {
		fire(InspectionEventTypes.SET_DATA_GRID_VISIBILITY, inspection, !gridVisible);
		setGridVisible(!gridVisible);
	};
	const onShowAvailableChartsClicked = () => {
		fire(InspectionEventTypes.SET_CHARTS_VISIBILITY, inspection, !chartsVisible);
		setChartsVisible(!chartsVisible);
	};
	// const onPrintClicked = () => {
	// 	window.print();
	// };

	return <DataToolbarContainer>
		<span/>
		<InspectionButton ink={gridVisible ? ButtonInk.WAIVE : ButtonInk.PRIMARY} onClick={onHideDataGridClicked}>
			{gridVisible ? Lang.INDICATOR_WORKBENCH.INSPECTION.HIDE_DATA_GRID : Lang.INDICATOR_WORKBENCH.INSPECTION.SHOW_DATA_GRID}
		</InspectionButton>
		<InspectionButton ink={chartsVisible ? ButtonInk.WAIVE : ButtonInk.PRIMARY}
		                  onClick={onShowAvailableChartsClicked}>
			{chartsVisible ? Lang.INDICATOR_WORKBENCH.INSPECTION.HIDE_AVAILABLE_CHARTS : Lang.INDICATOR_WORKBENCH.INSPECTION.SHOW_AVAILABLE_CHARTS}
		</InspectionButton>
		{/*<InspectionButton ink={ButtonInk.PRIMARY} onClick={onPrintClicked}>*/}
		{/*	{Lang.INDICATOR_WORKBENCH.INSPECTION.PRINT}*/}
		{/*</InspectionButton>*/}
	</DataToolbarContainer>;
};