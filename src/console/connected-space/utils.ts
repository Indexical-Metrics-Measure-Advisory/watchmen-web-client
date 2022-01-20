import {isAdmin, isSuperAdmin} from '@/services/data/account';
import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';

// template is only available for administrators
export const isTemplateConnectedSpace = (connectedSpace: ConnectedSpace) => {
	return isAdmin() && !isSuperAdmin() && connectedSpace.isTemplate;
};