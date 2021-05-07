import {Pipeline} from "../../../../services/tuples/pipeline-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
	ICON_COLLAPSE_PANEL,
	ICON_EXPAND_PANEL,
	ICON_FREE_WALK,
	ICON_STAGE,
	ICON_UNIT
} from "../../../../basic-widgets/constants";
import {PageHeaderButton} from "../../../../basic-widgets/page-header-buttons";
import React, {useEffect, useState} from "react";
import {PipelineEventTypes, PipelineFocusMode} from "../pipeline-event-bus-types";
import {usePipelineEventBus} from "../pipeline-event-bus";
import {ButtonInk} from "../../../../basic-widgets/types";

export const HeaderFocusModeButtons = (props: { pipeline: Pipeline }) => {
	const {pipeline} = props;

	const {once, fire} = usePipelineEventBus();
	const [focusMode, setFocusMode] = useState<PipelineFocusMode>(PipelineFocusMode.UNIT)
	// play this effect only on pipeline changed
	useEffect(() => {
		once(PipelineEventTypes.REPLY_FOCUS_MODE, (askedPipeline, mode) => {
			if (pipeline === askedPipeline && focusMode !== mode) {
				setFocusMode(mode)
			}
		}).fire(PipelineEventTypes.ASK_FOCUS_MODE, pipeline)
		// eslint-disable-next-line
	}, [once, pipeline])

	const onFocusOnUnitClicked = () => {
		if (focusMode === PipelineFocusMode.UNIT) {
			return;
		}
		setFocusMode(PipelineFocusMode.UNIT)
		fire(PipelineEventTypes.FOCUS_MODE_CHANGED, pipeline, PipelineFocusMode.UNIT);
		fire(PipelineEventTypes.STAGE_EXPANDED, pipeline, pipeline.stages[0])
		fire(PipelineEventTypes.UNIT_EXPANDED, pipeline, pipeline.stages[0], pipeline.stages[0]?.units[0])
	}
	const onFocusOnStageClicked = () => {
		if (focusMode === PipelineFocusMode.STAGE) {
			return;
		}
		setFocusMode(PipelineFocusMode.STAGE)
		fire(PipelineEventTypes.FOCUS_MODE_CHANGED, pipeline, PipelineFocusMode.STAGE);
		fire(PipelineEventTypes.STAGE_EXPANDED, pipeline, pipeline.stages[0])
	}
	const onFreeWalkClicked = () => {
		if (focusMode === PipelineFocusMode.FREE_WALK) {
			return;
		}
		setFocusMode(PipelineFocusMode.FREE_WALK)
		fire(PipelineEventTypes.FOCUS_MODE_CHANGED, pipeline, PipelineFocusMode.FREE_WALK);
	}
	const onExpandAllClicked = () => {
		fire(PipelineEventTypes.EXPAND_ALL, pipeline);
	};
	const onCollapseAllClicked = () => {
		fire(PipelineEventTypes.COLLAPSE_ALL, pipeline);
	};

	return <>
		<PageHeaderButton tooltip='Focus on Unit'
		                  ink={focusMode === PipelineFocusMode.UNIT ? ButtonInk.PRIMARY : undefined}
		                  onClick={onFocusOnUnitClicked}>
			<FontAwesomeIcon icon={ICON_UNIT}/>
		</PageHeaderButton>
		<PageHeaderButton tooltip='Focus on Stage'
		                  ink={focusMode === PipelineFocusMode.STAGE ? ButtonInk.PRIMARY : undefined}
		                  onClick={onFocusOnStageClicked}>
			<FontAwesomeIcon icon={ICON_STAGE}/>
		</PageHeaderButton>
		<PageHeaderButton tooltip='Free Walk'
		                  ink={focusMode === PipelineFocusMode.FREE_WALK ? ButtonInk.PRIMARY : undefined}
		                  onClick={onFreeWalkClicked}>
			<FontAwesomeIcon icon={ICON_FREE_WALK}/>
		</PageHeaderButton>
		{focusMode === PipelineFocusMode.FREE_WALK
			? <>
				<PageHeaderButton tooltip='Expand All'
				                  onClick={onExpandAllClicked}>
					<FontAwesomeIcon icon={ICON_EXPAND_PANEL}/>
				</PageHeaderButton>
				<PageHeaderButton tooltip='Collapse All to Units'
				                  onClick={onCollapseAllClicked}>
					<FontAwesomeIcon icon={ICON_COLLAPSE_PANEL}/>
				</PageHeaderButton>
			</>
			: null
		}
	</>
}