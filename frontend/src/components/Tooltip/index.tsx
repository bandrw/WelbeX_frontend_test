import './styles.scss';

import {cn} from '@bem-react/classname';
import React, {useEffect, useRef, useState} from 'react';
import ReactDOM from 'react-dom';

interface Offset {
	top: number;
	left: number;
	width: number;
	height: number;
}

type TooltipDirection = 'right' | 'bottom';

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

	const getLeft = () => {
		if (direction === 'bottom') return offset.left + offset.width / 2;
		if (direction === 'right') return offset.left + offset.width + GAP;
		return 0;
	};
	const getTop = () => {
		if (direction === 'bottom') return offset.top + offset.height + GAP;
		if (direction === 'right') return offset.top + offset.height / 2;
	};

	return ReactDOM.createPortal(
		<div
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
	const [offset, setOffset] = useState<Offset>({
		top: 0,
		left: 0,
		width: 0,
		height: 0,
	});
	const ref = useRef(null);

	const updateOffset = {
		initialized: ref.current !== null,
		top: ref.current?.offsetTop || 0,
		left: ref.current?.offsetLeft || 0,
		width: ref.current?.offsetWidth || 0,
		height: ref.current?.offsetHeight || 0,
	};

	useEffect(() => {
		if (updateOffset.initialized) {
			setOffset({
				top: ref.current.offsetTop,
				left: ref.current.offsetLeft,
				width: ref.current.offsetWidth,
				height: ref.current.offsetHeight,
			});
		} else {
			setOffset({
				top: updateOffset.top,
				left: updateOffset.left,
				height: updateOffset.height,
				width: updateOffset.width,
			});
		}
	}, [
		updateOffset.initialized,
		updateOffset.height,
		updateOffset.left,
		updateOffset.top,
		updateOffset.width,
	]);

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
