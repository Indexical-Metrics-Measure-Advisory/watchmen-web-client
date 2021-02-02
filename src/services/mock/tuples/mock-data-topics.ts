import { FactorType } from '../../tuples/factor-types';
import { QueryTopic } from '../../tuples/query-topic-types';
import { Topic, TopicType } from '../../tuples/topic-types';
import { getCurrentTime } from '../../utils';

export const DemoTopics: Array<Topic & QueryTopic> = [
	{
		topicId: '1',
		name: 'Quotation',
		type: TopicType.DISTINCT,
		factorCount: 6,
		reportCount: 5,
		groupCount: 3,
		spaceCount: 2,
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
	},
	{
		topicId: '2',
		name: 'Policy',
		type: TopicType.DISTINCT,
		factorCount: 7,
		reportCount: 4,
		groupCount: 3,
		spaceCount: 2,
		factors: [
			{
				factorId: '201', name: 'policyId', label: 'Policy Sequence', type: FactorType.SEQUENCE,
				createTime: getCurrentTime(),
				lastModifyTime: getCurrentTime()
			},
			{
				factorId: '202', name: 'quotationNo', label: 'Quotation No.', type: FactorType.TEXT,
				createTime: getCurrentTime(),
				lastModifyTime: getCurrentTime()
			},
			{
				factorId: '203',
				name: 'quoteDate',
				label: 'Quotation Create Date',
				type: FactorType.DATETIME,
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
	},
	{
		topicId: '3',
		name: 'Participant',
		type: TopicType.DISTINCT,
		description: 'Participant of quotation or policy, including policy holder, insureds, etc.',
		factorCount: 6,
		reportCount: 2,
		groupCount: 3,
		spaceCount: 2,
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
	},
	{
		topicId: '4',
		name: 'Raw Quotation',
		type: TopicType.RAW,
		factorCount: 10,
		reportCount: 0,
		groupCount: 0,
		spaceCount: 0,
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
				factorId: '406', name: 'holderId', label: 'Holder Id', type: FactorType.SEQUENCE,
				createTime: getCurrentTime(),
				lastModifyTime: getCurrentTime()
			},
			{
				factorId: '407', name: 'holderFirstName', label: 'Holder First Name', type: FactorType.TEXT,
				createTime: getCurrentTime(),
				lastModifyTime: getCurrentTime()
			},
			{
				factorId: '408', name: 'holderLastName', label: 'Holder Last Name', type: FactorType.TEXT,
				createTime: getCurrentTime(),
				lastModifyTime: getCurrentTime()
			},
			{
				factorId: '410',
				name: 'holderDateOfBirth',
				label: 'Policy Holder Birth Date',
				type: FactorType.DATETIME,
				createTime: getCurrentTime(),
				lastModifyTime: getCurrentTime()
			},
			{
				factorId: '411', name: 'holderGender', label: 'Holder Gender', type: FactorType.ENUM,
				createTime: getCurrentTime(),
				lastModifyTime: getCurrentTime()
			},
			{
				factorId: '412', name: 'holderCity', label: 'Holder City', type: FactorType.ENUM,
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
	},
	{
		topicId: '5',
		name: 'Weekly Policy Premium',
		type: TopicType.TIME,
		factorCount: 3,
		reportCount: 0,
		groupCount: 0,
		spaceCount: 0,
		factors: [
			{
				factorId: '501', name: 'year', label: 'Year', type: FactorType.NUMBER,
				createTime: getCurrentTime(),
				lastModifyTime: getCurrentTime()
			},
			{
				factorId: '502', name: 'week', label: 'Week', type: FactorType.NUMBER,
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
	},
	{
		topicId: '6',
		name: 'Monthly Policy Premium',
		type: TopicType.TIME,
		factorCount: 3,
		reportCount: 0,
		groupCount: 0,
		spaceCount: 0,
		factors: [
			{
				factorId: '601', name: 'year', label: 'Year', type: FactorType.NUMBER,
				createTime: getCurrentTime(),
				lastModifyTime: getCurrentTime()
			},
			{
				factorId: '602', name: 'month', label: 'Month', type: FactorType.NUMBER,
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
	},
	{
		topicId: '7',
		name: 'Raw Endorsement',
		type: TopicType.RAW,
		factorCount: 10,
		reportCount: 0,
		groupCount: 0,
		spaceCount: 0,
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
	},
	{
		topicId: '8',
		name: 'Weekly Policy Premium Increment',
		type: TopicType.RATIO,
		factorCount: 3,
		reportCount: 0,
		groupCount: 0,
		spaceCount: 0,
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
	}
];
