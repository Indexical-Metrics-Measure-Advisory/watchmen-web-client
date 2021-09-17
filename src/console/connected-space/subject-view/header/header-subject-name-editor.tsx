import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {Subject} from '@/services/data/tuples/subject-types';
import {PageTitleEditor} from '@/widgets/basic/page-title-editor';
import {useForceUpdate} from '@/widgets/basic/utils';
import {useLanguage} from '@/widgets/langs';
import React from 'react';
import {useSubjectEventBus} from '../subject-event-bus';
import {SubjectEventTypes} from '../subject-event-bus-types';

export const HeaderSubjectNameEditor = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const {subject} = props;

	const language = useLanguage();
	const {fire} = useSubjectEventBus();
	const forceUpdate = useForceUpdate();

	const onNameChange = async (name: string) => {
		subject.name = name;
		forceUpdate();
		fire(SubjectEventTypes.SUBJECT_RENAMED, subject);
	};
	const onNameChangeComplete = async (name: string) => {
		subject.name = name.trim() || language.PLAIN.DEFAULT_SUBJECT_NAME;
		forceUpdate();
		fire(SubjectEventTypes.SUBJECT_RENAMED, subject);
	};

	return <PageTitleEditor title={subject.name}
	                        defaultTitle={language.PLAIN.DEFAULT_SUBJECT_NAME}
	                        onChange={onNameChange} onChangeComplete={onNameChangeComplete}/>;
};
