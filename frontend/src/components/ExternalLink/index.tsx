import React from 'react';

interface ExternalLinkProps {
	children: React.ReactNode;
	href?: string;
}

const ExternalLink: React.FC<ExternalLinkProps> = ({children, href = '#'}) => {
	return (
		<a href={href} target="_blank" rel="noopener noreferrer">
			{children}
		</a>
	);
};

export default ExternalLink;
