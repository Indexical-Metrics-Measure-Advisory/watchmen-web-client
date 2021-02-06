import React, { useEffect } from 'react';
import { DropdownOption } from '../../../basic-widgets/types';
import { useForceUpdate } from '../../../basic-widgets/utils';
import { En } from '../../../langs/en';
import { Factor, FactorType } from '../../../services/tuples/factor-types';
import { Topic, TopicType } from '../../../services/tuples/topic-types';
import { useTopicEventBus } from '../topic-event-bus';
import { TopicEventTypes } from '../topic-event-bus-types';
import { FactorPropDropdown, FactorTypeCellContainer, IncorrectFactorType } from './widgets';

const AllTypeOptions: { [key in FactorType]: { label: string, order: number } } = {
	[FactorType.SEQUENCE]: { label: En.FACTOR.SEQUENCE, order: 99999 },

	[FactorType.NUMBER]: { label: En.FACTOR.NUMBER, order: 10001 },
	[FactorType.UNSIGNED]: { label: En.FACTOR.UNSIGNED, order: 10002 },

	[FactorType.TEXT]: { label: En.FACTOR.TEXT, order: 10101 },

	[FactorType.ADDRESS]: { label: En.FACTOR.ADDRESS, order: 10201 },
	[FactorType.CONTINENT]: { label: En.FACTOR.CONTINENT, order: 10202 },
	[FactorType.REGION]: { label: En.FACTOR.REGION, order: 10203 },
	[FactorType.COUNTRY]: { label: En.FACTOR.COUNTRY, order: 10204 },
	[FactorType.PROVINCE]: { label: En.FACTOR.PROVINCE, order: 10205 },
	[FactorType.CITY]: { label: En.FACTOR.CITY, order: 10206 },
	[FactorType.DISTRICT]: { label: En.FACTOR.DISTRICT, order: 10206 },
	[FactorType.ROAD]: { label: En.FACTOR.ROAD, order: 10207 },
	[FactorType.COMMUNITY]: { label: En.FACTOR.COMMUNITY, order: 10208 },
	[FactorType.FLOOR]: { label: En.FACTOR.FLOOR, order: 10209 },
	[FactorType.RESIDENCE_TYPE]: { label: En.FACTOR.RESIDENCE_TYPE, order: 10210 },
	[FactorType.RESIDENTIAL_AREA]: { label: En.FACTOR.RESIDENTIAL_AREA, order: 10211 },

	[FactorType.EMAIL]: { label: En.FACTOR.EMAIL, order: 10301 },
	[FactorType.PHONE]: { label: En.FACTOR.PHONE, order: 10302 },
	[FactorType.MOBILE]: { label: En.FACTOR.MOBILE, order: 10303 },
	[FactorType.FAX]: { label: En.FACTOR.FAX, order: 10304 },

	[FactorType.DATETIME]: { label: En.FACTOR.DATETIME, order: 10401 },
	[FactorType.DATE]: { label: En.FACTOR.DATE, order: 10402 },
	[FactorType.TIME]: { label: En.FACTOR.TIME, order: 10403 },
	[FactorType.YEAR]: { label: En.FACTOR.YEAR, order: 10404 },
	[FactorType.HALF_YEAR]: { label: En.FACTOR.HALF_YEAR, order: 10405 },
	[FactorType.QUARTER]: { label: En.FACTOR.QUARTER, order: 10406 },
	[FactorType.SEASON]: { label: En.FACTOR.SEASON, order: 10407 },
	[FactorType.MONTH]: { label: En.FACTOR.MONTH, order: 10408 },
	[FactorType.HALF_MONTH]: { label: En.FACTOR.HALF_MONTH, order: 10409 },
	[FactorType.TEN_DAYS]: { label: En.FACTOR.TEN_DAYS, order: 10410 },
	[FactorType.WEEK_OF_YEAR]: { label: En.FACTOR.WEEK_OF_YEAR, order: 10411 },
	[FactorType.WEEK_OF_MONTH]: { label: En.FACTOR.WEEK_OF_MONTH, order: 10412 },
	[FactorType.HALF_WEEK]: { label: En.FACTOR.HALF_WEEK, order: 10413 },
	[FactorType.DAY]: { label: En.FACTOR.DAY, order: 10414 },
	[FactorType.DAY_OF_WEEK]: { label: En.FACTOR.DAY_OF_WEEK, order: 10415 },
	[FactorType.DAY_KIND]: { label: En.FACTOR.DAY_KIND, order: 10416 },
	[FactorType.HOUR]: { label: En.FACTOR.HOUR, order: 10417 },
	[FactorType.HOUR_KIND]: { label: En.FACTOR.HOUR_KIND, order: 10418 },
	[FactorType.MINUTE]: { label: En.FACTOR.MINUTE, order: 10419 },
	[FactorType.SECOND]: { label: En.FACTOR.SECOND, order: 10420 },
	[FactorType.AM_PM]: { label: En.FACTOR.AM_PM, order: 104201 },

	[FactorType.GENDER]: { label: En.FACTOR.GENDER, order: 10501 },
	[FactorType.OCCUPATION]: { label: En.FACTOR.OCCUPATION, order: 10502 },
	[FactorType.DATE_OF_BIRTH]: { label: En.FACTOR.DATE_OF_BIRTH, order: 10503 },
	[FactorType.AGE]: { label: En.FACTOR.AGE, order: 10504 },
	[FactorType.ID_NO]: { label: En.FACTOR.ID_NO, order: 10505 },
	[FactorType.RELIGION]: { label: En.FACTOR.RELIGION, order: 10506 },
	[FactorType.NATIONALITY]: { label: En.FACTOR.NATIONALITY, order: 10507 },

	[FactorType.BIZ_TRADE]: { label: En.FACTOR.TRADE, order: 10601 },
	[FactorType.BIZ_SCALE]: { label: En.FACTOR.SCALE, order: 10602 },

	[FactorType.BOOLEAN]: { label: En.FACTOR.BOOLEAN, order: 10701 },

	[FactorType.ENUM]: { label: En.FACTOR.ENUM, order: 10801 },

	[FactorType.OBJECT]: { label: En.FACTOR.OBJECT, order: 10901 },
	[FactorType.ARRAY]: { label: En.FACTOR.ARRAY, order: 10902 }
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