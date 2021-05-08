import React from 'react';
import {SubjectDataSetFilter, SubjectDataSetFilterJoint} from '../../../../../../services/tuples/subject-types';
import {isExpressionFilter, isJointFilter} from '../../../../../../services/tuples/subject-utils';
import {Topic} from '../../../../../../services/tuples/topic-types';
import {ExpressionFilterEdit} from '../expression-filter';
import {JointFilterEdit} from './index';

export const FilterEdit = (props: {
    parentJoint: SubjectDataSetFilterJoint;
    onRemoveMe: () => void;
    notifyChangeToParent: () => void;
    filter: SubjectDataSetFilter;
    availableTopics: Array<Topic>;
    pickedTopics: Array<Topic>;
}) => {
    const {
        parentJoint, onRemoveMe, notifyChangeToParent,
        filter,
        availableTopics, pickedTopics
    } = props;

    if (isJointFilter(filter)) {
        return <JointFilterEdit joint={filter}
                                parentJoint={parentJoint} onRemoveMe={onRemoveMe}
                                notifyChangeToParent={notifyChangeToParent}
                                availableTopics={availableTopics} pickedTopics={pickedTopics}/>;
    } else if (isExpressionFilter(filter)) {
        return <ExpressionFilterEdit filter={filter}
                                     parentJoint={parentJoint} onRemoveMe={onRemoveMe}
                                     notifyChangeToParent={notifyChangeToParent}
                                     availableTopics={availableTopics} pickedTopics={pickedTopics}/>;
    } else {
        return null;
    }
};