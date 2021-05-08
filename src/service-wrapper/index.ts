import {nSQL} from '@nano-sql/core';
import {TableDashboard} from './tables/table-dashboard';
import {TablePipeline} from './tables/table-pipeline';
import {TableSubject} from './tables/table-subject';
import {TableTopic} from './tables/table-topic';

nSQL().createDatabase({
	id: 'my_db', // can be anything that's a string
	mode: 'IDB', // save changes to IndexedDB
	tables: [ // tables can be created as part of createDatabase or created later with create table queries
		TablePipeline,
		TableDashboard,
		TableTopic,
		TableSubject
	],
	version: 1, // current schema/database version
	onVersionUpdate: (prevVersion) => { // migrate versions
		return new Promise((resolve) => {
			switch (prevVersion) {
				case 1:
					// migrate v1 to v2
					resolve(2);
					break;
				case 2:
					// migrate v2 to v3
					resolve(3);
					break;
			}
		});
	}
}).then(() => {
	// ready to query!
}).catch(() => {
	// ran into a problem
});