import './styles.scss';

import {cn} from '@bem-react/classname';
import Flex from '@components/Flex';
import {faTable} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
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
			gap={15}
		>
			<FontAwesomeIcon className={cnHeader('Icon')} icon={faTable} />
			<h1>Table for WelbeX</h1>
		</Flex>
	);
};

export default Header;
