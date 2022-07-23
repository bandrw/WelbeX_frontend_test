import React, {useEffect, useState} from 'react';

export interface Offset {
	top: number;
	left: number;
	width: number;
	height: number;
}

/**
 * @Returns Element's size by ref
 */
export const useOffset = <T extends HTMLElement = HTMLElement>(
	ref: React.MutableRefObject<T>
) => {
	const [offset, setOffset] = useState<Offset>({
		top: 0,
		left: 0,
		width: 0,
		height: 0,
	});

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
		ref,
	]);

	return {offset};
};
