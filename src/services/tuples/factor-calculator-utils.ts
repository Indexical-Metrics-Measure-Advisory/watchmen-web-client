import {
	ComputedParameter,
	ConstantParameter,
	Parameter,
	ParameterCalculatorType,
	ParameterType,
	TopicFactorParameter
} from './factor-calculator-types';
import { FactorType } from './factor-types';

export const isTopicFactorParameter = (param: Parameter): param is TopicFactorParameter => !!(param as any).topicId;
export const isConstantParameter = (param: Parameter): param is ConstantParameter => !!(param as any).value;
export const isComputedParameter = (param: Parameter): param is ComputedParameter => !!(param as any).type;

export const ParameterAndFactorTypeMapping: { [key in ParameterType]: (factorType: FactorType) => boolean } = {
	[ParameterType.ANY]: () => true,
	[ParameterType.NUMBER]: (factorType: FactorType) => {
		return [
			FactorType.NUMBER, FactorType.UNSIGNED,
			FactorType.FLOOR, FactorType.RESIDENTIAL_AREA,
			FactorType.AGE,
			FactorType.BIZ_SCALE
		].includes(factorType);
	},
	[ParameterType.TEXT]: (factorType: FactorType) => {
		return [ FactorType.TEXT ].includes(factorType);
	},
	[ParameterType.DATE]: (factorType: FactorType) => {
		return [ FactorType.DATE, FactorType.DATETIME ].includes(factorType);
	},
	[ParameterType.TIME]: (factorType: FactorType) => {
		return [ FactorType.TIME, FactorType.DATETIME ].includes(factorType);
	},
	[ParameterType.DATETIME]: (factorType: FactorType) => {
		return [ FactorType.DATETIME ].includes(factorType);
	},
	[ParameterType.BOOLEAN]: (factorType: FactorType) => {
		return [ FactorType.BOOLEAN ].includes(factorType);
	},
	[ParameterType.ENUM]: (factorType: FactorType) => {
		return [
			FactorType.CONTINENT, FactorType.REGION, FactorType.COUNTRY, FactorType.PROVINCE, FactorType.CITY, FactorType.RESIDENCE_TYPE,
			FactorType.HALF_YEAR, FactorType.QUARTER, FactorType.SEASON, FactorType.HALF_MONTH, FactorType.TEN_DAYS, FactorType.HALF_WEEK,
			FactorType.DAY_OF_WEEK, FactorType.DAY_KIND, FactorType.HOUR_KIND, FactorType.AM_PM,
			FactorType.GENDER, FactorType.OCCUPATION, FactorType.RELIGION, FactorType.NATIONALITY,
			FactorType.BIZ_TRADE,
			FactorType.ENUM
		].includes(factorType);
	},
	[ParameterType.ARRAY]: (factorType: FactorType) => {
		return [ FactorType.ARRAY ].includes(factorType);
	}
};

export interface ParameterCalculatorSupporting {
	parameterTypes: Array<ParameterType | FactorType>;
	/**
	 * if result type is not given, use first parameter type instead
	 */
	resultType?: FactorType;
}

export interface ParameterCalculatorDef {
	/**
	 * calculator name
	 */
	name: ParameterCalculatorType;
	/**
	 * how many parameters this calculator accepted
	 */
	parameterCount: number;
	/**
	 * supported types
	 */
	supports: Array<ParameterCalculatorSupporting>;
}

export const ParameterCalculatorDefsMap: { [key in ParameterCalculatorType]: ParameterCalculatorDef } = {
	[ParameterCalculatorType.NONE]: {
		name: ParameterCalculatorType.NONE, parameterCount: 1,
		supports: [ { parameterTypes: [ ParameterType.ANY ] } ]
	},
	[ParameterCalculatorType.ADD]: {
		name: ParameterCalculatorType.ADD, parameterCount: 2,
		supports: [ {
			parameterTypes: [ ParameterType.NUMBER, ParameterType.NUMBER ],
			resultType: FactorType.NUMBER
		}, {
			parameterTypes: [ ParameterType.TEXT, ParameterType.TEXT ],
			resultType: FactorType.TEXT
		} ]
	},
	[ParameterCalculatorType.SUBTRACT]: {
		name: ParameterCalculatorType.SUBTRACT, parameterCount: 2,
		supports: [ {
			parameterTypes: [ ParameterType.NUMBER, ParameterType.NUMBER ],
			resultType: FactorType.NUMBER
		} ]
	},
	[ParameterCalculatorType.MULTIPLY]: {
		name: ParameterCalculatorType.MULTIPLY, parameterCount: 2,
		supports: [ {
			parameterTypes: [ ParameterType.NUMBER, ParameterType.NUMBER ],
			resultType: FactorType.NUMBER
		} ]
	},
	[ParameterCalculatorType.DIVIDE]: {
		name: ParameterCalculatorType.DIVIDE, parameterCount: 2,
		supports: [ {
			parameterTypes: [ ParameterType.NUMBER, ParameterType.NUMBER ],
			resultType: FactorType.NUMBER
		} ]
	},
	[ParameterCalculatorType.MODULUS]: {
		name: ParameterCalculatorType.MODULUS, parameterCount: 2,
		supports: [ {
			parameterTypes: [ ParameterType.NUMBER, ParameterType.NUMBER ],
			resultType: FactorType.NUMBER
		} ]
	},
	[ParameterCalculatorType.YEAR_OF]: {
		name: ParameterCalculatorType.YEAR_OF, parameterCount: 1,
		supports: [ {
			parameterTypes: [ ParameterType.DATE ],
			resultType: FactorType.YEAR
		}, {
			parameterTypes: [ ParameterType.DATETIME ],
			resultType: FactorType.YEAR
		} ]
	},
	[ParameterCalculatorType.HALF_YEAR_OF]: {
		name: ParameterCalculatorType.HALF_YEAR_OF, parameterCount: 1,
		supports: [ {
			parameterTypes: [ ParameterType.DATE ],
			resultType: FactorType.HALF_YEAR
		}, {
			parameterTypes: [ ParameterType.DATETIME ],
			resultType: FactorType.HALF_YEAR
		} ]
	},
	[ParameterCalculatorType.QUARTER_OF]: {
		name: ParameterCalculatorType.QUARTER_OF, parameterCount: 1,
		supports: [ {
			parameterTypes: [ ParameterType.DATE ],
			resultType: FactorType.QUARTER
		}, {
			parameterTypes: [ ParameterType.DATETIME ],
			resultType: FactorType.QUARTER
		}, {
			parameterTypes: [ FactorType.MONTH ],
			resultType: FactorType.QUARTER
		} ]
	},
	[ParameterCalculatorType.MONTH_OF]: {
		name: ParameterCalculatorType.MONTH_OF, parameterCount: 1,
		supports: [ {
			parameterTypes: [ ParameterType.DATE ],
			resultType: FactorType.MONTH
		}, {
			parameterTypes: [ ParameterType.DATETIME ],
			resultType: FactorType.MONTH
		} ]
	},
	[ParameterCalculatorType.WEEK_OF_YEAR]: {
		name: ParameterCalculatorType.WEEK_OF_YEAR, parameterCount: 1,
		supports: [ {
			parameterTypes: [ ParameterType.DATE ],
			resultType: FactorType.WEEK_OF_YEAR
		}, {
			parameterTypes: [ ParameterType.DATETIME ],
			resultType: FactorType.WEEK_OF_YEAR
		} ]
	},
	[ParameterCalculatorType.WEEK_OF_MONTH]: {
		name: ParameterCalculatorType.WEEK_OF_MONTH, parameterCount: 1,
		supports: [ {
			parameterTypes: [ ParameterType.DATE ],
			resultType: FactorType.WEEK_OF_MONTH
		}, {
			parameterTypes: [ ParameterType.DATETIME ],
			resultType: FactorType.WEEK_OF_MONTH
		} ]
	},
	[ParameterCalculatorType.WEEKDAYS]: {
		name: ParameterCalculatorType.WEEKDAYS, parameterCount: 1,
		supports: [ {
			parameterTypes: [ ParameterType.DATE ],
			resultType: FactorType.DAY_OF_WEEK
		}, {
			parameterTypes: [ ParameterType.DATETIME ],
			resultType: FactorType.DAY_OF_WEEK
		} ]
	}
};