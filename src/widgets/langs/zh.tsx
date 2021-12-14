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
		DEFAULT_REPORT_NAME: '图表',
		CONSTANT_INPUT_PLACEHOLDER: '请填写常量值...',
		UNKNOWN_TOPIC_NAME: '未知数据集',
		UNKNOWN_FACTOR_NAME: '未知数据因子',
		REPORT_DESCRIPTION_PLACEHOLDER: '请填写...',
		REPORT_DATASET_GRID_TITLE: '图表数据集',
		REPORT_DATASET_GRID_CLOSE: '关闭',
		REPORT_DATASET_GRID_REFRESH: '刷新',
		REPORT_DATASET_GRID_DOWNLOAD: '下载',
		LOADING: '加载中...',
		FIND_INDICATOR_PLACEHOLDER: '根据指标名称, 主题名称或者数据因子名称查找.',
		FIND_TOPIC_OR_FACTOR_PLACEHOLDER: '根据主题名称或数据因子名称查找.',
		INDICATOR_NAME_PLACEHOLDER: '请输入用于阅读的名称.',
		INDICATOR_DESCRIPTION_PLACEHOLDER: '请输入指标描述...',
		FIND_BUCKET_PLACEHOLDER: '根据分桶名称, 主题名称或者数据因子名称查找.',
		BUCKET_CATEGORY_SEGMENT_VALUE_PLACEHOLDER: '输入分组值, 点击确认加入到分段中.',
		FIND_INDICATOR_VALUE_BUCKETS_PLACEHOLDER: '根据分桶名称查找.',
		DROPDOWN_PLACEHOLDER: '请选择...'
	},
	STANDARD: {
		YES: '是',
		NO: '否'
	},
	ERROR: {
		UNAUTHORIZED: '没有权限进行本操作, 请先登录系统.',
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
		SAVE: '保存',
		COPY: '复制',
		CLOSE: '关闭',
		CANCEL: '取消',
		DELETE: '删除',
		CONFIRM: '确认',
		NEXT: '下一步',
		SORT_ASC: '正序',
		SORT_DESC: '倒序',
		PREVIOUS_PAGE: '上一页',
		NEXT_PAGE: '下一页',
		EXPAND: '展开',
		COLLAPSE: '收拢',
		MINIMIZE: '最小化',
		MAXIMIZE: '最大化',
		RESTORE: '复原'
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
	DATASET: {
		UNFIX_COLUMN: '解锁本列以及之后已锁定列',
		FIX_COLUMN: '锁定至本列',
		COMPRESS_COLUMNS: '全部缩小列宽',
		DOWNLOAD_PAGE: '下载本页数据',
		DOWNLOAD_ALL: '下载所有数据',
		SIMULATE_DATA: '数据模拟',
		UPLOAD_DATA: '上传数据',
		UPLOAD_DATA_FAILURE: '上传数据失败, 请检查数据格式.',
		DOWNLOAD_TEMPLATE: '下载模板'
	},
	CONSOLE: {
		LOADING: '努力加载个人数据...',
		BYE: '现在退出吗?',
		ERROR: {
			DASHBOARD_NOT_FOUND: '未找到指定的仪表盘数据.',
			CONNECTED_SPACE_NOT_FOUND: '未找到指定的已联接工作空间.',
			SUBJECT_NOT_FOUND: '未找到指定的主题.',
			REPORT_NOT_FOUND: '未找到指定的图表.'
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
			TO_CONSOLE: '转到工作台',
			TO_ADMIN: '转到管理台',
			TO_DATA_QUALITY: '转到数据质量中心',
			TO_INDICATOR_WORKBENCH: '转到指标工作台',
			LOGOUT: '登出'
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
			REFRESH: '刷新',
			AUTO_REFRESH: '自动刷新(5分钟)',
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
			SET_AS_ADMIN_HOME: '设置为管理员首页',
			FUNNEL_TITLE: '数据焦点'
		},
		CONNECTED_SPACE: {
			CATALOG: '目录',
			SUBJECT_DEF: '设置主题',
			SUBJECT_DATA: '主题数据',
			SUBJECT_REPORTS: '图表列表',
			SUBJECT_REPORT: '图表',
			REPORT_DATA: '图表数据',
			REPORT_FILTER: '过滤条件',
			REPORT_FUNNEL: '数据漏斗',
			SHARE: '分享',
			PRINT: '打印',
			REFRESH: '刷新',
			AUTO_REFRESH: '自动刷新(5分钟)',
			SHOW_PRINT_PAGE: '显示纸张尺寸',
			HIDE_PRINT_PAGE: '隐藏纸张尺寸',
			ADD_REPORT: '添加图表',
			ADD_SUBJECT: '添加主题',
			OPEN_SUBJECT: '打开主题',
			ADD_CONNECTED_SPACE: '联接工作空间',
			SWITCH_CONNECTED_SPACE: '切换已联接的工作空间',
			DELETE_ME: '删除',
			ADD_INTO_FAVORITE: '收藏',
			REMOVE_FROM_FAVORITE: '取消收藏',
			SET_AS_TEMPLATE: '设置为模板',
			REMOVE_FROM_TEMPLATE: '取消模板',
			DELETE_DIALOG_LABEL: '确认要删除已联接的工作空间吗? 请注意删除动作不能被恢复.',
			NO_MORE_CONNECTED_SPACE: '没有更多已联接的工作空间.',
			SWITCH_DIALOG_LABEL: '请选择已联接的工作空间',
			CREATE_DIALOG_LABEL: '请选择工作空间进行联接',
			CREATE_DIALOG_CHOOSE_TEMPLATE_LABEL: '请选择需要的模板',
			TEMPLATE: '模板',
			TEMPLATE_CREATE_BY: '贡献者',
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
			ADD_SUB_EXPRESSION_FILTER: '添加过滤条件',
			ADD_SUB_JOINT_FILTER: '添加子联合条件',
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
			NO_REPORT: '尚未定义图表, 现在就',
			CREATE_REPORT: '开始',
			NO_REPORT_2: '吗?',
			NO_MORE_REPORT: '没有更多图表.',
			OPEN_REPORT: '打开图表',
			SWITCH_REPORT: '切换图表',
			SWITCH_REPORT_DIALOG_LABEL: '请选择图表',
			DELETE_REPORT_DIALOG_LABEL: '确认要删除图表吗? 请注意删除动作不能被恢复.',
			COLLAPSE_REPORT_SETTINGS_SECTIONS: '折叠所有',
			EXPAND_REPORT_SETTINGS_SECTIONS: '展开所有',
			REPORT_NO_FILTER: '没有定义过滤条件, 现在就',
			CREATE_REPORT_FILTER: '开始',
			REPORT_NO_FILTER_2: '吗?',
			INCORRECT_REPORT_FILTER: '存在不正确的过滤条件定义.',
			REPORT_NO_FUNNEL: '没有启用数据漏斗.'
		}
	},
	INDICATOR_WORKBENCH: {
		MENU: {
			TITLE: '指标工作台',
			BUCKETS: '准备分桶',
			PREPARE: '准备指标因子',
			INSPECTION: '指标构建',
			NAVIGATION: '指标领航',
			SETTINGS: '设置',
			LOGOUT: '登出'
		},
		LOADING: '努力加载数据...',
		ON_EDIT: '正在编辑中, 所有未保存的数据都将丢失. 是否确定放弃编辑?',
		PREPARE: {
			TITLE: '准备指标因子',
			STEP: '步骤',
			WAIT_INPUT: '等待输入...',
			SEARCHING: '努力查找中...',
			NO_MATCHED: '没有找到匹配的数据.',
			OR: '或',
			CREATE_INDICATOR: '定义一个新指标',
			FIND_INDICATOR: '查找已定义的指标',
			DISCARD_FIND_INDICATOR: '放弃查找',
			ON_CREATE_INDICATOR: '正在定义新指标',
			ON_VIEW_INDICATOR: '展示指标',
			RESTART: '重新开始',
			PICK_TOPIC: '选择一个主题或者数据因子',
			DEFINE_ON_TOPIC: '基于主题',
			INDICATOR_ON_TOPIC: '主题级',
			FAILED_TO_LOAD_INDICATOR: '加载指标数据出现错误, 请联系您的系统管理员以获取更多信息.',
			MEASURE_METHODS_TITLE: '当前指标可使用的测量维度已经被自动侦测完毕.',
			FACTOR: '数据因子',
			FACTOR_NAME: '名称',
			FACTOR_LABEL: '标签',
			FACTOR_TYPE: '类型',
			FACTOR_ENUM: '枚举',
			AGGREGATE: '聚合方式',
			GEO: '地理位置相关',
			TIME_PERIOD: '时间区间',
			INDIVIDUAL: '个人',
			ORGANIZATION: '机构',
			CATEGORY: '指定分类',
			DEFINE_BUCKETS_TITLE: '为更好的分类和聚合数据, 可以使用预定义分桶.',
			INDICATOR_VALUE_BUCKET_ONLY_ON_FACTOR_LABEL: '指标值分桶只有在选择了数据因子时才可以进一步定义',
			INDICATOR_VALUE_BUCKET_LABEL: '指标值分桶定义',
			BUCKET_NAME: '桶名称',
			LINK_INDICATOR_VALUE_BUCKETS: '关联预定义的指标值分桶',
			DISCARD_LINK_INDICATOR_VALUE_BUCKETS: '放弃关联',
			MEASURE_BUCKET_LABEL: '测量维度分桶定义',
			NO_MEASURE_BUCKET: '没有找到合适的测量维度分桶.',
			VIEW_MEASURE_BUCKETS: '查看预定义的测量维度分桶',
			IGNORE_DEFINE_BUCKETS: '现在不定义分桶',
			CHANGE_NAME: '修改名称',
			NOT_NOW: '放弃',
			SAVE_INDICATOR: '保存指标数据',
			SAVE_NAME: '保存指标名称',
			REQUIRE_INDICATOR_NAME: '需要一个用于阅读的指标名称.',
			RELEVANT_TITLE: '当前指标相关的指标可以被自动侦测.',
			INDICATOR_NAME: '相关指标',
			INDICATOR_RELEVANT_TYPE: '相关性',
			IRRELEVANT: '无关',
			NO_RELEVANT_DETECTED: '目前没有侦测到相关的指标.',
			DETECT_RELEVANT: '侦测潜在的相关指标',
			IGNORE_DETECT_RELEVANT: '现在不侦测',
			CATEGORIES_TITLE: '类别.',
			DESCRIPTION_TITLE: '描述.',
			LAST_STEP_TITLE: '指标设置完毕.',
			PREPARE_ANOTHER: '定义另一个指标'
		},
		BUCKET: {
			TITLE: '分桶',
			LABEL: '分桶',
			NEW_BUCKET_PREFIX: '新',
			EXISTING_BUCKET_PREFIX: '已存在的',
			CREATE_BUCKET: '创建分桶',
			NAME_LABEL: '桶名称:',
			TYPE_LABEL: '桶类型:',
			TYPE_IS_FIXED_ONCE_SAVE: '桶类型在桶被第一次保存之后即锁定, 不再可以修改.',
			DESCRIPTION_LABEL: '描述:',
			CREATE_AT: '创建于',
			LAST_MODIFIED_AT: '最后更新于',
			BUCKET_NAME_IS_REQUIRED: '请填写分桶名称.',
			BUCKET_MEASURE_IS_REQUIRED: '请选择测量维度.',
			BUCKET_ENUM_IS_REQUIRED: '请选择枚举.',
			BUCKET_SEGMENTS_IS_REQUIRED: '至少需要定义两个分段.',
			BUCKET_SEGMENT_NAME_IS_REQUIRED: '请填写分段名称.',
			BE_NUMERIC_OF_NUMERIC_SEGMENT: '分段值需要是数字.',
			EMPTY_FIRST_MIN_OF_NUMERIC_SEGMENT: '请不要填写第一个分段的最小值.',
			NOT_EMPTY_FIRST_MAX_OF_NUMERIC_SEGMENT: '请填写第一个分段的最大值.',
			NOT_EMPTY_OF_NUMERIC_SEGMENT: '请填写中间分段的分段值.',
			MIN_MAX_ORDER_OF_NUMERIC_SEGMENT: '请保持分段最小值小于最大值.',
			NOT_EMPTY_LAST_MIN_OF_NUMERIC_SEGMENT: '请填写最后一个分段的最小值.',
			EMPTY_LAST_MAX_OF_NUMERIC_SEGMENT: '请不要填写最后一个分段的最大值.',
			RANGE_LACK_EXISTS_OF_NUMERIC_SEGMENT: '有数值区间没有被分段覆盖.',
			RANGE_OVERLAP_EXISTS_OF_NUMERIC_SEGMENT: '分段区间有重合.',
			NOT_EMPTY_OF_CATEGORY_SEGMENT: '请至少定义一个分类值.',
			NO_DUPLICATED_OF_CATEGORY_SEGMENT: '同一个分段内不可存在重复的类别.',
			ONE_OTHERS_SEGMENT_OF_CATEGORY_SEGMENT: '只有一个分段可以包含类别(其他).',
			ONE_OTHERS_VALUE_OF_CATEGORY_SEGMENT: '分段内只可包含一个类别(其他).',
			NO_SHARED_OF_CATEGORY_SEGMENT: '同一个类别不可存在于多个分段中.',
			NO_SEGMENT_DEFINED: '尚未定义分段',
			ONE_SEGMENT_DEFINED: '1 分段',
			N_SEGMENT_DEFINED: '分段',
			BUCKET_TYPE_VALUE: '值分桶',
			BUCKET_TYPE_VALUE_MEASURE: '维度值分桶',
			BUCKET_TYPE_CATEGORY_MEASURE: '维度分类分桶',
			BUCKET_TYPE_ENUM_MEASURE: '维度枚举分桶',
			RANGE_INCLUDING_LABEL: '值包含方式:',
			RANGE_INCLUDE_MIN: '[包含最小值, 不包含最大值)',
			RANGE_INCLUDE_MAX: '(不包含最小值, 包含最大值]',
			SEGMENTS_LABEL: '分段定义:',
			SEGMENT_NAME: '分段名称',
			VALUE_SEGMENT_MIN_LABEL: '最小值',
			VALUE_SEGMENT_MAX_LABEL: '最大值',
			ADD_SEGMENT: '添加值分段',
			SORT_SEGMENTS: '排序',
			MEASURE_METHOD_LABEL: '测量维度:',
			MEASURE_METHOD_IS_FIXED_ONCE_SAVE: '测量维度在桶被第一次保存之后即锁定, 不再可以修改.',
			CATEGORY_SEGMENT_LABEL: '类别值',
			DUPLICATE_CATEGORY_SEGMENT_VALUE: '类别在这个分段中已经存在.',
			DUPLICATE_CATEGORY_SEGMENT_VALUE_CASE_IGNORED: '类别(不区分大小写)在这个分段中已经存在, 是否仍然需要添加?',
			OTHERS_IS_EXCLUSIVE_ON_CATEGORY_SEGMENT: '类别(其他)具有排他性, 不可与其他类别同时存在.',
			NO_SEGMENT_VALUE_DEFINED: '尚未定义分段值',
			ADD_OTHER_CATEGORY: '添加其他值分段',
			ENUM_LABEL: '枚举:',
			ENUM_IS_FIXED_ONCE_SAVE: '枚举在桶被第一次保存之后即锁定, 不再可以修改.',
			SORT_SEGMENTS_BY_CODE: '按代码排序',
			SORT_SEGMENTS_BY_NAME: '按名称排序',
			AVAILABLE_ENUM_ITEMS_LABEL: '可用枚举项:',
			NO_AVAILABLE_ENUM_ITEMS: '没有可用的数据.',
			ADD_AVAILABLE_ITEMS_INTO_SEGMENT: '添加到分组',
			SEGMENT_LABEL: '分组',
			PLEASE_SELECT_SEGMENT: '请选择包含已选择枚举项的分组.',
			PLEASE_SELECT_ENUM_ITEM: '请至少选择一个枚举项加入到分组.'
		},
		INSPECTION: {
			TITLE: '指标洞察',
			OR: '或',
			PICK_INSPECTION_LABEL: '选择洞察:',
			PICKED_INSPECTION_LABEL: '已选择洞察:',
			PICK_INSPECTION: '查看',
			CREATE_INSPECTION: '创建新洞察',
			INSPECTION_IS_REQUIRED: '请选择需要查看的洞察.',
			NONAME_ON_INSPECTION: '未命名',
			RENAME: '修改',
			NEW_NAME: '命名',
			SET_NAME_LABEL: '设置名称',
			NAME_IS_REQUIRED: '请设置一个用于阅读的名称.',
			PICK_INDICATOR_LABEL: '选择指标:',
			PICK_INDICATOR: '选择',
			INDICATOR_IS_REQUIRED: '请选择指标用于创建新洞察.',
			INSPECTING_ON_INDICATOR_LABEL: '洞察指标:',
			VALUE_TRANSFORM_LABEL: '指标值转换:',
			VALUE_TRANSFORM_COUNT: '个数合计',
			VALUE_TRANSFORM_SUM: '合计值',
			VALUE_TRANSFORM_AVG: '平均值',
			VALUE_TRANSFORM_MAX: '最大值',
			VALUE_TRANSFORM_MIN: '最小值',
			SELECT_BUCKETING_ON_LABEL: '分桶方式:',
			NO_BUCKET_ON: '不使用分桶',
			MEASURE_ON_VALUE: '指标值',
			SELECT_MEASURE_ON_FIRST: '请首先选择分桶基准...',
			MEASURE_ON_NATURALLY: '使用自然分类',
			TIME_PERIOD_LABEL: '时间区间:',
			ALL_TIME_PERIOD: '所有时间',
			TIME_MEASURE_ON_LABEL: '时间分段:',
			NO_TIME_MEASURE: '不使用时间分段',
			REFRESH_DATA: '刷新数据',
			HIDE_DATA_GRID: '隐藏数据表格',
			SHOW_DATA_GRID: '显示数据表格',
			HIDE_AVAILABLE_CHARTS: '隐藏图表',
			SHOW_AVAILABLE_CHARTS: '显示图表',
			PRINT: '打印',
			PICK_ANOTHER: '查看其他洞察',
			AGGREGATE_ARITHMETIC_IS_REQUIRED: '请至少选择一种指标值转换方式.',
			MEASURE_IS_REQUIRED: '请选择时间分段或者指标分桶.',
			MEASURE_ON_TIME_IS_REQUIRED: '请选择时间分段.',
			INDICATOR_BUCKET_IS_REQUIRED: '请选择指标值分桶.',
			MEASURE_BUCKET_IS_REQUIRED: '请选择分桶.',
			RESET_INSPECTION: '确认要切换到另一个洞察吗?',
			NO_DATA: '没有合适的数据.',
			VISUALIZATION_LABEL: '可视化'
		},
		NAVIGATION: {
			TITLE: '指标领航'
		}
	},
	SETTINGS: {
		TITLE: '设置',
		LANGUAGE: '语言',
		THEME: '外观',
		THEME_LIGHT: '标准',
		THEME_DARK: '暗色',
		PAT: {
			TITLE: 'Personal Access Token',
			CREATE: '创建新Token',
			DESCRIPTION: 'Token在使用API访问Watchmen的后台服务的过程中, 用于认证服务.',
			DELETE_CONFIRM: '确认要删除Token吗? 请注意删除动作不能被恢复.',
			INPUT_PLACEHOLDER: '请赋予token一个名字, 以便进行识别',
			NOTE_REQUIRED: 'Token需要有一个名字.'
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
		FULL_DATETIME: '日期(毫秒)',
		DATE: '日期',
		TIME: '时间',
		YEAR: '年',
		HALF_YEAR: '上半年/下半年',
		QUARTER: '季度',
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
		BIZ_TRADE: '企业行业',
		BIZ_SCALE: '企业规模',
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
	FUNNEL: {
		COLUMN: '列 - 类型',
		RANGE: '范围?',
		ENABLED: '启用?',
		NUMERIC: '数字',
		DATE: '日期',
		YEAR: '年',
		HALF_YEAR: '半年',
		QUARTER: '季度',
		MONTH: '月',
		HALF_MONTH: '上下半月',
		TEN_DAYS: '上中下旬',
		WEEK_OF_MONTH: '周(按月度)',
		HALF_WEEK: '上下半周',
		DAY_KIND: '工作日/周末/假日',
		DAY_OF_WEEK: '天(按月度)',
		HOUR: '小时',
		HOUR_KIND: '时间段',
		AM_PM: '上下午',
		ENUM: '枚举'
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
		SECTION_TITLE_FILTERS: '过滤器',
		SECTION_TITLE_BASIC: '基本',
		SECTION_TITLE_PALETTE_SIZE: '画板尺寸',
		SECTION_TITLE_COLOR: '颜色渲染',
		SECTION_TITLE_BORDER: '边框渲染',
		SECTION_TITLE_FONT: '字体',
		SECTION_TITLE_POSITION: '位置',
		SECTION_TITLE_PADDING: '边距',
		SECTION_TITLE_GAP_AND_PADDING: '间隔和边距',
		SECTION_TITLE_VALUE_FORMAT: '值格式',
		SECTION_TITLE_FUNNEL_DEFINITION: '漏斗定义',
		DIMENSIONS: '统计维度',
		INDICATORS: '统计指标',
		FILTERS: '过滤器',
		NO_FUNNEL_DETECTED: '没有侦测到可用的漏斗.',
		FUNNEL_DESCRIPTION: '可用的漏斗会被自动侦测, 启用他们后可以在图标和仪表盘中动态调整数据.',
		FUNNEL_INSTANCE_DESCRIPTION: '打开调色板, 设定漏斗值.',
		NAME: '名称',
		DESCRIPTION: '描述',
		WIDTH: '宽度',
		HEIGHT: '高度',
		PIXEL: 'PX',
		PERCENTAGE: '%',
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
		POSITION: '位置',
		POSITION_ON_OUTSIDE_OF_PIE: '外侧位置',
		POSITION_TOP: '顶边位置',
		POSITION_RIGHT: '右边位置',
		POSITION_LEFT: '左边位置',
		POSITION_BOTTOM: '底边位置',
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
		SERIES_TEXT_SHOW: '显示系列标签',
		SERIES_TEXT_POSITION: '系列标签 - 位置',
		SERIES_TEXT_FONT: '系列标签 - 字体',
		SERIES_TEXT_COLOR: '系列标签 - 颜色渲染',
		SERIES_TEXT_BORDER: '系列标签 - 边框渲染',
		SERIES_TEXT_GAP_AND_PADDING: '系列标签 - 间隔与间距',
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
		SECTION_TITLE_ECHART_XAXIS_NAME_FONT: '横轴名称 - 字体',
		SECTION_TITLE_ECHART_XAXIS_NAME_COLOR: '横轴名称 - 颜色渲染',
		SECTION_TITLE_ECHART_XAXIS_NAME_BORDER: '横轴名称 - 边框渲染',
		SECTION_TITLE_ECHART_XAXIS_NAME_GAP_AND_PADDING: '横轴名称 - 间隔与边距',
		SECTION_TITLE_ECHART_XAXIS_LABEL: '横轴标签',
		SECTION_TITLE_ECHART_XAXIS_LABEL_FONT: '横轴标签 - 字体',
		SECTION_TITLE_ECHART_XAXIS_LABEL_COLOR: '横轴标签 - 颜色渲染',
		SECTION_TITLE_ECHART_XAXIS_LABEL_BORDER: '横轴标签 - 边框渲染',
		SECTION_TITLE_ECHART_XAXIS_LABEL_GAP_AND_PADDING: '横轴标签 - 间隔与边距',
		SECTION_TITLE_ECHART_XAXIS_LINE: '横轴分隔线',
		SECTION_TITLE_ECHART_XAXIS_MINOR_LINE: '横轴次级分隔线',
		SECTION_TITLE_ECHART_YAXIS: '纵轴',
		SECTION_TITLE_ECHART_YAXIS_RANGE: '纵轴值范围',
		SECTION_TITLE_ECHART_YAXIS_NAME: '纵轴名称',
		SECTION_TITLE_ECHART_YAXIS_NAME_FONT: '纵轴名称 - 字体',
		SECTION_TITLE_ECHART_YAXIS_NAME_COLOR: '纵轴名称 - 颜色渲染',
		SECTION_TITLE_ECHART_YAXIS_NAME_BORDER: '纵轴名称 - 边框渲染',
		SECTION_TITLE_ECHART_YAXIS_NAME_GAP_AND_PADDING: '纵轴名称 - 间隔与边距',
		SECTION_TITLE_ECHART_YAXIS_LABEL: '纵轴标签',
		SECTION_TITLE_ECHART_YAXIS_LABEL_FONT: '纵轴标签 - 字体',
		SECTION_TITLE_ECHART_YAXIS_LABEL_COLOR: '纵轴标签 - 颜色渲染',
		SECTION_TITLE_ECHART_YAXIS_LABEL_BORDER: '纵轴标签 - 边框渲染',
		SECTION_TITLE_ECHART_YAXIS_LABEL_GAP_AND_PADDING: '纵轴标签 - 间隔与边距',
		SECTION_TITLE_ECHART_YAXIS_LINE: '纵轴分隔线',
		SECTION_TITLE_ECHART_YAXIS_MINOR_LINE: '横轴次级分隔线',
		SECTION_TITLE_ECHART_SCRIPT: '脚本',
		SECTION_TITLE_ECHART_SCRIPT_VARS_DEF: '变量定义',
		SECTION_TITLE_ECHART_SCRIPT_VARS: '变量',
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
		PLEASE_SELECT_FUNNEL_VALUE: '请选择...',
		NO_ENUM_FUNNEL_VALUE: '没有选择值',
		NO_SCRIPT_VARS: '没有变量定义.',
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
			MAP: '地图',
			CUSTOMIZED: '自定义'
		},
		COUNT: {
			FORMAT_USING_GROUP: '千分位'
		},
		ECHART: {
			TEXT: '文本'
		},
		DEFINITION_BROKEN: '定义尚未完成, 暂时无法渲染图表.'
	},
	INDICATOR: {
		MEASURE_METHOD: {
			CONTINENT: '洲',
			REGION: '地区',
			COUNTRY: '国家',
			PROVINCE: '州/省',
			CITY: '城市',
			DISTRICT: '区县',
			FLOOR: '楼层',
			RESIDENCE_TYPE: '住宅类型',
			RESIDENTIAL_AREA: '居住面积',
			YEAR: '年',
			HALF_YEAR: '上半年/下半年',
			QUARTER: '季度',
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
			AM_PM: '上午/下午',
			GENDER: '性别',
			OCCUPATION: '职业',
			AGE: '年龄',
			RELIGION: '宗教',
			NATIONALITY: '民族',
			BIZ_TRADE: '企业行业',
			BIZ_SCALE: '企业规模',
			BOOLEAN: '布尔',
			ENUM: '枚举'
		},
		RELEVANT_TYPE: {
			SAME: '相同',
			HIGH_CORRELATED: '高关联性',
			WEAK_CORRELATED: '弱关联性',
			THIS_CAUSES_RELEVANT: '当前指标导致相关指标',
			RELEVANT_CAUSES_THIS: '相关指标导致当前指标'
		}
	},
	SHARE: {
		NOTHING: '找不到任何适合的内容, 请联系管理员以获取帮助.'
	},
	CALENDAR: {
		JAN: '一月',
		FEB: '二月',
		MAR: '三月',
		APR: '四月',
		MAY: '五月',
		JUN: '六月',
		JUL: '七月',
		AUG: '八月',
		SEP: '九月',
		OCT: '十月',
		NOV: '十一月',
		DEC: '十二月',
		WEEK: '周',
		WEEK_0: '第〇周 (不满7天)',
		WEEK_1: '第一周',
		WEEK_2: '第二周',
		WEEK_3: '第三周',
		WEEK_4: '第四周',
		WEEK_5: '第五周 (不满7天)',
		HALF_YEAR_1ST: '上半年',
		HALF_YEAR_2ND: '下半年',
		QUARTER_1ST: '一季度',
		QUARTER_2ND: '二季度',
		QUARTER_3RD: '三季度',
		QUARTER_4TH: '四季度',
		HALF_MONTH_1ST: '上半月',
		HALF_MONTH_2ND: '下半月',
		TEN_DAYS_1ST: '上旬',
		TEN_DAYS_2ND: '中旬',
		TEN_DAYS_3RD: '下旬',
		HALF_WEEK_1ST: '上半周',
		HALF_WEEK_2ND: '下半周',
		SUNDAY: '周日',
		MONDAY: '周一',
		TUESDAY: '周二',
		WEDNESDAY: '周三',
		THURSDAY: '周四',
		FRIDAY: '周五',
		SATURDAY: '周六',
		WORKDAY: '工作日',
		WEEKEND: '周末',
		HOLIDAY: '假日',
		WORK_TIME: '工作时间',
		OFF_HOURS: '业余时间',
		SLEEPING_TIME: '睡眠时间',
		AM: '上午',
		PM: '下午'
	}
};