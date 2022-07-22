import React from 'react';

interface PendableProps extends React.PropsWithChildren {
	isPending: boolean;
}

const Pendable: React.FC<PendableProps> = ({isPending, children}) => {
	return <div>{isPending ? <div>Loading</div> : children}</div>;
};

export default Pendable;
