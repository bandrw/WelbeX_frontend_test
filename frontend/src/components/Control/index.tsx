import './styles.scss';

import {cn} from '@bem-react/classname';
import Text from '@components/Text';
import React from 'react';

interface ControlProps extends React.PropsWithChildren {
	title?: string;
}

const cnControl = cn('Control');

const Control: React.FC<ControlProps> = ({title, children}) => {
	return (
		<div className={cnControl()}>
			<Text className={cnControl('Title')}>{title}</Text>
			<div className={cnControl('Content')}>{children}</div>
		</div>
	);
};

export default Control;
