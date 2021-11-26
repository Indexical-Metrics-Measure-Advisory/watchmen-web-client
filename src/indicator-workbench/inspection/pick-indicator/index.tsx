import {fetchIndicator, fetchIndicatorsForSelection} from '@/services/data/tuples/indicator';
import {Indicator, IndicatorId} from '@/services/data/tuples/indicator-types';
import {Inspection} from '@/services/data/tuples/inspection-types';
import {QueryIndicator} from '@/services/data/tuples/query-indicator-types';
import {isFakedUuid} from '@/services/data/tuples/utils';
import {AlertLabel} from '@/widgets/alert/widgets';
import {ButtonInk, DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import {useEffect, useState} from 'react';
import {useInspectionEventBus} from '../inspection-event-bus';
import {InspectionEventTypes} from '../inspection-event-bus-types';
import {InspectingIndicator} from '../types';
import {InspectionButton, InspectionDropdown, InspectionLabel} from '../widgets';
import {InspectingIndicatorLabel, PickIndicatorContainer} from './widgets';

const IndicatorPicker = (props: { inspection: Inspection }) => {
	const {inspection} = props;

	const {fire: fireGlobal} = useEventBus();
	const {fire} = useInspectionEventBus();
	const [indicators, setIndicators] = useState<Array<QueryIndicator>>([]);
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
			async () => await fetchIndicatorsForSelection(''),
			(indicators: Array<QueryIndicator>) => {
				setIndicators(indicators.sort((i1, i2) => {
					return (i1.name || '').localeCompare(i2.name || '', void 0, {
						sensitivity: 'base',
						caseFirst: 'upper'
					});
				}));
			});
	}, [fireGlobal]);

	const onChange = (option: DropdownOption) => {
		inspection!.indicatorId = option.value as IndicatorId;
		forceUpdate();
	};
	const onPickClicked = () => {
		if (inspection?.indicatorId == null) {
			fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>
				{Lang.INDICATOR_WORKBENCH.INSPECTION.INDICATOR_IS_REQUIRED}
			</AlertLabel>);
			return;
		}

		fire(InspectionEventTypes.INDICATOR_PICKED, inspection);
	};

	const options = indicators.map(indicator => {
		return {
			value: indicator.indicatorId,
			label: indicator.name || 'Noname Indicator'
		};
	});

	return <PickIndicatorContainer>
		<InspectionLabel>{Lang.INDICATOR_WORKBENCH.INSPECTION.PICK_INDICATOR_LABEL}</InspectionLabel>
		<InspectionDropdown value={inspection.indicatorId} options={options} onChange={onChange}
		                    please={Lang.PLAIN.DROPDOWN_PLACEHOLDER}/>
		<InspectionButton ink={ButtonInk.PRIMARY} onClick={onPickClicked}>
			{Lang.INDICATOR_WORKBENCH.INSPECTION.PICK_INDICATOR}
		</InspectionButton>
	</PickIndicatorContainer>;
};

const IndicatorViewer = (props: { inspection: Inspection; indicator?: Indicator }) => {
	const {indicator} = props;

	return <PickIndicatorContainer>
		<InspectionLabel>{Lang.INDICATOR_WORKBENCH.INSPECTION.INSPECTING_ON_INDICATOR_LABEL}</InspectionLabel>
		<InspectingIndicatorLabel>{indicator?.name || 'Noname Indicator'}</InspectingIndicatorLabel>
	</PickIndicatorContainer>;
};

export const PickIndicator = () => {
	const {fire: fireGlobal} = useEventBus();
	const {on, off} = useInspectionEventBus();
	const [shown, setShown] = useState(false);
	const [readOnly, setReadOnly] = useState(false);
	const [inspection, setInspection] = useState<Inspection | null>(null);
	const [inspectingIndicator, setInspectingIndicator] = useState<InspectingIndicator | null>(null);
	useEffect(() => {
		const onInspectionPicked = (inspection: Inspection) => {
			if (!isFakedUuid(inspection)) {
				fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
					async () => {
						const {indicator, topic, enums} = await fetchIndicator(inspection.indicatorId!);
						return {indicator, topic, enums};
					},
					(inspectingIndicator: InspectingIndicator) => {
						setInspectingIndicator(inspectingIndicator);
						setReadOnly(true);
					});
			} else {
				setInspection(inspection);
				setShown(true);
			}
		};
		on(InspectionEventTypes.INSPECTION_PICKED, onInspectionPicked);
		return () => {
			off(InspectionEventTypes.INSPECTION_PICKED, onInspectionPicked);
		};
	}, [on, off, fireGlobal, shown]);
	useEffect(() => {
		const onIndicatorPicked = (inspection: Inspection) => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => {
					const {indicator, topic, enums} = await fetchIndicator(inspection.indicatorId!);
					return {indicator, topic, enums};
				},
				(inspectingIndicator: InspectingIndicator) => {
					setInspectingIndicator(inspectingIndicator);
					setReadOnly(true);
				});
		};
		on(InspectionEventTypes.INDICATOR_PICKED, onIndicatorPicked);
		return () => {
			off(InspectionEventTypes.INDICATOR_PICKED, onIndicatorPicked);
		};
	}, [on, off, fireGlobal]);

	if (!shown) {
		return null;
	}

	return readOnly
		? <IndicatorViewer inspection={inspection!} indicator={inspectingIndicator?.indicator}/>
		: <IndicatorPicker inspection={inspection!}/>;
};