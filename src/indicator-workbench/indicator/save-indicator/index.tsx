import {Indicator} from '@/services/data/tuples/indicator-types';
import {isFakedUuid} from '@/services/data/tuples/utils';
import {AlertLabel} from '@/widgets/alert/widgets';
import {ICON_LOADING} from '@/widgets/basic/constants';
import {ButtonInk} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ChangeEvent, useEffect, useRef, useState} from 'react';
import {Step, StepTitle, StepTitleButton} from '../../step-widgets';
import {useIndicatorsEventBus} from '../indicators-event-bus';
import {IndicatorsEventTypes} from '../indicators-event-bus-types';
import {IndicatorDeclarationStep} from '../types';
import {useConstructed} from '../use-constructed';
import {useStep} from '../use-step';
import {NameInput, SaveButton} from './widgets';

export const SaveIndicator = () => {
	const ref = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const {fire: fireGlobal} = useEventBus();
	const {fire} = useIndicatorsEventBus();
	const [saving, setSaving] = useState(false);
	const [onEdit, setOnEdit] = useState(true);
	const {constructed, setConstructed, visible, setVisible} = useConstructed(ref);
	const {data, done} = useStep({
		step: IndicatorDeclarationStep.SAVE_INDICATOR,
		active: () => {
			setOnEdit(true);
			setConstructed(true);
		},
		done: () => {
			setOnEdit(false);
			setConstructed(true);
		},
		dropped: () => setVisible(false)
	});
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		if (constructed && onEdit) {
			inputRef.current?.focus();
		}
	}, [constructed, onEdit]);

	if (!constructed || data?.indicator == null) {
		return null;
	}

	const onNameChanged = (event: ChangeEvent<HTMLInputElement>) => {
		const {value} = event.target;
		data!.indicator!.name = value;
		forceUpdate();
	};
	const onDiscardClicked = () => {
		if (saving) {
			return;
		}
		setOnEdit(false);
	};
	const onSaveClicked = () => {
		if (saving) {
			return;
		}
		if (data!.indicator!.name == null || data!.indicator!.name.trim().length === 0) {
			fireGlobal(EventTypes.SHOW_ALERT,
				<AlertLabel>{Lang.INDICATOR_WORKBENCH.INDICATOR.REQUIRE_INDICATOR_NAME}</AlertLabel>);
			return;
		}

		setSaving(true);
		data!.indicator!.name = data!.indicator!.name.trim();
		fire(IndicatorsEventTypes.SAVE_INDICATOR, data!.indicator!, (indicator: Indicator, saved: boolean) => {
			if (saved) {
				inputRef.current?.blur();
				setOnEdit(false);
				if (!done) {
					fire(IndicatorsEventTypes.SWITCH_STEP, IndicatorDeclarationStep.RELEVANT_INDICATORS, data);
				}
			}
			setSaving(false);
		});
	};
	const onChangeNameClicked = () => {
		setOnEdit(true);
	};

	const isOnCreate = isFakedUuid(data.indicator);

	return <Step index={IndicatorDeclarationStep.SAVE_INDICATOR} visible={visible} ref={ref}>
		<StepTitle visible={visible && onEdit}>
			<NameInput value={data.indicator.name || ''} onChange={onNameChanged}
			           placeholder={Lang.PLAIN.INDICATOR_NAME_PLACEHOLDER}
			           ref={inputRef}/>
			{isOnCreate
				? null
				: <SaveButton ink={ButtonInk.PRIMARY} onClick={onDiscardClicked}>
					{Lang.INDICATOR_WORKBENCH.INDICATOR.NOT_NOW}
				</SaveButton>}
			<SaveButton ink={ButtonInk.PRIMARY} onClick={onSaveClicked}>
				{saving ? <FontAwesomeIcon icon={ICON_LOADING} spin={true}/> : null}
				<span>{isOnCreate ? Lang.INDICATOR_WORKBENCH.INDICATOR.SAVE_INDICATOR : Lang.INDICATOR_WORKBENCH.INDICATOR.SAVE_NAME}</span>
			</SaveButton>
		</StepTitle>
		<StepTitle visible={visible && !onEdit}>
			<StepTitleButton ink={ButtonInk.PRIMARY} onClick={onChangeNameClicked}>
				{Lang.INDICATOR_WORKBENCH.INDICATOR.CHANGE_NAME}
			</StepTitleButton>
		</StepTitle>
	</Step>;
};