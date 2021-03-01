import { nSQL } from '@nano-sql/core';
import { TablePipeline } from './tables/pipeline';

nSQL().createDatabase({
	id: 'my_db', // can be anything that's a string
	mode: 'IDB', // save changes to IndexedDB, WebSQL or SnapDB!
	tables: [ // tables can be created as part of createDatabase or created later with create table queries
		TablePipeline
	],
	version: 1, // current schema/database version
	onVersionUpdate: (prevVersion) => { // migrate versions
		return new Promise((res) => {
			switch (prevVersion) {
				case 1:
					// migrate v1 to v2
					res(2);
					break;
				case 2:
					// migrate v2 to v3
					res(3);
					break;
			}

		});

	}
}).then(() => {
	// ready to query!
}).catch(() => {
	// ran into a problem
});