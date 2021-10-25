import {Topic} from '@/services/data/tuples/topic-types';
import {AlertLabel} from '@/widgets/alert/widgets';
import {Button} from '@/widgets/basic/button';
import {CheckBox} from '@/widgets/basic/checkbox';
import {Input} from '@/widgets/basic/input';
import {ButtonInk} from '@/widgets/basic/types';
import {downloadAsZip, ZipFiles} from '@/widgets/basic/utils';
import {DialogBody, DialogFooter} from '@/widgets/dialog/widgets';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import dayjs from 'dayjs';
import React, {ChangeEvent, useState} from 'react';
import styled from 'styled-components';
import {generateLiquibaseScripts} from './script-generation/liquibase';
import {generateMySQLAlterSQLScripts} from './script-generation/mysql-sql-alteration';
import {generateMySQLCreateSQLScripts} from './script-generation/mysql-sql-creation';
import {generateOracleAlterSQLScripts} from './script-generation/oracle-sql-alteration';
import {generateOracleCreateSQLScripts} from './script-generation/oracle-sql-creation';

interface Filter {
	value: string;
	handler?: number;
}

const SwitchDialogBody = styled(DialogBody)`
	display               : grid;
	grid-template-columns : 1fr;
	grid-template-rows    : auto auto 1fr auto auto auto;
	margin-bottom         : var(--margin);
`;
const TopicTableHeader = styled.div`
	display               : grid;
	position              : relative;
	grid-template-columns : 40px 60px 1fr;
`;
const HeaderCell = styled.div`
	display      : flex;
	align-items  : center;
	height       : var(--height);
	font-weight  : var(--font-bold);
	font-variant : petite-caps;
	padding      : 0 calc(var(--margin) / 4);
	> input {
		border-top    : 0;
		border-left   : 0;
		border-right  : 0;
		border-radius : 0;
		height        : calc(var(--height) * 0.8);
		width         : 100%;
		padding       : 0;
		margin-bottom : -1px;
		margin-left   : calc(var(--margin) / 2);
	}
`;
const TopicTableBody = styled.div.attrs({'data-v-scroll': ''})`
	display    : block;
	position   : relative;
	overflow-y : auto;
`;
const BodyRow = styled.div`
	display               : grid;
	position              : relative;
	grid-template-columns : 40px 60px 1fr;
	&:nth-child(2n) {
		background-color : var(--grid-rib-bg-color);
	}
	&:hover {
		background-color : var(--hover-color);
	}
`;
const BodyCell = styled.div`
	display     : flex;
	align-items : center;
	height      : var(--height);
	padding     : 0 calc(var(--margin) / 4);
`;
const DownloadOptionsBar = styled.div`
	display        : flex;
	flex-direction : column;
`;
const DatabaseBar = styled.div`
	display               : grid;
	grid-template-columns : 120px auto auto auto auto 1fr;
	align-items           : center;
	height                : calc(var(--height) * 1.5);
`;
const ScriptTypeBar = styled.div`
	display               : grid;
	grid-template-columns : 120px auto auto auto auto 1fr;
	align-items           : center;
	height                : calc(var(--height) * 1.5);
`;
const ScriptFormatBar = styled.div`
	display               : grid;
	grid-template-columns : 120px auto auto auto auto 1fr;
	align-items           : center;
	height                : calc(var(--height) * 1.5);
`;
const DownloadOptionLeadLabel = styled.div`
	display      : flex;
	align-items  : center;
	height       : var(--height);
	font-variant : petite-caps;
	font-weight  : var(--font-bold);
`;
const DownloadOptionLabel = styled.div`
	display     : flex;
	align-items : center;
	height      : var(--height);
	margin      : 0 calc(var(--margin) / 2);
`;

enum Database {
	ORACLE = 'oracle',
	MYSQL = 'mysql'
}

enum ScriptType {
	CREATE = 'create',
	ALTER = 'alter'
}

enum ScriptFormat {
	SQL = 'sql',
	LIQUIBASE = 'liquibase'
}

export const ScriptsDownloadDialog = (props: {
	topics: Array<Topic>;
}) => {
	const {topics} = props;

	const {fire} = useEventBus();
	const [items, setItems] = useState(topics);
	const [selection, setSelection] = useState(topics);
	const [filter, setFilter] = useState<Filter>({value: ''});
	const [databases, setDatabases] = useState<Array<Database>>([Database.MYSQL, Database.ORACLE]);
	const [scriptTypes, setScriptTypes] = useState<Array<ScriptType>>([ScriptType.CREATE, ScriptType.ALTER]);
	const [scriptFormats, setScriptFormats] = useState<Array<ScriptFormat>>([ScriptFormat.SQL, ScriptFormat.LIQUIBASE]);

	const onFilterTextChanged = (event: ChangeEvent<HTMLInputElement>) => {
		const {value} = event.target;
		if (filter.handler) {
			window.clearTimeout(filter.handler);
		}
		setFilter({
			value, handler: window.setTimeout(() => {
				delete filter.handler;
				const text = value.trim().toLowerCase();
				if (text === '') {
					setItems(topics);
				} else {
					setItems(topics.filter(topic => (topic.name || '').toLowerCase().includes(text)));
				}
			}, 300)
		});
	};
	const onSelectionChange = (topic: Topic) => (value: boolean) => {
		if (value) {
			setSelection([topic, ...selection]);
		} else {
			setSelection(selection.filter(t => t !== topic));
		}
	};
	const onDatabaseChanged = (database: Database) => (value: boolean) => {
		if (value) {
			setDatabases([database, ...databases]);
		} else {
			setDatabases(databases.filter(d => d !== database));
		}
	};
	const onScriptTypeChanged = (scriptType: ScriptType) => (value: boolean) => {
		if (value) {
			setScriptTypes([scriptType, ...scriptTypes]);
		} else {
			setScriptTypes(scriptTypes.filter(st => st !== scriptType));
		}
	};
	const onScriptFormatChanged = (scriptFormat: ScriptFormat) => (value: boolean) => {
		if (value) {
			setScriptFormats([scriptFormat, ...scriptFormats]);
		} else {
			setScriptFormats(scriptFormats.filter(sf => sf !== scriptFormat));
		}
	};
	const onSelectAllClicked = () => {
		setSelection(topics);
	};
	const onDeselectAllClicked = () => {
		setSelection([]);
	};
	const onDownloadClicked = async () => {
		if (databases.length === 0) {
			fire(EventTypes.SHOW_ALERT, <AlertLabel>
				Please select at least one database.
			</AlertLabel>);
			return;
		}
		if (scriptTypes.length === 0) {
			fire(EventTypes.SHOW_ALERT, <AlertLabel>
				Please select at least one script type.
			</AlertLabel>);
			return;
		}
		if (scriptFormats.length === 0) {
			fire(EventTypes.SHOW_ALERT, <AlertLabel>
				Please select at least one script format.
			</AlertLabel>);
			return;
		}

		const zip: ZipFiles = {};
		if (databases.includes(Database.MYSQL) && scriptTypes.includes(ScriptType.CREATE) && scriptFormats.includes(ScriptFormat.SQL)) {
			generateMySQLCreateSQLScripts(zip, selection);
		}
		if (databases.includes(Database.ORACLE) && scriptTypes.includes(ScriptType.CREATE) && scriptFormats.includes(ScriptFormat.SQL)) {
			generateOracleCreateSQLScripts(zip, selection);
		}
		if (databases.includes(Database.MYSQL) && scriptTypes.includes(ScriptType.ALTER) && scriptFormats.includes(ScriptFormat.SQL)) {
			generateMySQLAlterSQLScripts(zip, selection);
		}
		if (databases.includes(Database.ORACLE) && scriptTypes.includes(ScriptType.ALTER) && scriptFormats.includes(ScriptFormat.SQL)) {
			generateOracleAlterSQLScripts(zip, selection);
		}
		if (scriptFormats.includes(ScriptFormat.LIQUIBASE)) {
			generateLiquibaseScripts(zip, selection);
		}

		await downloadAsZip(zip, `scripts-${dayjs().format('YYYYMMDDHHmmss')}.zip`);
	};
	const onCloseClicked = () => {
		fire(EventTypes.HIDE_DIALOG);
	};

	return <>
		<SwitchDialogBody>
			<DownloadOptionLeadLabel>Please select topics</DownloadOptionLeadLabel>
			<TopicTableHeader>
				<HeaderCell>#</HeaderCell>
				<HeaderCell>View</HeaderCell>
				<HeaderCell>
					<span>Topic</span>
					<Input placeholder="Filter by name..."
					       value={filter.value} onChange={onFilterTextChanged}/>
				</HeaderCell>
			</TopicTableHeader>
			<TopicTableBody>
				{items.map((topic, index) => {
					return <BodyRow key={topic.topicId}>
						<BodyCell>{index + 1}</BodyCell>
						<BodyCell>
							<CheckBox value={selection.includes(topic)} onChange={onSelectionChange(topic)}/>
						</BodyCell>
						<BodyCell>{topic.name || 'Noname Topic'}</BodyCell>
					</BodyRow>;
				})}
			</TopicTableBody>
			<DownloadOptionsBar>
				<DatabaseBar>
					<DownloadOptionLeadLabel>Database</DownloadOptionLeadLabel>
					<CheckBox value={databases.includes(Database.ORACLE)}
					          onChange={onDatabaseChanged(Database.ORACLE)}/>
					<DownloadOptionLabel>Oracle</DownloadOptionLabel>
					<CheckBox value={databases.includes(Database.MYSQL)} onChange={onDatabaseChanged(Database.MYSQL)}/>
					<DownloadOptionLabel>MySQL</DownloadOptionLabel>
				</DatabaseBar>
				<ScriptTypeBar>
					<DownloadOptionLeadLabel>Script Type</DownloadOptionLeadLabel>
					<CheckBox value={scriptTypes.includes(ScriptType.CREATE)}
					          onChange={onScriptTypeChanged(ScriptType.CREATE)}/>
					<DownloadOptionLabel>Create</DownloadOptionLabel>
					<CheckBox value={scriptTypes.includes(ScriptType.ALTER)}
					          onChange={onScriptTypeChanged(ScriptType.ALTER)}/>
					<DownloadOptionLabel>Alter</DownloadOptionLabel>
				</ScriptTypeBar>
				<ScriptFormatBar>
					<DownloadOptionLeadLabel>Script Format</DownloadOptionLeadLabel>
					<CheckBox value={scriptFormats.includes(ScriptFormat.SQL)}
					          onChange={onScriptFormatChanged(ScriptFormat.SQL)}/>
					<DownloadOptionLabel>SQL</DownloadOptionLabel>
					<CheckBox value={scriptFormats.includes(ScriptFormat.LIQUIBASE)}
					          onChange={onScriptFormatChanged(ScriptFormat.LIQUIBASE)}/>
					<DownloadOptionLabel>Liquibase</DownloadOptionLabel>
				</ScriptFormatBar>
			</DownloadOptionsBar>
		</SwitchDialogBody>
		<DialogFooter>
			<Button ink={ButtonInk.PRIMARY} onClick={onSelectAllClicked}>Select All</Button>
			<Button ink={ButtonInk.PRIMARY} onClick={onDeselectAllClicked}>Deselect All</Button>
			<Button ink={ButtonInk.PRIMARY} onClick={onDownloadClicked}>Download</Button>
			<Button ink={ButtonInk.WAIVE} onClick={onCloseClicked}>Close</Button>
		</DialogFooter>
	</>;
};
