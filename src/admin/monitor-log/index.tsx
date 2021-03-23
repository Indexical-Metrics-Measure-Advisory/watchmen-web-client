import React from 'react';
import { FullWidthPage } from '../../basic-widgets/page';
import { SearchCriteria } from './search-criteria';
import { Body, Header, HeaderTitle } from './widgets';

const AdminMonitorLogsIndex = () => {
	return <FullWidthPage>
		<Header>
			<HeaderTitle>Monitor Logs</HeaderTitle>
		</Header>
		<Body>
			<SearchCriteria />
		</Body>
	</FullWidthPage>;
};

export default AdminMonitorLogsIndex;