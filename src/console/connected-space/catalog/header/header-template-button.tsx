import {saveConnectedSpace} from '@/services/data/tuples/connected-space';
import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {ICON_TEMPLATE} from '@/widgets/basic/constants';
import {PageHeaderButton} from '@/widgets/basic/page-header-buttons';
import {useForceUpdate} from '@/widgets/basic/utils';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

const TemplateIcon = styled(FontAwesomeIcon).attrs<{ 'data-template': boolean }>(({'data-template': template}) => {
	return {
		style: {color: template ? 'var(--warn-color)' : (void 0)}
	};
})`
	transition : color 300ms ease-in-out;
`;

export const HeaderTemplateButton = (props: { connectedSpace: ConnectedSpace }) => {
	const {connectedSpace} = props;
	const {fire: fireGlobal} = useEventBus();
	const forceUpdate = useForceUpdate();

	const onSetTemplateClicked = () => {
		connectedSpace.isTemplate = !connectedSpace.isTemplate;
		fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
			async () => await saveConnectedSpace(connectedSpace),
			() => forceUpdate());
	};

	const template = connectedSpace.isTemplate;

	return <PageHeaderButton
		tooltip={template ? Lang.CONSOLE.CONNECTED_SPACE.REMOVE_FROM_TEMPLATE : Lang.CONSOLE.CONNECTED_SPACE.SET_AS_TEMPLATE}
		onClick={onSetTemplateClicked}>
		<TemplateIcon icon={ICON_TEMPLATE} data-template={template}/>
	</PageHeaderButton>;
};