import {diff, formatters} from 'jsondiffpatch';
import 'jsondiffpatch/dist/formatters-styles/html.css';
import React, {useEffect, useRef, useState} from 'react';
import {DwarfButton} from '../../../basic-widgets/button';
import {Toggle} from '../../../basic-widgets/toggle';
import {ButtonInk} from '../../../basic-widgets/types';
import {MonitorLogRow} from '../../../services/admin/logs';
import {Pipeline} from '../../../services/tuples/pipeline-types';
import {isMockService} from '../../../services/utils';
import demoData from './pipeline.json';
import {Diff, PipelineTypeLabel, ShowUnchanged, Title, TriggerDataContainer} from './widgets';

export const TriggerData = (props: {
    row: MonitorLogRow;
    pipeline: Pipeline;
}) => {
    const {row, pipeline} = props;

    const containerRef = useRef<HTMLDivElement>(null);
    const [showUnchanged, setShowUnchanged] = useState(false);
    const [fullScreen, setFullScreen] = useState(false);
    useEffect(() => {
        window.document.addEventListener('fullscreenchange', () => {
            if (!window.document.fullscreenElement) {
                setFullScreen(false);
            }
        });
    }, []);

    const onUnchangedChanged = (value: boolean) => setShowUnchanged(value);
    const onFullScreenClicked = () => {
        if (fullScreen) {
            window.document.exitFullscreen();
            // setFullScreen(false);
        } else {
            containerRef.current?.requestFullscreen();
            setFullScreen(true);
        }
    };

    const {oldValue = getOldOne(), newValue = getNewOne()} = row;
    const delta = diff(oldValue, newValue);
    formatters.html.showUnchanged(showUnchanged);
    const changes = formatters.html.format(delta!, oldValue);

    return <TriggerDataContainer ref={containerRef}>
        <Title>
            <span>Trigger by</span>
            <PipelineTypeLabel>{pipeline.type}</PipelineTypeLabel>
        </Title>
        <ShowUnchanged>
            <Toggle value={showUnchanged} onChange={onUnchangedChanged}/>
            <span>Show Unchanged Content</span>
        </ShowUnchanged>
        <Title>
            <DwarfButton ink={ButtonInk.PRIMARY} onClick={onFullScreenClicked}>
                <span>{fullScreen ? 'Quit Full Screen' : 'Full Screen'}</span>
            </DwarfButton>
        </Title>
        <Diff dangerouslySetInnerHTML={{__html: changes}} fullScreen={fullScreen}/>
    </TriggerDataContainer>;
};

const getOldOne = () => {
    return isMockService() ? demoData.oldValue : {};
};

const getNewOne = () => {
    return isMockService() ? demoData.newValue : {};
};
