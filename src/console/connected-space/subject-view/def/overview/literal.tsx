import React from 'react';
import { Lang } from '../../../../../langs';
import { ParameterComputeType } from '../../../../../services/tuples/factor-calculator-types';
import { Factor } from '../../../../../services/tuples/factor-types';
import { TopicJoinType } from '../../../../../services/tuples/subject-types';
import { Topic } from '../../../../../services/tuples/topic-types';
import { ParameterComputeTypeLabels } from '../parameter/constants';
import {
	AndNode,
	AsNode,
	BracketNode,
	CommaNode,
	ComputeStatementTypeNode,
	ConstantNode,
	DotNode,
	EqualsNode,
	ExoticNode,
	FactorNode,
	JoinNode,
	NamePair,
	NewLineNode,
	OnNode,
	TopicNode,
	UnknownNode,
	UnknownParameterNode,
	AliasNode
} from './literal-widgets';

export const JoinLabels: { [key in TopicJoinType]: string } = {
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
export const JoinAnd = () => <AndNode>{Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_JOIN_AND}</AndNode>;
const Dot = () => <DotNode>.</DotNode>;
export const As = () => <AsNode>{Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_COLUMN_AS}</AsNode>;

export const TopicName = (props: { topic: Topic | null, picked: boolean }) => {
	const { topic, picked } = props;

	if (topic && picked) {
		return <TopicNode>{topic.name}</TopicNode>;
	} else if (topic && !picked) {
		return <ExoticNode><TopicNode>{topic.name}</TopicNode></ExoticNode>;
	} else {
		return <TopicNode><UnknownNode>?</UnknownNode></TopicNode>;
	}
};
export const FactorName = (props: { topic: Topic | null, picked: boolean, factor: Factor | null }) => {
	const { topic, picked, factor } = props;

	return <NamePair>
		<TopicName topic={topic} picked={picked}/>
		<Dot/>
		{factor
			? <FactorNode>{factor.label || factor.name}</FactorNode>
			: <FactorNode><UnknownNode>?</UnknownNode></FactorNode>}
	</NamePair>;
};
export const ConstantValue = (props: { value: string }) => {
	const { value } = props;
	return value
		?<ConstantNode>"{value}"</ConstantNode>
		:<ConstantNode><UnknownNode>{Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_EMPTY_CONSTANT}</UnknownNode></ConstantNode>
};
export const UnknownParameter = () =>
	<UnknownParameterNode>{Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_UNKNOWN_PARAMETER}</UnknownParameterNode>;
export const ComputeStatement = (props: { type: ParameterComputeType, children?: ((props: any) => React.ReactNode) | React.ReactNode }) => {
	const { type, children } = props;
	return <>
		<ComputeStatementTypeNode>{ParameterComputeTypeLabels[type]}</ComputeStatementTypeNode>
		<BracketNode>(</BracketNode>
		{children}
		<BracketNode>)</BracketNode>
	</>;
};
export const Alias = (props: { name?: string }) => {
	const { name } = props;
	return <>
		<As/>
		{name
			? <AliasNode>{name}</AliasNode>
			: <AliasNode><UnknownNode>{Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_NO_ALIAS}</UnknownNode></AliasNode>
		}
	</>;
};
