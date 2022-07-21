import Flex from '@components/Flex';
import React from 'react';

const Header: React.FC = () => {
	return (
		<Flex
			container
			width="100%"
			height={80}
			justifyContent="center"
			alignItems="center"
		>
			<h1>Simple Table</h1>
		</Flex>
	);
};

export default Header;
