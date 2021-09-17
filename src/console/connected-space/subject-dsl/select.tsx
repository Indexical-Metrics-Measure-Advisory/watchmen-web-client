import {Subject, SubjectDataSetColumn} from '@/services/data/tuples/subject-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {Lang} from '@/widgets/langs';
import React, {Fragment} from 'react';
import {v4} from 'uuid';
import {Alias, Comma, NewLine, ParameterLine} from './literal';
import {PrettyComputed, PrettyConstant, PrettyFactor} from './literal-types';
import {buildTopicsMap, fromParameter} from './literal-utils';
import {EmptyPart, PartContent} from './widgets';

interface PrettyColumn extends SubjectDataSetColumn {
	built: PrettyConstant | PrettyFactor | PrettyComputed | null;
}

const beautifyColumns = (options: {
	subject: Subject;
	availableTopicsMap: Map<string, Topic>;
	pickedTopicsMap: Map<string, Topic>;
}): Array<PrettyColumn> => {
	const {subject, availableTopicsMap, pickedTopicsMap} = options;

	return subject.dataset.columns.map(column => {
		return {
			...column,
			built: fromParameter({parameter: column.parameter, availableTopicsMap, pickedTopicsMap})
		};
	});
};

export const Select = (props: {
	subject: Subject;
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
}) => {
	const {subject, availableTopics, pickedTopics} = props;

	const hasSelect = subject.dataset.columns && subject.dataset.columns.length !== 0;
	const {availableTopicsMap, pickedTopicsMap} = buildTopicsMap({availableTopics, pickedTopics});
	const columns = beautifyColumns({subject, pickedTopicsMap, availableTopicsMap});

	return <PartContent>
		{hasSelect
			? columns.map((column, columnIndex, all) => {
				const {alias, built} = column;
				return <Fragment key={v4()}>
					<ParameterLine pretty={built}/>
					<Alias name={alias}/>
					{columnIndex === all.length - 1 ? null : <Comma/>}
					{columnIndex === all.length - 1 ? null : <NewLine/>}
				</Fragment>;
			})
			: <EmptyPart>{Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_NO_SELECT}</EmptyPart>}
	</PartContent>;
};