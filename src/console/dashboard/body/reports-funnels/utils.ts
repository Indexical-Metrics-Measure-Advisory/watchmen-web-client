import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {EnumId} from '@/services/data/tuples/enum-types';
import {isTopicFactorParameter} from '@/services/data/tuples/parameter-utils';
import {Report, ReportFunnel, ReportFunnelType} from '@/services/data/tuples/report-types';
import {fetchTopic} from '@/services/data/tuples/topic';
import {Topic, TopicId} from '@/services/data/tuples/topic-types';
import {FunnelDefs, GroupedFunnel} from './types';

export const buildFunnelDefsFromDashboard = (connectedSpaces: Array<ConnectedSpace>): FunnelDefs => {
	const subjects = connectedSpaces.map(connectedSpace => connectedSpace.subjects ?? []).flat();
	const reportAndSubjects = subjects.map(subject => (subject.reports ?? []).map(report => {
		return {subject, report};
	})).flat();

	const funnelDefs: FunnelDefs = {};
	reportAndSubjects.forEach(({subject, report}) => {
		(report.funnels ?? []).forEach(funnel => {
			const {columnId, type} = funnel;
			if (type === ReportFunnelType.ENUM) {
				// find enum
				// eslint-disable-next-line
				const column = (subject.dataset.columns ?? []).find(column => column.columnId == columnId);
				if (!column || !isTopicFactorParameter(column.parameter)) {
					return;
				}
				funnelDefs[funnel.funnelId] = {topicId: column.parameter.topicId, factorId: column.parameter.factorId};
			} else if (type === ReportFunnelType.NUMERIC) {
				// eslint-disable-next-line
				const column = (subject.dataset.columns ?? []).find(column => column.columnId == columnId);
				if (!column) {
					return;
				}
				funnelDefs[funnel.funnelId] = {name: column.alias ?? ''};
			} else {
				// ignored, will not read funnel-subject definition in runtime
			}
		});
	});

	return funnelDefs;
};

export const gatherTopicIds = (defs: FunnelDefs): Array<TopicId> => {
	return [...new Set(
		[...Object.values(defs).map(def => def.topicId).filter(topicId => !!topicId)]
	)] as Array<TopicId>;
};

export const fillFunnelDefsByEnumIds = (funnelDefs: FunnelDefs, topics: Array<Topic>): { defs: FunnelDefs; enumIds: Array<EnumId> } => {
	return Object.keys(funnelDefs).reduce((data, funnelId) => {
		const def = funnelDefs[funnelId];
		if (!def.topicId) {
			data.defs[funnelId] = def;
		} else {
			// ignore funnel which topic/factor/enum not found.
			// eslint-disable-next-line
			const topic = topics.find(topic => topic.topicId == def.topicId);
			if (topic) {
				// eslint-disable-next-line
				const factor = (topic.factors ?? []).find(factor => factor.factorId == def.factorId);
				if (factor && factor.enumId) {
					def.enumId = factor.enumId;
					data.defs[funnelId] = def;
					// eslint-disable-next-line
					if (data.enumIds.every(enumId => enumId != factor.enumId)) {
						data.enumIds.push(factor.enumId);
					}
				}
			}
		}
		return data;
	}, {defs: {}, enumIds: []} as { defs: FunnelDefs; enumIds: Array<EnumId> });
};
export const fetchTopics = async (topicIds: Array<TopicId>): Promise<Array<Topic>> => {
	if (topicIds.length === 0) {
		return [];
	}

	try {
		return await Promise.all(topicIds.map(async topicId => {
			const {topic} = await fetchTopic(topicId);
			return topic;
		}));
	} catch {
		return [];
	}
};

const findGroup = (groups: Array<GroupedFunnel>, type: ReportFunnelType, and?: (group: GroupedFunnel) => boolean): GroupedFunnel | undefined => {
	return groups.find(group => {
		return group.funnel.type === type && (and == null || and(group));
	});
};

const putIntoGroup = (
	groups: Array<GroupedFunnel>, report: Report, funnel: ReportFunnel,
	and?: (group: GroupedFunnel) => boolean,
	more?: (funnel: ReportFunnel) => { enumId?: EnumId; name?: string }
) => {
	const group = findGroup(groups, funnel.type, and);
	if (group) {
		group.reports.push({report, funnel});
		if (!funnel.range && group.funnel.range) {
			// exists funnel is range, and new one is not
			// reduce to single value funnel
			group.funnel.range = false;
			if (group.funnel.values != null && group.funnel.values[0] != null) {
				group.funnel.values = [group.funnel.values[0]];
			} else if (funnel.values != null) {
				group.funnel.values = funnel.values;
			} else {
				group.funnel.values = [];
			}
		}
		funnel.values = group.funnel.values;
	} else {
		const newGroup = {
			funnel: {
				type: funnel.type,
				range: funnel.range,
				values: funnel.values ?? [],
				...(more ? more(funnel) : {})
			},
			reports: [{report, funnel}]
		};
		funnel.values = newGroup.funnel.values;
		groups.push(newGroup);
	}
};

export const groupFunnels = (reports: Array<Report>, funnelDefs: FunnelDefs, groups?: Array<GroupedFunnel>): Array<GroupedFunnel> => {
	groups = groups ?? [];
	reports.forEach(report => {
		(report.funnels ?? []).filter(funnel => funnel.enabled).forEach((funnel: ReportFunnel) => {
			switch (funnel.type) {
				case ReportFunnelType.ENUM: {
					const enumId = funnelDefs[funnel.funnelId].enumId;
					if (enumId) {
						putIntoGroup(groups!, report, funnel,
							// eslint-disable-next-line
							(group) => group.funnel.enumId == enumId,
							() => ({enumId}));
					}
					break;
				}
				case ReportFunnelType.NUMERIC: {
					// cannot recognize and group funnels of numeric to one,
					// group them by name
					const name = funnelDefs[funnel.funnelId].name;
					if (name) {
						putIntoGroup(groups!, report, funnel,
							// eslint-disable-next-line
							(group) => group.funnel.name == name,
							() => ({name}));
					}
					break;
				}
				default:
					putIntoGroup(groups!, report, funnel);
					break;
			}
		});
	});
	return groups;
};