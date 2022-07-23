import React from 'react';

interface PendableProps extends React.PropsWithChildren {
	isPending: boolean;
}

const Pendable: React.FC<PendableProps> = ({isPending, children}) => {
	return (
		<div>
			{/* <div>{isPending && 'Loading'}</div> // TODO */}
			<div>{children}</div>
		</div>
	);
};

export default Pendable;
