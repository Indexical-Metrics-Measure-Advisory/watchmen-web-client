import {GraphicsSize} from '@/services/data/graphics/graphics-types';
import {Pipeline, PipelinesGraphics} from '@/services/data/tuples/pipeline-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {generateUuid} from '@/services/data/tuples/utils';
import {getCurrentTime} from '@/services/data/utils';
import {useForceUpdate} from '@/widgets/basic/utils';
import React, {MouseEvent, useEffect, useRef, useState} from 'react';
import {useCatalogEventBus} from './catalog-event-bus';
import {CatalogEventTypes} from './catalog-event-bus-types';
import {GraphicsSave} from './graphics-save';
import {asTopicGraphicsMap, computeGraphics, createInitGraphics} from './graphics-utils';
import {Navigator} from './navigator';
import {BlockRelations} from './relation/block-relations';
import {BlockRelationsAnimation} from './relation/block-relations-animation';
import {BlockSelection} from './selection';
import {Thumbnail} from './thumbnail';
import {TopicRect} from './topic/topic-rect';
import {AssembledPipelinesGraphics, AssembledTopicGraphics, GraphicsRole} from './types';
import {
	BodyContainer,
	BodySvg,
	BodySvgContainer,
	BodySvgRelationsAnimationContainer,
	MarkdownBodySvgContainer
} from './widgets';

const getCSSVariables = (): Record<string, string> => {
	const styles = window.getComputedStyle(document.documentElement);
	return [
		'--distinct-topic-color',
		'--meta-topic-color',
		'--raw-topic-color',
		'--time-topic-color',
		'--aggregate-topic-color',
		'--ratio-topic-color',
		'--invert-color',
		'--waive-color',
		'--font-color',
		'--font-size',
		'--title-font-family'
	].reduce((variables, key) => {
		variables[key] = styles.getPropertyValue(key);
		return variables;
	}, {} as Record<string, string>);
};

const isCSSStyleRule = (rule: CSSRule): rule is CSSStyleRule => {
	const r = rule as any;
	return r.selectorText && r.style != null;
};
const getStyleRuleValue = (selector: string) => {
	const rules = [...(document.styleSheets || [])].filter(styleSheet => {
		return styleSheet.cssRules != null && styleSheet.cssRules.length !== 0;
	}).map(styleSheet => {
		return [...styleSheet.cssRules].find(rule => {
			if (isCSSStyleRule(rule) && rule.cssText) {
				return rule.selectorText.split(',').map(s => s.trim()).includes(selector);
			} else {
				return false;
			}
		});
	}).flat().filter<CSSStyleRule>((x): x is CSSStyleRule => !!x);
	return rules.map(rule => rule.cssText).join(';');
};

const strictStyles = (styles: string) => {
	styles = styles.trim();
	if (styles.startsWith(';')) {
		styles = styles.substring(1);
	}
	styles = styles.trim();
	styles = styles.replace(/\..+ {/, '');
	if (styles.endsWith('}')) {
		styles = styles.substring(0, styles.length - 2);
	}
	return styles.replace('font-size: 1.2em;', '');
};
const copyCSSFromClassName = (element: SVGElement) => {
	const stylesFromClass = strictStyles([...(element.classList || [])].map(selector => {
		return getStyleRuleValue(`.${selector}`);
	}).join(';'));
	if (stylesFromClass.trim()) {
		element.style.cssText = [stylesFromClass, element.style.cssText].filter(x => !!x).join(';');
	}
};

const MarkdownSvgPalette = (props: { pipelines: Array<Pipeline> }) => {
	const {pipelines} = props;

	const {fire, on, off} = useCatalogEventBus();
	const ref = useRef<HTMLDivElement>(null);
	const svgRef = useRef<SVGSVGElement>(null);
	const [state, setState] = useState<{ topics: Array<Topic>, assembled: AssembledPipelinesGraphics | null, toComputeGraphics: boolean, svgSize: Partial<GraphicsSize> }>({
		topics: [],
		assembled: null,
		toComputeGraphics: false,
		svgSize: {}
	});
	useEffect(() => {
		const onAskGraphicsSvg = (topics: Array<Topic>) => {
			const graphics: PipelinesGraphics = {
				pipelineGraphId: generateUuid(),
				name: 'Pipelines Group',
				topics: [],
				createTime: getCurrentTime(),
				lastModified: getCurrentTime()
			};
			const assembled = createInitGraphics({topics, graphics, renderAll: true});
			setState({topics, assembled, toComputeGraphics: true, svgSize: {}});
		};
		on(CatalogEventTypes.ASK_GRAPHICS_SVG, onAskGraphicsSvg);
		return () => {
			off(CatalogEventTypes.ASK_GRAPHICS_SVG, onAskGraphicsSvg);
		};
	}, [on, off, pipelines]);
	useEffect(() => {
		if (state.toComputeGraphics) {
			setState(({topics, assembled}) => {
				const {width, height} = computeGraphics({graphics: assembled!, svg: svgRef.current!});
				return {topics, assembled, toComputeGraphics: false, svgSize: {width, height}};
			});
		}
	}, [fire, state.toComputeGraphics]);

	useEffect(() => {
		if (state.assembled && !state.toComputeGraphics) {
			const svgContainer = ref.current!;
			const cssVariables = getCSSVariables();
			Object.keys(cssVariables).map(key => svgRef.current!.style.setProperty(key, cssVariables[key].replace(/"/g, '&quot;')));
			[...svgContainer.querySelectorAll('*')].filter((element): element is SVGElement => {
				return element instanceof SVGElement;
			}).forEach(element => {
				copyCSSFromClassName(element);
			});

			svgRef.current!.style.fontSize = 'var(--font-size)';

			fire(CatalogEventTypes.REPLY_GRAPHICS_SVG, svgContainer!.innerHTML);
			setState({topics: [], assembled: null, toComputeGraphics: false, svgSize: {}});
		}
	}, [fire, state.assembled, state.toComputeGraphics]);

	if (state.assembled == null) {
		return null;
	}

	const topicGraphicsMap: Map<string, AssembledTopicGraphics> = asTopicGraphicsMap(state.assembled);

	return <MarkdownBodySvgContainer ref={ref}>
		<BodySvg {...state.svgSize} viewBox={`0 0 ${state.svgSize.width || 0} ${state.svgSize.height || 0}`}
		         ref={svgRef}>
			<BlockRelations graphics={state.assembled} pipelines={pipelines} topics={state.topics}/>
			{state.topics.map(topic => {
				const topicGraphics = topicGraphicsMap.get(topic.topicId);
				if (!topicGraphics) {
					return null;
				}
				return <TopicRect topic={topicGraphics} key={topic.topicId}/>;
			})}
		</BodySvg>
	</MarkdownBodySvgContainer>;
};

export const CatalogBody = (props: {
	topics: Array<Topic>;
	pipelines: Array<Pipeline>;
	graphics: AssembledPipelinesGraphics;
}) => {
	const {topics, pipelines, graphics} = props;

	const svgContainerRef = useRef<HTMLDivElement>(null);
	const svgRef = useRef<SVGSVGElement>(null);
	const {fire, on, off} = useCatalogEventBus();
	const [svgSize, setSvgSize] = useState<Partial<GraphicsSize>>({});
	const [willComputeGraphics, setWillComputeGraphics] = useState(false);

	const forceUpdate = useForceUpdate();
	useEffect(() => {
		if (graphics && svgContainerRef.current && svgRef.current) {
			const {width, height} = computeGraphics({graphics: graphics, svg: svgRef.current});
			setSvgSize({width, height});
		}
	}, [graphics, forceUpdate]);
	useEffect(() => {
		// when topic selected change, must paint topics to svg first
		// and prepare to trigger next render
		const onTopicsSelected = () => setWillComputeGraphics(true);
		on(CatalogEventTypes.TOPICS_SELECTED, onTopicsSelected);
		return () => {
			off(CatalogEventTypes.TOPICS_SELECTED, onTopicsSelected);
		};
	}, [on, off, graphics]);
	useEffect(() => {
		if (willComputeGraphics) {
			// trigger position compute again, fire repainted event to save data
			setWillComputeGraphics(false);
			if (graphics && svgContainerRef.current && svgRef.current) {
				const {width, height} = computeGraphics({graphics: graphics, svg: svgRef.current});
				setSvgSize({width, height});
				fire(CatalogEventTypes.TOPICS_REPAINTED, graphics);
			}
		}
	}, [fire, graphics, willComputeGraphics]);
	useEffect(() => {
		const onTopicMoved = (topic: Topic, graphics: AssembledTopicGraphics) => {
			const {width = 0, height = 0} = svgSize;
			const {coordinate: {x, y}, frame: {width: topicWidth, height: topicHeight}} = graphics.rect;
			const newWidth = x + topicWidth > width ? width * 2 : width;
			const newHeight = y + topicHeight > height ? height * 2 : height;
			if (newWidth !== width || newHeight !== height) {
				setSvgSize({width: newWidth, height: newHeight});
			}
		};
		on(CatalogEventTypes.TOPIC_MOVED, onTopicMoved);
		return () => {
			off(CatalogEventTypes.TOPIC_MOVED, onTopicMoved);
		};
	}, [on, off, svgSize]);
	useEffect(() => {
		if (svgContainerRef.current) {
			// @ts-ignore
			const resizeObserver = new ResizeObserver(() => {
				fire(CatalogEventTypes.RESIZE);
				if (graphics && svgContainerRef.current && svgRef.current) {
					const {width, height} = computeGraphics({graphics: graphics, svg: svgRef.current});
					if (width > (svgSize.width || 0) || height > (svgSize.height || 0)) {
						setSvgSize({width, height});
					}
				}
			});
			resizeObserver.observe(svgContainerRef.current);
			return () => resizeObserver.disconnect();
		}
	}, [fire, graphics, svgSize.width, svgSize.height]);

	const clearSelection = () => {
		fire(CatalogEventTypes.CLEAR_SELECTION);
	};
	const onBodyScroll = () => fire(CatalogEventTypes.SCROLL);
	const onSvgMouseDown = (event: MouseEvent) => {
		const {button, target} = event;
		if (button === 2 || button === 1) {
			return;
		}

		const element = target as SVGGraphicsElement;
		const tagName = element.tagName.toUpperCase();
		if (tagName === 'SVG') {
			clearSelection();
			return;
		}

		const role = element.getAttribute('data-role') || '';
		switch (role) {
			case GraphicsRole.TOPIC_FRAME:
			case GraphicsRole.TOPIC_NAME:
				const topicRect = element.parentElement! as unknown as SVGGElement;
				const topicId = topicRect.getAttribute('data-topic-id')!;
				fire(CatalogEventTypes.TOPIC_SELECTED, topicGraphicsMap.get(topicId)!.topic);
				break;
			default:
				clearSelection();
				break;
		}
	};

	const topicGraphicsMap: Map<string, AssembledTopicGraphics> = asTopicGraphicsMap(graphics);

	return <BodyContainer>
		<BodySvgContainer ref={svgContainerRef} onScroll={onBodyScroll}>
			<BodySvg onMouseDown={onSvgMouseDown} {...svgSize} ref={svgRef}>
				<BlockRelations graphics={graphics} pipelines={pipelines} topics={topics}/>
				{topics.map(topic => {
					const topicGraphics = topicGraphicsMap.get(topic.topicId);
					if (!topicGraphics) {
						return null;
					}
					return <TopicRect topic={topicGraphics} key={topic.topicId}/>;
				})}
				<BlockSelection graphics={graphics}/>
			</BodySvg>
			<BodySvgRelationsAnimationContainer>
				<BlockRelationsAnimation graphics={graphics} pipelines={pipelines}/>
			</BodySvgRelationsAnimationContainer>
			<Thumbnail pipelines={pipelines} topics={topics} graphics={graphics}
			           svgSize={svgSize}
			           topicGraphicsMap={topicGraphicsMap}/>
		</BodySvgContainer>
		<Navigator pipelines={pipelines} topics={topics}/>
		<GraphicsSave graphics={graphics}/>
		<MarkdownSvgPalette pipelines={pipelines}/>
	</BodyContainer>;
};