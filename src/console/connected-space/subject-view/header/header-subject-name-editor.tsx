import React from 'react';
import {PageTitleEditor} from '../../../../basic-widgets/page-title-editor';
import {useForceUpdate} from '../../../../basic-widgets/utils';
import {useLanguage} from '../../../../langs';
import {ConnectedSpace} from '../../../../services/tuples/connected-space-types';
import {Subject} from '../../../../services/tuples/subject-types';
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
