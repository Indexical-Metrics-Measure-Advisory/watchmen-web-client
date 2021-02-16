import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { AlertLabel } from '../../../../../../alert/widgets';
import {
	ICON_ADD,
	ICON_COLLAPSE_PANEL,
	ICON_DELETE,
	ICON_EXPAND_PANEL
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
import { FooterButtons, FooterLeadLabel, HeaderButton } from '../../widgets';
import { useUnitEventBus } from '../unit-event-bus';
import { UnitEventTypes } from '../unit-event-bus-types';
import { UnitFooterContainer } from './widgets';

export const UnitFooter = (props: {
	pipeline: Pipeline;
	stage: PipelineStage;
	unit: PipelineStageUnit;
}) => {
	const { pipeline, stage, unit } = props;

	const { fire: fireGlobal } = useEventBus();
	const { fire: fireStage } = useStageEventBus();
	const { fire } = useUnitEventBus();
	const [ expanded, setExpanded ] = useState(true);
	const onCollapseClicked = () => {
		setExpanded(false);
		fire(UnitEventTypes.COLLAPSE_CONTENT);
	};
	const onExpandClicked = () => {
		setExpanded(true);
		fire(UnitEventTypes.EXPAND_CONTENT);
	};
	const onAppendClicked = () => {
		const nextUnit = createUnit();
		const index = stage.units.indexOf(unit);
		stage.units.splice(index + 1, 0, nextUnit);
		fireStage(StageEventTypes.UNIT_ADDED, nextUnit, stage);
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

	const stageIndex = pipeline.stages.indexOf(stage) + 1;
	const unitIndex = stage.units.indexOf(unit) + 1;

	return <UnitFooterContainer>
		<FooterLeadLabel>End of Unit #{stageIndex}.{unitIndex}</FooterLeadLabel>
		<FooterButtons>
			{expanded
				? <HeaderButton ink={ButtonInk.PRIMARY} onClick={onCollapseClicked}>
					<FontAwesomeIcon icon={ICON_COLLAPSE_PANEL}/>
					<span>Collapse Unit</span>
				</HeaderButton>
				: null}
			{expanded
				? null
				: <HeaderButton ink={ButtonInk.PRIMARY} onClick={onExpandClicked}>
					<FontAwesomeIcon icon={ICON_EXPAND_PANEL}/>
					<span>Expand Unit</span>
				</HeaderButton>}
			<HeaderButton ink={ButtonInk.PRIMARY} onClick={onAppendClicked}>
				<FontAwesomeIcon icon={ICON_ADD}/>
				<span>Append Unit</span>
			</HeaderButton>
			{stage.units.length !== 1
				? <HeaderButton ink={ButtonInk.DANGER} onClick={onDeleteClicked}>
					<FontAwesomeIcon icon={ICON_DELETE}/>
					<span>Delete This Unit</span>
				</HeaderButton>
				: null}
		</FooterButtons>
	</UnitFooterContainer>;
};