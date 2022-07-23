import './styles.scss';

import {cn} from '@bem-react/classname';
import React from 'react';

interface ExternalLinkProps {
	children: React.ReactNode;
	href?: string;
}

const cnExternalLink = cn('ExternalLink');

const ExternalLink: React.FC<ExternalLinkProps> = ({children, href = '#'}) => {
	return (
		<a
			className={cnExternalLink()}
			href={href}
			target="_blank"
			rel="noopener noreferrer"
		>
			{children}
		</a>
	);
};

export default ExternalLink;
