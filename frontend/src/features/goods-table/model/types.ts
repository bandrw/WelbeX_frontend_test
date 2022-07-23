export type GoodsColumn = 'name' | 'count' | 'distance' | null;

export type GoodsFilterCondition =
	| 'equal'
	| 'contains'
	| 'less'
	| 'more'
	| null;

export type GoodsFilterValue = string | number;

export interface GoodsTableFilter {
	column: GoodsColumn;
	condition: GoodsFilterCondition;
	value: GoodsFilterValue;
}

export type GoodsSortMethod = 'name' | 'count' | 'distance' | null;
