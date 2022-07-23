import './styles.scss';

import {cn} from '@bem-react/classname';
import React from 'react';

interface PendableProps extends React.PropsWithChildren {
	isPending: boolean;
}

const cnPendable = cn('Pendable');

const Pendable: React.FC<PendableProps> = ({isPending, children}) => {
	return (
		<div className={cnPendable()}>
			<div className={cnPendable('Loader', {pending: isPending})}>
				Loading...
			</div>
			<div>{children}</div>
		</div>
	);
};

export default Pendable;
