import { diff, formatters } from 'jsondiffpatch';
import 'jsondiffpatch/dist/formatters-styles/html.css';
import { useState } from 'react';
import { Toggle } from '../../../basic-widgets/toggle';
import { MonitorLogRow } from '../../../services/admin/logs';
import { Pipeline } from '../../../services/tuples/pipeline-types';
import { Diff, ShowUnchanged, TriggerDataContainer, TriggerType } from './widgets';

export const TriggerData = (props: {
	row: MonitorLogRow;
	pipeline: Pipeline;
}) => {
	const { row, pipeline } = props;

	const [ showUnchanged, setShowUnchanged ] = useState(false);

	const onUnchangedChanged = (value: boolean) => setShowUnchanged(value);

	const { oldValue = oldOne, newValue = newOne } = row;
	const delta = diff(oldValue, newValue);
	formatters.html.showUnchanged(showUnchanged);
	const changes = formatters.html.format(delta!, oldValue);

	return <TriggerDataContainer>
		<TriggerType>
			Trigger by <span>{pipeline.type}</span>
		</TriggerType>
		<ShowUnchanged>
			<Toggle value={showUnchanged} onChange={onUnchangedChanged}/>
			<span>Show Unchanged Content</span>
		</ShowUnchanged>
		<Diff dangerouslySetInnerHTML={{ __html: changes }}/>
	</TriggerDataContainer>;
};

const oldOne = {
	'name': 'South America',
	'summary': 'South America (Spanish: América del Sur, Sudamérica or  \nSuramérica; Portuguese: América do Sul; Quechua and Aymara:  \nUrin Awya Yala; Guarani: Ñembyamérika; Dutch: Zuid-Amerika;  \nFrench: Amérique du Sud) is a continent situated in the  \nWestern Hemisphere, mostly in the Southern Hemisphere, with  \na relatively small portion in the Northern Hemisphere.  \nThe continent is also considered a subcontinent of the  \nAmericas.[2][3] It is bordered on the west by the Pacific  \nOcean and on the north and east by the Atlantic Ocean;  \nNorth America and the Caribbean Sea lie to the northwest.  \nIt includes twelve countries: Argentina, Bolivia, Brazil,  \nChile, Colombia, Ecuador, Guyana, Paraguay, Peru, Suriname,  \nUruguay, and Venezuela. The South American nations that  \nborder the Caribbean Sea—including Colombia, Venezuela,  \nGuyana, Suriname, as well as French Guiana, which is an  \noverseas region of France—are also known as Caribbean South  \nAmerica. South America has an area of 17,840,000 square  \nkilometers (6,890,000 sq mi). Its population as of 2005  \nhas been estimated at more than 371,090,000. South America  \nranks fourth in area (after Asia, Africa, and North America)  \nand fifth in population (after Asia, Africa, Europe, and  \nNorth America). The word America was coined in 1507 by  \ncartographers Martin Waldseemüller and Matthias Ringmann,  \nafter Amerigo Vespucci, who was the first European to  \nsuggest that the lands newly discovered by Europeans were  \nnot India, but a New World unknown to Europeans.',
	'surface': 17840000,
	'timezone': [
		-4,
		-2
	],
	'demographics': {
		'population': 385742554,
		'largestCities': [
			'São Paulo',
			'Buenos Aires',
			'Rio de Janeiro',
			'Lima',
			'Bogotá'
		]
	},
	'languages': [
		'spanish',
		'portuguese',
		'english',
		'dutch',
		'french',
		'quechua',
		'guaraní',
		'aimara',
		'mapudungun'
	],
	'countries': [
		{
			'name': 'Argentina',
			'capital': 'Buenos Aires',
			'independence': '1816-07-08T15:54:17.000Z',
			'unasur': true
		},
		{
			'name': 'Bolivia',
			'capital': 'La Paz',
			'independence': '1825-08-05T15:54:17.000Z',
			'unasur': true
		},
		{
			'name': 'Brazil',
			'capital': 'Brasilia',
			'independence': '1822-09-06T15:54:17.000Z',
			'unasur': true
		},
		{
			'name': 'Chile',
			'capital': 'Santiago',
			'independence': '1818-02-11T15:54:17.000Z',
			'unasur': true
		},
		{
			'name': 'Colombia',
			'capital': 'Bogotá',
			'independence': '1810-07-19T15:54:17.000Z',
			'unasur': true
		},
		{
			'name': 'Ecuador',
			'capital': 'Quito',
			'independence': '1809-08-09T15:54:17.000Z',
			'unasur': true
		},
		{
			'name': 'Guyana',
			'capital': 'Georgetown',
			'independence': '1966-05-25T16:00:00.000Z',
			'unasur': true
		},
		{
			'name': 'Paraguay',
			'capital': 'Asunción',
			'independence': '1811-05-13T15:54:17.000Z',
			'unasur': true
		},
		{
			'name': 'Peru',
			'capital': 'Lima',
			'independence': '1821-07-27T15:54:17.000Z',
			'unasur': true
		},
		{
			'name': 'Suriname',
			'capital': 'Paramaribo',
			'independence': '1975-11-24T16:00:00.000Z',
			'unasur': true
		},
		{
			'name': 'Uruguay',
			'capital': 'Montevideo',
			'independence': '1825-08-24T15:54:17.000Z',
			'unasur': true
		},
		{
			'name': 'Venezuela',
			'capital': 'Caracas',
			'independence': '1811-07-04T15:54:17.000Z',
			'unasur': true
		}
	]
};
const newOne = {
	'name': 'South America',
	'summary': 'South America (Spanish: América del Sur, Sudamérica or  \nSuramérica; Portuguese: América do Sul; Quechua and Aymara:  \nUrin Awya Yala; Guarani: Ñembyamérika; Dutch: Zuid-Amerika;  \nFrench: Amérique du Sud) is a continent situated in the  \nWestern Hemisphere, mostly in the Southern Hemisphere, with  \na relatively small portion in the Northern Hemisphere.  \nThe continent is also considered a subcontinent of the  \nAmericas.[2][3] It is bordered on the west by the Pacific  \nOcean and on the north and east by the Atlantic Ocean;  \nNorth America and the Caribbean Sea lie to the northwest.  \nIt includes twelve countries: Argentina, Bolivia, Brasil,  \nChile, Colombia, Ecuador, Guyana, Paraguay, Peru, Suriname,  \nUruguay, and Venezuela. The South American nations that  \nborder the Caribbean Sea—including Colombia, Venezuela,  \nGuyana, Suriname, as well as French Guiana, which is an  \noverseas region of France—are a.k.a. Caribbean South  \nAmerica. South America has an area of 17,840,000 square  \nkilometers (6,890,000 sq mi). Its population as of 2005  \nhas been estimated at more than 371,090,000. South America  \nranks fourth in area (after Asia, Africa, and North America)  \nand fifth in population (after Asia, Africa, Europe, and  \nNorth America). The word America was coined in 1507 by  \ncartographers Martin Waldseemüller and Matthias Ringmann,  \nafter Amerigo Vespucci, who was the first European to  \nsuggest that the lands newly discovered by Europeans were  \nnot India, but a New World unknown to Europeans.',
	'timezone': [
		-4,
		-2
	],
	'demographics': {
		'population': 385744896,
		'largestCities': [
			'São Paulo',
			'Buenos Aires',
			'Rio de Janeiro',
			'Lima',
			'Bogotá'
		]
	},
	'languages': [
		'spanish',
		'portuguese',
		'inglés',
		'dutch',
		'french',
		'quechua',
		'guaraní',
		'aimara',
		'mapudungun'
	],
	'countries': [
		{
			'name': 'Argentina',
			'capital': 'Rawson',
			'independence': '1816-07-08T15:54:17.000Z',
			'unasur': true
		},
		{
			'name': 'Bolivia',
			'capital': 'La Paz',
			'independence': '1825-08-05T15:54:17.000Z',
			'unasur': true
		},
		{
			'name': 'Peru',
			'capital': 'Lima',
			'independence': '1821-07-27T15:54:17.000Z',
			'unasur': true
		},
		{
			'name': 'Brazil',
			'capital': 'Brasilia',
			'independence': '1822-09-06T15:54:17.000Z',
			'unasur': true
		},
		{
			'name': 'Chile',
			'capital': 'Santiago',
			'independence': '1818-02-11T15:54:17.000Z',
			'unasur': true
		},
		{
			'name': 'Ecuador',
			'capital': 'Quito',
			'independence': '1809-08-09T15:54:17.000Z',
			'unasur': true
		},
		{
			'name': 'Guyana',
			'capital': 'Georgetown',
			'independence': '1966-05-25T16:00:00.000Z',
			'unasur': true
		},
		{
			'name': 'Paraguay',
			'capital': 'Asunción',
			'independence': '1811-05-13T15:54:17.000Z',
			'unasur': true
		},
		{
			'name': 'Suriname',
			'capital': 'Paramaribo',
			'independence': '1975-11-24T16:00:00.000Z',
			'unasur': true
		},
		{
			'name': 'Antártida',
			'unasur': false
		},
		{
			'name': 'Colombia',
			'capital': 'Bogotá',
			'independence': '1810-07-19T15:54:17.000Z',
			'unasur': true,
			'population': 42888594
		}
	],
	'spanishName': 'Sudamérica'
};