import React, { useEffect } from 'react';
import { DropdownOption } from '../../../basic-widgets/types';
import { useForceUpdate } from '../../../basic-widgets/utils';
import { Factor, FactorType } from '../../../services/tuples/factor-types';
import { Topic, TopicType } from '../../../services/tuples/topic-types';
import { useTopicEventBus } from '../topic-event-bus';
import { TopicEventTypes } from '../topic-event-bus-types';
import { FactorPropDropdown, FactorTypeCellContainer, IncorrectFactorType } from './widgets';

// const prepareFactorPainting = (topic: Topic, factor: Factor) => {
// 	const { type: topicType } = topic;
// 	if (topicType !== TopicType.RAW) {
// 		// nested factor type is not allowed, unless it is a raw topic
// 		const { type: factorType } = factor;
// 		if (factorType === FactorType.OBJECT) {
// 			return {
// 				pass: false,
// 				typeOptions: FactorTypeOptions.filter(({ value }) => value !== FactorType.ARRAY)
// 					.map(option => {
// 						return option.value !== FactorType.OBJECT ? option : {
// 							value: FactorType.OBJECT,
// 							label: <IncorrectFactorType>Nested Object</IncorrectFactorType>
// 						};
// 					})
// 			};
// 		} else if (factorType === FactorType.ARRAY) {
// 			return {
// 				pass: false,
// 				typeOptions: FactorTypeOptions.filter(({ value }) => value !== FactorType.OBJECT)
// 					.map(option => {
// 						return option.value !== FactorType.ARRAY ? option : {
// 							value: FactorType.ARRAY,
// 							label: <IncorrectFactorType>Nested Array</IncorrectFactorType>
// 						};
// 					})
// 			};
// 		} else {
// 			return {
// 				pass: true,
// 				typeOptions: FactorTypeOptions.filter(({ value }) => value !== FactorType.ARRAY && value !== FactorType.OBJECT)
// 			};
// 		}
// 	} else {
// 		return { pass: true, typeOptions: FactorTypeOptions };
// 	}
// };

const AllTypeOptions: { [key in FactorType]: { label: string, order: number } } = {
	[FactorType.SEQUENCE]: { label: 'Sequence', order: 99999 },

	[FactorType.NUMBER]: { label: 'Numeric', order: 10001 },
	[FactorType.UNSIGNED]: { label: 'Unsigned Numeric', order: 10002 },

	[FactorType.TEXT]: { label: 'Text', order: 10101 },

	[FactorType.ADDRESS]: { label: 'Address', order: 10201 },
	[FactorType.CONTINENT]: { label: 'Continent', order: 10202 },
	[FactorType.REGION]: { label: 'Region', order: 10203 },
	[FactorType.COUNTRY]: { label: 'Country', order: 10204 },
	[FactorType.PROVINCE]: { label: 'State/Province', order: 10205 },
	[FactorType.CITY]: { label: 'City', order: 10206 },
	[FactorType.DISTRICT]: { label: 'District', order: 10206 },
	[FactorType.ROAD]: { label: 'Road', order: 10207 },
	[FactorType.COMMUNITY]: { label: 'Community', order: 10208 },
	[FactorType.FLOOR]: { label: 'Floor', order: 10209 },
	[FactorType.RESIDENCE_TYPE]: { label: 'Residence Type', order: 10210 },
	[FactorType.RESIDENTIAL_AREA]: { label: 'Residential Area', order: 10211 },

	[FactorType.EMAIL]: { label: 'Email', order: 10301 },
	[FactorType.PHONE]: { label: 'Phone', order: 10302 },
	[FactorType.MOBILE]: { label: 'Mobile', order: 10303 },
	[FactorType.FAX]: { label: 'Fax', order: 10304 },

	[FactorType.DATETIME]: { label: 'DateTime', order: 10401 },
	[FactorType.DATE]: { label: 'Date', order: 10402 },
	[FactorType.TIME]: { label: 'Time', order: 10403 },
	[FactorType.YEAR]: { label: 'Year', order: 10404 },
	[FactorType.HALF_YEAR]: { label: '1st/2nd Half Year', order: 10405 },
	[FactorType.QUARTER]: { label: 'Quarter', order: 10406 },
	[FactorType.SEASON]: { label: 'Season', order: 10407 },
	[FactorType.MONTH]: { label: 'Month', order: 10408 },
	[FactorType.HALF_MONTH]: { label: '1st/2nd Half Month', order: 10409 },
	[FactorType.TEN_DAYS]: { label: '1st/2nd/3rd Ten Days', order: 10410 },
	[FactorType.WEEK_OF_YEAR]: { label: 'Week of Year', order: 10411 },
	[FactorType.WEEK_OF_MONTH]: { label: 'Week of Month', order: 10412 },
	[FactorType.HALF_WEEK]: { label: '1st/2nd Half Week', order: 10413 },
	[FactorType.DAY]: { label: 'Day of Month', order: 10414 },
	[FactorType.DAY_KIND]: { label: 'Workday/Weekday/Holiday', order: 10415 },
	[FactorType.HOUR]: { label: 'Hour', order: 10416 },
	[FactorType.HOUR_KIND]: { label: 'Work Time/Off Hours/Sleep Time', order: 10417 },
	[FactorType.MINUTE]: { label: 'Minute', order: 10418 },
	[FactorType.SECOND]: { label: 'Second', order: 10419 },
	[FactorType.AM_PM]: { label: 'AM/PM', order: 10420 },

	[FactorType.GENDER]: { label: 'Gender', order: 10501 },
	[FactorType.OCCUPATION]: { label: 'Occupation', order: 10502 },
	[FactorType.DATE_OF_BIRTH]: { label: 'Date of Birth', order: 10503 },
	[FactorType.AGE]: { label: 'Age', order: 10504 },
	[FactorType.ID_NO]: { label: 'ID No.', order: 10505 },
	[FactorType.RELIGION]: { label: 'Religion', order: 10506 },
	[FactorType.NATIONALITY]: { label: 'Nationality', order: 10507 },

	[FactorType.TRADE]: { label: 'Business Trade', order: 10601 },
	[FactorType.SCALE]: { label: 'Business Scale', order: 10602 },

	[FactorType.BOOLEAN]: { label: 'Boolean', order: 10701 },

	[FactorType.ENUM]: { label: 'Enumeration', order: 10801 },

	[FactorType.OBJECT]: { label: 'Object', order: 10901 },
	[FactorType.ARRAY]: { label: 'Array', order: 10902 }
};

const AllTypeOptionsForDropdown = Object.keys(AllTypeOptions).map(key => {
	const { label, order } = AllTypeOptions[key as FactorType];
	return { value: key, label, order };
}).sort((o1, o2) => o1.order - o2.order);

const NonRawOptions = AllTypeOptionsForDropdown.filter(option => option.value !== FactorType.OBJECT && option.value !== FactorType.ARRAY);
const IncorrectObjectOptions = [ ...NonRawOptions, {
	value: FactorType.OBJECT,
	label: () => <IncorrectFactorType>Object</IncorrectFactorType>
} ];
const IncorrectArrayOptions = [ ...NonRawOptions, {
	value: FactorType.ARRAY,
	label: () => <IncorrectFactorType>Array</IncorrectFactorType>
} ];

const buildTypeOptions = (topic: Topic, factor: Factor) => {
	if (topic.type !== TopicType.RAW) {
		if (factor.type !== FactorType.OBJECT && factor.type !== FactorType.ARRAY) {
			return NonRawOptions;
		} else if (factor.type === FactorType.OBJECT) {
			return IncorrectObjectOptions;
		} else if (factor.type === FactorType.ARRAY) {
			return IncorrectArrayOptions;
		}
	}
	return AllTypeOptionsForDropdown;
};

export const FactorTypeCell = (props: { topic: Topic, factor: Factor }) => {
	const { topic, factor } = props;

	const { on, off, fire } = useTopicEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(TopicEventTypes.TOPIC_TYPE_CHANGED, forceUpdate);
		return () => {
			off(TopicEventTypes.TOPIC_TYPE_CHANGED, forceUpdate);
		};
	}, [ on, off, forceUpdate ]);

	const onFactorTypeChange = (option: DropdownOption) => {
		factor.type = option.value as FactorType;
		forceUpdate();
		fire(TopicEventTypes.FACTOR_TYPE_CHANGED, factor);
	};

	const options = buildTypeOptions(topic, factor);

	return <FactorTypeCellContainer>
		<FactorPropDropdown value={factor.type} options={options} onChange={onFactorTypeChange}/>
	</FactorTypeCellContainer>;
};