import React from 'react';
import { Lang } from '../../../../../langs';
import { HeaderCell } from './header-cell';
import { SubjectDefHeader } from './widgets';

export const Header = (props: { activeIndex: number, changeActiveIndex: (activeIndex: number) => void }) => {
	const { activeIndex, changeActiveIndex } = props;

	const onChangeActiveIndex = (nextActiveIndex: number) => {
		if (nextActiveIndex === activeIndex) {
			return;
		}
		changeActiveIndex(nextActiveIndex);
	};

	return <SubjectDefHeader activeIndex={activeIndex}>
		<HeaderCell active={activeIndex === 1} activeIndex={1} label={Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_PICK_TOPICS}
		            onClick={onChangeActiveIndex}
		            checkPickedTopicBeforeActive={false} checkPickedTopicBeforeNext={true}/>
		<HeaderCell active={activeIndex === 2} activeIndex={2}
		            label={Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_DEFINE_COLUMNS}
		            onClick={onChangeActiveIndex}/>
		<HeaderCell active={activeIndex === 3} activeIndex={3} label={Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_FILTER_DATA}
		            onClick={onChangeActiveIndex}/>
		<HeaderCell active={activeIndex === 4} activeIndex={4} label={Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_SET_JOINS}
		            onClick={onChangeActiveIndex}/>
		<HeaderCell active={activeIndex === 5} activeIndex={5} label={Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_DEF_OVERVIEW}
		            onClick={onChangeActiveIndex} next={false}/>
	</SubjectDefHeader>;
};