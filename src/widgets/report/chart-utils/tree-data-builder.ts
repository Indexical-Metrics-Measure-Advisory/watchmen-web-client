import {ChartDataSet, ChartDataSetRows} from '@/services/data/tuples/chart-types';
import {Report} from '@/services/data/tuples/report-types';
import {getDimensionColumnIndexOffset} from './dimension-utils';

export interface IntermediateTreeNode {
	name: string,
	children: ChartDataSetRows
}

export interface TreeNode {
	name: string;
}

export interface NonLeafTreeNode extends TreeNode {
	children: Array<TreeNode>;
}

export interface LeafTreeNode extends TreeNode {
	value: number;
}

/**
 * multiple roots are allowed, depends on data.
 * each branch has same depth.
 */
export const buildTreeData = (report: Report, dataset: ChartDataSet) => {
	const {dimensions} = report;
	const dimensionColumnIndexOffset = getDimensionColumnIndexOffset(report);
	const buildData = (dimensionIndex: number, grid: ChartDataSetRows): Array<TreeNode> => {
		const dimensionValueMap = new Map<string, number>();
		return grid.reduce<Array<IntermediateTreeNode>>((data, row) => {
			const dimensionValue = `${row[dimensionIndex + dimensionColumnIndexOffset] || ''}`;
			const dimensionValueIndex = dimensionValueMap.get(dimensionValue);
			if (dimensionValueIndex == null) {
				data.push({name: dimensionValue, children: [row]});
				dimensionValueMap.set(dimensionValue, data.length - 1);
			} else {
				data[dimensionValueIndex].children.push(row);
			}
			return data;
		}, []).map(({name, children}) => {
			if (dimensionIndex === dimensions.length - 2) {
				// non-leaf nodes done, start to process last dimension and indicator
				return {
					name,
					children: children.map(row => {
						return {
							name: `${row[dimensionIndex + 1 + dimensionColumnIndexOffset]}`,
							value: row[0]
						} as LeafTreeNode;
					})
				};
			}

			if (children.length === 1) {
				// only one data row on this name, check following dimensions.
				// ignore dimensions has no practical meaning value
				const stageNode = {name};
				let parentNode = stageNode;
				const row = children[0];
				for (let followDimensionIndex = dimensionIndex + 1, dimensionCount = dimensions.length; followDimensionIndex < dimensionCount; followDimensionIndex++) {
					const dimensionValue = row[followDimensionIndex + dimensionColumnIndexOffset];
					if (!dimensionValue) {
						// no value, ignore
						continue;
					}
					// append a new node
					const node = parentNode as NonLeafTreeNode;
					node.children = [{name: `${dimensionValue}`}];
					parentNode = node.children[0];
				}
				// must be number
				(parentNode as LeafTreeNode).value = (row[0] || 0) as number;
				return stageNode as TreeNode;
			}

			// next dimension
			return {name, children: buildData(dimensionIndex + 1, children)};
		});
	};
	return buildData(0, dataset.data);
};
