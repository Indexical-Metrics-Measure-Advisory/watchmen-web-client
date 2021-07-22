import {FactorType} from '../../tuples/factor-types';
import {QueryTopic} from '../../tuples/query-topic-types';
import {Topic, TopicKind, TopicType} from '../../tuples/topic-types';
import {getCurrentTime} from '../../utils';

export const Quotation: Topic = {
	topicId: '1', name: 'Quotation', kind: TopicKind.BUSINESS, type: TopicType.DISTINCT,
	factors: [
		{
			factorId: '101',
			name: 'quotationId',
			label: 'Quotation Sequence',
			type: FactorType.SEQUENCE,
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		},
		{
			factorId: '102', name: 'quoteNo', label: 'Quotation No.', type: FactorType.TEXT,
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		},
		{
			factorId: '103',
			name: 'quoteDate',
			label: 'Quotation Create Date',
			type: FactorType.DATETIME,
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		},
		{
			factorId: '104',
			name: 'policyHolderId',
			label: 'Policy Holder Id',
			type: FactorType.SEQUENCE,
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		},
		{
			factorId: '105', name: 'premium', label: 'Premium', type: FactorType.NUMBER,
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		},
		{
			factorId: '106', name: 'issued', label: 'Issued', type: FactorType.BOOLEAN,
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		}
	],
	createTime: getCurrentTime(),
	lastModifyTime: getCurrentTime()
};
export const Policy: Topic = {
	topicId: '2', name: 'Policy', kind: TopicKind.BUSINESS, type: TopicType.DISTINCT,
	factors: [
		{
			factorId: '201', name: 'policyId', label: 'Policy Sequence', type: FactorType.SEQUENCE,
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		},
		{
			factorId: '202', name: 'quotationNo', label: 'Quotation No.', type: FactorType.TEXT,
			indexGroup: 'u-1',
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		},
		{
			factorId: '203',
			name: 'quoteDate',
			label: 'Quotation Create Date',
			type: FactorType.DATETIME,
			indexGroup: 'i-1',
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		},
		{
			factorId: '204', name: 'policyNo', label: 'Policy No.', type: FactorType.TEXT,
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		},
		{
			factorId: '205', name: 'issueDate', label: 'Policy Issue Date', type: FactorType.DATETIME,
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		},
		{
			factorId: '206',
			name: 'policyHolderId',
			label: 'Policy Holder Id',
			type: FactorType.SEQUENCE,
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		},
		{
			factorId: '207', name: 'premium', label: 'Premium', type: FactorType.NUMBER,
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		}
	],
	createTime: getCurrentTime(),
	lastModifyTime: getCurrentTime()
};
export const Participant: Topic = {
	topicId: '3', name: 'Participant', kind: TopicKind.BUSINESS, type: TopicType.DISTINCT,
	description: 'Participant of quotation or policy, including policy holder, insureds, etc.',
	factors: [
		{
			factorId: '301',
			name: 'participantId',
			label: 'Participant Sequence',
			type: FactorType.SEQUENCE,
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		},
		{
			factorId: '302', name: 'firstName', label: 'First Name', type: FactorType.TEXT,
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		},
		{
			factorId: '303', name: 'lastName', label: 'Last Name', type: FactorType.TEXT,
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		},
		{
			factorId: '304', name: 'fullName', label: 'Full Name', type: FactorType.TEXT,
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		},
		{
			factorId: '305', name: 'dateOfBirth', label: 'Birth Date', type: FactorType.DATETIME,
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		},
		{
			factorId: '306', name: 'gender', label: 'Gender', type: FactorType.ENUM,
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		},
		{
			factorId: '307', name: 'city', label: 'City', type: FactorType.ENUM,
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		}
	],
	createTime: getCurrentTime(),
	lastModifyTime: getCurrentTime()
};
export const RawQuotation: Topic = {
	topicId: '4', name: 'Raw Quotation', kind: TopicKind.BUSINESS, type: TopicType.RAW,
	factors: [
		{
			factorId: '401', name: 'quotationId', label: 'Quotation Sequence', type: FactorType.SEQUENCE,
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		},
		{
			factorId: '402', name: 'quotationNo', label: 'Quotation No.', type: FactorType.TEXT,
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		},
		{
			factorId: '403', name: 'quoteDate', label: 'Quotation Create Date', type: FactorType.DATETIME,
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		},
		{
			factorId: '404', name: 'policyNo', label: 'Policy No.', type: FactorType.TEXT,
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		},
		{
			factorId: '405', name: 'issueDate', label: 'Issue Date', type: FactorType.DATETIME,
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		},
		{
			factorId: '406', name: 'holder', label: 'Holder', type: FactorType.OBJECT,
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		},
		{
			factorId: '407', name: 'holder.holderId', label: 'Holder Id', type: FactorType.SEQUENCE,
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		},
		{
			factorId: '408', name: 'holder.firstName', label: 'Holder First Name', type: FactorType.TEXT,
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		},
		{
			factorId: '409', name: 'holder.lastName', label: 'Holder Last Name', type: FactorType.TEXT,
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		},
		{
			factorId: '410',
			name: 'holder.dateOfBirth',
			label: 'Policy Holder Birth Date',
			type: FactorType.DATE_OF_BIRTH,
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		},
		{
			factorId: '411', name: 'holder.gender', label: 'Holder Gender', type: FactorType.GENDER,
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		},
		{
			factorId: '412', name: 'holder.city', label: 'Holder City', type: FactorType.CITY,
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		},
		{
			factorId: '413', name: 'premium', label: 'Premium', type: FactorType.NUMBER,
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		}
	],
	createTime: getCurrentTime(),
	lastModifyTime: getCurrentTime()
};
export const WeeklyPolicyPremium: Topic = {
	topicId: '5', name: 'Weekly Policy Premium', kind: TopicKind.BUSINESS, type: TopicType.TIME,
	factors: [
		{
			factorId: '501', name: 'year', label: 'Year', type: FactorType.YEAR,
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		},
		{
			factorId: '502', name: 'week', label: 'Week', type: FactorType.WEEK_OF_YEAR,
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		},
		{
			factorId: '503', name: 'premium', label: 'Premium Sum', type: FactorType.NUMBER,
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		}
	],
	createTime: getCurrentTime(),
	lastModifyTime: getCurrentTime()
};
export const MonthlyPolicyPremium: Topic = {
	topicId: '6', name: 'Monthly Policy Premium', kind: TopicKind.BUSINESS, type: TopicType.TIME,
	factors: [
		{
			factorId: '601', name: 'year', label: 'Year', type: FactorType.YEAR,
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		},
		{
			factorId: '602', name: 'month', label: 'Month', type: FactorType.MONTH,
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		},
		{
			factorId: '603', name: 'premium', label: 'Premium Sum', type: FactorType.NUMBER,
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		}
	],
	createTime: getCurrentTime(),
	lastModifyTime: getCurrentTime()
};
export const RawEndorsement: Topic = {
	topicId: '7', name: 'Raw Endorsement', kind: TopicKind.BUSINESS, type: TopicType.RAW,
	factors: [
		{
			factorId: '701', name: 'endorsementId', label: 'Endorsement Sequence', type: FactorType.SEQUENCE,
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		},
		{
			factorId: '702', name: 'endorsementNo', label: 'Endorsement No.', type: FactorType.TEXT,
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		},
		{
			factorId: '703', name: 'endorsementDate', label: 'Endorsement Create Date', type: FactorType.DATETIME,
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		},
		{
			factorId: '704', name: 'policyNo', label: 'Policy No.', type: FactorType.TEXT,
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		},
		{
			factorId: '705', name: 'effectiveDate', label: 'Effective Date', type: FactorType.DATETIME,
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		},
		{
			factorId: '706', name: 'premium', label: 'Premium', type: FactorType.NUMBER,
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		}
	],
	createTime: getCurrentTime(),
	lastModifyTime: getCurrentTime()
};
export const WeeklyPolicyPremiumIncrement: Topic = {
	topicId: '8', name: 'Weekly Policy Premium Increment', kind: TopicKind.BUSINESS, type: TopicType.RATIO,
	factors: [
		{
			factorId: '801', name: 'year', label: 'Year', type: FactorType.NUMBER,
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		},
		{
			factorId: '802', name: 'week', label: 'Week', type: FactorType.NUMBER,
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		},
		{
			factorId: '803', name: 'incrementRatio', label: 'Increment Ratio', type: FactorType.NUMBER,
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		}
	],
	createTime: getCurrentTime(),
	lastModifyTime: getCurrentTime()
};
export const DemoTopics: Array<Topic> = [
	Quotation, Policy, Participant, RawQuotation,
	WeeklyPolicyPremium, MonthlyPolicyPremium, RawEndorsement, WeeklyPolicyPremiumIncrement
].map(t => ({...t, tenantId: '1'}));
const asQueryTopic = (topic: Topic, reportCount: number, groupCount: number, spaceCount: number): QueryTopic => {
	const {topicId, name, type, description, factors} = topic;
	return {
		topicId, name, type, description, factorCount: factors.length, reportCount, groupCount, spaceCount
	} as QueryTopic;
};
export const DemoQueryTopics: Array<QueryTopic> = [
	asQueryTopic(Quotation, 5, 3, 2),
	asQueryTopic(Policy, 4, 3, 2),
	asQueryTopic(Participant, 2, 3, 2),
	asQueryTopic(RawQuotation, 0, 0, 0),
	asQueryTopic(WeeklyPolicyPremium, 0, 0, 0),
	asQueryTopic(MonthlyPolicyPremium, 0, 0, 0),
	asQueryTopic(RawEndorsement, 0, 0, 0),
	asQueryTopic(WeeklyPolicyPremiumIncrement, 0, 0, 0)
];
