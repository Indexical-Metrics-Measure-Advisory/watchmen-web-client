import React, { isValidElement, useEffect, useState } from 'react';
import { useEventBus } from '../events/event-bus';
import { EventTypes } from '../events/types';
import { En } from './en';
import { LanguageObjectType } from './types';
import { Zh } from './zh';

type EnType = typeof En;
const LANGUAGES = {
	[En.$$settings.code]: En,
	[Zh.$$settings.code]: Zh as EnType
};
let currentLanguage = En;

export const Languages = (props: { children?: ((props: any) => React.ReactNode) | React.ReactNode }) => {
	const { children } = props;

	const { on, off, fire } = useEventBus();
	useEffect(() => {
		const onLangChange = (lang: string) => {
			const [ language, country, variant ] = lang.split(/[-_.]/).map(x => (x || '').toLowerCase());
			currentLanguage = LANGUAGES[`${language}_${country}_${variant}`] || LANGUAGES[`${language}_${country}`] || LANGUAGES[language] || En;
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
	const [ lang, setLang ] = useState<LanguageObjectType>(currentLanguage);
	useEffect(() => {
		const onLangChanged = (lang: LanguageObjectType) => setLang(lang);
		on(EventTypes.LANGUAGE_CHANGED, onLangChanged);
		return () => {
			off(EventTypes.LANGUAGE_CHANGED, onLangChanged);
		};
	}, [ on, off ]);

	const keys = labelKey.split('.');
	let value = keys.reduce((from: any, key) => from ? from[key] : undefined, lang);
	// call fallback when label not found
	while (value === (void 0)) {
		const fallback = (lang as typeof En).$$settings.fallback;
		if (!fallback) {
			break;
		}
		value = keys.reduce((from: any, key) => from ? from[key] : undefined, LANGUAGES[fallback]);
	}

	return <>{value}</>;
};

const PLAIN_PREFIX = 'PLAIN.'
const TARGET = {};
const proxyValue = (value: any, name: string): any => {
	if (typeof value === 'object' && !isValidElement(value)) {
		return new Proxy<any>(value, {
			get: function (obj, prop: string) {
				return proxyValue(obj[prop], `${name}.${prop}`);
			}
		});
	} else if (name.startsWith(PLAIN_PREFIX)) {
		return value;
	} else {
		return <LangLabel labelKey={name}/>;
	}
};
const KeyProxy = new Proxy<any>(TARGET, {
	get: function (obj, prop: string) {
		if (prop === '$$typeof') {
			return obj[prop];
		}
		return proxyValue((En as any)[prop], prop);
	}
});

export const SupportedLanguages = Object.keys(LANGUAGES)
	.map(code => ({ code, name: LANGUAGES[code].$$settings.name }))
	.sort((n1, n2) => n1.name.toLowerCase().localeCompare(n2.name.toLowerCase()));
export const getCurrentLanguageCode = () => currentLanguage.$$settings.code;
export const Lang: LanguageObjectType = KeyProxy;

