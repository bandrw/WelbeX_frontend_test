import Flex from '@components/Flex';
import Footer from '@components/Footer';
import Header from '@components/Header';
import React, {useEffect} from 'react';

interface PageProps {
	children: React.ReactNode;
	title: string;
}

const Page: React.FC<PageProps> = ({children, title}) => {
	useEffect(() => {
		document.title = title;
	}, [title]);

	return (
		<Flex
			container
			flexDirection="column"
			alignItems="center"
			minHeight="100vh"
			justifyContent="space-between"
		>
			<Header />
			{children}
			<Footer />
		</Flex>
	);
};

export default Page;
