import React from 'react';

export const Jp = {
	$$settings: {
		code: 'jp',
		name: '日本語',
		fallback: ''
	},
	// fix key, anything under PLAIN will not be proxy to other type
	// anything must be string, should be placed here.
	// such as input tooltip(string property), tuple name(not for react component)
	PLAIN: {
		NEW_DASHBOARD_NAME: 'ダッシュボード',
		DEFAULT_DASHBOARD_NAME: 'ダッシュボード',
		NEW_CONNECTED_SPACE_NAME: '連結空間',
		DEFAULT_CONNECTED_SPACE_NAME: '連結空間',
		NEW_SUBJECT_NAME: '主題',
		DEFAULT_SUBJECT_NAME: '主題',
		NEW_REPORT_NAME: 'レポート',
		CONSTANT_INPUT_PLACEHOLDER: '定数値を入力してください...',
		UNKNOWN_TOPIC_NAME: '不明なトピック',
		UNKNOWN_FACTOR_NAME: '不明なファクター',
		REPORT_DESCRIPTION_PLACEHOLDER: '説明を入力してください...'
	},
	ERROR: {
		UNPREDICTED: '未知のエラーが発生しました。詳細については、管理者にお問い合わせください。'
	},
	ALERT: {
		BUTTON: '取得',
		NOT_IMPLEMENT: '該当機能はまだ実装されていません。'
	},
	DIALOG: {
		BUTTON_YES: 'はい',
		BUTTON_NO: 'いいえ'
	},
	ACTIONS: {
		COPY: 'コピー',
		CLOSE: '閉じる',
		CANCEL: '取消',
		DELETE: '削除',
		CONFIRM: '確認',
		NEXT: '次へ',
		SORT_ASC: '昇順',
		SORT_DESC: '降順',
		PREVIOUS_PAGE: '前へ',
		NEXT_PAGE: '次へ'
	},
	LOGIN: {
		PRODUCT_TITLE: <>Indexical Metrics <span>&</span> Measure Advisory</>,
		MORNING: 'おはようございます ！',
		AFTERNOON: 'こんにちは ！',
		EVENING: 'こんばんは ！',
		BUTTON: 'ログイン ！',
		NAME_EMPTY: 'アカウントを入力してください。',
		CREDENTIAL_EMPTY: 'パスワードを入力してください。',
		FAIL: 'アカウントまたはパスワードの認証に失敗しました。'
	},
	CONSOLE: {
		LOADING: '個人データ読み込み中...',
		ERROR: {
			DASHBOARD_NOT_FOUND: '該当ダッシュボードが見つかりません。',
			CONNECTED_SPACE_NOT_FOUND: '該当連結空間が見つかりません。',
			SUBJECT_NOT_FOUND: '該当主題が見つかりません。'
		},
		MENU: {
			TITLE: 'Watchmenコンソール',
			HOME: 'ホーム',
			DASHBOARDS: 'ダッシュボード',
			FAVORITE: 'お気に入りを表示する',
			NOTIFICATIONS: '通知',
			MAILS: '受信トレイ',
			TIMELINE: 'タイムラインを表示する',
			CONNECT_SPACE: '連結空間に接続',
			SETTINGS: '設定',
			TO_ADMIN: '管理者に切り替える'
		},
		FAVORITE: {
			TITLE: 'お気に入り',
			NO_DATA: 'お気に入りのアイテムはありません。',
			PIN: '固定',
			UNPIN: '固定を解除する',
			REMOVE: 'お気に入りから削除'
		},
		HOME: {
			TITLE: 'ホーム',
			SORT_BY_NAME: '名前で並べ替え',
			SORT_BY_VISIT_TIME: '訪問時間で並べ替え',
			VIEW_COLLAPSE: '折りたたむ',
			VIEW_ALL: '表示',
			CONNECTED_SPACE_TITLE: '接続された連結空間',
			CREATE_CONNECTED_SPACE_BUTTON: '連結空間に接続',
			DASHBOARD_TITLE: 'ダッシュボード',
			CREATE_DASHBOARD_BUTTON: 'ダッシュボードを作成する'
		},
		DASHBOARD: {
			SHARE: '共有',
			PRINT: 'プリント',
			ADD_INTO_FAVORITE: 'お気に入りに追加',
			REMOVE_FROM_FAVORITE: 'お気に入りから削除',
			ADD_REPORT: 'レポートを追加する',
			ADD_DASHBOARD: 'ダッシュボードを追加する',
			SWITCH_DASHBOARD: 'ダッシュボードを切り替える',
			DELETE_ME: '削除',
			SHARE_DIALOG_LABEL: 'URLをコピーして共有する。',
			URL_COPIED: 'URLをコピーしました。',
			DELETE_DIALOG_LABEL: 'ダッシュボードを削除してもよろしいですか？ 削除したものは復元できませんので、ご注意ください。',
			NO_MORE_DASHBOARD: 'これ以上のダッシュボードは存在しません。',
			SWITCH_DIALOG_LABEL: 'ダッシュボードを選択してください',
			NO_MORE_REPORT: 'これ以上のレポートはありません。'
		},
		CONNECTED_SPACE: {
			CATALOG: 'カタログ',
			SUBJECT_DEF: '主題を定義する',
			SUBJECT_DATA: 'データセット',
			SUBJECT_REPORT: 'レポート',
			SHARE: '共有',
			PRINT: 'プリント',
			SHOW_PRINT_PAGE: 'ページサイズを表示する',
			HIDE_PRINT_PAGE: 'ページサイズを非表示する',
			DOWNLOAD_PAGE: 'このページをダウンロードする',
			DOWNLOAD_ALL: 'すべてをダウンロードする',
			ADD_REPORT: 'レポートを追加する',
			ADD_SUBJECT: '主題を追加する',
			OPEN_SUBJECT: '主題を開く',
			ADD_CONNECTED_SPACE: '連結空間に接続',
			SWITCH_CONNECTED_SPACE: '接続された連結空間に切り替える',
			DELETE_ME: '削除',
			ADD_INTO_FAVORITE: 'お気に入りに追加',
			REMOVE_FROM_FAVORITE: 'お気に入りから削除',
			DELETE_DIALOG_LABEL: '連結空間を削除してもよろしいですか？ 削除したものは復元できませんので、ご注意ください。',
			NO_MORE_CONNECTED_SPACE: 'これ以上の接続された連結空間は存在しません。',
			SWITCH_DIALOG_LABEL: '接続された連結空間を選択してください',
			CREATE_DIALOG_LABEL: '利用可能な連結空間を選択してください',
			NO_MORE_SPACE: '連結空間がありません。詳細については、管理者に問い合わせてください。',
			SPACE_NOT_FOUND: '連結空間の定義が見つかりません。詳細については、管理者に問い合わせてください。',
			TOPICS_NOT_FOUND: 'トピックの定義が見つかりません。詳細については、管理者に問い合わせてください。',
			TOPICS_COUNT_MISMATCH: 'トピック数は一致していません。詳細については、管理者に問い合わせてください。',
			TOPIC_WITH_NO_FACTOR: 'ファクターは定義されていません。詳細については、管理者に問い合わせてください。',
			DELETE_SUBJECT_DIALOG_LABEL: '主題を削除してもよろしいですか？ 削除したものは復元できませんので、ご注意ください。',
			SWITCH_SUBJECT: '主題を切り替える',
			SWITCH_SUBJECT_DIALOG_LABEL: '主題を選択してください',
			NO_MORE_SUBJECT: 'これ以上の主題は存在しません。',
			SUBJECT_PICK_TOPICS: 'トピックを選択する',
			SUBJECT_DEFINE_COLUMNS: 'カラムを定義する',
			SUBJECT_FILTER_DATA: 'データフィルタ',
			SUBJECT_SET_JOINS: 'データ結合を設定する',
			SUBJECT_DEF_OVERVIEW: '一覧',
			NO_PICKED_TOPIC_FOR_SUBJECT: '選択されたトピックはありません。',
			NO_DATASET_COLUMN_FOR_SUBJECT: 'カラムは定義されていません。定義しますか',
			CREATE_DATASET_COLUMN_WHEN_NONE: '始める',
			NO_DATASET_COLUMN_FOR_SUBJECT_2: 'か？',
			ALIAS: 'カラム名',
			ADD_SUBJECT_COLUMN: 'カラムを追加する',
			CAN_NOT_DELETE_CHILD_FROM_COMPUTED: 'パラメータ数の最小限に達したため、削除できません。',
			CAN_NOT_ADD_CHILD_INTO_COMPUTED: 'パラメータ数の最大限に達したため、これ以上追加できません。',
			ADD_COMPUTE_PARAMETER: 'パラメータを追加する',
			NO_DATASET_FILTER_FOR_SUBJECT: 'フィルタは定義されていません。定義しますか',
			CREATE_DATASET_FILTER_WHEN_NONE: '始める',
			NO_DATASET_FILTER_FOR_SUBJECT_2: 'か？',
			ADD_SUBJECT_SUB_EXPRESSION_FILTER: 'フィルタの条件を追加する',
			ADD_SUBJECT_SUB_JOINT_FILTER: 'サブ結合を追加する',
			NO_DATASET_JOIN_FOR_SUBJECT: '結合は定義されていません。定義しますか',
			CREATE_DATASET_JOIN_WHEN_NONE: '始める',
			NO_DATASET_JOIN_FOR_SUBJECT_2: 'か？',
			ADD_SUBJECT_JOIN: '結合を追加する',
			SUBJECT_SELECT: '選択',
			SUBJECT_NO_SELECT: 'カラムは定義されていません。',
			SUBJECT_FROM: 'から',
			SUBJECT_NO_FROM: '結合は定義されていません。',
			SUBJECT_JOIN_INNER: '内部結合',
			SUBJECT_JOIN_LEFT: '左結合',
			SUBJECT_JOIN_RIGHT: '右結合',
			SUBJECT_JOIN_ON: 'On',
			SUBJECT_JOIN_EQUALS: '=',
			SUBJECT_JOIN_AND: 'And',
			SUBJECT_WHERE: 'Where',
			SUBJECT_NO_WHERE: 'フィルタは定義されていません。',
			SUBJECT_UNKNOWN_PARAMETER: '不明なパラメータ',
			SUBJECT_EMPTY_CONSTANT: '空の定数値',
			SUBJECT_COLUMN_AS: 'As',
			SUBJECT_NO_ALIAS: '?',
			SUBJECT_FILTER_JOINT_NO_STATEMENT: 'ジョイントがありません',
			SUBJECT_UNKNOWN_FILTER: '不明なフィルタ',
			NO_DATASET_COLUMN: 'カラムは定義されていません。',
			UNFIX_COLUMN: 'これ以降のカラムの固定を解除すうｒ',
			FIX_COLUMN: 'このカラムに固定する',
			COMPRESS_COLUMNS: 'カラムの幅を狭める',
			NO_REPORT: 'レポートは定義されていません。',
			DELETE_REPORT_DIALOG_LABEL: 'レポートを削除してもよろしいですか？ 削除したものは復元できませんので、ご注意ください。',
			COLLAPSE_REPORT_SETTINGS_SECTIONS: 'すべてのセクションを折りたたむ',
			EXPAND_REPORT_SETTINGS_SECTIONS: 'すべてのセクションを表示する'
		},
		SETTINGS: {
			TITLE: '設定',
			LANGUAGE: '言語'
		}
	},
	PARAM: {
		FROM: 'から',
		FROM_TOPIC: 'トピック',
		FROM_CONSTANT: '定数値',
		FROM_COMPUTED: '計算'
	},
	FACTOR: {
		SEQUENCE: 'シーケンス',
		NUMBER: '数値',
		UNSIGNED: '符号なし数値',
		TEXT: 'テキスト',
		ADDRESS: 'アドレス',
		CONTINENT: '大陸',
		REGION: '地域',
		COUNTRY: '国',
		PROVINCE: '州/省',
		CITY: '市',
		DISTRICT: '区',
		ROAD: '道',
		COMMUNITY: 'コミュニティ',
		FLOOR: '階',
		RESIDENCE_TYPE: '住宅タイプ',
		RESIDENTIAL_AREA: '住宅面積',
		EMAIL: 'メール',
		PHONE: '電話番号',
		MOBILE: '携帯番号',
		FAX: 'ファックス',
		DATETIME: '日付時刻',
		DATE: '日付',
		TIME: '時刻',
		YEAR: '年',
		HALF_YEAR: '上半期/下半期',
		QUARTER: '四半期',
		SEASON: '季節',
		MONTH: '月',
		HALF_MONTH: '月の上半期/月の下半期',
		TEN_DAYS: '上旬/中旬/下旬',
		WEEK_OF_YEAR: '年の週',
		WEEK_OF_MONTH: '月の週',
		HALF_WEEK: '週の上半期/週の下半期',
		DAY_OF_MONTH: '月の日',
		DAY_OF_WEEK: '週の日',
		DAY_KIND: '勤務日/週末/祝日',
		HOUR: '時間',
		HOUR_KIND: '勤務時間/勤務時間外/睡眠時間',
		MINUTE: '分',
		SECOND: '秒',
		AM_PM: '午前/午後',
		GENDER: '性別',
		OCCUPATION: '職業',
		DATE_OF_BIRTH: '生年月日',
		AGE: '年齢',
		ID_NO: 'ID',
		RELIGION: '宗教',
		NATIONALITY: '国籍',
		TRADE: '業界',
		SCALE: '規模',
		BOOLEAN: 'ブール値',
		ENUM: '列挙',
		OBJECT: 'オブジェクト',
		ARRAY: 'アレイ'
	},
	PARAMETER: {
		EXPRESSION: '式',
		COMPUTE_TYPE: {
			NONE: 'As is',
			ADD: 'たす',
			SUBTRACT: 'ひく',
			MULTIPLY: 'かける',
			DIVIDE: 'わる',
			MODULUS: 'モジュロ',
			YEAR_OF: '年',
			HALF_YEAR_OF: '上半期/下半期',
			QUARTER_OF: '四半期',
			MONTH_OF: '月',
			WEEK_OF_YEAR: '年の週',
			WEEK_OF_MONTH: '月の週',
			DAY_OF_MONTH: '月の日',
			DAY_OF_WEEK: '週の日'
		},
		EXPRESSION_OPERATOR: {
			EMPTY: '空',
			NOT_EMPTY: '値がある',
			EQUALS: 'イコール',
			NOT_EQUALS: '不等',
			LESS: '未満',
			LESS_EQUALS: '以下',
			MORE: '超',
			MORE_EQUALS: '以上',
			IN: 'In',
			NOT_IN: 'Not In'
		}
	},
	JOINT: {
		AND: 'And',
		OR: 'OR'
	},
	JOIN: {
		INNER: '完全に一致',
		LEFT: '左側優先',
		RIGHT: '右側優先'
	},
	PAGINATION: {
		TOTAL: '合計',
		ROWS: '行',
		OF_PAGES: '/',
		PAGES: 'ページ'
	},
	CHART: {
		SECTION_TITLE_SIZE: 'サイズ',
		SECTION_TITLE_BASIC_STYLE: '基本スタイル',
		SECTION_TITLE_DIMENSIONS: 'ディメンション',
		SECTION_TITLE_INDICATORS: '指標',
		NAME: '名称',
		DESCRIPTION: '説明',
		WIDTH: '幅',
		HEIGHT: '高さ',
		PIXEL: 'PX',
		DEGREE: 'DEG', // NEW
		LINE_COLOR: 'Line Color', // NEW
		LINE_STYLE: 'Line Style', // NEW
		FONT_FAMILY: '字体',
		FONT_COLOR: 'フォントの色',
		FONT_SIZE: 'フォントのサイズ',
		FONT_STYLE: 'フォントのスタイル',
		FONT_STYLE_NORMAL: '標準',
		FONT_STYLE_ITALIC: 'イタリック',
		FONT_WEIGHT: 'フォントの太さ',
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
		BORDER_STYLE: 'ボーダースタイル',
		BORDER_STYLE_NONE: 'なし',
		BORDER_STYLE_SOLID: 'ソリッド',
		BORDER_STYLE_DASHED: '破線',
		BORDER_STYLE_DOTTED: '点線',
		BORDER_COLOR: 'ボーダー色',
		BORDER_WIDTH: 'ボーダー幅',
		BORDER_RADIUS: 'ボーダー半径',
		POSITION: 'Position',  // NEW
		POSITION_TOP: '上側',
		POSITION_RIGHT: '右側',
		POSITION_LEFT: '左側',
		POSITION_BOTTOM: '下側',
		ALIGNMENT: '水平方向に整列',
		ALIGNMENT_AUTO: 'オート',
		ALIGNMENT_LEFT: '左揃え',
		ALIGNMENT_CENTER: '中央揃え',
		ALIGNMENT_RIGHT: '右揃え',
		VERTICAL_ALIGNMENT: '垂直方向に整列',
		VERTICAL_ALIGNMENT_AUTO: 'オート',
		VERTICAL_ALIGNMENT_TOP: '上揃え',
		VERTICAL_ALIGNMENT_MIDDLE: '中央揃え',
		VERTICAL_ALIGNMENT_BOTTOM: '下揃え',
		TITLE_TEXT_ITEM_GAP: 'タイトルの間隔',
		PADDING: '余白',
		SHOW: 'Show',  // NEW
		LEGEND_ORIENT: 'Orient',  // NEW
		LEGEND_ORIENT_HORIZONTAL: 'Horizontal',  // NEW
		LEGEND_ORIENT_VERTICAL: 'Vertical',  // NEW
		GRID_CONTAIN_LABEL: 'Contain Label',  // NEW
		AXIS_TYPE: 'Axis Type',  // NEW
		AXIS_TYPE_CATEGORY: 'Category',  // NEW
		AXIS_TYPE_VALUE: 'Value',  // NEW
		AXIS_TYPE_TIME: 'Time',  // NEW
		AXIS_AUTO_MIN: 'Min Auto',  // NEW
		AXIS_MIN: 'Min',  // NEW
		AXIS_AUTO_MAX: 'Max Auto',  // NEW
		AXIS_MAX: 'Max',  // NEW
		AXIS_NAME_LOCATION: 'Location',  // NEW
		AXIS_NAME_LOCATION_START: 'Start',  // NEW
		AXIS_NAME_LOCATION_CENTER: 'Center',  // NEW
		AXIS_NAME_LOCATION_END: 'End',  // NEW
		AXIS_NAME_GAP: 'Gap',  // NEW
		AXIS_NAME_ROTATE: 'Rotate',  // NEW
		AXIS_LABEL_INSIDE: 'Inside',  // NEW
		ROAM: 'Roam',  // NEW
		TREE_LAYOUT: 'Layout',  // NEW
		TREE_LAYOUT_ORTHOGONAL: 'Orthogonal',  // NEW
		TREE_LAYOUT_RADIAL: 'Radial',  // NEW
		TREE_ORIENT: 'Orient',  // NEW
		TREE_ORIENT_LEFT_RIGHT: 'Left to Right',  // NEW
		TREE_ORIENT_RIGHT_LEFT: 'Right to Left',  // NEW
		TREE_ORIENT_TOP_BOTTOM: 'Top to Bottom',  // NEW
		TREE_ORIENT_BOTTOM_TOP: 'Bottom to Top',  // NEW
		PIE_CENTER_X: 'Center X',  // NEW
		PIE_CENTER_Y: 'Center Y',  // NEW
		PIE_INSIDE_RADIUS: 'Inside Radius',  // NEW
		PIE_OUTSIDE_RADIUS: 'Outside Radius',  // NEW
		PIE_ROSE_TYPE: 'Rose Type',  // NEW
		PIE_ROSE_TYPE_NONE: 'None',  // NEW
		PIE_ROSE_TYPE_RADIUS: 'By Radius',  // NEW
		PIE_ROSE_TYPE_AREA: 'By Area',  // NEW
		SECTION_TITLE_COUNT_CHART: '特定スタイル',
		SECTION_TITLE_PIE_CHART: '特定スタイル',
		SECTION_TITLE_TREE_CHART: 'Tree Style',  // NEW
		SECTION_TITLE_TREEMAP_CHART: 'Treemap Style',  // NEW
		SECTION_TITLE_ECHART_TITLE: 'タイトル',
		SECTION_TITLE_ECHART_SUBTITLE: 'サブタイトル',
		SECTION_TITLE_ECHART_LEGEND: 'Legend',  // NEW
		SECTION_TITLE_ECHART_GRID: 'Grid',  // NEW
		SECTION_TITLE_ECHART_XAXIS: 'X-Axis',  // NEW
		SECTION_TITLE_ECHART_XAXIS_RANGE: 'X-Axis Range',  // NEW
		SECTION_TITLE_ECHART_XAXIS_NAME: 'X-Axis Name',  // NEW
		SECTION_TITLE_ECHART_XAXIS_LABEL: 'X-Axis Label',  // NEW
		SECTION_TITLE_ECHART_XAXIS_LINE: 'X-Axis Split Line',  // NEW
		SECTION_TITLE_ECHART_XAXIS_MINOR_LINE: 'X-Axis Minor Split Line',  // NEW
		SECTION_TITLE_ECHART_YAXIS: 'Y-Axis',  // NEW
		SECTION_TITLE_ECHART_YAXIS_RANGE: 'Y-Axis Range',  // NEW
		SECTION_TITLE_ECHART_YAXIS_NAME: 'Y-Axis Name',  // NEW
		SECTION_TITLE_ECHART_YAXIS_LABEL: 'Y-Axis Label',  // NEW
		SECTION_TITLE_ECHART_YAXIS_LINE: 'Y-Axis Split Line',  // NEW
		SECTION_TITLE_ECHART_YAXIS_MINOR_LINE: 'Y-Axis Minor Split Line',  // NEW
		NONAME_COLUMN: 'ノーネームカラム',
		UNKNOWN_COLUMN_NAME: '不明なカラム',
		CAN_NOT_DELETE_DIMENSION: 'ディメンションの最小限に達したため、削除できません。',
		CAN_NOT_ADD_DIMENSION: 'ディメンションの最大限に達したため、これ以上追加できません。',
		CAN_NOT_DELETE_INDICATOR: '指標の最小限に達したため、削除できません。',
		CAN_NOT_ADD_INDICATOR: '指標の最大限に達したため、これ以上追加できません。',
		ADD_DIMENSION: 'ディメンションを追加する',
		ADD_INDICATOR: '指標を追加する',
		PLEASE_SELECT_DIMENSION: '...を選択してください',
		PLEASE_SELECT_INDICATOR: '...を選択してください',
		ARITHMETIC_NONE: 'デフォルト',
		ARITHMETIC_SUMMARY: '合計',
		ARITHMETIC_AVERAGE: '平均値',
		ARITHMETIC_COUNT: '数量',
		ARITHMETIC_MAX: '最大値',
		ARITHMETIC_MIN: '最小値',
		TYPE: 'タイプ',
		TYPES: {
			COUNT: '統計グラフ',
			BAR: 'ヒストグラム',
			LINE: '折れ線グラフ',
			SCATTER: '散布図',
			PIE: '円グラフ',
			DOUGHNUT: 'ドーナツグラフ',
			NIGHTINGALE: 'ナイチンゲールグラフ',
			SUNBURST: 'サンバースト図',
			TREE: '樹形図',
			TREEMAP: 'ツリーマップ',
			MAP: 'マップ'
		},
		COUNT: {
			FORMAT_USING_GROUP: '小数第3位'
		},
		ECHART: {
			TEXT: 'テキスト'
		}
	},
	SHARE: {
		NOTHING: 'No content can be found, contact administrator for more information.' // NEW
	}
};