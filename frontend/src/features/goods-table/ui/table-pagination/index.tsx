import './styles.scss';

import {cn} from '@bem-react/classname';
import Button from '@components/Button';
import ComboBox, {ComboBoxOption} from '@components/ComboBox';
import Control from '@components/Control';
import Flex from '@components/Flex';
import {faCaretLeft, faCaretRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useMemo} from 'react';

interface GoodsTablePaginationProps {
	page: number;
	pageSize: number;
	totalPages: number;
	totalElements: number;
	setPage: (page: number) => void;
	setPageSize: (pageSize: number) => void;
}

const pageSizeOptions: ComboBoxOption[] = [
	{
		name: '10',
		key: '10',
	},
	{
		name: '20',
		key: '20',
	},
	{
		name: '50',
		key: '50',
	},
	{
		name: '100',
		key: '100',
	},
];

const cnGoodsTablePagination = cn('GoodsTablePagination');

const GoodsTablePagination: React.FC<GoodsTablePaginationProps> = ({
	page,
	pageSize,
	totalPages,
	totalElements,
	setPage,
	setPageSize,
}) => {
	const pagesOptions = useMemo<ComboBoxOption[]>(() => {
		return new Array(totalPages).fill(0).map((_, i) => ({
			key: String(i + 1),
			name: `${i * pageSize + 1} - ${Math.min(
				(i + 1) * pageSize,
				totalElements
			)}`,
		}));
	}, [pageSize, totalElements, totalPages]);

	return (
		<Flex
			className={cnGoodsTablePagination()}
			container
			justifyContent="center"
			alignItems="center"
			gap={20}
		>
			<Control>
				<Button
					className={cnGoodsTablePagination('Previous')}
					disabled={page <= 1}
					onClick={() => {
						setPage(page - 1);
					}}
				>
					<FontAwesomeIcon icon={faCaretLeft} />
				</Button>
			</Control>

			<Flex container>
				<Control title="Select page">
					<ComboBox
						options={pagesOptions}
						value={String(page)}
						onChange={(key: string) => {
							setPage(Number(key));
						}}
						pin="left"
						direction="top"
					/>
				</Control>
				<Control title="Page size">
					<ComboBox
						options={pageSizeOptions}
						value={String(pageSize)}
						onChange={(key: string) => {
							setPageSize(Number(key));
						}}
						pin="right"
						direction="top"
					/>
				</Control>
			</Flex>

			<Control>
				<Button
					className={cnGoodsTablePagination('Next')}
					disabled={page >= totalPages}
					onClick={() => {
						setPage(page + 1);
					}}
				>
					<FontAwesomeIcon icon={faCaretRight} />
				</Button>
			</Control>
		</Flex>
	);
};

export default GoodsTablePagination;
