import {ParameterComputeType, ParameterKind} from '@/services/data/tuples/factor-calculator-types';
import {Factor} from '@/services/data/tuples/factor-types';
import {TopicJoinType} from '@/services/data/tuples/subject-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {Lang} from '@/widgets/langs';
import React, {Fragment, ReactNode} from 'react';
import {v4} from 'uuid';
import {ParameterComputeTypeLabels} from '../widgets/parameter/constants';
import {PrettyComputed, PrettyConstant, PrettyFactor} from './literal-types';
import {
	AliasNode,
	AsNode,
	BracketNode,
	CommaNode,
	ComputeStatementTypeNode,
	ConstantNode,
	DotNode,
	EqualsNode,
	ExoticNode,
	FactorNode,
	JoinAndNode,
	JoinNode,
	JointAndNode,
	JointOrNode,
	NamePair,
	NewLineNode,
	NoStatementNode,
	OnNode,
	TopicNode,
	UnknownFilterNode,
	UnknownNode,
	UnknownParameterNode
} from './literal-widgets';

export const JoinLabels: Record<TopicJoinType, string> = {
	[TopicJoinType.INNER]: Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_JOIN_INNER,
	[TopicJoinType.LEFT]: Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_JOIN_LEFT,
	[TopicJoinType.RIGHT]: Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_JOIN_RIGHT
};

export const Join = (props: { type: TopicJoinType }) =>
	<JoinNode>{JoinLabels[props.type || TopicJoinType.INNER]}</JoinNode>;
export const Comma = () => <CommaNode>,</CommaNode>;
export const On = () => <OnNode>{Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_JOIN_ON}</OnNode>;
export const Equals = () => <EqualsNode>{Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_JOIN_EQUALS}</EqualsNode>;
export const NewLine = () => <NewLineNode/>;
export const JoinAnd = () => <JoinAndNode>{Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_JOIN_AND}</JoinAndNode>;
export const JointAnd = (props: { indent: number }) => <JointAndNode
	indent={props.indent}>{Lang.JOINT.AND}</JointAndNode>;
export const JointOr = (props: { indent: number }) => <JointOrNode indent={props.indent}>{Lang.JOINT.OR}</JointOrNode>;
const Dot = () => <DotNode>.</DotNode>;
export const As = () => <AsNode>{Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_COLUMN_AS}</AsNode>;

export const TopicName = (props: { topic: Topic | null, picked: boolean }) => {
	const {topic, picked} = props;

	if (topic && picked) {
		return <TopicNode>{topic.name}</TopicNode>;
	} else if (topic && !picked) {
		return <ExoticNode><TopicNode>{topic.name}</TopicNode></ExoticNode>;
	} else {
		return <TopicNode><UnknownNode>?</UnknownNode></TopicNode>;
	}
};
export const FactorName = (props: { topic: Topic | null, picked: boolean, factor: Factor | null }) => {
	const {topic, picked, factor} = props;

	return <NamePair>
		<TopicName topic={topic} picked={picked}/>
		<Dot/>
		{factor
			? <FactorNode>{factor.label || factor.name}</FactorNode>
			: <FactorNode><UnknownNode>?</UnknownNode></FactorNode>}
	</NamePair>;
};
export const ConstantValue = (props: { value: string }) => {
	const {value} = props;
	return value
		? <ConstantNode>"{value}"</ConstantNode>
		: <ConstantNode><UnknownNode>{Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_EMPTY_CONSTANT}</UnknownNode></ConstantNode>;
};
export const UnknownParameter = () =>
	<UnknownParameterNode>{Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_UNKNOWN_PARAMETER}</UnknownParameterNode>;
export const ComputeStatement = (props: { type: ParameterComputeType, children?: ReactNode }) => {
	const {type, children} = props;
	return <>
		<ComputeStatementTypeNode>{ParameterComputeTypeLabels[type]}</ComputeStatementTypeNode>
		<BracketNode>(</BracketNode>
		{children}
		<BracketNode>)</BracketNode>
	</>;
};
export const Alias = (props: { name?: string }) => {
	const {name} = props;
	return <>
		<As/>
		{name
			? <AliasNode>{name}</AliasNode>
			: <AliasNode><UnknownNode>{Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_NO_ALIAS}</UnknownNode></AliasNode>
		}
	</>;
};
export const TopicFactorLine = (props: { pretty: PrettyFactor }) => {
	const {pretty: {data: {topic = null, topicPicked, factor = null}}} = props;
	return <FactorName topic={topic} picked={topicPicked} factor={factor}/>;
};
export const ConstantLine = (props: { pretty: PrettyConstant }) => {
	const {pretty: {data: value}} = props;
	return <ConstantValue value={value}/>;
};
export const ComputedLine = (props: { pretty: PrettyComputed }) => {
	const {pretty: {type, data}} = props;

	return <ComputeStatement type={type}>
		{data.map((parameter, parameterIndex, all) => {
			return <Fragment key={v4()}>
				<ParameterLine pretty={parameter}/>
				{parameterIndex === all.length - 1 ? null : <Comma/>}
			</Fragment>;
		})}
	</ComputeStatement>;
};
export const ParameterLine = (props: { pretty: PrettyConstant | PrettyFactor | PrettyComputed | null }) => {
	const {pretty} = props;
	if (pretty == null) {
		return <UnknownParameter/>;
	}

	const {is} = pretty;
	if (is === ParameterKind.TOPIC) {
		return <TopicFactorLine pretty={pretty as PrettyFactor}/>;
	} else if (is === ParameterKind.CONSTANT) {
		return <ConstantLine pretty={pretty as PrettyConstant}/>;
	} else if (is === ParameterKind.COMPUTED) {
		return <ComputedLine pretty={pretty as PrettyComputed}/>;
	} else {
		// never occurs
		return null;
	}
};
export const NoStatement = () =>
	<NoStatementNode>{Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_FILTER_JOINT_NO_STATEMENT}</NoStatementNode>;
export const UnknownFilter = () =>
	<UnknownFilterNode>{Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_UNKNOWN_FILTER}</UnknownFilterNode>;
