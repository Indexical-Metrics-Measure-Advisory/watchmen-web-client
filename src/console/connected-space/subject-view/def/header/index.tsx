import {Subject} from '@/services/data/tuples/subject-types';
import {ButtonInk} from '@/widgets/basic/types';
import {Lang} from '@/widgets/langs';
import React, {MouseEvent} from 'react';
import {createSubjectDataSetColumn, createSubjectDataSetJoin} from '../data-utils';
import {useSubjectDefEventBus} from '../subject-def-event-bus';
import {SubjectDefEventTypes} from '../subject-def-event-bus-types';
import {HeaderCell} from './header-cell';
import {DefHeaderButton, SubjectDefHeader} from './widgets';

export const Header = (props: {
	subject: Subject;
	activeIndex: number;
	changeActiveIndex: (activeIndex: number) => void;
}) => {
	const {subject, activeIndex, changeActiveIndex} = props;

	const {fire} = useSubjectDefEventBus();

	const onChangeActiveIndex = (nextActiveIndex: number) => {
		if (nextActiveIndex === activeIndex) {
			return;
		}
		changeActiveIndex(nextActiveIndex);
	};
	const onAddColumnClicked = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		event.stopPropagation();
		const column = createSubjectDataSetColumn(subject);
		subject.dataset.columns.push(column);
		fire(SubjectDefEventTypes.DATASET_COLUMN_ADDED, column);
	};
	const onAddJoinClicked = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		event.stopPropagation();
		const join = createSubjectDataSetJoin();
		subject.dataset.joins.push(join);
		fire(SubjectDefEventTypes.DATASET_JOIN_ADDED, join);
	};

	return <SubjectDefHeader activeIndex={activeIndex}>
		<HeaderCell active={activeIndex === 1} activeIndex={1} label={Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_PICK_TOPICS}
		            onClick={onChangeActiveIndex}
		            checkPickedTopicBeforeActive={false} checkPickedTopicBeforeNext={true}/>
		<HeaderCell active={activeIndex === 2} activeIndex={2}
		            label={Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_DEFINE_COLUMNS}
		            onClick={onChangeActiveIndex}>
			<DefHeaderButton ink={ButtonInk.PRIMARY} onClick={onAddColumnClicked}>
				<span>{Lang.CONSOLE.CONNECTED_SPACE.ADD_SUBJECT_COLUMN}</span>
			</DefHeaderButton>
		</HeaderCell>
		<HeaderCell active={activeIndex === 3} activeIndex={3} label={Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_FILTER_DATA}
		            onClick={onChangeActiveIndex}/>
		<HeaderCell active={activeIndex === 4} activeIndex={4} label={Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_SET_JOINS}
		            onClick={onChangeActiveIndex}>
			<DefHeaderButton ink={ButtonInk.PRIMARY} onClick={onAddJoinClicked}>
				<span>{Lang.CONSOLE.CONNECTED_SPACE.ADD_SUBJECT_JOIN}</span>
			</DefHeaderButton>
		</HeaderCell>
		<HeaderCell active={activeIndex === 5} activeIndex={5} label={Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_DEF_OVERVIEW}
		            onClick={onChangeActiveIndex} next={false}/>
	</SubjectDefHeader>;
};