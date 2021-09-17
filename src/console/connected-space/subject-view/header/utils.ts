import {Router} from '@/routes/types';
import {matchPath} from 'react-router-dom';

export const isSubjectDefNow = () => !!matchPath(window.location.pathname, Router.CONSOLE_CONNECTED_SPACE_SUBJECT_DEF);
export const isSubjectDataNow = () => !!matchPath(window.location.pathname, Router.CONSOLE_CONNECTED_SPACE_SUBJECT_DATA);
export const isSubjectReportNow = () => !!matchPath(window.location.pathname, Router.CONSOLE_CONNECTED_SPACE_SUBJECT_REPORTS);
