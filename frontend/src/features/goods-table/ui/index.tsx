import './styles.scss';

import {cn} from '@bem-react/classname';
import Flex from '@components/Flex';
import Pendable from '@components/Pendable';
import Text from '@components/Text';
import React from 'react';
import Moment from 'react-moment';

import {useGoodsTable} from '../lib/useGoodsTable';
import GoodsTableFilters from './table-filters';
import GoodsTablePagination from './table-pagination';

const cnGoodsTable = cn('GoodsTable');

const GoodsTable: React.FC = () => {
	const {
		goods,
		isLoading,
		isError,
		onFilterValueChange,
		onFilterConditionChange,
		onFilterColumnChange,
		filterOptions,
		sortMethod,
		onSortChange,
		reverseSort,
		setReverseSort,
		page,
		pageSize,
		totalPages,
		totalElements,
		setPage,
		setPageSize,
	} = useGoodsTable();

	return (
		<Pendable isPending={isLoading}>
			<Flex container flexDirection="column" gap={20}>
				<GoodsTableFilters
					selectedColumn={filterOptions.column}
					selectedCondition={filterOptions.condition}
					filterValue={filterOptions.value}
					onFilterColumnChange={onFilterColumnChange}
					onFilterConditionChange={onFilterConditionChange}
					onFilterValueChange={onFilterValueChange}
					sortMethod={sortMethod}
					onSortChange={onSortChange}
					reverseSort={reverseSort}
					setReverseSort={setReverseSort}
				/>
				<div className={cnGoodsTable()}>
					<Flex
						className={[cnGoodsTable('Row'), cnGoodsTable('Header')].join(' ')}
						container
						alignItems="center"
					>
						<h4>Date</h4>
						<h4>Name</h4>
						<h4>Count</h4>
						<h4>Distance</h4>
					</Flex>
					<Flex className={cnGoodsTable('Body')}>
						{isError ? (
							<Flex
								container
								alignItems="center"
								justifyContent="center"
								height="100%"
							>
								<Text>Error</Text>
							</Flex>
						) : goods.length === 0 ? (
							<Flex
								container
								alignItems="center"
								justifyContent="center"
								height="100%"
							>
								<Text>No items</Text>
							</Flex>
						) : (
							goods.map((good) => (
								<Flex
									key={good.id}
									className={cnGoodsTable('Row')}
									container
									alignItems="center"
								>
									<div>
										<Moment date={good.date} format="MMMM DD YYYY, HH:mm" />
									</div>
									<div>{good.name}</div>
									<div>{good.count}</div>
									<div>{good.distance}</div>
								</Flex>
							))
						)}
					</Flex>
				</div>
				<GoodsTablePagination
					page={page}
					pageSize={pageSize}
					totalElements={totalElements}
					totalPages={totalPages}
					setPage={setPage}
					setPageSize={setPageSize}
				/>
			</Flex>
		</Pendable>
	);
};

export default GoodsTable;
