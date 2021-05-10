import styled from 'styled-components';
import {DialogBody, DialogFooter, DialogLabel} from '../../../dialog/widgets';
import {Dropdown} from '../../../basic-widgets/dropdown';
import {useEventBus} from '../../../events/event-bus';
import React, {useState} from 'react';
import {ButtonInk, DropdownOption} from '../../../basic-widgets/types';
import {EventTypes} from '../../../events/types';
import {Button} from '../../../basic-widgets/button';
import {Pipeline} from '../../../services/tuples/pipeline-types';
import {Topic} from '../../../services/tuples/topic-types';

const TupleDialogBody = styled(DialogBody)`
	flex-direction: column;
	margin-bottom: var(--margin);
`;
const TupleDropdown = styled(Dropdown)`
	margin-top: calc(var(--margin) / 4);
`;

export const TupleSwitch = <T extends Topic | Pipeline>(props: {
	label: string;
	candidates: Array<T>,
	toOption: (candidate: T) => DropdownOption;
	switchTo: (tuple: T) => void
}) => {
	const {label, candidates, toOption, switchTo} = props;

	const {fire} = useEventBus();
	const [selection, setSelection] = useState(candidates[0]);

	const onChange = (option: DropdownOption) => {
		setSelection(option.value as T);
	};
	const onConfirmClicked = () => {
		switchTo(selection);
		fire(EventTypes.HIDE_DIALOG);
	};
	const onCancelClicked = () => {
		fire(EventTypes.HIDE_DIALOG);
	};

	const options = candidates.map(toOption);

	return <>
		<TupleDialogBody>
			<DialogLabel>{label}</DialogLabel>
			<TupleDropdown value={selection} options={options} onChange={onChange}/>
		</TupleDialogBody>
		<DialogFooter>
			<Button ink={ButtonInk.PRIMARY} onClick={onConfirmClicked}>GO!</Button>
			<Button ink={ButtonInk.PRIMARY} onClick={onCancelClicked}>Cancel</Button>
		</DialogFooter>
	</>;
};
