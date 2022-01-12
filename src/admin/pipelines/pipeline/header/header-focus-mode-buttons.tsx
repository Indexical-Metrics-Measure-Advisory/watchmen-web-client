import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {ICON_COLLAPSE_PANEL, ICON_EXPAND_PANEL, ICON_FREE_WALK, ICON_STAGE, ICON_UNIT} from '@/widgets/basic/constants';
import {PageHeaderButton} from '@/widgets/basic/page-header-buttons';
import {ButtonInk} from '@/widgets/basic/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect, useState} from 'react';
import {usePipelineEventBus} from '../pipeline-event-bus';
import {PipelineEventTypes, PipelineFocusMode} from '../pipeline-event-bus-types';

export const HeaderFocusModeButtons = (props: { pipeline: Pipeline }) => {
	const {pipeline} = props;

	const {fire} = usePipelineEventBus();
	const [focusMode, setFocusMode] = useState<PipelineFocusMode>(PipelineFocusMode.FREE_WALK);
	// play this effect only on pipeline changed
	useEffect(() => {
		fire(PipelineEventTypes.ASK_FOCUS_MODE, pipeline, (mode) => {
			if (focusMode !== mode) {
				setFocusMode(mode);
			}
		});
		// eslint-disable-next-line
	}, [fire, pipeline]);

	const onFocusOnUnitClicked = () => {
		if (focusMode === PipelineFocusMode.UNIT) {
			return;
		}
		setFocusMode(PipelineFocusMode.UNIT);
		fire(PipelineEventTypes.FOCUS_MODE_CHANGED, pipeline, PipelineFocusMode.UNIT);
		fire(PipelineEventTypes.COLLAPSE_ALL, pipeline);
	};
	const onFocusOnStageClicked = () => {
		if (focusMode === PipelineFocusMode.STAGE) {
			return;
		}
		setFocusMode(PipelineFocusMode.STAGE);
		fire(PipelineEventTypes.FOCUS_MODE_CHANGED, pipeline, PipelineFocusMode.STAGE);
		fire(PipelineEventTypes.COLLAPSE_ALL, pipeline);
	};
	const onFreeWalkClicked = () => {
		if (focusMode === PipelineFocusMode.FREE_WALK) {
			return;
		}
		setFocusMode(PipelineFocusMode.FREE_WALK);
		fire(PipelineEventTypes.FOCUS_MODE_CHANGED, pipeline, PipelineFocusMode.FREE_WALK);
	};
	const onExpandAllClicked = () => {
		fire(PipelineEventTypes.EXPAND_ALL, pipeline);
	};
	const onCollapseAllClicked = () => {
		fire(PipelineEventTypes.COLLAPSE_ALL, pipeline);
	};

	return <>
		<PageHeaderButton tooltip="Focus on Unit"
		                  ink={focusMode === PipelineFocusMode.UNIT ? ButtonInk.PRIMARY : undefined}
		                  onClick={onFocusOnUnitClicked}>
			<FontAwesomeIcon icon={ICON_UNIT}/>
		</PageHeaderButton>
		<PageHeaderButton tooltip="Focus on Stage"
		                  ink={focusMode === PipelineFocusMode.STAGE ? ButtonInk.PRIMARY : undefined}
		                  onClick={onFocusOnStageClicked}>
			<FontAwesomeIcon icon={ICON_STAGE}/>
		</PageHeaderButton>
		<PageHeaderButton tooltip="Free Walk"
		                  ink={focusMode === PipelineFocusMode.FREE_WALK ? ButtonInk.PRIMARY : undefined}
		                  onClick={onFreeWalkClicked}>
			<FontAwesomeIcon icon={ICON_FREE_WALK}/>
		</PageHeaderButton>
		{focusMode === PipelineFocusMode.FREE_WALK
			? <>
				<PageHeaderButton tooltip="Expand All" onClick={onExpandAllClicked}>
					<FontAwesomeIcon icon={ICON_EXPAND_PANEL}/>
				</PageHeaderButton>
				<PageHeaderButton tooltip="Collapse All" onClick={onCollapseAllClicked}>
					<FontAwesomeIcon icon={ICON_COLLAPSE_PANEL}/>
				</PageHeaderButton>
			</>
			: null
		}
	</>;
};