import React, {useEffect} from 'react';
import {prepareAdminDB} from '../../local-persist';

export const AdminCache = () => {
	useEffect(() => {
		prepareAdminDB();
	});

	return <></>;
};