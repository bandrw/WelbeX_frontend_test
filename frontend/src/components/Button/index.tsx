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
	rightIcon?: React.ReactNode;
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
			rightIcon,
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
						withRightIcon: rightIcon !== undefined,
					}),
					className,
				].join(' ')}
				onClick={onClick}
				type="button"
			>
				<span className={cnButton('Text')}>{children}</span>
				{rightIcon !== undefined && (
					<span className={cnButton('RightIcon')}>{rightIcon}</span>
				)}
			</button>
		);
	}
);

export default Button;
