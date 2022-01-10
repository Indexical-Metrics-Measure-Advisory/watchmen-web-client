import {fetchTopicProfileData} from '@/services/data/data-quality/topic-profile';
import {
	TopicProfileData,
	TopicProfileFactor,
	TopicProfileFactorType
} from '@/services/data/data-quality/topic-profile-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {AlertLabel} from '@/widgets/alert/widgets';
import {Button} from '@/widgets/basic/button';
import {ButtonInk} from '@/widgets/basic/types';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import dayjs, {Dayjs} from 'dayjs';
import {useEffect, useState} from 'react';
import {useTopicProfileEventBus} from './topic-profile-event-bus';
import {TopicProfileEventTypes} from './topic-profile-event-bus-types';
import {
	Block,
	BlockItem,
	BlockItemLabel,
	BlockItemValue,
	BlockTitle,
	BlockTitleBadge,
	FactorBlock,
	FactorBlockColumn,
	FactorBlockName,
	FactorBlockType,
	FactorBlockValueSampleColumn,
	TopicProfileDialog,
	TopicProfileDialogBody,
	TopicProfileDialogFooter,
	TopicProfileDialogHeader,
	TopicProfileDialogWrapper,
	ValuePercentage,
	WarningBadge
} from './widgets';

interface Data {
	topic: Topic;
	date: Dayjs;
	data?: TopicProfileData;
}

const getTopicName = (topic: Topic): string => {
	return (topic.name || 'Noname Topic') + ` #${topic.topicId}`;
};

export const TopicProfile = () => {
	const {fire: fireGlobal} = useEventBus();
	const {on, off} = useTopicProfileEventBus();
	const [destroyed, setDestroyed] = useState(true);
	const [visible, setVisible] = useState(false);
	const [data, setData] = useState<Data | null>(null);

	useEffect(() => {
		const onShowProfile = (topic: Topic, date?: Dayjs) => {
			const profileDate = date ?? dayjs();
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await fetchTopicProfileData({topicId: topic.topicId, date: profileDate}),
				(data?: TopicProfileData) => {
					if (data == null) {
						fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>
							No profile data of given topic.
						</AlertLabel>);
					} else {
						setData({topic, date: profileDate, data});
						setVisible(true);
						setDestroyed(false);
					}
				});
		};
		on(TopicProfileEventTypes.SHOW_PROFILE, onShowProfile);
		return () => {
			off(TopicProfileEventTypes.SHOW_PROFILE, onShowProfile);
		};
	}, [on, off, fireGlobal]);

	if (destroyed || data == null) {
		return null;
	}

	const onAnimationEnd = () => {
		if (!visible) {
			setDestroyed(true);
		}
	};
	const onCloseClicked = () => {
		setVisible(false);
	};

	const parseWarning = (warning: string) => {
		const [type, , , , name] = warning.split(' ');
		return {type: type.replace('[', '').replace(']', ''), name};
	};

	const formatter = new Intl.NumberFormat(undefined, {useGrouping: true});
	const factors: Array<TopicProfileFactor & { name: string }> = Object.keys(data.data?.variables || {}).map(name => {
		return {...data.data?.variables[name] as TopicProfileFactor, name};
	}).sort((f1, f2) => f1.name.toLowerCase().localeCompare(f2.name.toLowerCase()));
	const factorTypes = [TopicProfileFactorType.CATEGORICAL, TopicProfileFactorType.NUMERIC, TopicProfileFactorType.DATETIME, TopicProfileFactorType.UNSUPPORTED];
	const warnings = (data.data?.messages || []).map(message => parseWarning(message))
		.filter(warning => !['ZEROS', 'REJECTED'].includes(warning.type))
		.reduce((array, warning) => {
			let found = array.find(x => x.name === warning.name);
			if (found) {
				found.types.push(warning.type);
			} else {
				found = {name: warning.name, types: [warning.type]};
				array.push(found);
			}

			return array;
		}, [] as Array<{ name: string, types: Array<string> }>)
		.map(x => {
			x.types = [...new Set(x.types)].sort((t1, t2) => t1.localeCompare(t2));
			return x;
		})
		.sort((w1, w2) => w1.name.toLowerCase().localeCompare(w2.name.toLowerCase()));

	return <TopicProfileDialog visible={visible} onAnimationEnd={onAnimationEnd}>
		<TopicProfileDialogWrapper>
			<TopicProfileDialogHeader>Profile Overview of Topic {getTopicName(data.topic)}</TopicProfileDialogHeader>
			<TopicProfileDialogBody>
				<Block>
					<BlockTitle>Statistics</BlockTitle>
					<BlockItem>
						<BlockItemLabel>Number of factors</BlockItemLabel>
						<BlockItemValue>{formatter.format(data.data?.table.n_var || 0)}</BlockItemValue>
					</BlockItem>
					<BlockItem>
						<BlockItemLabel>Number of observations</BlockItemLabel>
						<BlockItemValue>{formatter.format(data.data?.table.n || 0)}</BlockItemValue>
					</BlockItem>
					<BlockItem>
						<BlockItemLabel>Missing cells</BlockItemLabel>
						<BlockItemValue>{formatter.format(data.data?.table.n_cells_missing || 0)}</BlockItemValue>
					</BlockItem>
					<BlockItem>
						<BlockItemLabel>Missing cells (%)</BlockItemLabel>
						<BlockItemValue>{formatter.format((data.data?.table.p_cells_missing || 0) * 100)}%</BlockItemValue>
					</BlockItem>
					<BlockItem>
						<BlockItemLabel>Total size</BlockItemLabel>
						<BlockItemValue>{formatter.format((data.data?.table.memory_size || 0) / 1024)} KiB</BlockItemValue>
					</BlockItem>
					<BlockItem>
						<BlockItemLabel>Average record size</BlockItemLabel>
						<BlockItemValue>{formatter.format((data.data?.table.record_size || 0))} B</BlockItemValue>
					</BlockItem>
				</Block>
				<Block>
					<BlockTitle>Factor Types</BlockTitle>
					{factorTypes.map((type: TopicProfileFactorType) => {
						return <BlockItem key={type}>
							<BlockItemLabel>{type}</BlockItemLabel>
							<BlockItemValue>{formatter.format(factors.filter(factor => factor.type === type).length)}</BlockItemValue>
						</BlockItem>;
					})}
				</Block>
				<Block column={2}>
					<BlockTitle>
						<span>Warnings</span>
						{warnings.length > 0
							? <BlockTitleBadge>{data.data?.messages.length}</BlockTitleBadge>
							: null}
					</BlockTitle>
					{warnings.length > 0
						? warnings.map(({name, types}) => {
							return <BlockItem key={name}>
								<BlockItemLabel>{name}</BlockItemLabel>
								<BlockItemValue>
									{types.map(type => <WarningBadge data-type={type} key={type}/>)}
								</BlockItemValue>
							</BlockItem>;
						})
						: <BlockItem>
							<BlockItemLabel>No warning found.</BlockItemLabel>
						</BlockItem>
					}
				</Block>
				<Block column={2}>
					<BlockTitle>Factors</BlockTitle>
					{factors.map(factor => {
						const warning = warnings.find(warning => warning.name === factor.name);

						const distinctPercentage = (factor.p_distinct || 0) * 100;
						const dangerDistinct = distinctPercentage >= 90;
						const missingPercentage = (factor.p_missing || 0) * 100;
						const dangerMissing = missingPercentage >= 90;

						const valueCount = factor.count;
						const outstandingValues = Object.keys(factor.value_counts_without_nan).map(value => {
							return {value, count: factor.value_counts_without_nan[value]};
						}).sort((x1, x2) => {
							if (x1.count > x2.count) {
								return -1;
							} else if (x1.count < x2.count) {
								return 1;
							} else {
								return x1.value.localeCompare(x2.value);
							}
						}).slice(0, 4);
						const otherValueCount = outstandingValues.reduce((count, value) => {
							return count - value.count;
						}, valueCount);

						return <FactorBlock key={factor.name}>
							<FactorBlockColumn>
								<FactorBlockName>{factor.name}</FactorBlockName>
								<FactorBlockType>{factor.type}</FactorBlockType>
								{warning != null
									? warning.types.map(type => <WarningBadge data-type={type} key={type}/>)
									: null}
							</FactorBlockColumn>
							<FactorBlockColumn>
								<BlockItem>
									<BlockItemLabel data-danger={dangerDistinct}>Distinct</BlockItemLabel>
									<BlockItemValue data-danger={dangerDistinct}>
										{formatter.format(factor.n_distinct || 0)}
									</BlockItemValue>
								</BlockItem>
								<BlockItem>
									<BlockItemLabel data-danger={dangerDistinct}>Distinct (%)</BlockItemLabel>
									<BlockItemValue data-danger={dangerDistinct}>
										{formatter.format(distinctPercentage)}%
									</BlockItemValue>
								</BlockItem>
								<BlockItem>
									<BlockItemLabel data-danger={dangerMissing}>Missing</BlockItemLabel>
									<BlockItemValue data-danger={dangerMissing}>
										{formatter.format(factor.n_missing || 0)}
									</BlockItemValue>
								</BlockItem>
								<BlockItem>
									<BlockItemLabel data-danger={dangerMissing}>Missing (%)</BlockItemLabel>
									<BlockItemValue data-danger={dangerMissing}>
										{formatter.format(missingPercentage)}%
									</BlockItemValue>
								</BlockItem>
								<BlockItem>
									<BlockItemLabel>Memory size</BlockItemLabel>
									<BlockItemValue>{formatter.format((factor.memory_size || 0) / 1024)} KiB</BlockItemValue>
								</BlockItem>
							</FactorBlockColumn>
							<FactorBlockValueSampleColumn>
								{outstandingValues.map(({value, count}) => {
									return <BlockItem key={value}>
										<BlockItemLabel>{value}</BlockItemLabel>
										<BlockItemValue>
											<ValuePercentage valueCount={formatter.format(count)}
											                 percentage={count / valueCount}/>
										</BlockItemValue>
									</BlockItem>;
								})}
								{otherValueCount !== 0
									? <BlockItem>
										<BlockItemLabel>Other Values</BlockItemLabel>
										<BlockItemValue>
											<ValuePercentage valueCount={formatter.format(otherValueCount)}
											                 percentage={otherValueCount / valueCount}/>
										</BlockItemValue>
									</BlockItem>
									: null}
							</FactorBlockValueSampleColumn>
						</FactorBlock>;
					})}
				</Block>
			</TopicProfileDialogBody>
			<TopicProfileDialogFooter>
				<Button ink={ButtonInk.PRIMARY} onClick={onCloseClicked}>Close</Button>
			</TopicProfileDialogFooter>
		</TopicProfileDialogWrapper>
	</TopicProfileDialog>;
};
