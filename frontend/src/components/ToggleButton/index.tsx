import './styles.scss';

import {cn} from '@bem-react/classname';
import Button, {ButtonProps} from '@components/Button';
import React from 'react';

interface ToggleButtonProps extends ButtonProps {
	toggled: boolean;
}

const cnToggleButton = cn('ToggleButton');

const ToggleButton: React.FC<ToggleButtonProps> = ({toggled, ...props}) => {
	return <Button className={cnToggleButton({toggled})} {...props} />;
};

export default ToggleButton;
