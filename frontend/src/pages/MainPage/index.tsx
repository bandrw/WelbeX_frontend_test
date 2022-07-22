import Page from '@components/Page';
import GoodsTable from '@features/goods-table/ui';
import React from 'react';

const MainPage: React.FC = () => {
	return (
		<Page title="WelbeX Frontend test - bandrw">
			<GoodsTable />
		</Page>
	);
};

export default MainPage;
