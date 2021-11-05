import {saveIndicator} from '@/services/data/tuples/indicator';
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
import {useIndicatorsEventBus} from '../indicators-event-bus';
import {IndicatorsEventTypes} from '../indicators-event-bus-types';
import {Step, StepTitle, StepTitleButton, useStep} from '../step-widgets';
import {PrepareStep} from '../types';
import {useConstructed} from '../use-constructed';
import {NameInput, SaveButton} from './widgets';

export const SaveIndicator = () => {
	const inputRef = useRef<HTMLInputElement>(null);
	const {fire: fireGlobal} = useEventBus();
	const {fire} = useIndicatorsEventBus();
	const [saving, setSaving] = useState(false);
	const [onEdit, setOnEdit] = useState(true);
	const {constructed, setConstructed, visible, setVisible} = useConstructed();
	const {data} = useStep({
		step: PrepareStep.MEASURE_METHODS,
		active: () => setConstructed(true),
		done: () => setConstructed(true),
		dropped: () => setVisible(false)
	});
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		if (constructed && onEdit) {
			inputRef.current?.focus();
		}
	}, [constructed, onEdit]);

	if (!constructed) {
		return null;
	}

	const onNameChanged = (event: ChangeEvent<HTMLInputElement>) => {
		const {value} = event.target;
		data!.indicator!.name = value;
		forceUpdate();
	};
	const onSaveClicked = () => {
		if (data!.indicator!.name == null || data!.indicator!.name.trim().length === 0) {
			fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>A human reading name for indicator is required.</AlertLabel>);
			return;
		}

		setSaving(true);
		data!.indicator!.name = data!.indicator!.name.trim();
		fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
			async () => await saveIndicator(data!.indicator!),
			() => {
				fire(IndicatorsEventTypes.INDICATOR_SAVED, data!.indicator!);
				inputRef.current?.blur();
				setOnEdit(false);
				setSaving(false);
			},
			() => {
				setSaving(false);
				fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>{Lang.ERROR.UNPREDICTED}</AlertLabel>);
			});
	};
	const onChangeNameClicked = () => {
		setOnEdit(true);
	};

	return <Step index={4} visible={visible}>
		<StepTitle visible={visible && onEdit}>
			<NameInput value={data?.indicator?.name || ''} onChange={onNameChanged}
			           placeholder="A human reading name for indicator."
			           ref={inputRef}/>
			<SaveButton ink={ButtonInk.PRIMARY} onClick={onSaveClicked}>
				{saving ? <FontAwesomeIcon icon={ICON_LOADING} spin={true}/> : null}
				<span>{isFakedUuid(data!.indicator!) ? 'Save Indicator' : 'Save Name'}</span>
			</SaveButton>
		</StepTitle>
		<StepTitle visible={visible && !onEdit}>
			<StepTitleButton ink={ButtonInk.PRIMARY} onClick={onChangeNameClicked}>
				<span>Change Name</span>
			</StepTitleButton>
		</StepTitle>
	</Step>;
};