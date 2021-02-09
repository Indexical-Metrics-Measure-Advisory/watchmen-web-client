import React, { Fragment } from 'react';
import { v4 } from 'uuid';
import { Lang } from '../../../../../langs';
import {
	ComputedParameter,
	ConstantParameter,
	Parameter,
	ParameterComputeType,
	ParameterFrom,
	TopicFactorParameter
} from '../../../../../services/tuples/factor-calculator-types';
import {
	isComputedParameter,
	isConstantParameter,
	isTopicFactorParameter
} from '../../../../../services/tuples/factor-calculator-utils';
import { Factor } from '../../../../../services/tuples/factor-types';
import { Subject, SubjectDataSetColumn } from '../../../../../services/tuples/subject-types';
import { Topic } from '../../../../../services/tuples/topic-types';
import { Alias, Comma, ComputeStatement, ConstantValue, FactorName, NewLine, UnknownParameter } from './literal';
import { buildTopicsMap, findTopicAndFactor } from './literal-utils';
import { EmptyPart, PartContent } from './widgets';

interface PrettyConstant {
	is: ParameterFrom.CONSTANT;
	value: string;
	data: string;
}

interface PrettyFactor {
	is: ParameterFrom.TOPIC;
	topicId: string;
	factorId: string;
	data: {
		topic?: Topic;
		topicPicked: boolean;
		factor?: Factor;
	}
}

interface PrettyComputed {
	is: ParameterFrom.COMPUTED;
	type: ParameterComputeType;
	data: Array<PrettyConstant | PrettyFactor | PrettyComputed | null>
}

interface PrettyColumn extends SubjectDataSetColumn {
	built: PrettyConstant | PrettyFactor | PrettyComputed | null;
}

const fromTopicFactorParameter = (options: {
	parameter: TopicFactorParameter;
	availableTopicsMap: Map<string, Topic>;
	pickedTopicsMap: Map<string, Topic>;
}): PrettyFactor => {
	const { parameter: { topicId, factorId }, availableTopicsMap, pickedTopicsMap } = options;

	return {
		is: ParameterFrom.TOPIC,
		topicId,
		factorId,
		data: findTopicAndFactor({
			topicId: topicId,
			factorId: factorId,
			pickedTopicsMap,
			availableTopicsMap
		})
	};
};
const fromConstantParameter = (options: { parameter: ConstantParameter }): PrettyConstant => {
	const { parameter: { value } } = options;
	return { is: ParameterFrom.CONSTANT, value, data: value };
};
const fromComputedParameter = (options: {
	parameter: ComputedParameter;
	availableTopicsMap: Map<string, Topic>;
	pickedTopicsMap: Map<string, Topic>;
}): PrettyComputed => {
	const { parameter: { type, parameters }, availableTopicsMap, pickedTopicsMap } = options;
	return {
		is: ParameterFrom.COMPUTED,
		type,
		data: parameters.map(parameter => fromParameter({
			parameter,
			availableTopicsMap,
			pickedTopicsMap
		}))
	};
};
const fromParameter = (options: {
	parameter: Parameter;
	availableTopicsMap: Map<string, Topic>;
	pickedTopicsMap: Map<string, Topic>;
}) => {
	const { parameter, availableTopicsMap, pickedTopicsMap } = options;
	if (isTopicFactorParameter(parameter)) {
		return fromTopicFactorParameter({ parameter, availableTopicsMap, pickedTopicsMap });
	} else if (isConstantParameter(parameter)) {
		return fromConstantParameter({ parameter });
	} else if (isComputedParameter(parameter)) {
		return fromComputedParameter({ parameter, availableTopicsMap, pickedTopicsMap });
	} else {
		return null;
	}
};

const beautifyColumns = (options: {
	subject: Subject;
	availableTopicsMap: Map<string, Topic>;
	pickedTopicsMap: Map<string, Topic>;
}): Array<PrettyColumn> => {
	const { subject, availableTopicsMap, pickedTopicsMap } = options;

	return subject.dataset.columns.map(column => {
		return {
			...column,
			built: fromParameter({ parameter: column.parameter, availableTopicsMap, pickedTopicsMap })
		};
	});
};

const TopicFactorLine = (props: { pretty: PrettyFactor }) => {
	const { pretty: { data: { topic = null, topicPicked, factor = null } } } = props;
	return <FactorName topic={topic} picked={topicPicked} factor={factor}/>;
};
const ConstantLine = (props: { pretty: PrettyConstant }) => {
	const { pretty: { data: value } } = props;
	return <ConstantValue value={value}/>;
};
const ComputedLine = (props: { pretty: PrettyComputed }) => {
	const { pretty: { type, data } } = props;

	return <ComputeStatement type={type}>
		{data.map((parameter, parameterIndex, all) => {
			return <Fragment key={v4()}>
				<ParameterLine pretty={parameter}/>
				{parameterIndex === all.length - 1 ? null : <Comma/>}
			</Fragment>;
		})}
	</ComputeStatement>;
};
const ParameterLine = (props: { pretty: PrettyConstant | PrettyFactor | PrettyComputed | null }) => {
	const { pretty } = props;
	if (pretty == null) {
		return <UnknownParameter/>;
	}

	const { is } = pretty;
	if (is === ParameterFrom.TOPIC) {
		return <TopicFactorLine pretty={pretty as PrettyFactor}/>;
	} else if (is === ParameterFrom.CONSTANT) {
		return <ConstantLine pretty={pretty as PrettyConstant}/>;
	} else if (is === ParameterFrom.COMPUTED) {
		return <ComputedLine pretty={pretty as PrettyComputed}/>;
	} else {
		// never occurs
		return null;
	}
};

export const Select = (props: {
	subject: Subject;
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
	active: boolean;
}) => {
	const { subject, availableTopics, pickedTopics, active } = props;

	if (!active) {
		return null;
	}

	const hasSelect = subject.dataset.columns && subject.dataset.columns.length !== 0;
	const { availableTopicsMap, pickedTopicsMap } = buildTopicsMap({ availableTopics, pickedTopics });
	const columns = beautifyColumns({ subject, pickedTopicsMap, availableTopicsMap });

	return <PartContent>
		{hasSelect
			? columns.map((column, columnIndex, all) => {
				const { alias, built } = column;
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