import ComboBox, {ComboBoxOption} from '@components/ComboBox';
import Control from '@components/Control';
import Flex from '@components/Flex';
import TextInput from '@components/TextInput';
import React from 'react';

import {
	GoodsColumn,
	GoodsFilterCondition,
	GoodsFilterValue,
} from '../../model/types';

interface GoodsTableFiltersProps {
	selectedColumn: GoodsColumn;
	selectedCondition: GoodsFilterCondition;
	filterValue: GoodsFilterValue;
	onFilterColumnChange: (column: GoodsColumn) => void;
	onFilterConditionChange: (condition: GoodsFilterCondition) => void;
	onFilterValueChange: (value: GoodsFilterValue) => void;
}

const columnOptions: ComboBoxOption[] = [
	{
		name: 'Date',
		key: 'date',
	},
	{
		name: 'Name',
		key: 'name',
	},
	{
		name: 'Count',
		key: 'count',
	},
	{
		name: 'Distance',
		key: 'distance',
	},
];
const conditionOptions: ComboBoxOption[] = [
	{
		name: 'Equal',
		key: 'equal',
	},
	{
		name: 'Contains',
		key: 'contains',
	},
	{
		name: 'More',
		key: 'more',
	},
	{
		name: 'Less',
		key: 'less',
	},
];

const GoodsTableFilters: React.FC<GoodsTableFiltersProps> = ({
	selectedColumn,
	selectedCondition,
	filterValue,
	onFilterColumnChange,
	onFilterValueChange,
	onFilterConditionChange,
}) => {
	return (
		<Flex container alignItems="center" gap={20}>
			<Control title="Column">
				<ComboBox
					options={columnOptions}
					value={selectedColumn}
					onChange={onFilterColumnChange}
				/>
			</Control>

			<Control title="Condition">
				<ComboBox
					options={conditionOptions}
					value={selectedCondition}
					onChange={onFilterConditionChange}
				/>
			</Control>

			<Control title="Filter">
				<TextInput
					value={String(filterValue)}
					onChange={onFilterValueChange}
					placeholder="Value"
				/>
			</Control>
		</Flex>
	);
};

export default GoodsTableFilters;
