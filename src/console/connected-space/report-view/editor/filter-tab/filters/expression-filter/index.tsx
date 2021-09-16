import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {MouseEvent} from 'react';
import {FilterEventBusProvider} from '../filter-event-bus';
import {HierarchicalFilterEventBridge} from '../hierarchical-filter-event-bridge';
import {RemoveFilterIcon} from '../widgets';
import {Expression} from './expression';
import {ExpressionOperator} from './expression-operator';
import {ExpressionRight} from './expression-right';
import {ExpressionFilterContainer, ExpressionLeadLabel} from './widgets';
import {Report, ReportFilterExpression, ReportFilterJoint} from '../../../../../../../services/tuples/report-types';
import {Subject} from '../../../../../../../services/tuples/subject-types';
import {Lang} from '../../../../../../../langs';
import {ICON_DELETE} from '../../../../../../../basic-widgets/constants';
import {ParameterKind} from '../../../../../../../services/tuples/factor-calculator-types';

export const ExpressionFilterEdit = (props: {
	subject: Subject;
	report: Report;
	parentJoint: ReportFilterJoint;
	onRemoveMe: () => void;
	notifyChangeToParent: () => void;
	filter: ReportFilterExpression;
}) => {
	const {
		parentJoint, onRemoveMe, notifyChangeToParent,
		subject, report, filter
	} = props;

	const onRemoveClicked = (event: MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();

		const index = parentJoint.filters.indexOf(filter);
		if (index !== -1) {
			parentJoint.filters.splice(index, 1);
			onRemoveMe && onRemoveMe();
		}
	};

	return <FilterEventBusProvider>
		<ExpressionFilterContainer>
			<ExpressionLeadLabel>{Lang.PARAMETER.EXPRESSION}</ExpressionLeadLabel>
			<RemoveFilterIcon onClick={onRemoveClicked}>
				<FontAwesomeIcon icon={ICON_DELETE}/>
			</RemoveFilterIcon>
			<Expression filter={filter} parameter={filter.left} availableKinds={[ParameterKind.TOPIC]}
			            subject={subject} report={report}
			            visible={true}/>
			<ExpressionOperator filter={filter}/>
			<ExpressionRight filter={filter} parameter={filter.right} subject={subject} report={report}/>
		</ExpressionFilterContainer>
		<HierarchicalFilterEventBridge notifyChangeToParent={notifyChangeToParent}/>
	</FilterEventBusProvider>;
};