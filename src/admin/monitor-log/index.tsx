import React, {useEffect, useState} from 'react';
import {FullWidthPage} from '../../basic-widgets/page';
import {fetchAllPipelines} from '../../services/pipeline/all-pipelines';
import {fetchAllTopics} from '../../services/pipeline/all-topics';
import {Pipeline} from '../../services/tuples/pipeline-types';
import {Topic} from '../../services/tuples/topic-types';
import {MonitorLogEventBusProvider} from './monitor-log-event-bus';
import {SearchCriteria} from './search-criteria';
import {SearchResult} from './search-result';
import {Body, Header, HeaderTitle} from './widgets';

interface State {
    topics: Array<Topic>;
    pipelines: Array<Pipeline>;
}

const AdminMonitorLogsIndex = () => {
    const [state, setState] = useState<State>({topics: [], pipelines: []});
    useEffect(() => {
        (async () => {
            const [pipelines, topics] = await Promise.all([
                fetchAllPipelines(),
                fetchAllTopics()
            ]);
            setState({topics, pipelines});
        })();
    }, []);

    return <FullWidthPage>
        <Header>
            <HeaderTitle>Monitor Logs</HeaderTitle>
        </Header>
        <Body>
            <MonitorLogEventBusProvider>
                <SearchCriteria topics={state.topics} pipelines={state.pipelines}/>
                <SearchResult topics={state.topics} pipelines={state.pipelines}/>
            </MonitorLogEventBusProvider>
        </Body>
    </FullWidthPage>;
};

export default AdminMonitorLogsIndex;