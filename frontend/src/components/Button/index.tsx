import './styles.scss';

import {cn} from '@bem-react/classname';
import React from 'react';

export type ButtonPin = 'left' | 'right';

export interface ButtonProps extends React.PropsWithChildren {
	className?: string;
	disabled?: boolean;
	onClick?: () => void;
	view?: 'action' | 'default' | 'pseudo';
	size?: 's' | 'm' | 'l';
	pin?: ButtonPin;
}

const cnButton = cn('Button');

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			children,
			className,
			disabled = false,
			view = 'default',
			size = 's',
			onClick,
			pin,
		},
		ref
	) => {
		return (
			<button
				ref={ref}
				disabled={disabled}
				className={[
					cnButton({
						[view]: true,
						[size]: true,
						[`pin-${pin}`]: pin !== undefined,
					}),
					className,
				].join(' ')}
				onClick={onClick}
				type="button"
			>
				{children}
			</button>
		);
	}
);

export default Button;
