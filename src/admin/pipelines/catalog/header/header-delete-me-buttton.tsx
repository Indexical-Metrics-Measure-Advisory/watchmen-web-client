import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import {DialogBody, DialogFooter, DialogLabel} from '../../../../dialog/widgets';
import {AssembledPipelinesGraphics} from '../types';
import {useEventBus} from '../../../../events/event-bus';
import {EventTypes} from '../../../../events/types';
import {deletePipelineGraphics} from '../../../../services/tuples/pipeline';
import {Lang} from '../../../../langs';
import {Button} from '../../../../basic-widgets/button';
import {ButtonInk} from '../../../../basic-widgets/types';
import {useCatalogEventBus} from '../catalog-event-bus';
import {CatalogEventTypes} from '../catalog-event-bus-types';
import {PageHeaderButton} from '../../../../basic-widgets/page-header-buttons';
import {ICON_THROW_AWAY} from '../../../../basic-widgets/constants';
import {useAdminCacheEventBus} from '../../../cache/cache-event-bus';
import {AdminCacheEventTypes} from '../../../cache/cache-event-bus-types';

const DeleteDialogBody = styled(DialogBody)`
	flex-direction: column;
	margin-bottom: var(--margin);
`;
const NameUrl = styled.div`
	color: var(--info-color);
	font-weight: var(--font-bold);
	padding-top: calc(var(--margin) / 2);
	word-break: break-all;
	line-height: var(--line-height);
`;

const PipelineGraphicsDelete = (props: { graphics: AssembledPipelinesGraphics, onRemoved: () => void }) => {
	const {graphics, onRemoved} = props;

	const {fire} = useEventBus();

	const onDeleteClicked = async () => {
		fire(EventTypes.HIDE_DIALOG);
		fire(EventTypes.INVOKE_REMOTE_REQUEST,
			async () => await deletePipelineGraphics(graphics.pipelineGraphId),
			async () => onRemoved());
	};
	const onCancelClicked = () => {
		fire(EventTypes.HIDE_DIALOG);
	};

	return <>
		<DeleteDialogBody>
			<DialogLabel>Are you sure to delete pipeline group? Please note that deletion cannot be
				recovered.</DialogLabel>
			<NameUrl>{graphics.name}</NameUrl>
		</DeleteDialogBody>
		<DialogFooter>
			<Button ink={ButtonInk.DANGER} onClick={onDeleteClicked}>{Lang.ACTIONS.DELETE}</Button>
			<Button ink={ButtonInk.PRIMARY} onClick={onCancelClicked}>{Lang.ACTIONS.CANCEL}</Button>
		</DialogFooter>
	</>;
};

export const HeaderDeleteMeButton = (props: { graphics: AssembledPipelinesGraphics }) => {
	const {graphics} = props;
	const {fire: fireGlobal} = useEventBus();
	const {fire: fireCache} = useAdminCacheEventBus();
	const {fire} = useCatalogEventBus();

	const onDeleted = async () => {
		fireCache(AdminCacheEventTypes.REMOVE_PIPELINES_GRAPHICS, graphics.pipelineGraphId);
		fire(CatalogEventTypes.GRAPHICS_REMOVED, graphics);
	};
	const onDeleteClicked = () => {
		fireGlobal(EventTypes.SHOW_DIALOG,
			<PipelineGraphicsDelete graphics={graphics} onRemoved={onDeleted}/>);
	};

	return <PageHeaderButton tooltip="Delete Me" onClick={onDeleteClicked}>
		<FontAwesomeIcon icon={ICON_THROW_AWAY}/>
	</PageHeaderButton>;
};