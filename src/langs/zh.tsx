import React from 'react';

export const Zh = {
	$$settings: {
		code: 'zh',
		name: '汉语',
		fallback: 'en'
	},
	// fix key, anything under PLAIN will not be proxy to other type
	// anything must be string, should be placed here.
	// such as input tooltip(string property), tuple name(not for react component)
	PLAIN: {
		NEW_DASHBOARD_NAME: '仪表盘',
		DEFAULT_DASHBOARD_NAME: '仪表盘',
		NEW_CONNECTED_SPACE_NAME: '工作空间',
		DEFAULT_CONNECTED_SPACE_NAME: '工作空间',
		NEW_SUBJECT_NAME: '主题',
		DEFAULT_SUBJECT_NAME: '主题',
		NEW_REPORT_NAME: '图表',
		CONSTANT_INPUT_PLACEHOLDER: '请填写常量值...',
		UNKNOWN_TOPIC_NAME: '未知数据集',
		UNKNOWN_FACTOR_NAME: '未知数据因子',
		REPORT_DESCRIPTION_PLACEHOLDER: '请填写...'
	},
	ERROR: {
		UNAUTHORIZED: '本操作需要先登录系统.',
		ACCESS_DENIED: '没有权限进行本操作, 请联系管理员以获取帮助.',
		UNPREDICTED: '发生不可预测的错误, 请联系管理员以获取帮助.'
	},
	ALERT: {
		BUTTON: '好的',
		NOT_IMPLEMENT: '功能尚未实现, 工程师努力中.'
	},
	DIALOG: {
		BUTTON_YES: '是',
		BUTTON_NO: '否'
	},
	ACTIONS: {
		COPY: '复制',
		CLOSE: '关闭',
		CANCEL: '取消',
		DELETE: '删除',
		CONFIRM: '确认',
		NEXT: '下一步',
		SORT_ASC: '正序',
		SORT_DESC: '倒序',
		PREVIOUS_PAGE: '上一页',
		NEXT_PAGE: '下一页'
	},
	LOGIN: {
		PRODUCT_TITLE: <>Indexical Metrics <span>&</span> Measure Advisory</>,
		MORNING: '早上好 !',
		AFTERNOON: '中午好 !',
		EVENING: '晚上好 !',
		BUTTON: '登录 !',
		NAME_EMPTY: '请输入用户名, 我的朋友.',
		CREDENTIAL_EMPTY: '请输入密码.',
		FAIL: '用户名或者密码未能验证通过.'
	},
	CONSOLE: {
		LOADING: '努力加载个人数据...',
		BYE: '现在退出吗?',
		ERROR: {
			DASHBOARD_NOT_FOUND: '未找到指定的仪表盘数据.',
			CONNECTED_SPACE_NOT_FOUND: '未找到指定的已联接工作空间.',
			SUBJECT_NOT_FOUND: '未找到指定的主题.'
		},
		MENU: {
			TITLE: 'Watchmen操作台',
			HOME: '首页',
			DASHBOARDS: '仪表盘',
			FAVORITE: '我的收藏',
			NOTIFICATIONS: '通知',
			MAILS: '收件箱',
			TIMELINE: '朋友圈',
			CONNECT_SPACE: '连接工作空间',
			SETTINGS: '设置',
			TO_ADMIN: '转到管理台'
		},
		FAVORITE: {
			TITLE: '我的收藏',
			NO_DATA: '目前没有被收藏的内容.',
			PIN: '锁定',
			UNPIN: '解锁',
			REMOVE: '取消收藏'
		},
		HOME: {
			TITLE: '首页',
			SORT_BY_NAME: '按名称排序',
			SORT_BY_VISIT_TIME: '按访问时间排序',
			VIEW_COLLAPSE: '隐藏',
			VIEW_ALL: '全部显示',
			CONNECTED_SPACE_TITLE: '已联接的工作空间',
			CREATE_CONNECTED_SPACE_BUTTON: '联接工作空间',
			DASHBOARD_TITLE: '仪表盘',
			CREATE_DASHBOARD_BUTTON: '创建新仪表盘'
		},
		DASHBOARD: {
			SHARE: '分享',
			PRINT: '打印',
			ADD_INTO_FAVORITE: '收藏',
			REMOVE_FROM_FAVORITE: '取消收藏',
			ADD_REPORT: '添加图表',
			ADD_PARAGRAPH: '添加评述',
			ADD_DASHBOARD: '创建新仪表盘',
			SWITCH_DASHBOARD: '切换仪表盘',
			DELETE_ME: '删除',
			SHARE_DIALOG_LABEL: '复制下面的链接, 然后分享.',
			URL_COPIED: '链接已复制至剪贴板.',
			DELETE_DIALOG_LABEL: '确认要删除仪表盘吗? 请注意删除动作不能被恢复.',
			NO_MORE_DASHBOARD: '没有更多仪表盘可供选择.',
			SWITCH_DIALOG_LABEL: '请选择仪表盘',
			NO_MORE_REPORT: '没有更多图表可供选择.',
			DELETE_REPORT_DIALOG_LABEL: '确认要删除图表吗? 请注意删除动作不能被恢复.',
			DELETE_PARAGRAPH_DIALOG_LABEL: '确认要删除评述吗? 请注意删除动作不能被恢复.',
			NO_REPORT: '尚未定义图表.',
			SHOW_PRINT_PAGE: '显示纸张尺寸',
			HIDE_PRINT_PAGE: '隐藏纸张尺寸',
			SET_AS_ADMIN_HOME: '设置为管理员首页'
		},
		CONNECTED_SPACE: {
			CATALOG: '目录',
			SUBJECT_DEF: '设置主题',
			SUBJECT_DATA: '主题数据',
			SUBJECT_REPORT: '图表',
			SHARE: '分享',
			PRINT: '打印',
			REFRESH: '刷新',
			AUTO_REFRESH: '自动刷新(5分钟)',
			SHOW_PRINT_PAGE: '显示纸张尺寸',
			HIDE_PRINT_PAGE: '隐藏纸张尺寸',
			DOWNLOAD_PAGE: '下载本页数据',
			DOWNLOAD_ALL: '下载所有数据',
			ADD_REPORT: '添加图表',
			ADD_SUBJECT: '添加主题',
			OPEN_SUBJECT: '打开主题',
			ADD_CONNECTED_SPACE: '联接工作空间',
			SWITCH_CONNECTED_SPACE: '切换已联接的工作空间',
			DELETE_ME: '删除',
			ADD_INTO_FAVORITE: '收藏',
			REMOVE_FROM_FAVORITE: '取消收藏',
			DELETE_DIALOG_LABEL: '确认要删除已联接的工作空间吗? 请注意删除动作不能被恢复.',
			NO_MORE_CONNECTED_SPACE: '没有更多已联接的工作空间.',
			SWITCH_DIALOG_LABEL: '请选择已联接的工作空间',
			CREATE_DIALOG_LABEL: '请选择工作空间进行联接',
			NO_MORE_SPACE: '没有工作空间可以被联接, 请联系您的系统管理员以获取更多信息.',
			SPACE_NOT_FOUND: '需要的工作空间定义没有找到, 请联系您的系统管理员以获取更多信息.',
			TOPICS_NOT_FOUND: '需要的数据集定义没有找到, 请联系您的系统管理员以获取更多信息.',
			TOPICS_COUNT_MISMATCH: '需要的数据集定义个数无法匹配, 请联系您的系统管理员以获取更多信息.',
			TOPIC_WITH_NO_FACTOR: '没有定义数据因子, 请联系您的系统管理员以获取更多信息.',
			DELETE_SUBJECT_DIALOG_LABEL: '确认要删除主题吗? 请注意删除动作不能被恢复.',
			SWITCH_SUBJECT: '切换主题',
			SWITCH_SUBJECT_DIALOG_LABEL: '请选择主题',
			NO_MORE_SUBJECT: '没有更多主题.',
			SUBJECT_DEF_INVALID: '主题中包含不正确的定义数据, 请先检查定义.',
			SUBJECT_PICK_TOPICS: '选择数据集',
			SUBJECT_DEFINE_COLUMNS: '定义数据列',
			SUBJECT_FILTER_DATA: '数据过滤',
			SUBJECT_SET_JOINS: '设置数据集关联',
			SUBJECT_DEF_OVERVIEW: '总览',
			NO_PICKED_TOPIC_FOR_SUBJECT: '还没有选择数据集.',
			NO_DATASET_COLUMN_FOR_SUBJECT: '尚未定义数据列, 现在就',
			CREATE_DATASET_COLUMN_WHEN_NONE: '开始',
			NO_DATASET_COLUMN_FOR_SUBJECT_2: '吗?',
			ALIAS: '列名',
			ADD_SUBJECT_COLUMN: '添加数据列',
			CAN_NOT_DELETE_CHILD_FROM_COMPUTED: '已达到计算函数要求的最少参数个数, 因此不能删除本参数.',
			CAN_NOT_ADD_CHILD_INTO_COMPUTED: '已达到计算函数要求的最多参数个数, 因此不能添加更多参数.',
			ADD_COMPUTE_PARAMETER: '添加计算参数',
			NO_DATASET_FILTER_FOR_SUBJECT: '尚未定义数据过滤条件, 现在就',
			CREATE_DATASET_FILTER_WHEN_NONE: '开始',
			NO_DATASET_FILTER_FOR_SUBJECT_2: '吗?',
			ADD_SUBJECT_SUB_EXPRESSION_FILTER: '添加过滤条件',
			ADD_SUBJECT_SUB_JOINT_FILTER: '添加子联合条件',
			NO_DATASET_JOIN_FOR_SUBJECT: '尚未定义数据集关联关系, 现在就',
			CREATE_DATASET_JOIN_WHEN_NONE: '开始',
			NO_DATASET_JOIN_FOR_SUBJECT_2: '吗?',
			ADD_SUBJECT_JOIN: '添加数据集关联',
			SUBJECT_SELECT: '选取数据列:',
			SUBJECT_NO_SELECT: '尚未定义数据列.',
			SUBJECT_FROM: 'From',
			SUBJECT_NO_FROM: '没有定义数据集关联.',
			SUBJECT_JOIN_INNER: 'Inner Join',
			SUBJECT_JOIN_LEFT: 'Left Join',
			SUBJECT_JOIN_RIGHT: 'Right Join',
			SUBJECT_JOIN_ON: 'On',
			SUBJECT_JOIN_EQUALS: '=',
			SUBJECT_JOIN_AND: 'And',
			SUBJECT_WHERE: 'Where',
			SUBJECT_NO_WHERE: '没有定义过滤条件.',
			SUBJECT_UNKNOWN_PARAMETER: '未知参数',
			SUBJECT_EMPTY_CONSTANT: '空值',
			SUBJECT_COLUMN_AS: 'As',
			SUBJECT_NO_ALIAS: '?',
			SUBJECT_FILTER_JOINT_NO_STATEMENT: '没有定义子过滤条件',
			SUBJECT_UNKNOWN_FILTER: '未知过滤条件',
			NO_DATASET_COLUMN: '尚未定义数据列.',
			UNFIX_COLUMN: '解锁本列以及之后已锁定列',
			FIX_COLUMN: '锁定至本列',
			COMPRESS_COLUMNS: '全部缩小列宽',
			NO_REPORT: '尚未定义图表.',
			DELETE_REPORT_DIALOG_LABEL: '确认要删除图表吗? 请注意删除动作不能被恢复.',
			COLLAPSE_REPORT_SETTINGS_SECTIONS: '折叠所有',
			EXPAND_REPORT_SETTINGS_SECTIONS: '展开所有'
		},
		SETTINGS: {
			TITLE: '设置',
			LANGUAGE: '语言'
		}
	},
	PARAM: {
		FROM: '来源',
		FROM_TOPIC: '数据集',
		FROM_CONSTANT: '常量值',
		FROM_COMPUTED: '计算值'
	},
	FACTOR: {
		SEQUENCE: '序列号',
		NUMBER: '数字',
		UNSIGNED: '无符号数字',
		TEXT: '文本',
		ADDRESS: '地址',
		CONTINENT: '洲',
		REGION: '地区',
		COUNTRY: '国家',
		PROVINCE: '州/省',
		CITY: '城市',
		DISTRICT: '区县',
		ROAD: '路',
		COMMUNITY: '社区/小区',
		FLOOR: '楼层',
		RESIDENCE_TYPE: '住宅类型',
		RESIDENTIAL_AREA: '居住面积',
		EMAIL: '电子邮箱',
		PHONE: '电话号码',
		MOBILE: '移动电话号码',
		FAX: '传真号码',
		DATETIME: '日期时间',
		DATE: '日期',
		FULL_DATETIME: '日期(毫秒)',
		TIME: '时间',
		YEAR: '年',
		HALF_YEAR: '上半年/下半年',
		QUARTER: '季度',
		SEASON: '季节',
		MONTH: '月',
		HALF_MONTH: '上半月/下半月',
		TEN_DAYS: '上旬/中旬/下旬',
		WEEK_OF_YEAR: '周(按年度)',
		WEEK_OF_MONTH: '周(按月度)',
		HALF_WEEK: '上半周/下半周',
		DAY_OF_MONTH: '天(按月度)',
		DAY_OF_WEEK: '天(按周)',
		DAY_KIND: '工作日/周末/假日',
		HOUR: '小时',
		HOUR_KIND: '工作时间/业余时间/休息时间',
		MINUTE: '分钟',
		SECOND: '秒',
		MILLISECOND: '毫秒',
		AM_PM: '上午/下午',
		GENDER: '性别',
		OCCUPATION: '职业',
		DATE_OF_BIRTH: '出生日期',
		AGE: '年龄',
		ID_NO: '证件号码',
		RELIGION: '宗教',
		NATIONALITY: '民族',
		TRADE: '企业行业',
		SCALE: '企业规模',
		BOOLEAN: '布尔',
		ENUM: '枚举',
		OBJECT: '子对象',
		ARRAY: '子对象数组'
	},
	PARAMETER: {
		EXPRESSION: '表达式',
		COMPUTE_TYPE: {
			NONE: 'As is',
			ADD: '加',
			SUBTRACT: '减',
			MULTIPLY: '乘',
			DIVIDE: '除',
			MODULUS: '模除',
			YEAR_OF: '年',
			HALF_YEAR_OF: '上下半年',
			QUARTER_OF: '季度',
			MONTH_OF: '月',
			WEEK_OF_YEAR: '周(按年度)',
			WEEK_OF_MONTH: '周(按月度)',
			DAY_OF_MONTH: '天(按月度)',
			DAY_OF_WEEK: '天(按周)',
			CASE_THEN: '条件转换'
		},
		EXPRESSION_OPERATOR: {
			EMPTY: '为空',
			NOT_EMPTY: '不为空',
			EQUALS: '等于',
			NOT_EQUALS: '不等于',
			LESS: '小于',
			LESS_EQUALS: '小于等于',
			MORE: '大于',
			MORE_EQUALS: '大于等于',
			IN: '在集合内',
			NOT_IN: '不在集合内'
		}
	},
	JOINT: {
		AND: '与',
		OR: '或'
	},
	JOIN: {
		INNER: '精确匹配',
		LEFT: '左侧优先',
		RIGHT: '右侧优先'
	},
	PAGINATION: {
		TOTAL: '共',
		ROWS: '行数据',
		OF_PAGES: '/',
		PAGES: '页'
	},
	CHART: {
		SETTINGS_HEADER_LABEL: '图表设置',
		SECTION_TITLE_BASIC_STYLE: '基本样式',
		SECTION_TITLE_DIMENSIONS: '统计维度',
		SECTION_TITLE_INDICATORS: '统计指标',
		NAME: '名称',
		DESCRIPTION: '描述',
		WIDTH: '宽度',
		HEIGHT: '高度',
		PIXEL: '像素',
		DEGREE: '度',
		LINE_COLOR: '线段色',
		LINE_STYLE: '线段样式',
		FONT_FAMILY: '字体',
		FONT_COLOR: '文本色',
		FONT_SIZE: '字体尺寸',
		FONT_STYLE: '字体样式',
		FONT_STYLE_NORMAL: '标准',
		FONT_STYLE_ITALIC: '斜体',
		FONT_WEIGHT: '字重',
		FONT_WEIGHT_100: '100',
		FONT_WEIGHT_200: '200',
		FONT_WEIGHT_300: '300',
		FONT_WEIGHT_400: '400',
		FONT_WEIGHT_500: '500',
		FONT_WEIGHT_600: '600',
		FONT_WEIGHT_700: '700',
		FONT_WEIGHT_800: '800',
		FONT_WEIGHT_900: '900',
		BACKGROUND_COLOR: '背景色',
		BORDER_STYLE: '边框样式',
		BORDER_STYLE_NONE: '无',
		BORDER_STYLE_SOLID: '实线',
		BORDER_STYLE_DASHED: '短划线',
		BORDER_STYLE_DOTTED: '点线',
		BORDER_COLOR: '边框色',
		BORDER_WIDTH: '边框宽度',
		BORDER_RADIUS: '圆弧边框半径',
		POSITION_TOP: '顶边位置',
		POSITION_RIGHT: '右边位置',
		POSITION_LEFT: '左边位置',
		POSITION_BOTTOM: '底边位置',
		POSITION: '位置',
		HORIZONTAL_ALIGNMENT: '横向对齐',
		HORIZONTAL_ALIGNMENT_AUTO: '自动',
		HORIZONTAL_ALIGNMENT_LEFT: '左对齐',
		HORIZONTAL_ALIGNMENT_CENTER: '中间对齐',
		HORIZONTAL_ALIGNMENT_RIGHT: '右对齐',
		VERTICAL_ALIGNMENT: '纵向对齐',
		VERTICAL_ALIGNMENT_AUTO: '自动',
		VERTICAL_ALIGNMENT_TOP: '上对齐',
		VERTICAL_ALIGNMENT_MIDDLE: '中间对齐',
		VERTICAL_ALIGNMENT_BOTTOM: '下对齐',
		TITLE_TEXT_ITEM_GAP: '标题间距',
		PADDING: '内边距',
		SHOW: '显示',
		LEGEND_ORIENT: '方向',
		LEGEND_ORIENT_HORIZONTAL: '横向',
		LEGEND_ORIENT_VERTICAL: '纵向',
		GRID_CONTAIN_LABEL: '容纳标签',
		AXIS_TYPE: '轴类型',
		AXIS_TYPE_CATEGORY: '类目轴',
		AXIS_TYPE_VALUE: '数字轴',
		AXIS_TYPE_TIME: '时间轴',
		AXIS_AUTO_MIN: '自动最小值',
		AXIS_MIN: '最小值',
		AXIS_AUTO_MAX: '自动最大值',
		AXIS_MAX: '最大值',
		AXIS_NAME_LOCATION: '位置',
		AXIS_NAME_LOCATION_START: '起始',
		AXIS_NAME_LOCATION_CENTER: '居中',
		AXIS_NAME_LOCATION_END: '末尾',
		AXIS_NAME_GAP: '标题间距',
		AXIS_NAME_ROTATE: '旋转角度',
		AXIS_LABEL_INSIDE: '向内',
		LABEL_GAP: '间距',
		LABEL_ROTATE: '旋转角度',
		LABEL_FORMAT_USING_GROUP: '千分位',
		LABEL_FORMAT_USING_PERCENTAGE: '添加%',
		LABEL_VALUE_AS_PERCENTAGE: '值转为%',
		LABEL_FRACTION_DIGITS: '小数位',
		LABEL_POSITION_TOP: '外部顶边',
		LABEL_POSITION_LEFT: '外部左边',
		LABEL_POSITION_RIGHT: '外部右边',
		LABEL_POSITION_BOTTOM: '外部底边',
		LABEL_POSITION_INSIDE: '内部',
		LABEL_POSITION_INSIDE_LEFT: '内部靠左',
		LABEL_POSITION_INSIDE_RIGHT: '内部靠右',
		LABEL_POSITION_INSIDE_TOP: '内部顶边',
		LABEL_POSITION_INSIDE_BOTTOM: '内部底边',
		LABEL_POSITION_INSIDE_TOP_LEFT: '内部左上',
		LABEL_POSITION_INSIDE_BOTTOM_LEFT: '内部左下',
		LABEL_POSITION_INSIDE_TOP_RIGHT: '内部右上',
		LABEL_POSITION_INSIDE_BOTTOM_RIGHT: '内部右下',
		LABEL_POSITION_OUTSIDE: '外部',
		LABEL_POSITION_CENTER: '居中',
		DECAL: '图形贴花',
		ROAM: '漫游',
		TREE_LAYOUT: '布局',
		TREE_LAYOUT_ORTHOGONAL: '正交',
		TREE_LAYOUT_RADIAL: '放射',
		TREE_ORIENT: '方向',
		TREE_ORIENT_LEFT_RIGHT: '左至右',
		TREE_ORIENT_RIGHT_LEFT: '右至左',
		TREE_ORIENT_TOP_BOTTOM: '上至下',
		TREE_ORIENT_BOTTOM_TOP: '下至上',
		PIE_CENTER_X: '中心X',
		PIE_CENTER_Y: '中心Y',
		PIE_INSIDE_RADIUS: '内径',
		PIE_OUTSIDE_RADIUS: '外径',
		PIE_ROSE_TYPE: '玫瑰',
		PIE_ROSE_TYPE_NONE: '无',
		PIE_ROSE_TYPE_RADIUS: '按半径',
		PIE_ROSE_TYPE_AREA: '按面积',
		PIE_SHOW_PERCENTAGE: '显示百分比',
		PIE_LABEL_ALIGN_TO_NONE: '无',
		PIE_LABEL_ALIGN_TO_LABEL_LINE: '标线',
		PIE_LABEL_ALIGN_TO_EDGE: '边界',
		MAP_REGION: '地区',
		MAP_REGION_JAPAN_L1: '日本 (县)',
		MAP_REGION_USA_L1: '美国 (州)',
		TRUNCATION_TYPE: '类型',
		TRUNCATION_NONE: '无',
		TRUNCATION_TOP: '最高(大)',
		TRUNCATION_BOTTOM: '最低(小)',
		TRUNCATION_COUNT: '数量',
		BAR_TRANSFORM_AXIS: '轴互换',
		LINE_SMOOTH: '平滑线',
		TOOLBOX_ORIENT: '方向',
		TOOLBOX_ORIENT_HORIZONTAL: '横向',
		TOOLBOX_ORIENT_VERTICAL: '纵向',
		SECTION_TITLE_COUNT_CHART: '数字统计样式',
		SECTION_TITLE_BAR_CHART: '柱/线样式',
		SECTION_TITLE_PIE_CHART: '饼样式',
		SECTION_TITLE_TREE_CHART: '树样式',
		SECTION_TITLE_TREEMAP_CHART: '矩形树样式',
		SECTION_TITLE_MAP_CHART: '地图样式',
		SECTION_TITLE_ECHART_TITLE: '标题',
		SECTION_TITLE_ECHART_SUBTITLE: '副标题',
		SECTION_TITLE_ECHART_LEGEND: '图例',
		SECTION_TITLE_ECHART_GRID: '网格位置',
		SECTION_TITLE_ECHART_SERIES_LABEL: '标签',
		SECTION_TITLE_ECHART_XAXIS: '横轴',
		SECTION_TITLE_ECHART_XAXIS_RANGE: '横轴值范围',
		SECTION_TITLE_ECHART_XAXIS_NAME: '横轴名称',
		SECTION_TITLE_ECHART_XAXIS_LABEL: '横轴标签',
		SECTION_TITLE_ECHART_XAXIS_LINE: '横轴分隔线',
		SECTION_TITLE_ECHART_XAXIS_MINOR_LINE: '横轴次级分隔线',
		SECTION_TITLE_ECHART_YAXIS: '纵轴',
		SECTION_TITLE_ECHART_YAXIS_RANGE: '纵轴值范围',
		SECTION_TITLE_ECHART_YAXIS_NAME: '纵轴名称',
		SECTION_TITLE_ECHART_YAXIS_LABEL: '纵轴标签',
		SECTION_TITLE_ECHART_YAXIS_LINE: '纵轴分隔线',
		SECTION_TITLE_ECHART_YAXIS_MINOR_LINE: '横轴次级分隔线',
		SECTION_TITLE_TRUNCATION: '数据截取',
		SECTION_TITLE_TOOLBOX: '工具箱',
		NONAME_COLUMN: '未命名列',
		UNKNOWN_COLUMN_NAME: '未知列',
		CAN_NOT_DELETE_DIMENSION: '已达到图表要求的最少维度个数, 因此不能删除本维度.',
		CAN_NOT_ADD_DIMENSION: '已达到图表要求的最多维度个数, 因此不能添加更多维度.',
		CAN_NOT_DELETE_INDICATOR: '已达到图表要求的最少指标个数, 因此不能删除本指标.',
		CAN_NOT_ADD_INDICATOR: '已达到图表要求的最多指标个数, 因此不能添加更多指标.',
		ADD_DIMENSION: '添加维度',
		ADD_INDICATOR: '添加指标',
		PLEASE_SELECT_DIMENSION: '请选择...',
		PLEASE_SELECT_INDICATOR: '请选择...',
		ARITHMETIC_NONE: '原始值',
		ARITHMETIC_SUMMARY: '合计',
		ARITHMETIC_AVERAGE: '平均值',
		ARITHMETIC_COUNT: '个数',
		ARITHMETIC_MAX: '最大值',
		ARITHMETIC_MIN: '最小值',
		TYPE: '图表种类',
		TYPES: {
			COUNT: '数字统计图',
			BAR: '柱状图',
			LINE: '折线图',
			SCATTER: '散点图',
			PIE: '饼图',
			DOUGHNUT: '环形图',
			NIGHTINGALE: '南丁格尔玫瑰',
			SUNBURST: '旭日图',
			TREE: '树图',
			TREEMAP: '矩形树图',
			MAP: '地图'
		},
		COUNT: {
			FORMAT_USING_GROUP: '千分位'
		},
		ECHART: {
			TEXT: '文本'
		}
	},
	SHARE: {
		NOTHING: '找不到任何适合的内容, 请联系管理员以获取帮助.'
	}
};