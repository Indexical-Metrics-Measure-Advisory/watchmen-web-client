import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import {ICON_TEMPLATE} from '../../../../basic-widgets/constants';
import {PageHeaderButton} from '../../../../basic-widgets/page-header-buttons';
import {useEventBus} from '../../../../events/event-bus';
import {EventTypes} from '../../../../events/types';
import {Lang} from '../../../../langs';
import {ConnectedSpace} from '../../../../services/tuples/connected-space-types';
import {saveConnectedSpace} from '../../../../services/tuples/connected-space';
import {useForceUpdate} from '../../../../basic-widgets/utils';

const TemplateIcon = styled(FontAwesomeIcon).attrs<{ 'data-template': boolean }>(({'data-template': template}) => {
	return {
		style: {color: template ? 'var(--warn-color)' : (void 0)}
	};
})`
	transition: color 300ms ease-in-out;
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