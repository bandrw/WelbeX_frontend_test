import './styles.scss';

import {cn} from '@bem-react/classname';
import Flex from '@components/Flex';
import React from 'react';

const cnText = cn('Text');

interface TextProps extends React.PropsWithChildren {
	className?: string;
	heading?: boolean;
}

const Text: React.FC<TextProps> = ({children, heading, className}) => {
	return (
		<Flex
			container
			alignItems="center"
			className={[cnText({heading}), className].join(' ')}
		>
			{children}
		</Flex>
	);
};

export default Text;
