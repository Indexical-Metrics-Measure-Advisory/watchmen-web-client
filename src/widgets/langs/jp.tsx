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
		DEFAULT_REPORT_NAME: 'レポート',
		CONSTANT_INPUT_PLACEHOLDER: '定数値を入力してください...',
		UNKNOWN_TOPIC_NAME: '不明なトピック',
		UNKNOWN_FACTOR_NAME: '不明なファクター',
		REPORT_DESCRIPTION_PLACEHOLDER: '説明を入力してください...',
		REPORT_DATASET_GRID_TITLE: 'レポートのデータセット',
		REPORT_DATASET_GRID_CLOSE: '閉じる',
		REPORT_DATASET_GRID_REFRESH: '更新',
		REPORT_DATASET_GRID_DOWNLOAD: 'ダウンロード',
		LOADING: '読み込み中...',
		FIND_INDICATOR_PLACEHOLDER: '指標名 トピック名または ファクター名に基づいて検索します。',
		FIND_TOPIC_OR_FACTOR_PLACEHOLDER: 'トピック名または ファクター名に基づいて検索します。',
		INDICATOR_NAME_PLACEHOLDER: '読むための名前を入力してください。',
		INDICATOR_DESCRIPTION_PLACEHOLDER: '指標の説明を入力してください。',
		FIND_BUCKET_PLACEHOLDER: 'バケット名 トピック名または ファクター名に基づいて検索します。',
		BUCKET_CATEGORY_SEGMENT_VALUE_PLACEHOLDER: '分類値、セグメントに追加することを確認します。',
		FIND_INDICATOR_VALUE_BUCKETS_PLACEHOLDER: 'バケット名に基づいて検索します。',
		DROPDOWN_PLACEHOLDER: '選択してください...',
		FIND_NAVIGATION_PLACEHOLDER: '名前に基づいて検索します。',
		NEW_NAVIGATION_NAME: '指標航法'
	},
	STANDARD: {
		YES: 'はい',
		NO: 'いいえ'
	},
	ERROR: {
		UNAUTHORIZED: '権限がありません。ログインしてください。',
		ACCESS_DENIED: 'アクセスが拒否されました。詳細については、管理者にお問い合わせください。',
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
		SAVE: '保存します',
		COPY: 'コピー',
		CLOSE: '閉じる',
		CANCEL: '取消',
		DELETE: '削除',
		CONFIRM: '確認',
		NEXT: '次へ',
		SORT_ASC: '昇順',
		SORT_DESC: '降順',
		PREVIOUS_PAGE: '前へ',
		NEXT_PAGE: '次へ',
		EXPAND: '展開じる',
		COLLAPSE: '閉じる',
		MINIMIZE: '最小化する',
		MAXIMIZE: '最大化する',
		RESTORE: '戻す'
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
	DATASET: {
		UNFIX_COLUMN: 'これ以降のカラムの固定を解除すうｒ',
		FIX_COLUMN: 'このカラムに固定する',
		COMPRESS_COLUMNS: 'カラムの幅を狭める',
		DOWNLOAD_PAGE: 'このページをダウンロードする',
		DOWNLOAD_ALL: 'すべてをダウンロードする',
		SIMULATE_DATA: 'シミュレート',
		UPLOAD_DATA: 'データをアップロードする',
		UPLOAD_DATA_FAILURE: 'データのアップロードに失敗しました、データ形式を確認してください。',
		DOWNLOAD_TEMPLATE: 'テンプレートのダウンロード'
	},
	CONSOLE: {
		LOADING: '個人データ読み込み中...',
		BYE: '終了しますか？',
		ERROR: {
			DASHBOARD_NOT_FOUND: '該当ダッシュボードが見つかりません。',
			CONNECTED_SPACE_NOT_FOUND: '該当連結空間が見つかりません。',
			SUBJECT_NOT_FOUND: '該当主題が見つかりません。',
			REPORT_NOT_FOUND: '該当レポートが見つかりません。'
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
			TO_CONSOLE: 'ワークベンチに切り替える',
			TO_ADMIN: '管理者に切り替える',
			TO_DATA_QUALITY: 'データ品質センターに切り替える',
			TO_INDICATOR_WORKBENCH: '指標ーワークベンチに切り替える',
			LOGOUT: 'ログアウト'
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
			PRINT: '印刷',
			REFRESH: '更新',
			AUTO_REFRESH: '自動更新(5分間隔)',
			ADD_INTO_FAVORITE: 'お気に入りに追加',
			REMOVE_FROM_FAVORITE: 'お気に入りから削除',
			ADD_REPORT: 'レポートを追加する',
			ADD_PARAGRAPH: 'コメントを追加する',
			ADD_DASHBOARD: 'ダッシュボードを追加する',
			SWITCH_DASHBOARD: 'ダッシュボードを切り替える',
			DELETE_ME: '削除',
			SHARE_DIALOG_LABEL: 'URLをコピーして共有する。',
			URL_COPIED: 'URLをコピーしました。',
			DELETE_DIALOG_LABEL: 'ダッシュボードを削除してもよろしいですか？ 削除したものは復元できませんので、ご注意ください。',
			NO_MORE_DASHBOARD: 'これ以上のダッシュボードは存在しません。',
			SWITCH_DIALOG_LABEL: 'ダッシュボードを選択してください',
			NO_MORE_REPORT: 'これ以上のレポートはありません。',
			DELETE_REPORT_DIALOG_LABEL: 'レポートを削除してもよろしいですか？ 削除したものは復元できませんので、ご注意ください。',
			DELETE_PARAGRAPH_DIALOG_LABEL: 'コメントを削除してもよろしいですか？ 削除したものは復元できませんので、ご注意ください。',
			NO_REPORT: 'レポートは定義されていません。',
			SHOW_PRINT_PAGE: 'ページサイズを表示する',
			HIDE_PRINT_PAGE: 'ページサイズを非表示する',
			SET_AS_ADMIN_HOME: '管理者ホームとして設定する',
			FUNNEL_TITLE: 'データフォーカス'
		},
		CONNECTED_SPACE: {
			CATALOG: 'カタログ',
			SUBJECT_DEF: '主題を定義する',
			SUBJECT_DATA: 'データセット',
			SUBJECT_REPORTS: 'レポート一覧',
			SUBJECT_REPORT: 'レポート',
			REPORT_DATA: 'データセット',
			REPORT_FILTER: 'フィルタ',
			REPORT_FUNNEL: 'じょうご',
			SHARE: '共有',
			PRINT: '印刷',
			REFRESH: '更新',
			AUTO_REFRESH: '自動更新(5分間隔)',
			SHOW_PRINT_PAGE: 'ページサイズを表示する',
			HIDE_PRINT_PAGE: 'ページサイズを非表示する',
			ADD_REPORT: 'レポートを追加する',
			ADD_SUBJECT: '主題を追加する',
			OPEN_SUBJECT: '主題を開く',
			ADD_CONNECTED_SPACE: '連結空間に接続',
			SWITCH_CONNECTED_SPACE: '接続された連結空間に切り替える',
			DELETE_ME: '削除',
			ADD_INTO_FAVORITE: 'お気に入りに追加',
			REMOVE_FROM_FAVORITE: 'お気に入りから削除',
			SET_AS_TEMPLATE: 'テンプレートとして設定',
			REMOVE_FROM_TEMPLATE: 'テンプレートから削除',
			DELETE_DIALOG_LABEL: '連結空間を削除してもよろしいですか？ 削除したものは復元できませんので、ご注意ください。',
			NO_MORE_CONNECTED_SPACE: 'これ以上の接続された連結空間は存在しません。',
			SWITCH_DIALOG_LABEL: '接続された連結空間を選択してください',
			CREATE_DIALOG_LABEL: '利用可能な連結空間を選択してください',
			CREATE_DIALOG_CHOOSE_TEMPLATE_LABEL: '好きなテンプレートを選択してください',
			TEMPLATE: 'テンプレート',
			TEMPLATE_CREATE_BY: '著者',
			NO_MORE_SPACE: '連結空間がありません。詳細については、管理者に問い合わせてください。',
			SPACE_NOT_FOUND: '連結空間の定義が見つかりません。詳細については、管理者に問い合わせてください。',
			TOPICS_NOT_FOUND: 'トピックの定義が見つかりません。詳細については、管理者に問い合わせてください。',
			TOPICS_COUNT_MISMATCH: 'トピック数は一致していません。詳細については、管理者に問い合わせてください。',
			TOPIC_WITH_NO_FACTOR: 'ファクターは定義されていません。詳細については、管理者に問い合わせてください。',
			DELETE_SUBJECT_DIALOG_LABEL: '主題を削除してもよろしいですか？ 削除したものは復元できませんので、ご注意ください。',
			SWITCH_SUBJECT: '主題を切り替える',
			SWITCH_SUBJECT_DIALOG_LABEL: '主題を選択してください',
			NO_MORE_SUBJECT: 'これ以上の主題は存在しません。',
			SUBJECT_DEF_INVALID: '主題の定義に誤りがあります。確認してください。',
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
			ADD_SUB_EXPRESSION_FILTER: 'フィルタの条件を追加する',
			ADD_SUB_JOINT_FILTER: 'サブ結合を追加する',
			NO_DATASET_JOIN_FOR_SUBJECT: '結合は定義されていません。定義しますか',
			CREATE_DATASET_JOIN_WHEN_NONE: '始める',
			NO_DATASET_JOIN_FOR_SUBJECT_2: 'か？',
			ADD_SUBJECT_JOIN: '結合を追加する',
			SUBJECT_SELECT: 'Select',
			SUBJECT_NO_SELECT: 'カラムは定義されていません。',
			SUBJECT_FROM: 'From',
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
			SUBJECT_NO_ALIAS: '？',
			SUBJECT_FILTER_JOINT_NO_STATEMENT: 'ジョイントがありません',
			SUBJECT_UNKNOWN_FILTER: '不明なフィルタ',
			NO_DATASET_COLUMN: 'カラムは定義されていません。',
			NO_REPORT: 'レポートは定義されていません。定義しますか',
			CREATE_REPORT: '始める',
			NO_REPORT_2: 'か？',
			NO_MORE_REPORT: 'これ以上のレポートは存在しません.',
			OPEN_REPORT: 'レポートを開く',
			SWITCH_REPORT: 'レポートを切り替える',
			SWITCH_REPORT_DIALOG_LABEL: 'レポートを選択してください',
			DELETE_REPORT_DIALOG_LABEL: 'レポートを削除してもよろしいですか？ 削除したものは復元できませんので、ご注意ください。',
			COLLAPSE_REPORT_SETTINGS_SECTIONS: 'すべてのセクションを折りたたむ',
			EXPAND_REPORT_SETTINGS_SECTIONS: 'すべてのセクションを表示する',
			REPORT_NO_FILTER: 'フィルタは定義されていません。定義しますか',
			CREATE_REPORT_FILTER: '始める',
			REPORT_NO_FILTER_2: 'か？',
			INCORRECT_REPORT_FILTER: 'フィルタ条件の定義が正しくありません。',
			REPORT_NO_FUNNEL: 'じょうごが有効になっていない。'
		}
	},
	INDICATOR_WORKBENCH: {
		MENU: {
			TITLE: '指標ーワークベンチ',
			BUCKETS: 'バケットを準備',
			PREPARE: '指標を準備',
			INSPECTION: '指標を構造',
			NAVIGATION: '指標航法',
			SETTINGS: '設定',
			LOGOUT: 'ログアウト'
		},
		LOADING: 'データ読み込み中...',
		ON_EDIT: '編集中、保存されていないデータはすべて失われます。編集を破棄しますか。',
		INDICATOR: {
			TITLE: '指標を準備',
			STEP: 'ステップ',
			WAIT_INPUT: '入力を待っている...',
			SEARCHING: '検索中...',
			NO_MATCHED: '一致するデータが見つかりませんでした。',
			OR: 'または',
			CREATE_INDICATOR: '新しい指標を定義します',
			FIND_INDICATOR: '定義された指標を検索します',
			DISCARD_FIND_INDICATOR: '捨てる',
			ON_CREATE_INDICATOR: '新しい指標が定義されています',
			ON_VIEW_INDICATOR: '指標を表示',
			RESTART: '再起動',
			PICK_TOPIC: 'トピックまたはファクターを選択します',
			DEFINE_ON_TOPIC: 'トピックに対する定義',
			INDICATOR_ON_TOPIC: 'トピックに関する',
			FAILED_TO_LOAD_INDICATOR: '指標データの読み込みにエラーが発生しました。詳細については、管理者に問い合わせてください。',
			MEASURE_METHODS_TITLE: '現在の指標で使用できる測定ディメンションは、自動的に検出されます。',
			FACTOR: 'ファクター',
			FACTOR_NAME: '名前',
			FACTOR_LABEL: 'レベル',
			FACTOR_TYPE: 'タイプ',
			FACTOR_ENUM: '列挙',
			AGGREGATE: '集計方法',
			GEO: '地理的に関連しています',
			TIME_PERIOD: '時間範囲',
			INDIVIDUAL: '個人的に',
			ORGANIZATION: '機関',
			CATEGORY: '分類を指定します',
			DEFINE_BUCKETS_TITLE: '分類と集計を改善するための事前定義されたバケット。',
			INDICATOR_VALUE_BUCKET_ONLY_ON_FACTOR_LABEL: '指標値バケットは、データファクタが選択されている場合にのみさらに定義できます',
			INDICATOR_VALUE_BUCKET_LABEL: '指標値はバケットで定義',
			BUCKET_NAME: 'バケット名',
			LINK_INDICATOR_VALUE_BUCKETS: '定義済みの指標値のバケットを関連付けます',
			DISCARD_LINK_INDICATOR_VALUE_BUCKETS: '関連付けを破棄します',
			MEASURE_BUCKET_LABEL: '測定寸法のバケット定義',
			NO_MEASURE_BUCKET: '適切な測定寸法のバケットは見つかりませんでした。',
			VIEW_MEASURE_BUCKETS: '定義済みの測定寸法のバケットを表示します',
			IGNORE_DEFINE_BUCKETS: 'バケット定義を無視する',
			CHANGE_NAME: '名前を変更します',
			NOT_NOW: '捨てる',
			SAVE_INDICATOR: '指標を保存',
			SAVE_NAME: '名前を保存する',
			REQUIRE_INDICATOR_NAME: '読み取りには指標名が必要です。',
			RELEVANT_TITLE: '現在の指標に関連する指標は、自動的に検出できます。',
			INDICATOR_NAME: '関連指標',
			INDICATOR_RELEVANT_TYPE: '関連性',
			IRRELEVANT: '何の関係もない',
			NO_RELEVANT_DETECTED: '現在、関連指標は検出されていません。',
			DETECT_RELEVANT: '潜在的な関連指標を検出します',
			IGNORE_DETECT_RELEVANT: '今すぐ検出を無視',
			CATEGORIES_TITLE: 'カテゴリ。',
			DESCRIPTION_TITLE: '説明。',
			LAST_STEP_TITLE: '指標の設定が完了しました。',
			PREPARE_ANOTHER: '別の指標を定義します'
		},
		BUCKET: {
			TITLE: 'バケット',
			LABEL: 'バケット',
			NEW_BUCKET_PREFIX: '新しい',
			EXISTING_BUCKET_PREFIX: '既存',
			CREATE_BUCKET: 'バケットを作成',
			NAME_LABEL: 'バケット名:',
			TYPE_LABEL: 'バケットの種類:',
			TYPE_IS_FIXED_ONCE_SAVE: 'バケットタイプは、バケットが最初に保存された後にロックされ、変更できなくなります。',
			DESCRIPTION_LABEL: '説明:',
			CREATE_AT: '作成先',
			LAST_MODIFIED_AT: '最終更新日',
			BUCKET_NAME_IS_REQUIRED: 'バケット名を記入してください。',
			BUCKET_MEASURE_IS_REQUIRED: '測定寸法を選択してください。',
			BUCKET_ENUM_IS_REQUIRED: '列挙型を選択してください。',
			BUCKET_SEGMENTS_IS_REQUIRED: '少なくとも 2 つのセグメントを定義する必要があります。',
			BUCKET_SEGMENT_NAME_IS_REQUIRED: 'セグメント名を入力してください。',
			BE_NUMERIC_OF_NUMERIC_SEGMENT: 'セグメント値は数値である必要があります。',
			EMPTY_FIRST_MIN_OF_NUMERIC_SEGMENT: '最初のセグメントの最小値を入力しないでください。',
			NOT_EMPTY_FIRST_MAX_OF_NUMERIC_SEGMENT: '最初のセグメントの最大値を入力してください。',
			NOT_EMPTY_OF_NUMERIC_SEGMENT: '中間セグメントのセグメント値を入力してください。',
			MIN_MAX_ORDER_OF_NUMERIC_SEGMENT: 'セグメントの最小値を最大値より小さくしてください。',
			NOT_EMPTY_LAST_MIN_OF_NUMERIC_SEGMENT: '最後のセグメントの最小値を入力してください。',
			EMPTY_LAST_MAX_OF_NUMERIC_SEGMENT: '最後のセグメントの最大値を入力しないでください。',
			RANGE_LACK_EXISTS_OF_NUMERIC_SEGMENT: '数値区間はセグメントで覆う。',
			RANGE_OVERLAP_EXISTS_OF_NUMERIC_SEGMENT: 'セグメント区間が重なる。',
			NOT_EMPTY_OF_CATEGORY_SEGMENT: '少なくとも 1 つの分類値を定義してください。',
			NO_DUPLICATED_OF_CATEGORY_SEGMENT: '同じセグメント内に重複する分類は存在できません。',
			ONE_OTHERS_SEGMENT_OF_CATEGORY_SEGMENT: '分類 (その他) を含めることができるセグメントは 1 つだけです。',
			ONE_OTHERS_VALUE_OF_CATEGORY_SEGMENT: 'セグメント内に含めることができる分類 (その他) は 1 つだけである。',
			NO_SHARED_OF_CATEGORY_SEGMENT: '同じカテゴリを複数のセグメントに存在させてはならない。',
			NO_SEGMENT_DEFINED: '定義されていません',
			ONE_SEGMENT_DEFINED: '1 つの定義',
			N_SEGMENT_DEFINED: 'つの定義',
			BUCKET_TYPE_VALUE: 'バリューバケット',
			BUCKET_TYPE_VALUE_MEASURE: '測定寸法値のバケット',
			BUCKET_TYPE_CATEGORY_MEASURE: '測定寸法値分類のバケット',
			BUCKET_TYPE_ENUM_MEASURE: '測定寸法列挙のバケット',
			RANGE_INCLUDING_LABEL: '値の格納方法:',
			RANGE_INCLUDE_MIN: '[最小値を含み、最大値は含まれません)',
			RANGE_INCLUDE_MAX: '(最小値は含まれ、最大値は含まれません]',
			SEGMENTS_LABEL: 'セグメント定義:',
			SEGMENT_NAME: 'セグメント名',
			VALUE_SEGMENT_MIN_LABEL: '最小値',
			VALUE_SEGMENT_MAX_LABEL: '最大値',
			ADD_SEGMENT: '値のセグメンテーションを追加',
			SORT_SEGMENTS: '並べ替え',
			MEASURE_METHOD_LABEL: '測定寸法:',
			MEASURE_METHOD_IS_FIXED_ONCE_SAVE: '測定寸法は、バケットが最初に保存された後にロックされ、変更できなくなります。',
			CATEGORY_SEGMENT_LABEL: '分類値',
			DUPLICATE_CATEGORY_SEGMENT_VALUE: '分類は既にこのセグメントに存在します。',
			DUPLICATE_CATEGORY_SEGMENT_VALUE_CASE_IGNORED: '分類 (大文字と小文字を区別しない) は、このセグメントに既に存在します。',
			OTHERS_IS_EXCLUSIVE_ON_CATEGORY_SEGMENT: '分類 (その他) は排他的であり、他のカテゴリと同時に存在することはできません。',
			NO_SEGMENT_VALUE_DEFINED: '値が定義されていません',
			ADD_OTHER_CATEGORY: 'その他を追加',
			ENUM_LABEL: '列挙:',
			ENUM_IS_FIXED_ONCE_SAVE: '列挙は、バケットが最初に保存された後にロックされ、変更できなくなります。',
			SORT_SEGMENTS_BY_CODE: 'コードで並べ替え',
			SORT_SEGMENTS_BY_NAME: '名前で並べ替え',
			AVAILABLE_ENUM_ITEMS_LABEL: '使用可能な列挙項目:',
			NO_AVAILABLE_ENUM_ITEMS: '使用できるデータがありません。',
			ADD_AVAILABLE_ITEMS_INTO_SEGMENT: 'セグメントに追加',
			SEGMENT_LABEL: 'セグメント',
			PLEASE_SELECT_SEGMENT: '選択した列挙項目を含むセグメントを選択してください。',
			PLEASE_SELECT_ENUM_ITEM: '少なくとも 1 つの列挙項目を選択してセグメント化に参加してください。'
		},
		INSPECTION: {
			TITLE: '指標の洞察',
			OR: 'または',
			PICK_INSPECTION_LABEL: '洞察を選択:',
			PICKED_INSPECTION_LABEL: '洞察が選択:',
			PICK_INSPECTION: '確認',
			CREATE_INSPECTION: '新しい洞察を作成',
			INSPECTION_IS_REQUIRED: '表示する必要がある洞察を選択してください。',
			NONAME_ON_INSPECTION: '名前なし',
			RENAME: '変更',
			NEW_NAME: '名前を付け',
			SET_NAME_LABEL: '名前を設定',
			NAME_IS_REQUIRED: '読むための名前を入力してください。',
			PICK_INDICATOR_LABEL: '指標を選択:',
			PICK_INDICATOR: '確認',
			INDICATOR_IS_REQUIRED: '新しい洞察を作成するための指標を選択してください。',
			INSPECTING_ON_INDICATOR_LABEL: '洞察指標:',
			VALUE_TRANSFORM_LABEL: '指標値を変換:',
			VALUE_TRANSFORM_COUNT: '個数の合計',
			VALUE_TRANSFORM_SUM: '合計値',
			VALUE_TRANSFORM_AVG: '平均',
			VALUE_TRANSFORM_MAX: '最大値',
			VALUE_TRANSFORM_MIN: '最小値',
			SELECT_BUCKETING_ON_LABEL: 'バケット方式:',
			NO_BUCKET_ON: 'バケットは使用されません',
			MEASURE_ON_VALUE: '指標値',
			SELECT_MEASURE_ON_FIRST: 'まず、バケットデータムを選択してください...',
			MEASURE_ON_NATURALLY: '自然分類を使用',
			TIME_PERIOD_LABEL: '時間範囲:',
			ALL_TIME_PERIOD: 'すべての時間',
			TIME_MEASURE_ON_LABEL: '時間グループ化:',
			NO_TIME_MEASURE: '時間測定なし',
			REFRESH_DATA: 'データを更新',
			HIDE_DATA_GRID: 'テーブルを非表示',
			SHOW_DATA_GRID: 'テーブルを表示',
			HIDE_AVAILABLE_CHARTS: 'グラフを非表示',
			SHOW_AVAILABLE_CHARTS: 'グラフを表示',
			PRINT: '印刷',
			PICK_ANOTHER: '他の洞察を表示',
			AGGREGATE_ARITHMETIC_IS_REQUIRED: '指標値の変換方法を少なくとも 1 つ選択してください。',
			MEASURE_IS_REQUIRED: '時間グループまたはバケットを選択してください。',
			MEASURE_ON_TIME_IS_REQUIRED: '時間グループを選択してください。',
			INDICATOR_BUCKET_IS_REQUIRED: '指標値をバケットで選択してください。',
			MEASURE_BUCKET_IS_REQUIRED: 'バケットを選択してください。',
			RESET_INSPECTION: '別の洞察に切り替えることを確認します。',
			NO_DATA: '適切なデータがありません。',
			VISUALIZATION_LABEL: '視覚化'
		},
		NAVIGATION: {
			TITLE: '航法',
			LABEL: '航法',
			CREATE_NAVIGATION: '航法を作成',
			NEW_NAVIGATION_PREFIX: '新しい',
			EXISTING_NAVIGATION_PREFIX: '既存',
			CREATE_AT: '作成先',
			LAST_MODIFIED_AT: '最終更新日',
			NAVIGATION_NOT_FOUND: '航法の定義が見つかりません。詳細については、管理者に問い合わせてください。',
			BACK_TO_QUERY: 'クエリに戻る',
			ROOT: '根',
			MISSED_INDICATOR: '指標定義が見つかりませんで',
			MISSED_INDICATOR_TOPIC: '指標に対応するトピック定義が見つかりませんで',
			NO_INDICATOR_CRITERIA_DEFINED: 'フィルタが定義されていません',
			INDICATOR_CRITERIA_DEFINED: '個の条件が定義されて',
			PLEASE_SELECT_CRITERIA_FACTOR: 'ファクターを選択してください',
			PLEASE_SELECT_CRITERIA_ARITHMETIC: '一致する方法',
			NO_INDICATOR_CANDIDATE: 'これ以上の指標を選択することができます。',
			UNCLASSIFIED_CATEGORY: '未分類',
			LOADING_CRITERIA_DEF: '定義データを読み込みます。',
			TIME_RANGE: '時間:',
			TIME_RANGE_YEAR: '年によって',
			TIME_RANGE_MONTH: '月別',
			TIME_RANGE_COMPARE_WITH_PREVIOUS: '前のサイクルと比較するかどうか:'
		}
	},
	SETTINGS: {
		TITLE: '設定',
		LANGUAGE: '言語',
		THEME: 'テーマ',
		THEME_LIGHT: '標準',
		THEME_DARK: 'ダーク',
		PAT: {
			TITLE: 'パーソナルアクセストークン',
			CREATE: '新しいトークンを生成する',
			DESCRIPTION: 'Watchmen APIへのアクセスに使用できる生成したトークン。',
			DELETE_CONFIRM: 'トークンを削除してもよろしいですか？ 削除したものは復元できませんので、ご注意ください。',
			INPUT_PLACEHOLDER: 'トークンの目的を特定するためのメモ',
			NOTE_REQUIRED: 'トークンには注意が必要です。'
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
		FULL_DATETIME: '日付(ミリ秒)',
		DATE: '日付',
		TIME: '時刻',
		YEAR: '年',
		HALF_YEAR: '上半期/下半期',
		QUARTER: '四半期',
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
		MILLISECOND: 'ミリ秒',
		AM_PM: '午前/午後',
		GENDER: '性別',
		OCCUPATION: '職業',
		DATE_OF_BIRTH: '生年月日',
		AGE: '年齢',
		ID_NO: 'ID',
		RELIGION: '宗教',
		NATIONALITY: '国籍',
		BIZ_TRADE: '業界',
		BIZ_SCALE: '規模',
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
			DAY_OF_WEEK: '週の日',
			CASE_THEN: 'ケース'
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
	FUNNEL: {
		COLUMN: 'カラム - タイプ',
		RANGE: '範囲？',
		ENABLED: '有効？',
		NUMERIC: '数値',
		DATE: '日付',
		YEAR: '年',
		HALF_YEAR: '半年',
		QUARTER: '四半期',
		MONTH: '月',
		HALF_MONTH: '上と下の月',
		TEN_DAYS: '上中下旬',
		WEEK_OF_MONTH: '月の週',
		HALF_WEEK: '上と下の週',
		DAY_KIND: '平日/週末/休日',
		DAY_OF_WEEK: '月の日',
		HOUR: '時間',
		HOUR_KIND: '期間',
		AM_PM: '上の午後',
		ENUM: '列挙'
	},
	PAGINATION: {
		TOTAL: '合計',
		ROWS: '行',
		OF_PAGES: '/',
		PAGES: 'ページ'
	},
	CHART: {
		SETTINGS_HEADER_LABEL: 'レポート設定',
		SECTION_TITLE_BASIC_STYLE: '基本スタイル',
		SECTION_TITLE_DIMENSIONS: 'ディメンション',
		SECTION_TITLE_INDICATORS: '指標',
		SECTION_TITLE_FILTERS: 'フィルタ',
		SECTION_TITLE_BASIC: '基本',
		SECTION_TITLE_PALETTE_SIZE: 'パレットサイズ',
		SECTION_TITLE_COLOR: '色を塗る',
		SECTION_TITLE_BORDER: 'ボーダー',
		SECTION_TITLE_FONT: 'フォント',
		SECTION_TITLE_POSITION: '位置',
		SECTION_TITLE_PADDING: '余白',
		SECTION_TITLE_GAP_AND_PADDING: '間隔、余白',
		SECTION_TITLE_VALUE_FORMAT: '値形式',
		SECTION_TITLE_FUNNEL_DEFINITION: 'じょうご定義',
		DIMENSIONS: 'ディメンション',
		INDICATORS: '指標',
		FILTERS: 'フィルタ',
		NO_FUNNEL_DETECTED: '使用可能なじょうごは検出されていません。',
		FUNNEL_DESCRIPTION: '利用可能なじょうごは自動的に検出され、レポートデータをこことダッシュボードで動的に調整できます。',
		FUNNEL_INSTANCE_DESCRIPTION: 'パレットを開いてじょうごの値を定義します。',
		NAME: '名称',
		DESCRIPTION: '説明',
		WIDTH: '幅',
		HEIGHT: '高さ',
		PIXEL: 'PX',
		PERCENTAGE: '%',
		DEGREE: '度',
		LINE_COLOR: '線の色',
		LINE_STYLE: '線のスタイル',
		FONT_FAMILY: 'フォント',
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
		POSITION: 'ポジション',
		POSITION_ON_OUTSIDE_OF_PIE: '外側の位置',
		POSITION_TOP: '上側',
		POSITION_RIGHT: '右側',
		POSITION_LEFT: '左側',
		POSITION_BOTTOM: '下側',
		HORIZONTAL_ALIGNMENT: '水平方向に整列',
		HORIZONTAL_ALIGNMENT_AUTO: 'オート',
		HORIZONTAL_ALIGNMENT_LEFT: '左揃え',
		HORIZONTAL_ALIGNMENT_CENTER: '中央揃え',
		HORIZONTAL_ALIGNMENT_RIGHT: '右揃え',
		VERTICAL_ALIGNMENT: '垂直方向に整列',
		VERTICAL_ALIGNMENT_AUTO: 'オート',
		VERTICAL_ALIGNMENT_TOP: '上揃え',
		VERTICAL_ALIGNMENT_MIDDLE: '中央揃え',
		VERTICAL_ALIGNMENT_BOTTOM: '下揃え',
		TITLE_TEXT_ITEM_GAP: 'タイトルの間隔',
		PADDING: '余白',
		SHOW: '表示',
		SERIES_TEXT_SHOW: 'シリーズテキストを表示',
		SERIES_TEXT_POSITION: 'シリーズテキスト - 位置',
		SERIES_TEXT_FONT: 'シリーズテキスト - フォント',
		SERIES_TEXT_COLOR: 'シリーズテキスト - 色を塗る',
		SERIES_TEXT_BORDER: 'シリーズテキスト - ボーダー',
		SERIES_TEXT_GAP_AND_PADDING: 'シリーズテキスト - 間隔、余白',
		LEGEND_ORIENT: '方向',
		LEGEND_ORIENT_HORIZONTAL: '水平',
		LEGEND_ORIENT_VERTICAL: '垂直',
		GRID_CONTAIN_LABEL: 'コンテナラベル',
		AXIS_TYPE: '軸タイプ',
		AXIS_TYPE_CATEGORY: '分類',
		AXIS_TYPE_VALUE: '値',
		AXIS_TYPE_TIME: '時間',
		AXIS_AUTO_MIN: '（オート）最小値',
		AXIS_MIN: '最小値',
		AXIS_AUTO_MAX: '（オート）最大値',
		AXIS_MAX: '最大値',
		AXIS_NAME_LOCATION: 'ロケーション',
		AXIS_NAME_LOCATION_START: '開始',
		AXIS_NAME_LOCATION_CENTER: '中央',
		AXIS_NAME_LOCATION_END: '末尾',
		AXIS_NAME_GAP: '間隔',
		AXIS_NAME_ROTATE: '回転度',
		AXIS_LABEL_INSIDE: '内側',
		LABEL_GAP: '間隔',
		LABEL_ROTATE: '回転度',
		LABEL_FORMAT_USING_GROUP: '小数第3位',
		LABEL_FORMAT_USING_PERCENTAGE: '%を追加する',
		LABEL_VALUE_AS_PERCENTAGE: '値を%に変換する',
		LABEL_FRACTION_DIGITS: '小数位',
		LABEL_POSITION_TOP: '上側',
		LABEL_POSITION_LEFT: '左側',
		LABEL_POSITION_RIGHT: '右側',
		LABEL_POSITION_BOTTOM: '下側',
		LABEL_POSITION_INSIDE: '内部',
		LABEL_POSITION_INSIDE_LEFT: '内部の左側',
		LABEL_POSITION_INSIDE_RIGHT: '内部の右側',
		LABEL_POSITION_INSIDE_TOP: '内部の上側',
		LABEL_POSITION_INSIDE_BOTTOM: '内部の下側',
		LABEL_POSITION_INSIDE_TOP_LEFT: '内部の左上側',
		LABEL_POSITION_INSIDE_BOTTOM_LEFT: '内部の左下側',
		LABEL_POSITION_INSIDE_TOP_RIGHT: '内部の右上側',
		LABEL_POSITION_INSIDE_BOTTOM_RIGHT: '内部の右下側',
		LABEL_POSITION_OUTSIDE: '外部',
		LABEL_POSITION_CENTER: '中央',
		DECAL: 'デカール',
		ROAM: 'ローミング',
		TREE_LAYOUT: 'レーアウト',
		TREE_LAYOUT_ORTHOGONAL: '直交',
		TREE_LAYOUT_RADIAL: 'ラジアル',
		TREE_ORIENT: '方向',
		TREE_ORIENT_LEFT_RIGHT: '左から右へ',
		TREE_ORIENT_RIGHT_LEFT: '右から左へ',
		TREE_ORIENT_TOP_BOTTOM: '上から下へ',
		TREE_ORIENT_BOTTOM_TOP: '下から上へ',
		PIE_CENTER_X: '中央X',
		PIE_CENTER_Y: '中央Y',
		PIE_INSIDE_RADIUS: '内側の半径',
		PIE_OUTSIDE_RADIUS: '外側の半径',
		PIE_ROSE_TYPE: 'ローズ',
		PIE_ROSE_TYPE_NONE: 'なし',
		PIE_ROSE_TYPE_RADIUS: '半径により',
		PIE_ROSE_TYPE_AREA: '面積により',
		PIE_SHOW_PERCENTAGE: '%表示',
		PIE_LABEL_ALIGN_TO_NONE: 'なし',
		PIE_LABEL_ALIGN_TO_LABEL_LINE: 'ラベルライン',
		PIE_LABEL_ALIGN_TO_EDGE: '縁',
		MAP_REGION: '地域',
		MAP_REGION_JAPAN_L1: '日本 (県/都/府)',
		MAP_REGION_USA_L1: '米国 (州)',
		TRUNCATION_TYPE: 'タイプ',
		TRUNCATION_NONE: 'なし',
		TRUNCATION_TOP: '最高',
		TRUNCATION_BOTTOM: '最低',
		TRUNCATION_COUNT: '数量',
		BAR_TRANSFORM_AXIS: '軸の変換',
		LINE_SMOOTH: 'スムーズ',
		TOOLBOX_ORIENT: '方向',
		TOOLBOX_ORIENT_HORIZONTAL: '水平',
		TOOLBOX_ORIENT_VERTICAL: '垂直',
		SECTION_TITLE_COUNT_CHART: '特定スタイル',
		SECTION_TITLE_BAR_CHART: 'バー/ラインスタイル',
		SECTION_TITLE_PIE_CHART: 'パイスタイル',
		SECTION_TITLE_TREE_CHART: 'ツリースタイル',
		SECTION_TITLE_TREEMAP_CHART: 'ツリーマップスタイル',
		SECTION_TITLE_MAP_CHART: '地図スタイル',
		SECTION_TITLE_ECHART_TITLE: 'タイトル',
		SECTION_TITLE_ECHART_SUBTITLE: 'サブタイトル',
		SECTION_TITLE_ECHART_LEGEND: '凡例',
		SECTION_TITLE_ECHART_GRID: 'グリッド',
		SECTION_TITLE_ECHART_SERIES_LABEL: 'レベル',
		SECTION_TITLE_ECHART_XAXIS: 'X軸',
		SECTION_TITLE_ECHART_XAXIS_RANGE: 'X軸の範囲',
		SECTION_TITLE_ECHART_XAXIS_NAME: 'X軸の名称',
		SECTION_TITLE_ECHART_XAXIS_NAME_FONT: 'X軸の名称 - フォント',
		SECTION_TITLE_ECHART_XAXIS_NAME_COLOR: 'X軸の名称 - 色を塗る',
		SECTION_TITLE_ECHART_XAXIS_NAME_BORDER: 'X軸の名称 - ボーダー',
		SECTION_TITLE_ECHART_XAXIS_NAME_GAP_AND_PADDING: 'X軸の名称 - 間隔、余白',
		SECTION_TITLE_ECHART_XAXIS_LABEL: 'X軸のレベル',
		SECTION_TITLE_ECHART_XAXIS_LABEL_FONT: 'X軸のレベル - フォント',
		SECTION_TITLE_ECHART_XAXIS_LABEL_COLOR: 'X軸のレベル - 色を塗る',
		SECTION_TITLE_ECHART_XAXIS_LABEL_BORDER: 'X軸のレベル - ボーダー',
		SECTION_TITLE_ECHART_XAXIS_LABEL_GAP_AND_PADDING: '横轴标签 - 間隔、余白',
		SECTION_TITLE_ECHART_XAXIS_LINE: 'X軸の分割線',
		SECTION_TITLE_ECHART_XAXIS_MINOR_LINE: 'X軸のマイナー分割線',
		SECTION_TITLE_ECHART_YAXIS: 'Y軸',
		SECTION_TITLE_ECHART_YAXIS_RANGE: 'Y軸の範囲',
		SECTION_TITLE_ECHART_YAXIS_NAME: 'Y軸の名称',
		SECTION_TITLE_ECHART_YAXIS_NAME_FONT: 'Y軸の名称 - フォント',
		SECTION_TITLE_ECHART_YAXIS_NAME_COLOR: 'Y軸の名称 - 色を塗る',
		SECTION_TITLE_ECHART_YAXIS_NAME_BORDER: 'Y軸の名称 - ボーダー',
		SECTION_TITLE_ECHART_YAXIS_NAME_GAP_AND_PADDING: 'Y軸の名称 - 間隔、余白',
		SECTION_TITLE_ECHART_YAXIS_LABEL: 'Y軸のレベル',
		SECTION_TITLE_ECHART_YAXIS_LABEL_FONT: 'Y軸のレベル - フォント',
		SECTION_TITLE_ECHART_YAXIS_LABEL_COLOR: 'Y軸のレベル - 色を塗る',
		SECTION_TITLE_ECHART_YAXIS_LABEL_BORDER: 'Y軸のレベル - ボーダー',
		SECTION_TITLE_ECHART_YAXIS_LABEL_GAP_AND_PADDING: 'Y軸のレベル - 間隔、余白',
		SECTION_TITLE_ECHART_YAXIS_LINE: 'Y軸の分割線',
		SECTION_TITLE_ECHART_YAXIS_MINOR_LINE: 'Y軸のマイナー分割線',
		SECTION_TITLE_ECHART_SCRIPT: 'スクリプト',
		SECTION_TITLE_ECHART_SCRIPT_VARS_DEF: '変数の定義',
		SECTION_TITLE_ECHART_SCRIPT_VARS: '変数',
		SECTION_TITLE_TRUNCATION: 'データの切り捨て',
		SECTION_TITLE_TOOLBOX: 'ツールボックス',
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
		PLEASE_SELECT_FUNNEL_VALUE: '...を選択してください',
		NO_ENUM_FUNNEL_VALUE: '選択値がありません。',
		NO_SCRIPT_VARS: '変数定義はありません。',
		ARITHMETIC_NONE: 'デフォルト',
		ARITHMETIC_SUMMARY: '合計',
		ARITHMETIC_AVERAGE: '平均値',
		ARITHMETIC_COUNT: '数量',
		ARITHMETIC_MAX: '最大値',
		ARITHMETIC_MIN: '最小値',
		TYPE: 'タイプ',
		TYPES: {
			COUNT: '数値統計グラフ',
			BAR: 'ヒストグラム',
			LINE: '折れ線グラフ',
			SCATTER: '散布図',
			PIE: '円グラフ',
			DOUGHNUT: 'ドーナツグラフ',
			NIGHTINGALE: 'ナイチンゲールグラフ',
			SUNBURST: 'サンバースト図',
			TREE: '樹形図',
			TREEMAP: 'ツリーマップ',
			MAP: 'マップ',
			CUSTOMIZED: 'カスタマイズ'
		},
		COUNT: {
			FORMAT_USING_GROUP: '小数第3位'
		},
		ECHART: {
			TEXT: 'テキスト'
		},
		DEFINITION_BROKEN: '定義はまだ完了していませんが、現時点ではグラフをレンダリングできません。'
	},
	INDICATOR: {
		MEASURE_METHOD: {
			CONTINENT: '大陸',
			REGION: '地域',
			COUNTRY: '国',
			PROVINCE: '州/省',
			CITY: '市',
			DISTRICT: '区',
			FLOOR: '階',
			RESIDENCE_TYPE: '住宅タイプ',
			RESIDENTIAL_AREA: '住宅面積',
			YEAR: '年',
			HALF_YEAR: '上半期/下半期',
			QUARTER: '四半期',
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
			AM_PM: '午前/午後',
			GENDER: '性別',
			OCCUPATION: '職業',
			AGE: '年齢',
			RELIGION: '宗教',
			NATIONALITY: '国籍',
			BIZ_TRADE: '業界',
			BIZ_SCALE: '規模',
			BOOLEAN: 'ブール値',
			ENUM: '列挙'
		},
		RELEVANT_TYPE: {
			SAME: '同じ',
			HIGH_CORRELATED: '高い関連性',
			WEAK_CORRELATED: '弱い関連性',
			THIS_CAUSES_RELEVANT: '現在の指標は、関連指標につながります',
			RELEVANT_CAUSES_THIS: '関連指標は、現在の指標につながります'
		}
	},
	SHARE: {
		NOTHING: '内容が見つかりません。詳細については、管理者にお問い合わせください。'
	},
	CALENDAR: {
		JAN: '1月',
		FEB: '2月',
		MAR: '3月',
		APR: '4月',
		MAY: '5月',
		JUN: '6月',
		JUL: '7月',
		AUG: '8月',
		SEP: '9月',
		OCT: '10月',
		NOV: '11月',
		DEC: '12月',
		WEEK: '週',
		WEEK_0: '第0週 (7日未満)',
		WEEK_1: '第1週',
		WEEK_2: '第2週',
		WEEK_3: '第3週',
		WEEK_4: '第4週',
		WEEK_5: '第5週 (7日未満)',
		HALF_YEAR_1ST: '上半期',
		HALF_YEAR_2ND: '下半期',
		QUARTER_1ST: '第1四半期',
		QUARTER_2ND: '第2四半期',
		QUARTER_3RD: '第3四半期',
		QUARTER_4TH: '第4四半期',
		HALF_MONTH_1ST: '先月の前半',
		HALF_MONTH_2ND: '後半の月',
		TEN_DAYS_1ST: '上旬',
		TEN_DAYS_2ND: '中旬',
		TEN_DAYS_3RD: '下旬',
		HALF_WEEK_1ST: '上半週',
		HALF_WEEK_2ND: '後半',
		SUNDAY: '日曜日',
		MONDAY: '月曜日',
		TUESDAY: '火曜日',
		WEDNESDAY: '水曜日',
		THURSDAY: '木曜日',
		FRIDAY: '金曜日',
		SATURDAY: '土曜日',
		WORKDAY: '平日',
		WEEKEND: '週末',
		HOLIDAY: '休日',
		WORK_TIME: '勤務時間',
		OFF_HOURS: '暇な時',
		SLEEPING_TIME: '睡眠時間',
		AM: '朝',
		PM: '午後'
	}
};