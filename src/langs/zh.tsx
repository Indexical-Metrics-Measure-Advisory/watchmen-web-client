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
		NEW_DASHBOARD_NAME: '仪表盘'
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
		DELETE: '删除'
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
			CONNECTED_SPACE_NOT_FOUND: '未找到指定的已联接工作空间.'
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
			ADD_REPORT: '添加图表',
			ADD_DASHBOARD: '创建新仪表盘',
			SWITCH_DASHBOARD: '切换仪表盘',
			DELETE_ME: '删除',
			SHARE_DIALOG_LABEL: '复制下面的链接, 然后分享:',
			URL_COPIED: '链接已复制至剪贴板.',
			DELETE_DIALOG_LABEL: '确认要删除仪表盘吗? 请注意删除动作不能被恢复.'
		},
		CONNECTED_SPACE: {
			CATALOG: '目录',
			RESOURCES: '可用资源',
			ADD_GROUP: '添加分组',
			ADD_SUBJECT: '添加主题',
			ADD_CONNECTED_SPACE: '联接工作空间',
			SWITCH_CONNECTED_SPACE: '切换已联接的工作空间',
			DELETE_ME: '删除'
		},
		SETTINGS: {
			TITLE: '设置',
			LANGUAGE: '语言'
		}
	}
};