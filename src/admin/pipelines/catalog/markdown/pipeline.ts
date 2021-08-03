import {Pipeline} from '../../../../services/tuples/pipeline-types';
import {PipelineRelationMap, TopicRelationMap, TopicsMap} from '../../../../services/pipeline/pipeline-relations';
import {PipelineStage} from '../../../../services/tuples/pipeline-stage-types';
import {PipelineStageUnit} from '../../../../services/tuples/pipeline-stage-unit-types';
import {Conditional} from '../../../../services/tuples/pipeline-super-types';
import {
	Parameter,
	ParameterComputeType,
	ParameterExpression,
	ParameterExpressionOperator,
	ParameterJoint,
	ParameterJointType,
	ParameterKind,
	TopicFactorParameter
} from '../../../../services/tuples/factor-calculator-types';
import {
	isComputedParameter,
	isConstantParameter,
	isExpressionParameter,
	isJointParameter,
	isTopicFactorParameter
} from '../../../../services/tuples/parameter-utils';
import {PipelineStageUnitAction} from '../../../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {
	isAlarmAction,
	isCopyToMemoryAction,
	isExistsAction,
	isInsertRowAction,
	isMergeRowAction,
	isReadFactorAction,
	isReadFactorsAction,
	isReadRowAction,
	isReadRowsAction,
	isReadTopicAction,
	isWriteFactorAction,
	isWriteTopicAction
} from '../../../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
import {AggregateArithmetic} from '../../../../services/tuples/pipeline-stage-unit-action/aggregate-arithmetic-types';

const generateComputeType = (type: ParameterComputeType): string => {
	return type.split('')
		.map((c, index, cs) => {
			if (index !== 0 && cs[index - 1] === '-') {
				return c.toUpperCase();
			}
			return c;
		})
		.filter(c => c !== '-')
		.join('');
};

const generateParameter = (parameter: Parameter, topicsMap: TopicsMap): string => {
	if (isConstantParameter(parameter)) {
		return `byConst('${parameter.value ?? ''}')`;
	} else if (isTopicFactorParameter(parameter)) {
		const topic = topicsMap[parameter.topicId];
		// eslint-disable-next-line
		const factor = topic?.factors.find(f => f.factorId == parameter.factorId);
		const topicName = topic?.name || 'MissedTopic';
		const factorName = factor?.name || 'MissedFactor';
		return `byTopic('${topicName}.${factorName}')`;
	} else if (isComputedParameter(parameter)) {
		if (parameter.type === ParameterComputeType.CASE_THEN) {
			const parameters = (parameter.parameters || []).map(p => {
				let condition = generateCondition(p as Conditional, topicsMap);
				if (condition) {
					condition = `.when(${condition})`;
				} else {
					condition = '.anything()';
				}

				const value = generateParameter(p, topicsMap);

				return `\n\t${condition}\n\t\t${value}`;
			});
			return `cases()${parameters}
.end())`;
		} else {
			const parameters = (parameter.parameters || []).map(p => generateParameter(p, topicsMap)).join(', ');
			return `${generateComputeType(parameter.type)}(${parameters})`;
		}
	} else {
		return '.unsupportedParameter()';
	}
};

const generateExpression = (expression: ParameterExpression, topicsMap: TopicsMap): string => {
	const {left, operator, right} = expression;

	let func;
	switch (operator) {
		case ParameterExpressionOperator.EMPTY:
			func = 'isEmpty()';
			break;
		case ParameterExpressionOperator.NOT_EMPTY:
			func = 'isNotEmpty()';
			break;
		case ParameterExpressionOperator.EQUALS:
			func = `equals(${generateParameter(right, topicsMap)})`;
			break;
		case ParameterExpressionOperator.NOT_EQUALS:
			func = `notEquals(${generateParameter(right, topicsMap)})`;
			break;
		case ParameterExpressionOperator.MORE:
			func = `greaterThan(${generateParameter(right, topicsMap)})`;
			break;
		case ParameterExpressionOperator.MORE_EQUALS:
			func = `greaterThanOrEquals(${generateParameter(right, topicsMap)})`;
			break;
		case ParameterExpressionOperator.LESS:
			func = `lessThan(${generateParameter(right, topicsMap)})`;
			break;
		case ParameterExpressionOperator.LESS_EQUALS:
			func = `lessThanOrEquals(${generateParameter(right, topicsMap)})`;
			break;
		case ParameterExpressionOperator.IN:
			func = `in(${generateParameter(right, topicsMap)})`;
			break;
		case ParameterExpressionOperator.NOT_IN:
			func = `notIn(${generateParameter(right, topicsMap)})`;
			break;
		default:
			func = `unsupportedExpressionOperator('${operator}', ${generateParameter(right, topicsMap)})`;
	}

	return `expect(${generateParameter(left, topicsMap)}).${func}`;
};

const generateJoint = (joint: ParameterJoint, topicsMap: TopicsMap): string => {
	const conjunction = joint.jointType === ParameterJointType.OR ? 'or' : 'and';
	const statement = joint.filters.map(filter => {
		if (isExpressionParameter(filter)) {
			return generateExpression(filter, topicsMap);
		} else if (isJointParameter(filter)) {
			return generateJoint(filter, topicsMap);
		} else {
			return '.unsupportedFilter()';
		}
	}).map(line => `\n\t.${conjunction}(${line})`).join('');
	return `Criteria${statement}`;
};

const generateCondition = (condition: Conditional, topicsMap: TopicsMap): string => {
	if (!condition.conditional || !condition.on || !condition.on.filters || condition.on.filters.length === 0) {
		return '';
	}
	return generateJoint(condition.on, topicsMap);
};

const generateActionType = (action: PipelineStageUnitAction): string => {
	return action.type.split('')
		.map((c, index, cs) => {
			if (index !== 0 && cs[index - 1] === '-') {
				return c.toUpperCase();
			}
			return c;
		})
		.filter(c => c !== '-')
		.join('');
};

const generateArithmetic = (arithmetic: AggregateArithmetic): string => {
	if (arithmetic === AggregateArithmetic.NONE) {
		return '';
	} else {
		return `.${arithmetic}()`;
	}
};
const generateActionBody = (action: PipelineStageUnitAction, topicsMap: TopicsMap): string => {
	if (isAlarmAction(action)) {
		let condition = generateCondition(action, topicsMap);
		if (condition) {
			condition = `\n\t.onCondition(${condition.replaceAll('\n', '\n\t')})`;
		}
		return `${condition}\n\t.message('${action.message || ''}').severity('${action.severity?.toUpperCase() || ''}')`;
	} else if (isCopyToMemoryAction(action)) {
		return `\n\t.from(${generateParameter(action.source, topicsMap)}).to('${action.variableName || 'Noname Variable'}')`;
	} else if (isReadTopicAction(action)) {
		let by;
		if (action.by) {
			by = `\n\t.by(${generateJoint(action.by, topicsMap).replaceAll('\n', '\n\t')})`;
		} else {
			by = `\n\t.by(missed())`;
		}
		if (isReadFactorAction(action)) {
			const arithmetic = generateArithmetic(action.arithmetic);
			return `\n\t.from(${generateParameter({
				kind: ParameterKind.TOPIC,
				topicId: action.topicId,
				factorId: action.factorId
			} as TopicFactorParameter, topicsMap)})${arithmetic}${by}\n\t.to('${action.variableName || 'Noname Variable'}')`;
		} else if (isReadFactorsAction(action)) {
			return `\n\t.from(${generateParameter({
				kind: ParameterKind.TOPIC,
				topicId: action.topicId,
				factorId: action.factorId
			} as TopicFactorParameter, topicsMap)})${by}\n\t.to('${action.variableName || 'Noname Variable'}')`;
		} else if (isReadRowAction(action) || isReadRowsAction(action) || isExistsAction(action)) {
			const topic = topicsMap[action.topicId];
			const topicName = topic?.name || 'MissedTopic';
			return `\n\t.from(byTopic('${topicName}'))${by}\n\t.to('${action.variableName || 'Noname Variable'}')`;
		} else {
			return '\n\t.unsupportedActionBody()';
		}
	} else if (isWriteTopicAction(action)) {
		let by;
		let mapping;

		const topic = topicsMap[action.topicId];
		const topicName = topic?.name || 'MissedTopic';
		if (isWriteFactorAction(action)) {
			// eslint-disable-next-line
			const factor = topic?.factors.find(f => f.factorId == action.factorId);
			const factorName = factor?.name || 'MissedFactor';
			let arithmetic;
			if (action.arithmetic === AggregateArithmetic.NONE) {
				arithmetic = '';
			} else {
				arithmetic = `.use${action.arithmetic.split('').map((c, index) => index === 0 ? c.toUpperCase() : c).join('')}()`;
			}
			const from = action.source ? `.from(${generateParameter(action.source, topicsMap)})` : '.missedSource()';
			mapping = `\n\t\t.factor('${factorName}')${arithmetic}${from}`;
		} else if (isInsertRowAction(action) || isMergeRowAction(action)) {
			if (!action.mapping || action.mapping.length === 0) {
				mapping = '.missedFactor()';
			} else {
				mapping = (action.mapping || []).map(map => {
					// eslint-disable-next-line
					const factor = topic?.factors.find(f => f.factorId == map.factorId);
					const factorName = factor?.name || 'MissedFactor';
					let arithmetic;
					if (map.arithmetic === AggregateArithmetic.NONE) {
						arithmetic = '';
					} else {
						arithmetic = `.use${map.arithmetic.split('').map((c, index) => index === 0 ? c.toUpperCase() : c).join('')}()`;
					}
					const from = map.source ? `.from(${generateParameter(map.source, topicsMap)})` : '.missedSource()';
					return `.factor('${factorName}')${arithmetic}${from}`;
				}).map(line => `\n\t\t${line}`).join('');
			}
		} else {
			mapping = '.missedFactor()';
		}
		if (isWriteFactorAction(action) || isMergeRowAction(action)) {
			if (action.by) {
				by = `\n\t.on(${generateJoint(action.by, topicsMap).replaceAll('\n', '\n\t')})`;
			} else {
				by = `\n\t.on(missed())`;
			}
		} else {
			by = '';
		}

		return `\n\t.to(byTopic('${topicName}')${mapping})${by}`;
	} else {
		return '\n\t.unsupportedAction()';
	}
};

const generateActions = (actions: Array<PipelineStageUnitAction>, topicsMap: TopicsMap, stageIndex: number, unitIndex: number): string => {
	return actions.map((action, actionIndex) => {
		return `// Action #${stageIndex + 1}.${unitIndex + 1}.${actionIndex + 1}
.${generateActionType(action)}()${generateActionBody(action, topicsMap)}
.end()`;
	}).map(part => part.split('\n').map(line => `\t${line}`).join('\n')).join('\n');
};

const generateUnits = (units: Array<PipelineStageUnit>, topicsMap: TopicsMap, stageIndex: number): string => {
	return units.map((unit, unitIndex) => {
		let loop = '';
		if (unit.loopVariableName) {
			loop = `\n\t.loopBy(byConst(${loop}))`;
		}
		let condition = generateCondition(unit, topicsMap);
		if (condition) {
			condition = `\n\t.onCondition(${condition.replaceAll('\n', '\n\t')})`;
		}

		return `// Unit #${stageIndex + 1}.${unitIndex + 1}
.unit('${unit.name || 'Noname Unit'}')${loop}${condition}
${generateActions(unit.do || [], topicsMap, stageIndex, unitIndex)}
.end()`;
	}).map(part => part.split('\n').map(line => `\t${line}`).join('\n')).join('\n');
};

const generateStages = (stages: Array<PipelineStage>, topicsMap: TopicsMap): string => {
	return stages.map((stage, stageIndex) => {
		let condition = generateCondition(stage, topicsMap);
		if (condition) {
			condition = `\n\t.onCondition(${condition.replaceAll('\n', '\n\t')})`;
		}

		return `// Stage #${stageIndex + 1}
.stage('${stage.name || 'Noname Stage'}')${condition}
${generateUnits(stage.units || [], topicsMap, stageIndex)}
.end()`;
	}).map(part => part.split('\n').map(line => `\t${line}`).join('\n')).join('\n');
};

export const generatePipelineMarkdown = (options: {
	pipeline: Pipeline, topicsMap: TopicsMap, index: number,
	topicRelations: TopicRelationMap, pipelineRelations: PipelineRelationMap
}): string => {
	const {pipeline, topicsMap, index} = options;

	const triggerTopic = topicsMap[pipeline.topicId];
	const triggerTopicName = triggerTopic ? (triggerTopic.name || 'Noname Topic') : 'Missed';
	return `## 2.${index + 1}. ${pipeline.name || 'Noname Pipeline'} #${pipeline.pipelineId}<span id="pipeline-${pipeline.pipelineId}"/>

<a href="data:application/json;base64,${window.btoa(JSON.stringify(pipeline))}" target="_blank" download="${pipeline.name || 'Noname Pipeline'}-${pipeline.pipelineId}.json">Download Meta File</a>

### 2.${index + 1}.1. Definition
${'```ts'}
Pipeline.id('${pipeline.pipelineId}')
	.name('${pipeline.name || 'Noname Pipeline'}')
	.triggerBy('${triggerTopicName}').when(${pipeline.type ? `'${pipeline.type.toUpperCase()}'` : 'Missed'})
	.enabled(${pipeline.enabled ?? true})
	.createdAt('${pipeline.createTime}').lastModifiedAt('${pipeline.lastModifyTime}')
${generateStages(pipeline.stages || [], topicsMap)}
${'```'}
`;
};
