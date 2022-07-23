import './styles.scss';

import {cn} from '@bem-react/classname';
import React from 'react';

interface TextInputProps {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
}

const cnTextInput = cn('TextInput');

const TextInput: React.FC<TextInputProps> = ({
	value,
	onChange,
	placeholder,
}) => {
	return (
		<input
			className={cnTextInput()}
			value={value}
			onChange={(e) => onChange(e.target.value)}
			type="text"
			placeholder={placeholder}
		/>
	);
};

export default TextInput;
