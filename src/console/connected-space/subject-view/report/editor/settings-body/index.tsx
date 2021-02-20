import React from 'react';
import { Report } from '../../../../../../services/tuples/report-types';
import { RectSection } from '../rect';
import { StylesSection } from '../styles';
import { DescriptionPropEditor } from './description-prop';
import { NamePropEditor } from './name-prop';
import { SettingsBodyContainer } from './widgets';

export const SettingsBody = (props: { report: Report }) => {
	const { report } = props;

	return <SettingsBodyContainer>
		<NamePropEditor report={report}/>
		<RectSection report={report}/>
		<StylesSection report={report}/>
		<DescriptionPropEditor report={report}/>
	</SettingsBodyContainer>;
};