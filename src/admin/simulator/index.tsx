import {AdminMain} from '../pipelines/widgets';
import {FullWidthPage} from '../../basic-widgets/page';
import React from 'react';
import {Header, HeaderTitle} from '../pipelines/catalog/widgets';

const AdminDebugIndex = () => {
	return <AdminMain>
		<FullWidthPage>
			<Header>
				<HeaderTitle>Pipeline Simulator</HeaderTitle>
			</Header>
		</FullWidthPage>
	</AdminMain>;
};

export default AdminDebugIndex;