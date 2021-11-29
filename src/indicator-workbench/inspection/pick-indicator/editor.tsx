import {IndicatorId} from '@/services/data/tuples/indicator-types';
import {Inspection} from '@/services/data/tuples/inspection-types';
import {QueryIndicator} from '@/services/data/tuples/query-indicator-types';
import {AlertLabel} from '@/widgets/alert/widgets';
import {ButtonInk, DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import {useEffect, useState} from 'react';
import {useInspectionEventBus} from '../inspection-event-bus';
import {InspectionEventTypes} from '../inspection-event-bus-types';
import {InspectionButton, InspectionDropdown, InspectionLabel} from '../widgets';
import {PickIndicatorContainer} from './widgets';

export const Editor = (props: { inspection: Inspection }) => {
	const {inspection} = props;

	const {fire: fireGlobal} = useEventBus();
	const {fire} = useInspectionEventBus();
	const [indicators, setIndicators] = useState<Array<QueryIndicator>>([]);
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		fire(InspectionEventTypes.ASK_INDICATORS, (indicators) => {
			setIndicators(indicators);
		});
	}, [fire]);

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