import {toSubject} from '@/routes/utils';
import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {Subject} from '@/services/data/tuples/subject-types';
import {AlertLabel} from '@/widgets/alert/widgets';
import {Button} from '@/widgets/basic/button';
import {ICON_SWITCH} from '@/widgets/basic/constants';
import {Dropdown} from '@/widgets/basic/dropdown';
import {PageHeaderButton} from '@/widgets/basic/page-header-buttons';
import {ButtonInk, DropdownOption} from '@/widgets/basic/types';
import {DialogBody, DialogFooter, DialogLabel} from '@/widgets/dialog/widgets';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';

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
			label: subject.name,
			key: subject.subjectId
		};
	});

	return <>
		<SwitchDialogBody>
			<DialogLabel>{Lang.CONSOLE.CONNECTED_SPACE.SWITCH_SUBJECT_DIALOG_LABEL}</DialogLabel>
			<SubjectDropdown value={selection} options={options} onChange={onChange}/>
		</SwitchDialogBody>
		<DialogFooter>
			<Button ink={ButtonInk.PRIMARY} onClick={onConfirmClicked}>{Lang.ACTIONS.CONFIRM}</Button>
			<Button ink={ButtonInk.WAIVE} onClick={onCancelClicked}>{Lang.ACTIONS.CANCEL}</Button>
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