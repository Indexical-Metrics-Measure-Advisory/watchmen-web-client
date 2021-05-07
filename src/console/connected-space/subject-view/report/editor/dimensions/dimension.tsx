import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {AlertLabel} from '../../../../../../alert/widgets';
import {ICON_DELETE} from '../../../../../../basic-widgets/constants';
import {DropdownOption} from '../../../../../../basic-widgets/types';
import {useForceUpdate} from '../../../../../../basic-widgets/utils';
import {useEventBus} from '../../../../../../events/event-bus';
import {EventTypes} from '../../../../../../events/types';
import {Lang} from '../../../../../../langs';
import {ChartHelper} from '../../../../../../report/chart-utils';
import {Report, ReportDimension} from '../../../../../../services/tuples/report-types';
import {Subject} from '../../../../../../services/tuples/subject-types';
import {useReportEditEventBus} from '../report-edit-event-bus';
import {ReportEditEventTypes} from '../report-edit-event-bus-types';
import {PropValue, PropValueDropdown} from '../settings-widgets/widgets';
import {
    DeleteMeButton,
    DeleteMeContainer,
    DimensionContainer,
    DimensionIndexLabel,
    IncorrectOptionLabel
} from './widgets';

export const DimensionEditor = (props: {
    subject: Subject;
    report: Report;
    dimension: ReportDimension;
    onDelete: (dimension: ReportDimension) => void;
}) => {
    const {subject, report, dimension, onDelete} = props;
    const {chart: {type: chartType}} = report;

    const {fire: fireGlobal} = useEventBus();
    const {fire} = useReportEditEventBus();
    const forceUpdate = useForceUpdate();

    const onColumnChange = (option: DropdownOption) => {
        const {value} = option;
        dimension.columnId = value;
        fire(ReportEditEventTypes.DIMENSION_CHANGED, report, dimension);
        forceUpdate();
    };
    const onDeleteClicked = () => {
        const canDelete = ChartHelper[chartType].canReduceDimensions(report);
        if (!canDelete) {
            fireGlobal(EventTypes.SHOW_ALERT,
                <AlertLabel>{Lang.CHART.CAN_NOT_DELETE_DIMENSION}</AlertLabel>);
        } else {
            onDelete(dimension);
        }
    };

    const index = report.dimensions.indexOf(dimension) + 1;
    const {columnId} = dimension;
    const dimensionOptions: Array<DropdownOption> = subject.dataset.columns.map((column, columnIndex) => {
        return {
            value: column.columnId,
            label: () => {
                return {
                    node: column.alias ||
                        <IncorrectOptionLabel>{Lang.CHART.NONAME_COLUMN} #{columnIndex + 1}</IncorrectOptionLabel>,
                    label: column.alias || ''
                };
            }
        };
    });
    // not selected or exists
    // eslint-disable-next-line
    const selectionExists = !columnId || subject.dataset.columns.some(column => column.columnId == columnId);
    if (!selectionExists) {
        dimensionOptions.push({
            value: columnId, label: () => {
                return {
                    node: <IncorrectOptionLabel>{Lang.CHART.UNKNOWN_COLUMN_NAME}</IncorrectOptionLabel>,
                    label: ''
                };
            }
        });
    }

    return <DimensionContainer>
        <DimensionIndexLabel>{index}</DimensionIndexLabel>
        <PropValue>
            <PropValueDropdown value={columnId} options={dimensionOptions}
                               onChange={onColumnChange}
                               please={Lang.CHART.PLEASE_SELECT_DIMENSION}/>
        </PropValue>
        <DeleteMeContainer>
            <DeleteMeButton onClick={onDeleteClicked}>
                <FontAwesomeIcon icon={ICON_DELETE}/>
            </DeleteMeButton>
        </DeleteMeContainer>
    </DimensionContainer>;
};