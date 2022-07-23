import {
	QueryClient,
	QueryClientProvider as QCProvider,
} from '@tanstack/react-query';
import React from 'react';

const queryClient = new QueryClient();

const QueryClientProvider: React.FC<React.PropsWithChildren> = ({children}) => {
	return <QCProvider client={queryClient}>{children}</QCProvider>;
};

export default QueryClientProvider;
