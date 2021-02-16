import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { AlertLabel } from '../../../../../../alert/widgets';
import {
	ICON_ADD,
	ICON_COLLAPSE_PANEL,
	ICON_DELETE,
	ICON_EXPAND_PANEL,
	ICON_MOVE_DOWN,
	ICON_MOVE_UP
} from '../../../../../../basic-widgets/constants';
import { ButtonInk } from '../../../../../../basic-widgets/types';
import { useEventBus } from '../../../../../../events/event-bus';
import { EventTypes } from '../../../../../../events/types';
import { PipelineStage } from '../../../../../../services/tuples/pipeline-stage-types';
import { PipelineStageUnit } from '../../../../../../services/tuples/pipeline-stage-unit-types';
import { Pipeline } from '../../../../../../services/tuples/pipeline-types';
import { createUnit } from '../../../../data-utils';
import { useStageEventBus } from '../../stage/stage-event-bus';
import { StageEventTypes } from '../../stage/stage-event-bus-types';
import { HeaderButton } from '../../widgets';
import { useExpanded } from '../unit-effect/use-expanded';
import { useUnitEventBus } from '../unit-event-bus';
import { UnitEventTypes } from '../unit-event-bus-types';

export enum HeaderOperatorsPosition {
	HEADER = 'header',
	FOOTER = 'footer'
}

export const HeaderOperators = (props: {
	pipeline: Pipeline;
	stage: PipelineStage;
	unit: PipelineStageUnit;
	position: HeaderOperatorsPosition;
}) => {
	const { stage, unit, position } = props;

	const { fire: fireGlobal } = useEventBus();
	const { fire: fireStage } = useStageEventBus();
	const { fire } = useUnitEventBus();
	const expanded = useExpanded();

	const onCollapseClicked = () => {
		fire(UnitEventTypes.COLLAPSE_CONTENT);
	};
	const onExpandClicked = () => {
		fire(UnitEventTypes.EXPAND_CONTENT);
	};
	const onMoveUpClicked = () => {
		const index = stage.units.indexOf(unit);
		stage.units.splice(index, 1);
		stage.units.splice(index - 1, 0, unit);
		fireStage(StageEventTypes.UNIT_SORTED, stage);
	};
	const onMoveDownClicked = () => {
		const index = stage.units.indexOf(unit);
		stage.units.splice(index, 1);
		stage.units.splice(index + 1, 0, unit);
		fireStage(StageEventTypes.UNIT_SORTED, stage);
	};
	const onAppendClicked = () => {
		const nextUnit = createUnit();
		const index = stage.units.indexOf(unit);
		stage.units.splice(index + 1, 0, nextUnit);
		fireStage(StageEventTypes.UNIT_ADDED, nextUnit, stage);
	};
	const onPrependClicked = () => {
		const previousUnit = createUnit();
		const index = stage.units.indexOf(unit);
		stage.units.splice(index, 0, previousUnit);
		fireStage(StageEventTypes.UNIT_ADDED, previousUnit, stage);
	};
	const onDeleteClicked = () => {
		if (stage.units.length === 1) {
			fireGlobal(EventTypes.SHOW_ALERT,
				<AlertLabel>
					Cannot delete because of at lease one unit in stage.
				</AlertLabel>);
		} else {
			const index = stage.units.indexOf(unit);
			if (index !== -1) {
				stage.units.splice(index, 1);
				fireStage(StageEventTypes.UNIT_REMOVED, unit, stage);
			}
		}
	};

	const unitIndex = stage.units.indexOf(unit) + 1;

	return <>
		{expanded
			? <HeaderButton ink={ButtonInk.PRIMARY} onClick={onCollapseClicked}>
				<FontAwesomeIcon icon={ICON_COLLAPSE_PANEL}/>
				<span>Collapse</span>
			</HeaderButton>
			: null}
		{expanded
			? null
			: <HeaderButton ink={ButtonInk.PRIMARY} onClick={onExpandClicked}>
				<FontAwesomeIcon icon={ICON_EXPAND_PANEL}/>
				<span>Expand</span>
			</HeaderButton>}
		{expanded && unitIndex !== 1
			? <HeaderButton ink={ButtonInk.PRIMARY} onClick={onMoveUpClicked}>
				<FontAwesomeIcon icon={ICON_MOVE_UP}/>
				<span>Up</span>
			</HeaderButton>
			: null}
		{expanded && unitIndex !== stage.units.length
			? <HeaderButton ink={ButtonInk.PRIMARY} onClick={onMoveDownClicked}>
				<FontAwesomeIcon icon={ICON_MOVE_DOWN}/>
				<span>Down</span>
			</HeaderButton>
			: null}
		{expanded && position === HeaderOperatorsPosition.FOOTER
			? <HeaderButton ink={ButtonInk.PRIMARY} onClick={onAppendClicked}>
				<FontAwesomeIcon icon={ICON_ADD}/>
				<span>Append</span>
			</HeaderButton>
			: null}
		{expanded && position === HeaderOperatorsPosition.HEADER
			? <HeaderButton ink={ButtonInk.PRIMARY} onClick={onPrependClicked}>
				<FontAwesomeIcon icon={ICON_ADD}/>
				<span>Prepend</span>
			</HeaderButton>
			: null}
		{expanded && stage.units.length !== 1
			? <HeaderButton ink={ButtonInk.DANGER} onClick={onDeleteClicked}>
				<FontAwesomeIcon icon={ICON_DELETE}/>
				<span>Delete Me</span>
			</HeaderButton>
			: null}
	</>;
};