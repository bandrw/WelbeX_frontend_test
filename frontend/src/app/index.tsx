import './styles/index.scss';

import MainPage from '@pages/MainPage';
import QueryClientProvider from '@shared/lib/QueryClient/QueryClientProvider';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';

const App: React.FC = () => (
	<QueryClientProvider>
		<BrowserRouter>
			<MainPage />
		</BrowserRouter>
	</QueryClientProvider>
);

export default App;
