import {ParameterCondition, ParameterExpression, ParameterJoint} from '@/services/data/tuples/factor-calculator-types';

export enum JointEventTypes {
	JOINT_TYPE_CHANGED = 'joint-type-changed',

	SUB_EXPRESSION_ADDED = 'sub-expression-added',
	SUB_JOINT_ADDED = 'sub-joint-added',

	SUB_EXPRESSION_REMOVED = 'sub-expression-removed',
	SUB_JOINT_REMOVED = 'sub-joint-removed',

	EXPRESSION_CONTENT_CHANGED = 'expression-content-changed',

	EXPAND_CONTENT = 'expand-content',
	COLLAPSE_CONTENT = 'collapse-content'
}

export interface JointEventBus {
	fire(type: JointEventTypes.JOINT_TYPE_CHANGED, joint: ParameterJoint): this;
	on(type: JointEventTypes.JOINT_TYPE_CHANGED, listener: (joint: ParameterJoint) => void): this;
	off(type: JointEventTypes.JOINT_TYPE_CHANGED, listener: (joint: ParameterJoint) => void): this;

	fire(type: JointEventTypes.SUB_EXPRESSION_ADDED, expression: ParameterExpression, parent: ParameterJoint): this;
	on(type: JointEventTypes.SUB_EXPRESSION_ADDED, listener: (expression: ParameterExpression, parent: ParameterJoint) => void): this;
	off(type: JointEventTypes.SUB_EXPRESSION_ADDED, listener: (expression: ParameterExpression, parent: ParameterJoint) => void): this;

	fire(type: JointEventTypes.SUB_JOINT_ADDED, joint: ParameterJoint, parent: ParameterJoint): this;
	on(type: JointEventTypes.SUB_JOINT_ADDED, listener: (joint: ParameterJoint, parent: ParameterJoint) => void): this;
	off(type: JointEventTypes.SUB_JOINT_ADDED, listener: (joint: ParameterJoint, parent: ParameterJoint) => void): this;

	fire(type: JointEventTypes.SUB_EXPRESSION_REMOVED, expression: ParameterExpression, parent: ParameterJoint): this;
	on(type: JointEventTypes.SUB_EXPRESSION_REMOVED, listener: (expression: ParameterExpression, parent: ParameterJoint) => void): this;
	off(type: JointEventTypes.SUB_EXPRESSION_REMOVED, listener: (expression: ParameterExpression, parent: ParameterJoint) => void): this;

	fire(type: JointEventTypes.SUB_JOINT_REMOVED, joint: ParameterJoint, parent: ParameterJoint): this;
	on(type: JointEventTypes.SUB_JOINT_REMOVED, listener: (joint: ParameterJoint, parent: ParameterJoint) => void): this;
	off(type: JointEventTypes.SUB_JOINT_REMOVED, listener: (joint: ParameterJoint, parent: ParameterJoint) => void): this;

	fire(type: JointEventTypes.EXPRESSION_CONTENT_CHANGED, condition: ParameterCondition, parent: ParameterJoint): this;
	on(type: JointEventTypes.EXPRESSION_CONTENT_CHANGED, listener: (condition: ParameterCondition, parent: ParameterJoint) => void): this;
	off(type: JointEventTypes.EXPRESSION_CONTENT_CHANGED, listener: (condition: ParameterCondition, parent: ParameterJoint) => void): this;

	fire(type: JointEventTypes.EXPAND_CONTENT): this;
	on(type: JointEventTypes.EXPAND_CONTENT, listener: () => void): this;
	off(type: JointEventTypes.EXPAND_CONTENT, listener: () => void): this;

	fire(type: JointEventTypes.COLLAPSE_CONTENT): this;
	on(type: JointEventTypes.COLLAPSE_CONTENT, listener: () => void): this;
	off(type: JointEventTypes.COLLAPSE_CONTENT, listener: () => void): this;
}