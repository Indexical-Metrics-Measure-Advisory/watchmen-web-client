import {PipelineStage} from '@/services/data/tuples/pipeline-stage-types';
import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {AlertLabel} from '@/widgets/alert/widgets';
import {
	ICON_APPEND,
	ICON_COLLAPSE_PANEL,
	ICON_DELETE,
	ICON_EXPAND_PANEL,
	ICON_MOVE_DOWN,
	ICON_MOVE_UP,
	ICON_PREPEND
} from '@/widgets/basic/constants';
import {ButtonInk} from '@/widgets/basic/types';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {createStage} from '../../../../data-utils';
import {usePipelineEventBus} from '../../../pipeline-event-bus';
import {PipelineEventTypes} from '../../../pipeline-event-bus-types';
import {HeaderButton} from '../../widgets';
import {useExpanded} from '../stage-effect/use-expanded';
import {useStageEventBus} from '../stage-event-bus';
import {StageEventTypes} from '../stage-event-bus-types';

export enum HeaderOperatorsPosition {
	HEADER = 'header',
	FOOTER = 'footer'
}

export const HeaderOperators = (props: {
	pipeline: Pipeline;
	stage: PipelineStage;
	position: HeaderOperatorsPosition
}) => {
	const {pipeline, stage, position} = props;

	const {fire: fireGlobal} = useEventBus();
	const {fire: firePipeline} = usePipelineEventBus();
	const {fire} = useStageEventBus();
	const expanded = useExpanded(pipeline, stage);

	const onCollapseClicked = () => {
		fire(StageEventTypes.COLLAPSE_CONTENT);
	};
	const onExpandClicked = () => {
		fire(StageEventTypes.EXPAND_CONTENT);
	};
	const onMoveUpClicked = () => {
		const index = pipeline.stages.indexOf(stage);
		pipeline.stages.splice(index, 1);
		pipeline.stages.splice(index - 1, 0, stage);
		firePipeline(PipelineEventTypes.STAGE_SORTED, pipeline);
	};
	const onMoveDownClicked = () => {
		const index = pipeline.stages.indexOf(stage);
		pipeline.stages.splice(index, 1);
		pipeline.stages.splice(index + 1, 0, stage);
		firePipeline(PipelineEventTypes.STAGE_SORTED, pipeline);
	};
	const onAppendClicked = () => {
		const nextStage = createStage();
		const index = pipeline.stages.indexOf(stage);
		pipeline.stages.splice(index + 1, 0, nextStage);
		firePipeline(PipelineEventTypes.STAGE_ADDED, nextStage, pipeline);
	};
	const onPrependClicked = () => {
		const previousStage = createStage();
		const index = pipeline.stages.indexOf(stage);
		pipeline.stages.splice(index, 0, previousStage);
		firePipeline(PipelineEventTypes.STAGE_ADDED, previousStage, pipeline);
	};
	const onDeleteClicked = () => {
		if (pipeline.stages.length === 1) {
			fireGlobal(EventTypes.SHOW_ALERT,
				<AlertLabel>
					Cannot delete because of at lease one stage in pipeline.
				</AlertLabel>);
		} else {
			const index = pipeline.stages.indexOf(stage);
			if (index !== -1) {
				pipeline.stages.splice(index, 1);
				firePipeline(PipelineEventTypes.STAGE_REMOVED, stage, pipeline);
			}
		}
	};

	const index = pipeline.stages.indexOf(stage) + 1;

	return <>
		{expanded && pipeline.stages.length !== 1
			? <HeaderButton ink={ButtonInk.DANGER} onClick={onDeleteClicked} data-role="delete-button">
				<FontAwesomeIcon icon={ICON_DELETE}/>
				<span>Delete Me</span>
			</HeaderButton>
			: null}
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
		{expanded && index !== 1
			? <HeaderButton ink={ButtonInk.PRIMARY} onClick={onMoveUpClicked}>
				<FontAwesomeIcon icon={ICON_MOVE_UP}/>
				<span>Up</span>
			</HeaderButton>
			: null}
		{expanded && index !== pipeline.stages.length
			? <HeaderButton ink={ButtonInk.PRIMARY} onClick={onMoveDownClicked}>
				<FontAwesomeIcon icon={ICON_MOVE_DOWN}/>
				<span>Down</span>
			</HeaderButton>
			: null}
		{expanded && position === HeaderOperatorsPosition.HEADER
			? <HeaderButton ink={ButtonInk.PRIMARY} onClick={onPrependClicked}>
				<FontAwesomeIcon icon={ICON_PREPEND} rotation={270} transform={{y: 2}}/>
				<span>Prepend</span>
			</HeaderButton>
			: null}
		{expanded && position === HeaderOperatorsPosition.FOOTER
			? <HeaderButton ink={ButtonInk.PRIMARY} onClick={onAppendClicked}>
				<FontAwesomeIcon icon={ICON_APPEND} rotation={90} transform={{y: 2}}/>
				<span>Append</span>
			</HeaderButton>
			: null}
	</>;
};