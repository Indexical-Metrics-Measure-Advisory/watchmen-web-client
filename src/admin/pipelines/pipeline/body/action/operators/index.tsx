import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {AlertLabel} from '../../../../../../alert/widgets';
import {
	ICON_APPEND,
	ICON_DELETE,
	ICON_MOVE_DOWN,
	ICON_MOVE_UP,
	ICON_PREPEND
} from '../../../../../../basic-widgets/constants';
import {ButtonInk} from '../../../../../../basic-widgets/types';
import {useEventBus} from '../../../../../../events/event-bus';
import {EventTypes} from '../../../../../../events/types';
import {PipelineStageUnitAction} from '../../../../../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {PipelineStageUnit} from '../../../../../../services/tuples/pipeline-stage-unit-types';
import {createAction} from '../../../../data-utils';
import {useUnitEventBus} from '../../unit/unit-event-bus';
import {UnitEventTypes} from '../../unit/unit-event-bus-types';
import {HeaderButton, HeaderButtons} from '../../widgets';

export const Operators = (props: { unit: PipelineStageUnit, action: PipelineStageUnitAction }) => {
	const {unit, action} = props;

	const {fire: fireGlobal} = useEventBus();
	const {fire: fireUnit} = useUnitEventBus();

	const onMoveUpClicked = () => {
		const index = unit.do.indexOf(action);
		unit.do.splice(index, 1);
		unit.do.splice(index - 1, 0, action);
		fireUnit(UnitEventTypes.ACTION_SORTED, unit);
	};
	const onMoveDownClicked = () => {
		const index = unit.do.indexOf(action);
		unit.do.splice(index, 1);
		unit.do.splice(index + 1, 0, action);
		fireUnit(UnitEventTypes.ACTION_SORTED, unit);
	};
	const onAppendClicked = () => {
		const nextAction = createAction();
		const index = unit.do.indexOf(action);
		unit.do.splice(index + 1, 0, nextAction);
		fireUnit(UnitEventTypes.ACTION_ADDED, nextAction, unit);
	};
	const onPrependClicked = () => {
		const previousAction = createAction();
		const index = unit.do.indexOf(action);
		unit.do.splice(index, 0, previousAction);
		fireUnit(UnitEventTypes.ACTION_ADDED, previousAction, unit);
	};
	const onDeleteClicked = () => {
		if (unit.do.length === 1) {
			fireGlobal(EventTypes.SHOW_ALERT,
				<AlertLabel>
					Cannot delete because of at lease one unit in stage.
				</AlertLabel>);
		} else {
			const index = unit.do.indexOf(action);
			if (index !== -1) {
				unit.do.splice(index, 1);
				fireUnit(UnitEventTypes.ACTION_REMOVED, action, unit);
			}
		}
	};

	const actionIndex = unit.do.indexOf(action) + 1;

	return <HeaderButtons>
		{actionIndex !== 1
			? <HeaderButton ink={ButtonInk.PRIMARY} onClick={onMoveUpClicked}>
				<FontAwesomeIcon icon={ICON_MOVE_UP}/>
				<span>Up</span>
			</HeaderButton>
			: null}
		{actionIndex !== unit.do.length
			? <HeaderButton ink={ButtonInk.PRIMARY} onClick={onMoveDownClicked}>
				<FontAwesomeIcon icon={ICON_MOVE_DOWN}/>
				<span>Down</span>
			</HeaderButton>
			: null}
		<HeaderButton ink={ButtonInk.PRIMARY} onClick={onPrependClicked}>
			<FontAwesomeIcon icon={ICON_PREPEND} rotation={270} transform={{y: 2}}/>
			<span>Prepend</span>
		</HeaderButton>
		<HeaderButton ink={ButtonInk.PRIMARY} onClick={onAppendClicked}>
			<FontAwesomeIcon icon={ICON_APPEND} rotation={90} transform={{y: 2}}/>
			<span>Append</span>
		</HeaderButton>
		{unit.do.length !== 1
			? <HeaderButton ink={ButtonInk.DANGER} onClick={onDeleteClicked}>
				<FontAwesomeIcon icon={ICON_DELETE}/>
				<span>Delete Me</span>
			</HeaderButton>
			: null}
	</HeaderButtons>;
};