import './styles.scss';

import {cn} from '@bem-react/classname';
import Button from '@components/Button';
import Tooltip from '@components/Tooltip';
import React, {useMemo, useState} from 'react';

export interface ComboBoxOption {
	key: string;
	name: string;
}

interface ComboBoxProps {
	options: ComboBoxOption[];
	value: string | null;
	onChange: (value: string) => void;
}

const cnComboBox = cn('ComboBox');

const ComboBox: React.FC<ComboBoxProps> = ({options, value, onChange}) => {
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
					<li
						onClick={() => onChange(null)}
						className={cnComboBox('List-Item', {
							selected: value === null,
						})}
					>
						None
					</li>
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
		>
			<Button onClick={() => setShowTooltip((prevState) => !prevState)}>
				{value === null ? 'None' : displayName?.name}
			</Button>
		</Tooltip>
	);
};

export default ComboBox;
