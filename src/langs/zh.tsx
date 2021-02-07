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
		CONSTANT_INPUT_PLACEHOLDER: '请填写常量值...',
		UNKNOWN_TOPIC_NAME: '未知数据集',
		UNKNOWN_FACTOR_NAME: '未知数据因子'
	},
	ERROR: {
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
		NEXT: '下一步'
	},
	LOGIN: {
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
			ADD_DASHBOARD: '创建新仪表盘',
			SWITCH_DASHBOARD: '切换仪表盘',
			DELETE_ME: '删除',
			SHARE_DIALOG_LABEL: '复制下面的链接, 然后分享.',
			URL_COPIED: '链接已复制至剪贴板.',
			DELETE_DIALOG_LABEL: '确认要删除仪表盘吗? 请注意删除动作不能被恢复.',
			NO_MORE_DASHBOARD: '没有更多仪表盘.',
			SWITCH_DIALOG_LABEL: '请选择仪表盘'
		},
		CONNECTED_SPACE: {
			CATALOG: '目录',
			SUBJECT_DEF: '设置主题',
			SUBJECT_DATA: '主题数据',
			SUBJECT_REPORT: '图表',
			SHARE: '分享',
			PRINT: '打印',
			DOWNLOAD_PAGE: '下载当前页数据',
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
			ADD_SUBJECT_COLUMN: '添加数据列'
		},
		SETTINGS: {
			TITLE: '设置',
			LANGUAGE: '语言'
		}
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
		DAY: '天(按月度)',
		DAY_OF_WEEK: '天(按周)',
		DAY_KIND: '工作日/周末/假日',
		HOUR: '小时',
		HOUR_KIND: '工作时间/业余时间/休息时间',
		MINUTE: '分钟',
		SECOND: '秒',
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
	PARAM: {
		FROM: '来源',
		FROM_TOPIC: '数据集',
		FROM_CONSTANT: '常量值',
		FROM_COMPUTED: '计算值'
	}
};