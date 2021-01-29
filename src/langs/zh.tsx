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
		SHARE: '分享',
		ADD_REPORT: '添加图表',
		ADD_DASHBOARD: '创建新仪表盘',
		SWITCH_DASHBOARD: '切换仪表盘',
		DELETE_ME: '删除'
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
			DASHBOARD_NOT_FOUND: '未找到指定的仪表盘数据.'
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
		SETTINGS: {
			TITLE: '设置',
			LANGUAGE: '语言'
		}
	}
};