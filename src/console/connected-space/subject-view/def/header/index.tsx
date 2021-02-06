import React from 'react';
import { Lang } from '../../../../../langs';
import { HeaderCell } from './header-cell';
import { DefHeaderCell, DefHeaderIndex, SubjectDefHeader } from '../widgets';

export const Header = (props: { activeIndex: number, changeActiveIndex: (activeIndex: number) => void }) => {
	const { activeIndex, changeActiveIndex } = props;

	const onChangeActiveIndex = (nextActiveIndex: number) => {
		if (nextActiveIndex === activeIndex) {
			return;
		}
		changeActiveIndex(nextActiveIndex);
	};
	const onPickTopicsClicked = () => onChangeActiveIndex(1);

	return <SubjectDefHeader activeIndex={activeIndex}>
		<DefHeaderCell onClick={onPickTopicsClicked}>
			<DefHeaderIndex>1</DefHeaderIndex>
			<span>{Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_PICK_TOPICS}</span>
		</DefHeaderCell>
		<HeaderCell activeIndex={2} label={Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_DEFINE_COLUMNS}
		            onClick={onChangeActiveIndex}/>
		<HeaderCell activeIndex={3} label={Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_FILTER_DATA}
		            onClick={onChangeActiveIndex}/>
		<HeaderCell activeIndex={4} label={Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_SET_JOINS}
		            onClick={onChangeActiveIndex}/>
		<HeaderCell activeIndex={5} label={Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_DEF_OVERVIEW}
		            onClick={onChangeActiveIndex}/>
	</SubjectDefHeader>;
};