import React from 'react';
import { Lang } from '../../../../langs';
import { DefHeaderCell, DefHeaderIndex, SubjectDefHeader } from './widgets';

export const DefHeader = (props: { activeIndex: number, changeActiveIndex: (activeIndex: number) => void }) => {
	const { activeIndex, changeActiveIndex } = props;

	const onClicked = (nextActiveIndex: number) => () => {
		if (nextActiveIndex === activeIndex) {
			return;
		}
		changeActiveIndex(nextActiveIndex);
	};
	return <SubjectDefHeader activeIndex={activeIndex}>
		<DefHeaderCell onClick={onClicked(1)}>
			<DefHeaderIndex>1</DefHeaderIndex>
			<span>{Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_PICK_TOPICS}</span>
		</DefHeaderCell>
		<DefHeaderCell onClick={onClicked(2)}>
			<DefHeaderIndex>2</DefHeaderIndex>
			<span>{Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_DEFINE_COLUMNS}</span>
		</DefHeaderCell>
		<DefHeaderCell onClick={onClicked(3)}>
			<DefHeaderIndex>3</DefHeaderIndex>
			<span>{Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_FILTER_DATA}</span>
		</DefHeaderCell>
		<DefHeaderCell onClick={onClicked(4)}>
			<DefHeaderIndex>4</DefHeaderIndex>
			<span>{Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_SET_JOINS}</span>
		</DefHeaderCell>
		<DefHeaderCell onClick={onClicked(5)}>
			<DefHeaderIndex>5</DefHeaderIndex>
			<span>{Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_DEF_OVERVIEW}</span>
		</DefHeaderCell>
	</SubjectDefHeader>;
};