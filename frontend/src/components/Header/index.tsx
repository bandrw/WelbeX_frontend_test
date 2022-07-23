import './styles.scss';

import {cn} from '@bem-react/classname';
import Flex from '@components/Flex';
import React from 'react';

const cnHeader = cn('Header');

const Header: React.FC = () => {
	return (
		<Flex
			className={cnHeader()}
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
