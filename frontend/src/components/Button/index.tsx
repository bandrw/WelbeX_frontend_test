import './styles.scss';

import {cn} from '@bem-react/classname';
import React from 'react';

interface ButtonProps extends React.PropsWithChildren {
	view?: 'action' | 'default' | 'pseudo';
	size?: 's' | 'm' | 'l';
	onClick: () => void;
}

const cnButton = cn('Button');

const Button: React.FC<ButtonProps> = ({
	children,
	view = 'default',
	size = 's',
	onClick,
}) => {
	return (
		<button
			className={[cnButton({[view]: true}), cnButton({[size]: true})].join(' ')}
			onClick={onClick}
			type="button"
		>
			{children}
		</button>
	);
};

export default Button;
