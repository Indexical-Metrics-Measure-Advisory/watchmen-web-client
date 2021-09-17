import {Report} from '@/services/data/tuples/report-types';
import React from 'react';
import {Explanation, ExplanationOl, ExplanationOlLi, ExplanationUl, ExplanationUlLi} from './widgets';

const ReportEditor = (props: { report: Report }) => {
	return <>
		<Explanation>Report Types:</Explanation>
		<ExplanationUl>
			<ExplanationUlLi>
				Predefined reports are shared following space assignment, only administrators are empowered to create.
			</ExplanationUlLi>
			<ExplanationUlLi>
				User-defined reports are private, can be created and modified by user himself/herself only.
			</ExplanationUlLi>
		</ExplanationUl>
		<Explanation>Guide to Create or Edit Report:</Explanation>
		<ExplanationOl>
			<ExplanationOlLi>Create an user group, include yourself into this group,</ExplanationOlLi>
			<ExplanationOlLi>Create a new space or pick an existed one,</ExplanationOlLi>
			<ExplanationOlLi>Grant space to user group in step (1),</ExplanationOlLi>
			<ExplanationOlLi>Open client console and sign-in,</ExplanationOlLi>
			<ExplanationOlLi>Find space in step (3), and connect,</ExplanationOlLi>
			<ExplanationOlLi>Create reports in connected space, and set as predefined.</ExplanationOlLi>
		</ExplanationOl>
	</>;
};
export const renderEditor = (report: Report) => {
	return <ReportEditor report={report}/>;
};
