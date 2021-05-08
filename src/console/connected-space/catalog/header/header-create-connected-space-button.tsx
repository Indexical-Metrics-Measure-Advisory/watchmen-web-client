import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {ICON_CONNECTION} from '../../../../basic-widgets/constants';
import {PageHeaderButton} from '../../../../basic-widgets/page-header-buttons';
import {Lang} from '../../../../langs';
import {useConnectSpace} from '../../../widgets/use-connect-space';

export const HeaderCreateConnectedSpaceButton = () => {
    const onConnectSpaceClicked = useConnectSpace();

    return <PageHeaderButton tooltip={Lang.CONSOLE.CONNECTED_SPACE.ADD_CONNECTED_SPACE} onClick={onConnectSpaceClicked}>
        <FontAwesomeIcon icon={ICON_CONNECTION}/>
    </PageHeaderButton>;
};