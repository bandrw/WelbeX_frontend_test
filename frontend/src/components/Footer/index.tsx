import './styles.scss';

import {cn} from '@bem-react/classname';
import ExternalLink from '@components/ExternalLink';
import Flex from '@components/Flex';
import React from 'react';

const cnFooter = cn('Footer');

const Footer: React.FC = () => {
	return (
		<Flex
			className={cnFooter()}
			container
			width="100%"
			height={40}
			justifyContent="center"
			alignItems="center"
		>
			<div className={cnFooter('Icon')} />
			<ExternalLink href="https://github.com/bandrw/WelbeX_frontend_test">
				github.com/bandrw/WelbeX_frontend_test
			</ExternalLink>
		</Flex>
	);
};

export default Footer;
