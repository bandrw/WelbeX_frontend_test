import React, {useEffect, useState} from 'react';

export interface Offset {
	top: number;
	left: number;
	bottom: number;
	right: number;
	height: number;
	width: number;
	x: number;
	y: number;
}

/**
 * @Returns Element's size by ref
 */
export const useOffset = <T extends HTMLElement = HTMLElement>(
	ref: React.MutableRefObject<T>
) => {
	const [offset, setOffset] = useState<Offset>({
		bottom: 0,
		height: 0,
		left: 0,
		right: 0,
		top: 0,
		width: 0,
		x: 0,
		y: 0,
	});

	/* eslint-disable-next-line react-hooks/exhaustive-deps */
	useEffect(() => {
		setOffset((prevState) => {
			const rect = ref.current.getBoundingClientRect();
			if (JSON.stringify(prevState) === JSON.stringify(rect)) return prevState;
			return rect;
		});
	});

	return offset;
};
