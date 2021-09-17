import {ParameterJointType} from '@/services/data/tuples/factor-calculator-types';
import {
	Subject,
	SubjectDataSetFilter,
	SubjectDataSetFilterExpression,
	SubjectDataSetFilterJoint
} from '@/services/data/tuples/subject-types';
import {isExpressionFilter, isJointFilter} from '@/services/data/tuples/subject-utils';
import {Topic} from '@/services/data/tuples/topic-types';
import {Lang} from '@/widgets/langs';
import React, {Fragment} from 'react';
import {v4} from 'uuid';
import {FilterExpressionOperatorLabels} from '../../constants/parameter-constants';
import {JointAnd, JointOr, NewLine, NoStatement, ParameterLine, UnknownFilter} from './literal';
import {buildTopicsMap, fromParameter} from './literal-utils';
import {BracketNode, FilterExpressionOperatorNode} from './literal-widgets';
import {EmptyPart, PartContent} from './widgets';

const FilterExpression = (props: {
	subject: Subject;
	expression: SubjectDataSetFilterExpression;
	availableTopicsMap: Map<string, Topic>;
	pickedTopicsMap: Map<string, Topic>;
}) => {
	const {expression: {left, operator, right}, availableTopicsMap, pickedTopicsMap} = props;

	const buildLeft = fromParameter({parameter: left, availableTopicsMap, pickedTopicsMap});
	const buildRight = fromParameter({parameter: right, availableTopicsMap, pickedTopicsMap});

	return <>
		<ParameterLine pretty={buildLeft}/>
		<FilterExpressionOperatorNode>{FilterExpressionOperatorLabels[operator]}</FilterExpressionOperatorNode>
		<ParameterLine pretty={buildRight}/>
	</>;
};

const FilterJoint = (props: {
	subject: Subject;
	joint: SubjectDataSetFilterJoint;
	availableTopicsMap: Map<string, Topic>;
	pickedTopicsMap: Map<string, Topic>;
	indent: number;
}) => {
	const {subject, joint: {jointType, filters}, availableTopicsMap, pickedTopicsMap, indent} = props;

	return <>
		{filters.length === 0
			? <NoStatement/>
			: filters.map((filter, filterIndex) => {
				return <Fragment key={v4()}>
					{filterIndex !== 0
						? <NewLine/>
						: null}
					{filterIndex !== 0
						? (jointType === ParameterJointType.OR
							? <JointOr indent={indent}/>
							: <JointAnd indent={indent}/>)
						: null}
					<Filter subject={subject} filter={filter}
					        availableTopicsMap={availableTopicsMap} pickedTopicsMap={pickedTopicsMap}
					        indent={indent + 1}/>
				</Fragment>;
			})}
	</>;
};

const Filter = (props: {
	subject: Subject;
	filter: SubjectDataSetFilter;
	availableTopicsMap: Map<string, Topic>;
	pickedTopicsMap: Map<string, Topic>;
	indent: number;
}) => {
	const {subject, filter, availableTopicsMap, pickedTopicsMap, indent} = props;

	if (isJointFilter(filter)) {
		return <>
			<BracketNode>(</BracketNode>
			<FilterJoint subject={subject} joint={filter}
			             availableTopicsMap={availableTopicsMap} pickedTopicsMap={pickedTopicsMap}
			             indent={indent}/>
			<BracketNode>)</BracketNode>
		</>;
	} else if (isExpressionFilter(filter)) {
		return <FilterExpression subject={subject} expression={filter}
		                         availableTopicsMap={availableTopicsMap} pickedTopicsMap={pickedTopicsMap}/>;
	} else {
		return <UnknownFilter/>;
	}
};

export const Where = (props: {
	subject: Subject;
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
}) => {
	const {subject, availableTopics, pickedTopics} = props;

	const hasFilter = subject.dataset.filters
		&& subject.dataset.filters.filters
		&& subject.dataset.filters.filters.length !== 0;
	const {availableTopicsMap, pickedTopicsMap} = buildTopicsMap({availableTopics, pickedTopics});

	return <PartContent>
		{hasFilter
			? <FilterJoint subject={subject} joint={subject.dataset.filters}
			               availableTopicsMap={availableTopicsMap} pickedTopicsMap={pickedTopicsMap}
			               indent={0}/>
			: <EmptyPart>{Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_NO_WHERE}</EmptyPart>}
	</PartContent>;
};