import {SubjectDataSetJoin, TopicJoinType} from '@/services/data/tuples/subject-types';
import {BASE_HEIGHT, ICON_EDIT} from '@/widgets/basic/constants';
import {useCollapseFixedThing} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {MouseEvent, useRef, useState} from 'react';
import {useJoinEventBus} from './join-event-bus';
import {JoinEventTypes} from './join-event-bus-types';
import {JoinTypeDropdown, JoinTypeDropdownContainer, JoinTypeDropdownOption} from './widgets';

interface DropdownState {
	visible: boolean;
	top?: number;
	bottom?: number;
	left: number;
}

const Labels: Record<TopicJoinType, string> = {
	[TopicJoinType.INNER]: Lang.JOIN.INNER,
	[TopicJoinType.LEFT]: Lang.JOIN.LEFT,
	[TopicJoinType.RIGHT]: Lang.JOIN.RIGHT
};

export const JoinTypeEdit = (props: { join: SubjectDataSetJoin }) => {
	const {join} = props;

	const containerRef = useRef<HTMLDivElement>(null);
	const {fire} = useJoinEventBus();
	const [state, setState] = useState<DropdownState>({visible: false, top: 0, left: 0});
	useCollapseFixedThing({
		containerRef,
		visible: state.visible,
		hide: () => setState({visible: false, top: 0, left: 0})
	});

	const onStartClicked = () => {
		if (!containerRef.current) {
			return;
		}

		const {top, left, height} = containerRef.current.getBoundingClientRect();
		if (top + height + 2 + BASE_HEIGHT * 2 > window.innerHeight) {
			// at top
			setState({visible: true, bottom: window.innerHeight - top - 1, left});
		} else {
			setState({visible: true, top: top + height + 1, left});
		}
	};
	const onTypeClicked = (value: TopicJoinType) => (event: MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
		if (value === join.type) {
			return;
		}
		join.type = value;
		setState({visible: false, top: 0, left: 0});
		fire(JoinEventTypes.JOIN_TYPE_CHANGED, join);
	};
	let candidates: Array<TopicJoinType>;
	switch (join.type) {
		case TopicJoinType.INNER:
			candidates = [TopicJoinType.LEFT, TopicJoinType.RIGHT];
			break;
		case TopicJoinType.LEFT:
			candidates = [TopicJoinType.INNER, TopicJoinType.RIGHT];
			break;
		case TopicJoinType.RIGHT:
			candidates = [TopicJoinType.INNER, TopicJoinType.LEFT];
			break;
	}

	return <JoinTypeDropdownContainer top={state.top} bottom={state.bottom} onClick={onStartClicked} ref={containerRef}>
		<span>{Labels[join.type]}</span>
		<FontAwesomeIcon icon={ICON_EDIT}/>
		<JoinTypeDropdown {...state}>
			{candidates.map(candidate => {
				return <JoinTypeDropdownOption onClick={onTypeClicked(candidate)}
				                               key={candidate}>
					{Labels[candidate]}
				</JoinTypeDropdownOption>;
			})}
		</JoinTypeDropdown>
	</JoinTypeDropdownContainer>;
};
