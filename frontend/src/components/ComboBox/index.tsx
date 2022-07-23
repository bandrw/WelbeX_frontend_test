import './styles.scss';

import {cn} from '@bem-react/classname';
import Button, {ButtonPin} from '@components/Button';
import Tooltip, {TooltipDirection} from '@components/Tooltip';
import React, {useMemo, useState} from 'react';

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

	const displayName = useMemo(
		() => options.find((opt) => opt.key === value),
		[options, value]
	);

	return (
		<Tooltip
			isOpened={showTooltip}
			popup={
				<ul className={cnComboBox('List')}>
					{showNullOption ? (
						<li
							onClick={() => onChange(null)}
							className={cnComboBox('List-Item', {
								selected: value === null,
							})}
						>
							None
						</li>
					) : null}
					{options.map((option) => (
						<li
							onClick={() => onChange(option.key)}
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
				onClick={() => setShowTooltip((prevState) => !prevState)}
				pin={pin}
			>
				{value === null ? 'None' : displayName?.name}
			</Button>
		</Tooltip>
	);
};

export default ComboBox;
