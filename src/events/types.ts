import {ReactContent, TooltipAlignment, TooltipPosition} from '../basic-widgets/types';
import {LanguageObjectType} from '../langs/types';

export enum EventTypes {
    CHANGE_THEME = 'change-theme',

    CHANGE_LANGUAGE = 'change-lang',
    LANGUAGE_CHANGED = 'lang-changed',

    SHOW_ALERT = 'show-alert',
    HIDE_ALERT = 'hide-alert',
    ALERT_HIDDEN = 'alert-hidden',
    SHOW_NOT_IMPLEMENT = 'show-not-implement',
    SHOW_WAITING = 'show-waiting',
    REPLY_WAITING_DATA = 'reply-waiting-data',

    SHOW_TOOLTIP = 'show-tooltip',
    HIDE_TOOLTIP = 'hide-tooltip',

    SHOW_DIALOG = 'show-dialog',
    HIDE_DIALOG = 'hide-dialog',
    SHOW_YES_NO_DIALOG = 'show-yes-no-dialog',

    INVOKE_REMOTE_REQUEST = 'invoke-remote-request'
}

export interface TooltipParam {
    target: HTMLElement;
    text: string;
    alignment?: TooltipAlignment;
    position?: TooltipPosition;
    minWidth?: number;
    maxWidth?: number;
    offsetX?: number;
    offsetY?: number;
}

export interface EventBus {
    // theme
    fire(type: EventTypes.CHANGE_THEME, themeName: string): this;

    on(type: EventTypes.CHANGE_THEME, listener: (themeName: string) => void): this;

    off(type: EventTypes.CHANGE_THEME, listener: (themeName: string) => void): this;

    // language
    fire(type: EventTypes.CHANGE_LANGUAGE, lang: string): this;

    on(type: EventTypes.CHANGE_LANGUAGE, listener: (lang: string) => void): this;

    off(type: EventTypes.CHANGE_LANGUAGE, listener: (lang: string) => void): this;

    // language
    fire(type: EventTypes.LANGUAGE_CHANGED, lang: LanguageObjectType): this;

    on(type: EventTypes.LANGUAGE_CHANGED, listener: (lang: LanguageObjectType) => void): this;

    off(type: EventTypes.LANGUAGE_CHANGED, listener: (lang: LanguageObjectType) => void): this;

    // alert
    fire(type: EventTypes.SHOW_ALERT, content?: ReactContent): this;

    on(type: EventTypes.SHOW_ALERT, listener: (content?: ReactContent) => void): this;

    off(type: EventTypes.SHOW_ALERT, listener: (content?: ReactContent) => void): this;

    fire(type: EventTypes.HIDE_ALERT): this;

    on(type: EventTypes.HIDE_ALERT, listener: () => void): this;

    off(type: EventTypes.HIDE_ALERT, listener: () => void): this;

    fire(type: EventTypes.ALERT_HIDDEN): this;

    once(type: EventTypes.ALERT_HIDDEN, listener: () => void): this;

    fire(type: EventTypes.SHOW_NOT_IMPLEMENT): this;

    on(type: EventTypes.SHOW_NOT_IMPLEMENT, listener: () => void): this;

    off(type: EventTypes.SHOW_NOT_IMPLEMENT, listener: () => void): this;

    fire(type: EventTypes.SHOW_WAITING, request: () => Promise<void>, content?: ReactContent): this;

    on(type: EventTypes.SHOW_WAITING, listener: (request: () => Promise<void>, content?: ReactContent) => void): this;

    off(type: EventTypes.SHOW_WAITING, listener: (request: () => Promise<void>, content?: ReactContent) => void): this;

    fire(type: EventTypes.REPLY_WAITING_DATA, data: any): this;

    once(type: EventTypes.REPLY_WAITING_DATA, listener: (data: any) => void): this;

    // tooltip
    fire(type: EventTypes.SHOW_TOOLTIP, tooltip: TooltipParam): this;

    on(type: EventTypes.SHOW_TOOLTIP, listener: (tooltip: TooltipParam) => void): this;

    off(type: EventTypes.SHOW_TOOLTIP, listener: (tooltip: TooltipParam) => void): this;

    fire(type: EventTypes.HIDE_TOOLTIP): this;

    on(type: EventTypes.HIDE_TOOLTIP, listener: () => void): this;

    off(type: EventTypes.HIDE_TOOLTIP, listener: () => void): this;

    // dialog
    fire(type: EventTypes.SHOW_DIALOG, content?: ReactContent): this;

    on(type: EventTypes.SHOW_DIALOG, listener: (content?: ReactContent) => void): this;

    off(type: EventTypes.SHOW_DIALOG, listener: (content?: ReactContent) => void): this;

    fire(type: EventTypes.HIDE_DIALOG): this;

    on(type: EventTypes.HIDE_DIALOG, listener: () => void): this;

    off(type: EventTypes.HIDE_DIALOG, listener: () => void): this;

    fire(type: EventTypes.SHOW_YES_NO_DIALOG, question: string, onYes: () => void, onNo: () => void): this;

    on(type: EventTypes.SHOW_YES_NO_DIALOG, listener: (question: string, onYes: () => void, onNo: () => void) => void): this;

    off(type: EventTypes.SHOW_YES_NO_DIALOG, listener: (question: string, onYes: () => void, onNo: () => void) => void): this;

    fire(type: EventTypes.INVOKE_REMOTE_REQUEST, request: () => Promise<any>, success: (data?: any) => void, failure?: (error?: any) => void): this;

    on(type: EventTypes.INVOKE_REMOTE_REQUEST, listener: (request: () => Promise<any>, success: (data?: any) => void, failure?: (error?: any) => void) => void): this;

    off(type: EventTypes.INVOKE_REMOTE_REQUEST, listener: (request: () => Promise<any>, success: (data?: any) => void, failure?: (error?: any) => void) => void): this;
}