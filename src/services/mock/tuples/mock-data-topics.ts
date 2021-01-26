import { FactorType } from '../../tuples/factor-types';
import { TopicType } from '../../tuples/topic-types';

export const DemoTopics = [
	{
		topicId: '1',
		name: 'Quotation',
		type: TopicType.DISTINCT,
		raw: false,
		factorCount: 6,
		reportCount: 5,
		groupCount: 3,
		spaceCount: 2,
		factors: [
			{
				factorId: '101',
				name: 'quotationId',
				label: 'Quotation Sequence',
				type: FactorType.SEQUENCE
			},
			{ factorId: '102', name: 'quoteNo', label: 'Quotation No.', type: FactorType.TEXT },
			{
				factorId: '103',
				name: 'quoteDate',
				label: 'Quotation Create Date',
				type: FactorType.DATETIME
			},
			{
				factorId: '104',
				name: 'policyHolderId',
				label: 'Policy Holder Id',
				type: FactorType.SEQUENCE
			},
			{ factorId: '105', name: 'premium', label: 'Premium', type: FactorType.NUMBER },
			{ factorId: '106', name: 'issued', label: 'Issued', type: FactorType.BOOLEAN }
		]
	},
	{
		topicId: '2',
		code: 'policy',
		name: 'Policy',
		type: TopicType.DISTINCT,
		raw: false,
		factorCount: 7,
		reportCount: 4,
		groupCount: 3,
		spaceCount: 2,
		factors: [
			{ factorId: '201', name: 'policyId', label: 'Policy Sequence', type: FactorType.SEQUENCE },
			{ factorId: '202', name: 'quotationNo', label: 'Quotation No.', type: FactorType.TEXT },
			{
				factorId: '203',
				name: 'quoteDate',
				label: 'Quotation Create Date',
				type: FactorType.DATETIME
			},
			{ factorId: '204', name: 'policyNo', label: 'Policy No.', type: FactorType.TEXT },
			{ factorId: '205', name: 'issueDate', label: 'Policy Issue Date', type: FactorType.DATETIME },
			{
				factorId: '206',
				name: 'policyHolderId',
				label: 'Policy Holder Id',
				type: FactorType.SEQUENCE
			},
			{ factorId: '207', name: 'premium', label: 'Premium', type: FactorType.NUMBER }
		]
	},
	{
		topicId: '3',
		code: 'participant',
		name: 'Participant',
		type: TopicType.DISTINCT,
		description: 'Participant of quotation or policy, including policy holder, insureds, etc.',
		raw: false,
		factorCount: 6,
		reportCount: 2,
		groupCount: 3,
		spaceCount: 2,
		factors: [
			{
				factorId: '301',
				name: 'participantId',
				label: 'Participant Sequence',
				type: FactorType.SEQUENCE
			},
			{ factorId: '302', name: 'firstName', label: 'First Name', type: FactorType.TEXT },
			{ factorId: '303', name: 'lastName', label: 'Last Name', type: FactorType.TEXT },
			{ factorId: '304', name: 'fullName', label: 'Full Name', type: FactorType.TEXT },
			{ factorId: '305', name: 'dateOfBirth', label: 'Birth Date', type: FactorType.DATETIME },
			{ factorId: '306', name: 'gender', label: 'Gender', type: FactorType.ENUM },
			{ factorId: '307', name: 'city', label: 'City', type: FactorType.ENUM }
		]
	},
	{
		topicId: '4',
		code: 'raw-quotation',
		name: 'Raw Quotation',
		type: TopicType.RAW,
		raw: true,
		factorCount: 10,
		reportCount: 0,
		groupCount: 0,
		spaceCount: 0,
		factors: [
			{ factorId: '401', name: 'quotationId', label: 'Quotation Sequence', type: FactorType.SEQUENCE },
			{ factorId: '402', name: 'quotationNo', label: 'Quotation No.', type: FactorType.TEXT },
			{ factorId: '403', name: 'quoteDate', label: 'Quotation Create Date', type: FactorType.DATETIME },
			{ factorId: '404', name: 'policyNo', label: 'Policy No.', type: FactorType.TEXT },
			{ factorId: '405', name: 'issueDate', label: 'Issue Date', type: FactorType.DATETIME },
			{ factorId: '406', name: 'holderId', label: 'Holder Id', type: FactorType.SEQUENCE },
			{ factorId: '407', name: 'holderFirstName', label: 'Holder First Name', type: FactorType.TEXT },
			{ factorId: '408', name: 'holderLastName', label: 'Holder Last Name', type: FactorType.TEXT },
			{
				factorId: '410',
				name: 'holderDateOfBirth',
				label: 'Policy Holder Birth Date',
				type: FactorType.DATETIME
			},
			{ factorId: '411', name: 'holderGender', label: 'Holder Gender', type: FactorType.ENUM },
			{ factorId: '412', name: 'holderCity', label: 'Holder City', type: FactorType.ENUM },
			{ factorId: '413', name: 'premium', label: 'Premium', type: FactorType.NUMBER }
		]
	},
	{
		topicId: '5',
		code: 'weekly-policy-premium',
		name: 'Weekly Policy Premium',
		type: TopicType.TIME,
		raw: false,
		factorCount: 3,
		reportCount: 0,
		groupCount: 0,
		spaceCount: 0,
		factors: [
			{ factorId: '501', name: 'year', label: 'Year', type: FactorType.NUMBER },
			{ factorId: '502', name: 'week', label: 'Week', type: FactorType.NUMBER },
			{ factorId: '503', name: 'premium', label: 'Premium Sum', type: FactorType.NUMBER }
		]
	},
	{
		topicId: '6',
		code: 'monthly-policy-premium',
		name: 'Monthly Policy Premium',
		type: TopicType.TIME,
		raw: false,
		factorCount: 3,
		reportCount: 0,
		groupCount: 0,
		spaceCount: 0,
		factors: [
			{ factorId: '601', name: 'year', label: 'Year', type: FactorType.NUMBER },
			{ factorId: '602', name: 'month', label: 'Month', type: FactorType.NUMBER },
			{ factorId: '603', name: 'premium', label: 'Premium Sum', type: FactorType.NUMBER }
		]
	},
	{
		topicId: '7',
		code: 'raw-endorsement',
		name: 'Raw Endorsement',
		type: TopicType.RAW,
		raw: true,
		factorCount: 10,
		reportCount: 0,
		groupCount: 0,
		spaceCount: 0,
		factors: [
			{ factorId: '701', name: 'endorsementId', label: 'Endorsement Sequence', type: FactorType.SEQUENCE },
			{ factorId: '702', name: 'endorsementNo', label: 'Endorsement No.', type: FactorType.TEXT },
			{ factorId: '703', name: 'endorsementDate', label: 'Endorsement Create Date', type: FactorType.DATETIME },
			{ factorId: '704', name: 'policyNo', label: 'Policy No.', type: FactorType.TEXT },
			{ factorId: '705', name: 'effectiveDate', label: 'Effective Date', type: FactorType.DATETIME },
			{ factorId: '706', name: 'premium', label: 'Premium', type: FactorType.NUMBER }
		]
	},
	{
		topicId: '8',
		code: 'weekly-policy-premium-increment',
		name: 'Weekly Policy Premium Increment',
		type: TopicType.RATIO,
		raw: false,
		factorCount: 3,
		reportCount: 0,
		groupCount: 0,
		spaceCount: 0,
		factors: [
			{ factorId: '801', name: 'year', label: 'Year', type: FactorType.NUMBER },
			{ factorId: '802', name: 'week', label: 'Week', type: FactorType.NUMBER },
			{ factorId: '803', name: 'incrementRatio', label: 'Increment Ratio', type: FactorType.NUMBER }
		]
	}
];
