import {IndicatorAggregateArithmetic, IndicatorId} from '@/services/data/tuples/indicator-types';
import {Inspection} from '@/services/data/tuples/inspection-types';
import {QueryIndicator} from '@/services/data/tuples/query-indicator-types';
import {AlertLabel} from '@/widgets/alert/widgets';
import {ButtonInk, DropdownOption} from '@/widgets/basic/types';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import {useEffect, useState} from 'react';
import {useInspectionEventBus} from '../inspection-event-bus';
import {IndicatorForInspection, InspectionEventTypes} from '../inspection-event-bus-types';
import {InspectionButton, InspectionDropdown, InspectionLabel} from '../widgets';
import {PickIndicatorContainer} from './widgets';

export const PickIndicatorEditor = () => {
	const {fire: fireGlobal} = useEventBus();
	const {on, off, fire} = useInspectionEventBus();
	const [visible, setVisible] = useState(false);
	const [inspection, setInspection] = useState<Inspection | null>(null);
	const [indicators, setIndicators] = useState<Array<QueryIndicator>>([]);
	const [selectedIndicatorId, setSelectedIndicatorId] = useState<IndicatorId | null>(null);
	useEffect(() => {
		const onInspectionPicked = (inspection: Inspection) => {
			setSelectedIndicatorId(inspection.indicatorId);
			setInspection(inspection);
			if (inspection.indicatorId == null) {
				setVisible(true);
			}
		};
		on(InspectionEventTypes.INSPECTION_PICKED, onInspectionPicked);
		return () => {
			off(InspectionEventTypes.INSPECTION_PICKED, onInspectionPicked);
		};
	});
	useEffect(() => {
		if (!visible) {
			return;
		}

		fire(InspectionEventTypes.ASK_INDICATORS, (indicators) => {
			setIndicators(indicators);
		});
	}, [fire, visible]);
	useEffect(() => {
		const onInspectionCleared = () => {
			setVisible(false);
			setSelectedIndicatorId(null);
			setInspection(null);
		};
		on(InspectionEventTypes.INSPECTION_CLEARED, onInspectionCleared);
		return () => {
			off(InspectionEventTypes.INSPECTION_CLEARED, onInspectionCleared);
		};
	}, [on, off]);

	if (!visible) {
		return null;
	}

	const onChange = (option: DropdownOption) => {
		setSelectedIndicatorId(option.value as IndicatorId);
	};
	const onPickClicked = () => {
		if (selectedIndicatorId == null) {
			fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>
				{Lang.INDICATOR_WORKBENCH.INSPECTION.INDICATOR_IS_REQUIRED}
			</AlertLabel>);
			return;
		}

		inspection!.indicatorId = selectedIndicatorId;
		fire(InspectionEventTypes.ASK_INDICATOR, inspection!.indicatorId, (indicator: IndicatorForInspection) => {
			const {indicator: picked} = indicator;
			if (picked.factorId == null) {
				inspection!.aggregateArithmetics = [IndicatorAggregateArithmetic.COUNT];
			} else {
				inspection!.aggregateArithmetics = inspection?.aggregateArithmetics ?? [IndicatorAggregateArithmetic.SUM];
			}
			fire(InspectionEventTypes.INDICATOR_PICKED, indicator);

			setVisible(false);
		});
	};

	const options = indicators.map(indicator => {
		return {
			value: indicator.indicatorId,
			label: indicator.name || 'Noname Indicator'
		};
	});

	return <PickIndicatorContainer>
		<InspectionLabel>{Lang.INDICATOR_WORKBENCH.INSPECTION.PICK_INDICATOR_LABEL}</InspectionLabel>
		<InspectionDropdown value={selectedIndicatorId} options={options} onChange={onChange}
		                    please={Lang.PLAIN.DROPDOWN_PLACEHOLDER}/>
		<InspectionButton ink={ButtonInk.PRIMARY} onClick={onPickClicked}>
			{Lang.INDICATOR_WORKBENCH.INSPECTION.PICK_INDICATOR}
		</InspectionButton>
	</PickIndicatorContainer>;
};