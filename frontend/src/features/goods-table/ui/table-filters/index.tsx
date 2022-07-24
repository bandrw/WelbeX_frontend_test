import ComboBox, {ComboBoxOption} from '@components/ComboBox';
import Control from '@components/Control';
import Flex from '@components/Flex';
import TextInput from '@components/TextInput';
import ToggleButton from '@components/ToggleButton';
import React from 'react';

import {
	GoodsColumn,
	GoodsFilterCondition,
	GoodsFilterValue,
	GoodsSortMethod,
} from '../../model/types';

interface GoodsTableFiltersProps {
	selectedColumn: GoodsColumn;
	selectedCondition: GoodsFilterCondition;
	filterValue: GoodsFilterValue;
	onFilterColumnChange: (column: GoodsColumn) => void;
	onFilterConditionChange: (condition: GoodsFilterCondition) => void;
	onFilterValueChange: (value: GoodsFilterValue) => void;
	sortMethod: GoodsSortMethod;
	onSortChange: (method: GoodsSortMethod) => void;
	reverseSort: boolean;
	setReverseSort: (value: boolean) => void;
}

const columnOptions: ComboBoxOption[] = [
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
const sortMethodOptions: ComboBoxOption[] = [
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

const GoodsTableFilters: React.FC<GoodsTableFiltersProps> = ({
	selectedColumn,
	selectedCondition,
	filterValue,
	onFilterColumnChange,
	onFilterValueChange,
	onFilterConditionChange,
	sortMethod,
	onSortChange,
	reverseSort,
	setReverseSort,
}) => {
	return (
		<Flex container alignItems="center" gap={20}>
			<Control title="Column">
				<ComboBox
					showNullOption
					options={columnOptions}
					value={selectedColumn}
					onChange={onFilterColumnChange}
				/>
			</Control>

			<Control title="Condition">
				<ComboBox
					showNullOption
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

			<Control title="Sort by">
				<Flex container>
					<ComboBox
						showNullOption
						options={sortMethodOptions}
						value={sortMethod}
						onChange={onSortChange}
						pin="left"
					/>
					<ToggleButton
						pin="right"
						onClick={() => setReverseSort(!reverseSort)}
						toggled={reverseSort}
					>
						Reverse
					</ToggleButton>
				</Flex>
			</Control>
		</Flex>
	);
};

export default GoodsTableFilters;
