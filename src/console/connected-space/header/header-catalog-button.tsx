import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {matchPath, useHistory} from 'react-router-dom';
import {ICON_CONNECTED_SPACE_CATALOG} from '../../../basic-widgets/constants';
import {PageHeaderButton} from '../../../basic-widgets/page-header-buttons';
import {ButtonInk} from '../../../basic-widgets/types';
import {Lang} from '../../../langs';
import {Router} from '../../../routes/types';
import {toConnectedSpaceCatalog} from '../../../routes/utils';
import {ConnectedSpace} from '../../../services/tuples/connected-space-types';

const isCatalogNow = () => !!matchPath(window.location.pathname, Router.CONSOLE_CONNECTED_SPACE_CATALOG);

export const HeaderCatalogButton = (props: { connectedSpace: ConnectedSpace }) => {
    const {connectedSpace} = props;

    const history = useHistory();

    const onCatalogClicked = () => {
        if (isCatalogNow()) {
            return;
        }
        history.push(toConnectedSpaceCatalog(connectedSpace.connectId));
    };

    return <PageHeaderButton tooltip={Lang.CONSOLE.CONNECTED_SPACE.CATALOG}
                             ink={isCatalogNow() ? ButtonInk.PRIMARY : (void 0)}
                             onClick={onCatalogClicked}>
        <FontAwesomeIcon icon={ICON_CONNECTED_SPACE_CATALOG}/>
    </PageHeaderButton>;
};