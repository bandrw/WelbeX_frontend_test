import './styles.scss';

import {cn} from '@bem-react/classname';
import {Offset, useOffset} from '@shared/lib/hooks/useOffset';
import React, {useRef} from 'react';
import ReactDOM from 'react-dom';

export type TooltipDirection = 'right' | 'bottom' | 'top';

interface TooltipProps extends React.PropsWithChildren {
	popup: React.ReactNode;
	direction?: TooltipDirection;
	isOpened: boolean;
}

interface PopupProps extends React.PropsWithChildren {
	offset: Offset;
	direction?: TooltipDirection;
}

const cnPopup = cn('Popup');

const Popup: React.FC<PopupProps> = ({
	children,
	offset,
	direction = 'bottom',
}) => {
	const GAP = 10;
	const ref = useRef<HTMLDivElement>(null);

	const popupOffset = useOffset<HTMLDivElement>(ref);

	const getLeft = () => {
		if (direction === 'bottom') return offset.left + offset.width / 2;
		if (direction === 'right') return offset.left + offset.width + GAP;
		if (direction === 'top') return offset.left + offset.width / 2;
	};
	const getTop = () => {
		if (direction === 'bottom') return offset.top + offset.height + GAP;
		if (direction === 'right') return offset.top + offset.height / 2;
		if (direction === 'top') return offset.top - popupOffset.height - GAP;
	};

	return ReactDOM.createPortal(
		<div
			ref={ref}
			className={cnPopup({[direction]: true})}
			style={{left: getLeft(), top: getTop()}}
		>
			{children}
		</div>,
		document.getElementById('root')
	);
};

const Tooltip: React.FC<TooltipProps> = ({
	popup,
	children,
	direction = 'bottom',
	isOpened,
}) => {
	const ref = useRef<HTMLDivElement>(null);

	const offset = useOffset<HTMLDivElement>(ref);

	return (
		<>
			<div ref={ref}>{children}</div>
			{isOpened && (
				<Popup offset={offset} direction={direction}>
					{popup}
				</Popup>
			)}
		</>
	);
};

export default Tooltip;
