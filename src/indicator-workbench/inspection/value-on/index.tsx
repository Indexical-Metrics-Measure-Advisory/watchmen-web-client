import {Inspection, InspectValueOn} from '@/services/data/tuples/inspection-types';
import {PropOf} from '@/services/types';
import {DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {useEffect, useState} from 'react';
import {useInspectionEventBus} from '../inspection-event-bus';
import {IndicatorForInspection, InspectionEventTypes} from '../inspection-event-bus-types';
import {InspectionLabel} from '../widgets';
import {ValueOnContainer, ValueOnDropdown} from './widgets';

const ValueOnLabel: Record<InspectValueOn, string> = {
	[InspectValueOn.VALUE_COUNT]: Lang.INDICATOR_WORKBENCH.INSPECTION.VALUE_ON_COUNT,
	[InspectValueOn.VALUE_SUM]: Lang.INDICATOR_WORKBENCH.INSPECTION.VALUE_ON_SUM,
	[InspectValueOn.VALUE_AVG]: Lang.INDICATOR_WORKBENCH.INSPECTION.VALUE_ON_AVG,
	[InspectValueOn.VALUE_MAX]: Lang.INDICATOR_WORKBENCH.INSPECTION.VALUE_ON_MAX,
	[InspectValueOn.VALUE_MIN]: Lang.INDICATOR_WORKBENCH.INSPECTION.VALUE_ON_MIN
};

export const ValueOn = () => {
	const {on, off, fire} = useInspectionEventBus();
	const [visible, setVisible] = useState(false);
	const [inspection, setInspection] = useState<Inspection | null>(null);
	const [indicator, setIndicator] = useState<IndicatorForInspection | null>(null);
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onInspectionPicked = (inspection: Inspection, indicator?: IndicatorForInspection) => {
			setInspection(inspection);
			if (inspection.indicatorId != null) {
				setIndicator(indicator!);
				setVisible(true);
			}
		};
		const onIndicatorPicked = (indicator: IndicatorForInspection) => {
			setIndicator(indicator);
			setVisible(true);
		};
		on(InspectionEventTypes.INSPECTION_PICKED, onInspectionPicked);
		on(InspectionEventTypes.INDICATOR_PICKED, onIndicatorPicked);
		return () => {
			off(InspectionEventTypes.INSPECTION_PICKED, onInspectionPicked);
			off(InspectionEventTypes.INDICATOR_PICKED, onIndicatorPicked);
		};
	}, [on, off, fire]);

	if (!visible) {
		return null;
	}

	const onOnChange = (option: DropdownOption) => {
		inspection!.valueOn = option.value as PropOf<Inspection, 'valueOn'>;
		forceUpdate();
	};

	const options = (indicator?.indicator.factorId == null)
		? [{
			value: InspectValueOn.VALUE_COUNT,
			label: () => {
				return {
					node: ValueOnLabel[InspectValueOn.VALUE_COUNT],
					label: InspectValueOn.VALUE_COUNT
				};
			},
			key: InspectValueOn.VALUE_COUNT
		}]
		: Object.values(InspectValueOn).map(on => {
			return {
				value: on,
				label: () => {
					return {
						node: ValueOnLabel[on],
						label: on
					};
				},
				key: on
			};
		});

	const value = inspection?.valueOn ?? (options.length === 1 ? InspectValueOn.VALUE_COUNT : InspectValueOn.VALUE_SUM);

	return <ValueOnContainer>
		<InspectionLabel>{Lang.INDICATOR_WORKBENCH.INSPECTION.VALUE_ON_LABEL}</InspectionLabel>
		<ValueOnDropdown value={value} options={options} onChange={onOnChange}
		                 please={Lang.PLAIN.DROPDOWN_PLACEHOLDER}/>
	</ValueOnContainer>;
};