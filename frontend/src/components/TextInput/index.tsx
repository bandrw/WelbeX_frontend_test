import './styles.scss';

import {cn} from '@bem-react/classname';
import React, {useEffect, useState} from 'react';

interface TextInputProps {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	debounceDelay?: number;
}

const cnTextInput = cn('TextInput');

const TextInput: React.FC<TextInputProps> = ({
	value,
	onChange,
	placeholder,
	debounceDelay = 500,
}) => {
	const [state, setState] = useState(value);

	useEffect(() => {
		const timout = setTimeout(() => {
			onChange(state);
		}, debounceDelay);

		return () => {
			clearTimeout(timout);
		};
	}, [debounceDelay, onChange, state]);

	useEffect(() => {
		setState(value);
	}, [value]);

	return (
		<input
			className={cnTextInput()}
			value={state}
			onChange={(e) => setState(e.target.value)}
			type="text"
			placeholder={placeholder}
		/>
	);
};

export default TextInput;
