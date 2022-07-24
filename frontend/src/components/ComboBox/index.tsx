import './styles.scss';

import {cn} from '@bem-react/classname';
import Button, {ButtonPin} from '@components/Button';
import Tooltip, {TooltipDirection} from '@components/Tooltip';
import {faChevronDown} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect, useMemo, useRef, useState} from 'react';

export interface ComboBoxOption {
	key: string;
	name: string;
}

interface ComboBoxProps {
	options: ComboBoxOption[];
	value: string | null;
	onChange: (value: string) => void;
	showNullOption?: boolean;
	pin?: ButtonPin;
	direction?: TooltipDirection;
}

const cnComboBox = cn('ComboBox');

const ComboBox: React.FC<ComboBoxProps> = ({
	options,
	value,
	onChange,
	showNullOption = false,
	pin,
	direction,
}) => {
	const [showTooltip, setShowTooltip] = useState(false);
	const listRef = useRef<HTMLUListElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if (
				event.target instanceof HTMLElement &&
				listRef.current &&
				buttonRef.current &&
				!listRef.current.contains(event.target) &&
				!buttonRef.current.contains(event.target)
			)
				setShowTooltip(false);
		};

		document.addEventListener('mousedown', handleClick);

		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	}, []);

	const displayName = useMemo(
		() => options.find((opt) => opt.key === value),
		[options, value]
	);

	return (
		<Tooltip
			isOpened={showTooltip}
			popup={
				<ul ref={listRef} className={cnComboBox('List')}>
					{showNullOption ? (
						<li
							onClick={() => {
								onChange(null);
								setShowTooltip(false);
							}}
							className={cnComboBox('List-Item', {
								selected: value === null,
							})}
						>
							None
						</li>
					) : null}
					{options.map((option) => (
						<li
							onClick={() => {
								onChange(option.key);
								setShowTooltip(false);
							}}
							className={cnComboBox('List-Item', {
								selected: option.key === value,
							})}
							key={option.key}
						>
							{option.name}
						</li>
					))}
				</ul>
			}
			direction={direction}
		>
			<Button
				className={cnComboBox('Button', {opened: showTooltip})}
				ref={buttonRef}
				onClick={() => setShowTooltip((prevState) => !prevState)}
				pin={pin}
				rightIcon={<FontAwesomeIcon icon={faChevronDown} />}
			>
				{value === null ? 'None' : displayName?.name}
			</Button>
		</Tooltip>
	);
};

export default ComboBox;
