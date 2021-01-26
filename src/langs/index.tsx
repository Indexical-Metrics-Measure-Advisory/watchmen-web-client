import React, { isValidElement, useEffect, useState } from 'react';
import { useEventBus } from '../events/event-bus';
import { EventTypes } from '../events/types';
import { Zh } from './zh';
import { EN } from './en';
import { LanguageObjectType } from './types';

type EnType = typeof EN;
const LANGUAGES = {
	[EN.$$settings.code]: EN,
	[Zh.$$settings.code]: Zh as EnType
};
let currentLanguage = EN;

export const Languages = (props: { children?: ((props: any) => React.ReactNode) | React.ReactNode }) => {
	const { children } = props;

	const { on, off, fire } = useEventBus();
	useEffect(() => {
		const onLangChange = (lang: string) => {
			const [ language, country, variant ] = lang.split(/[-_.]/).map(x => (x || '').toLowerCase());
			currentLanguage = LANGUAGES[`${language}_${country}_${variant}`] || LANGUAGES[`${language}_${country}`] || LANGUAGES[language] || EN;
			fire(EventTypes.LANGUAGE_CHANGED, currentLanguage);
		};
		on(EventTypes.CHANGE_LANGUAGE, onLangChange);
		return () => {
			off(EventTypes.CHANGE_LANGUAGE, onLangChange);
		};
	}, [ on, off, fire ]);

	return <>{children}</>;
};

const LangLabel = (props: { labelKey: string }) => {
	const { labelKey } = props;

	const { on, off } = useEventBus();
	const [ keys ] = useState<Array<string>>(labelKey.split('.'));
	const [ lang, setLang ] = useState<LanguageObjectType>(currentLanguage);
	useEffect(() => {
		const onLangChanged = (lang: LanguageObjectType) => setLang(lang);
		on(EventTypes.LANGUAGE_CHANGED, onLangChanged);
		return () => {
			off(EventTypes.LANGUAGE_CHANGED, onLangChanged);
		};
	}, [ on, off ]);

	let value = keys.reduce((from: any, key) => from ? from[key] : undefined, lang);
	// call fallback when label not found
	while (value === (void 0)) {
		const fallback = (lang as typeof EN).$$settings.fallback;
		if (!fallback) {
			break;
		}
		value = keys.reduce((from: any, key) => from ? from[key] : undefined, LANGUAGES[fallback]);
	}

	return <>{value}</>;
};

const TARGET = {};
const proxyValue = (value: any, name: string): any => {
	if (typeof value === 'object' && !isValidElement(value)) {
		return new Proxy<any>(value, {
			get: function (obj, prop: string) {
				return proxyValue(obj[prop], `${name}.${prop}`);
			}
		});
	} else {
		return <LangLabel labelKey={name}/>;
	}
};
const KeyProxy = new Proxy<any>(TARGET, {
	get: function (obj, prop: string) {
		if (prop === '$$typeof') {
			return obj[prop];
		}
		return proxyValue((EN as any)[prop], prop);
	}
});

export const Lang: LanguageObjectType = KeyProxy;

