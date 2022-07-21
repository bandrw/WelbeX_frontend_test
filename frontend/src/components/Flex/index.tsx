import React from 'react';

interface FlexProps {
	className?: string;
	children?: React.ReactNode;
	margin?: React.CSSProperties['margin'];
	padding?: React.CSSProperties['padding'];
	width?: React.CSSProperties['width'];
	height?: React.CSSProperties['height'];
	minHeight?: React.CSSProperties['minHeight'];
	maxWidth?: React.CSSProperties['maxWidth'];
	container?: boolean;
	justifyContent?: React.CSSProperties['justifyContent'];
	alignItems?: React.CSSProperties['alignItems'];
	flexDirection?: React.CSSProperties['flexDirection'];
	flexGrow?: React.CSSProperties['flexGrow'];
	flexBasis?: React.CSSProperties['flexBasis'];
	flexShrink?: React.CSSProperties['flexShrink'];
	flexWrap?: React.CSSProperties['flexWrap'];
	flex?: React.CSSProperties['flex'];
}

const Flex: React.FC<FlexProps> = ({
	className,
	children,
	margin,
	padding,
	width,
	height,
	minHeight,
	maxWidth,
	container = false,
	justifyContent,
	alignItems,
	flexDirection,
	flexGrow,
	flexBasis,
	flexShrink,
	flexWrap,
	flex,
	...rest
}) => {
	return (
		<div
			className={className}
			style={{
				margin,
				padding,
				width,
				height,
				minHeight,
				maxWidth,
				display: container ? 'flex' : 'block',
				justifyContent,
				alignItems,
				flexDirection,
				flexGrow,
				flexBasis,
				flexShrink,
				flexWrap,
				flex,
			}}
			{...rest}
		>
			{children}
		</div>
	);
};

export default Flex;
