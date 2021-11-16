import {FactorType} from '../../tuples/factor-types';
import {QueryTopic} from '../../tuples/query-topic-types';
import {Topic, TopicKind, TopicType} from '../../tuples/topic-types';
import {getCurrentTime} from '../../utils';
import {MOCK_ENUM_CITY_ID, MOCK_ENUM_GENDER_ID} from './mock-enum';

export const Quotation: Topic = {
	topicId: '1', name: 'Quotation', kind: TopicKind.BUSINESS, type: TopicType.DISTINCT,
	factors: [
		{
			factorId: '101',
			name: 'quotationId',
			label: 'Quotation Sequence',
			type: FactorType.SEQUENCE,
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		},
		{
			factorId: '102', name: 'quoteNo', label: 'Quotation No.', type: FactorType.TEXT,
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		},
		{
			factorId: '103',
			name: 'quoteDate',
			label: 'Quotation Create Date',
			type: FactorType.DATETIME,
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		},
		{
			factorId: '104',
			name: 'orderHolderId',
			label: 'Order Holder Id',
			type: FactorType.SEQUENCE,
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		},
		{
			factorId: '105', name: 'premium', label: 'Premium', type: FactorType.NUMBER,
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		},
		{
			factorId: '106', name: 'issued', label: 'Issued', type: FactorType.BOOLEAN,
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		}
	],
	createTime: getCurrentTime(),
	lastModified: getCurrentTime()
};
export const Order: Topic = {
	topicId: '2', name: 'Order', kind: TopicKind.BUSINESS, type: TopicType.DISTINCT,
	factors: [
		{
			factorId: '201', name: 'orderId', label: 'Order Sequence', type: FactorType.SEQUENCE,
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		},
		{
			factorId: '202', name: 'quotationNo', label: 'Quotation No.', type: FactorType.TEXT,
			indexGroup: 'u-1',
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		},
		{
			factorId: '203',
			name: 'quoteDate',
			label: 'Quotation Create Date',
			type: FactorType.DATETIME,
			indexGroup: 'i-1',
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		},
		{
			factorId: '204', name: 'orderNo', label: 'Order No.', type: FactorType.TEXT,
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		},
		{
			factorId: '205', name: 'issueDate', label: 'Order Issue Date', type: FactorType.DATETIME,
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		},
		{
			factorId: '206',
			name: 'orderHolderId',
			label: 'Order Holder Id',
			type: FactorType.SEQUENCE,
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		},
		{
			factorId: '207', name: 'premium', label: 'Premium', type: FactorType.NUMBER,
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		},
		{
			factorId: '208', name: 'ensureProvince', label: 'Ensure Province', type: FactorType.PROVINCE,
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		},
		{
			factorId: '209', name: 'ensureCity', label: 'Ensure City', type: FactorType.ENUM,
			enumId: MOCK_ENUM_CITY_ID,
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		}
	],
	createTime: getCurrentTime(),
	lastModified: getCurrentTime()
};
export const Participant: Topic = {
	topicId: '3', name: 'Participant', kind: TopicKind.BUSINESS, type: TopicType.DISTINCT,
	description: 'Participant of quotation or order, including order holder, insureds, etc.',
	factors: [
		{
			factorId: '301',
			name: 'participantId',
			label: 'Participant Sequence',
			type: FactorType.SEQUENCE,
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		},
		{
			factorId: '302', name: 'firstName', label: 'First Name', type: FactorType.TEXT,
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		},
		{
			factorId: '303', name: 'lastName', label: 'Last Name', type: FactorType.TEXT,
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		},
		{
			factorId: '304', name: 'fullName', label: 'Full Name', type: FactorType.TEXT,
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		},
		{
			factorId: '305', name: 'dateOfBirth', label: 'Birth Date', type: FactorType.DATETIME,
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		},
		{
			factorId: '306', name: 'gender', label: 'Gender', type: FactorType.ENUM,
			enumId: MOCK_ENUM_GENDER_ID,
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		},
		{
			factorId: '307', name: 'city', label: 'City', type: FactorType.ENUM,
			enumId: MOCK_ENUM_CITY_ID,
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		}
	],
	createTime: getCurrentTime(),
	lastModified: getCurrentTime()
};
export const RawQuotation: Topic = {
	topicId: '4', name: 'Raw Quotation', kind: TopicKind.BUSINESS, type: TopicType.RAW,
	factors: [
		{
			factorId: '401', name: 'quotationId', label: 'Quotation Sequence', type: FactorType.SEQUENCE,
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		},
		{
			factorId: '402', name: 'quotationNo', label: 'Quotation No.', type: FactorType.TEXT,
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		},
		{
			factorId: '403', name: 'quoteDate', label: 'Quotation Create Date', type: FactorType.DATETIME,
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		},
		{
			factorId: '404', name: 'orderNo', label: 'Order No.', type: FactorType.TEXT,
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		},
		{
			factorId: '405', name: 'issueDate', label: 'Issue Date', type: FactorType.DATETIME,
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		},
		{
			factorId: '406', name: 'holder', label: 'Holder', type: FactorType.OBJECT,
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		},
		{
			factorId: '407', name: 'holder.holderId', label: 'Holder Id', type: FactorType.SEQUENCE,
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		},
		{
			factorId: '408', name: 'holder.firstName', label: 'Holder First Name', type: FactorType.TEXT,
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		},
		{
			factorId: '409', name: 'holder.lastName', label: 'Holder Last Name', type: FactorType.TEXT,
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		},
		{
			factorId: '410',
			name: 'holder.dateOfBirth',
			label: 'Order Holder Birth Date',
			type: FactorType.DATE_OF_BIRTH,
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		},
		{
			factorId: '411', name: 'holder.gender', label: 'Holder Gender', type: FactorType.GENDER,
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		},
		{
			factorId: '412', name: 'holder.city', label: 'Holder City', type: FactorType.CITY,
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		},
		{
			factorId: '413', name: 'premium', label: 'Premium', type: FactorType.NUMBER,
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		}
	],
	createTime: getCurrentTime(),
	lastModified: getCurrentTime()
};
export const WeeklyOrderPremium: Topic = {
	topicId: '5', name: 'Weekly Order Premium', kind: TopicKind.BUSINESS, type: TopicType.TIME,
	factors: [
		{
			factorId: '501', name: 'year', label: 'Year', type: FactorType.YEAR,
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		},
		{
			factorId: '502', name: 'week', label: 'Week', type: FactorType.WEEK_OF_YEAR,
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		},
		{
			factorId: '503', name: 'premium', label: 'Premium Sum', type: FactorType.NUMBER,
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		}
	],
	createTime: getCurrentTime(),
	lastModified: getCurrentTime()
};
export const MonthlyOrderPremium: Topic = {
	topicId: '6', name: 'Monthly Order Premium', kind: TopicKind.BUSINESS, type: TopicType.TIME,
	factors: [
		{
			factorId: '601', name: 'year', label: 'Year', type: FactorType.YEAR,
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		},
		{
			factorId: '602', name: 'month', label: 'Month', type: FactorType.MONTH,
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		},
		{
			factorId: '603', name: 'premium', label: 'Premium Sum', type: FactorType.NUMBER,
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		}
	],
	createTime: getCurrentTime(),
	lastModified: getCurrentTime()
};
export const RawEndorsement: Topic = {
	topicId: '7', name: 'Raw Endorsement', kind: TopicKind.BUSINESS, type: TopicType.RAW,
	factors: [
		{
			factorId: '701', name: 'endorsementId', label: 'Endorsement Sequence', type: FactorType.SEQUENCE,
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		},
		{
			factorId: '702', name: 'endorsementNo', label: 'Endorsement No.', type: FactorType.TEXT,
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		},
		{
			factorId: '703', name: 'endorsementDate', label: 'Endorsement Create Date', type: FactorType.DATETIME,
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		},
		{
			factorId: '704', name: 'orderNo', label: 'Order No.', type: FactorType.TEXT,
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		},
		{
			factorId: '705', name: 'effectiveDate', label: 'Effective Date', type: FactorType.DATETIME,
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		},
		{
			factorId: '706', name: 'premium', label: 'Premium', type: FactorType.NUMBER,
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		}
	],
	createTime: getCurrentTime(),
	lastModified: getCurrentTime()
};
export const WeeklyOrderPremiumIncrement: Topic = {
	topicId: '8', name: 'Weekly Order Premium Increment', kind: TopicKind.BUSINESS, type: TopicType.RATIO,
	factors: [
		{
			factorId: '801', name: 'year', label: 'Year', type: FactorType.YEAR,
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		},
		{
			factorId: '802', name: 'week', label: 'Week', type: FactorType.WEEK_OF_YEAR,
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		},
		{
			factorId: '803', name: 'incrementRatio', label: 'Increment Ratio', type: FactorType.NUMBER,
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		}
	],
	createTime: getCurrentTime(),
	lastModified: getCurrentTime()
};
export const DemoTopics: Array<Topic> = [
	Quotation, Order, Participant, RawQuotation,
	WeeklyOrderPremium, MonthlyOrderPremium, RawEndorsement, WeeklyOrderPremiumIncrement
].map(t => ({...t, tenantId: '1'}));
const asQueryTopic = (topic: Topic): QueryTopic => {
	const {topicId, name, type, description, createTime, lastModified} = topic;
	return {topicId, name, type, description, createTime, lastModified} as QueryTopic;
};
export const DemoQueryTopics: Array<QueryTopic> = [
	asQueryTopic(Quotation),
	asQueryTopic(Order),
	asQueryTopic(Participant),
	asQueryTopic(RawQuotation),
	asQueryTopic(WeeklyOrderPremium),
	asQueryTopic(MonthlyOrderPremium),
	asQueryTopic(RawEndorsement),
	asQueryTopic(WeeklyOrderPremiumIncrement)
];
