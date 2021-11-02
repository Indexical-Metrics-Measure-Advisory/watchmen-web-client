import {IndicatorSearchBar} from './indicator-search-bar';
import {IndicatorsContainer, IndicatorsHeaderContainer} from './widgets';

export const Indicators = () => {
	// const [initialized] = useState(false);

	return <IndicatorsContainer>
		<IndicatorsHeaderContainer>
			<IndicatorSearchBar/>
		</IndicatorsHeaderContainer>
	</IndicatorsContainer>;
};