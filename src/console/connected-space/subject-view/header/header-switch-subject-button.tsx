import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import {AlertLabel} from '@/alert/widgets';
import {Button} from '@/basic-widgets/button';
import {ICON_SWITCH} from '@/basic-widgets/constants';
import {Dropdown} from '@/basic-widgets/dropdown';
import {PageHeaderButton} from '@/basic-widgets/page-header-buttons';
import {ButtonInk, DropdownOption} from '@/basic-widgets/types';
import {DialogBody, DialogFooter, DialogLabel} from '@/dialog/widgets';
import {useEventBus} from '@/events/event-bus';
import {EventTypes} from '@/events/types';
import {Lang} from '@/langs';
import {toSubject} from '@/routes/utils';
import {ConnectedSpace} from '@/services/tuples/connected-space-types';
import {Subject} from '@/services/tuples/subject-types';

const SwitchDialogBody = styled(DialogBody)`
	flex-direction : column;
	margin-bottom  : var(--margin);
`;
const SubjectDropdown = styled(Dropdown)`
	margin-top : calc(var(--margin) / 4);
`;

const SubjectSwitch = (props: { subjects: Array<Subject>, switchTo: (subject: Subject) => void }) => {
	const {subjects, switchTo} = props;

	const {fire} = useEventBus();
	const [selection, setSelection] = useState(subjects[0]);

	const onChange = (option: DropdownOption) => {
		setSelection(option.value as Subject);
	};
	const onConfirmClicked = () => {
		switchTo(selection);
		fire(EventTypes.HIDE_DIALOG);
	};
	const onCancelClicked = () => {
		fire(EventTypes.HIDE_DIALOG);
	};

	const options = subjects.map(subject => {
		return {
			value: subject,
			label: (option: DropdownOption) => ({
				node: (option.value as Subject).name,
				label: (option.value as Subject).name
			}),
			key: (option: DropdownOption) => (option.value as Subject).subjectId
		};
	});

	return <>
		<SwitchDialogBody>
			<DialogLabel>{Lang.CONSOLE.CONNECTED_SPACE.SWITCH_SUBJECT_DIALOG_LABEL}</DialogLabel>
			<SubjectDropdown value={selection} options={options} onChange={onChange}/>
		</SwitchDialogBody>
		<DialogFooter>
			<Button ink={ButtonInk.PRIMARY} onClick={onConfirmClicked}>{Lang.ACTIONS.CONFIRM}</Button>
			<Button ink={ButtonInk.PRIMARY} onClick={onCancelClicked}>{Lang.ACTIONS.CANCEL}</Button>
		</DialogFooter>
	</>;
};

export const HeaderSwitchSubjectButton = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const {connectedSpace, subject} = props;

	const history = useHistory();
	const {fire: fireGlobal} = useEventBus();

	const onSwitchTo = (subject: Subject) => {
		history.push(toSubject(connectedSpace.connectId, subject.subjectId));
	};
	const onSwitchSubjectClicked = () => {
		// eslint-disable-next-line
		const candidates = connectedSpace.subjects.sort((s1, s2) => {
			return s1.name.toLowerCase().localeCompare(s2.name.toLowerCase());
		}).filter(exists => exists !== subject);
		if (candidates.length === 0) {
			// no other
			fireGlobal(EventTypes.SHOW_ALERT,
				<AlertLabel>{Lang.CONSOLE.CONNECTED_SPACE.NO_MORE_SUBJECT}</AlertLabel>);
		} else {
			fireGlobal(EventTypes.SHOW_DIALOG,
				<SubjectSwitch subjects={candidates} switchTo={onSwitchTo}/>);
		}
	};

	return <PageHeaderButton tooltip={Lang.CONSOLE.CONNECTED_SPACE.SWITCH_SUBJECT}
	                         onClick={onSwitchSubjectClicked}>
		<FontAwesomeIcon icon={ICON_SWITCH}/>
	</PageHeaderButton>;
};