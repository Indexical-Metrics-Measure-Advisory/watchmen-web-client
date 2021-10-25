import dayjs from 'dayjs';
import JSZip from 'jszip';
import {DispatchWithoutAction, RefObject, useEffect, useReducer} from 'react';

export const useForceUpdate = (): DispatchWithoutAction => {
	const [, forceUpdate] = useReducer(x => !x, true);
	return forceUpdate;
};

export const notInMe = (me: HTMLOrSVGElement, target: EventTarget | null): boolean => {
	const body = document.body;
	if (target === window) {
		return true;
	}
	let parent: HTMLElement | null | undefined = target as HTMLElement;
	while (true) {
		if (parent === me) {
			return false;
		}
		if (parent === body || parent == null) {
			return true;
		}
		parent = parent?.parentElement;
	}
};

export const useCollapseFixedThing = (options: {
	containerRef: RefObject<HTMLOrSVGElement>;
	visible?: boolean;
	hide: () => void;
	events?: Array<'scroll' | 'focus' | 'click'>
}) => {
	const {containerRef, visible = true, hide, events = ['scroll', 'focus', 'click']} = options;

	useEffect(() => {
		if (!visible) {
			return;
		}
		const collapse = (event: Event) => {
			if (notInMe(containerRef.current!, event.target)) {
				hide();
			}
		};
		events.forEach(event => {
			window.addEventListener(event, collapse, true);
		});
		return () => {
			events.forEach(event => {
				window.removeEventListener(event, collapse, true);
			});
		};
	}, [containerRef, events, visible, hide]);
};

export type ZipFiles = { [name in string]: string }
export const downloadAsZip = async (files: ZipFiles, zipName: string) => {
	const zip = new JSZip();
	Object.keys(files).forEach(name => zip.file(name, files[name]));
	const base64 = await zip.generateAsync({type: 'base64'});
	const link = document.createElement('a');
	link.href = 'data:application/zip;base64,' + base64;
	link.target = '_blank';
	link.download = zipName;
	link.click();
};

export const downloadAsCSV = (content: string, fileName: string | Array<string>, options?: { date?: true, datetime?: true }) => {
	const {date = false, datetime = false} = options ?? {};
	const link = document.createElement('a');
	link.href = 'data:text/csv;charset=utf-8,' + encodeURI(content);
	link.target = '_blank';
	// provide the name for the CSV file to be downloaded
	if (Array.isArray(fileName)) {
		fileName = fileName.filter(part => !!part).join('-');
	}
	if (!fileName.endsWith('.csv')) {
		fileName = fileName + '.csv';
	}
	if (datetime) {
		fileName = fileName.substring(0, fileName.length - 4) + '-' + dayjs().format('YYYYMMDDHHmmss') + '.csv';
	} else if (date) {
		fileName = fileName.substring(0, fileName.length - 4) + '-' + dayjs().format('YYYYMMDD') + '.csv';
	}

	link.download = fileName;
	link.click();
};