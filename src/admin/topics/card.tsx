import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {ICON_FACTOR, ICON_REPORT, ICON_SPACE, ICON_USER_GROUP} from '../../basic-widgets/constants';
import {TooltipAlignment} from '../../basic-widgets/types';
import {QueryTopic} from '../../services/tuples/query-topic-types';
import {
    TupleCard,
    TupleCardDescription,
    TupleCardStatistics,
    TupleCardStatisticsItem,
    TupleCardTitle
} from '../widgets/tuple-workbench/tuple-card';
import {useTupleEventBus} from '../widgets/tuple-workbench/tuple-event-bus';
import {TupleEventTypes} from '../widgets/tuple-workbench/tuple-event-bus-types';

const TopicCard = (props: { topic: QueryTopic }) => {
    const {topic} = props;

    const {fire} = useTupleEventBus();
    const onEditClicked = () => {
        fire(TupleEventTypes.DO_EDIT_TUPLE, topic);
    };
    return <TupleCard key={topic.topicId} onClick={onEditClicked}>
        <TupleCardTitle>{topic.name}</TupleCardTitle>
        <TupleCardDescription>{topic.description}</TupleCardDescription>
        <TupleCardStatistics>
            <TupleCardStatisticsItem tooltip={{label: 'Factors Count', alignment: TooltipAlignment.CENTER}}>
                <FontAwesomeIcon icon={ICON_FACTOR}/>
                <span>{topic.factorCount}</span>
            </TupleCardStatisticsItem>
            <TupleCardStatisticsItem tooltip={{label: 'In User Groups', alignment: TooltipAlignment.CENTER}}>
                <FontAwesomeIcon icon={ICON_USER_GROUP}/>
                <span>{topic.groupCount}</span>
            </TupleCardStatisticsItem>
            <TupleCardStatisticsItem tooltip={{label: 'In Spaces', alignment: TooltipAlignment.CENTER}}>
                <FontAwesomeIcon icon={ICON_SPACE}/>
                <span>{topic.spaceCount}</span>
            </TupleCardStatisticsItem>
            <TupleCardStatisticsItem tooltip={{label: 'In Reports', alignment: TooltipAlignment.CENTER}}>
                <FontAwesomeIcon icon={ICON_REPORT}/>
                <span>{topic.reportCount}</span>
            </TupleCardStatisticsItem>
        </TupleCardStatistics>
    </TupleCard>;
};

export const renderCard = (topic: QueryTopic) => {
    return <TopicCard topic={topic}/>;
};