import './styles/index.scss';

import MainPage from '@pages/MainPage';
import QueryClientProvider from '@shared/lib/QueryClientProvider';
import React from 'react';

const App: React.FC = () => (
	<QueryClientProvider>
		<MainPage />
	</QueryClientProvider>
);

export default App;
