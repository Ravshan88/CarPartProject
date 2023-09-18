import React from 'react';

const Loader = () => {
	return (
		<div style={{
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			minHeight: '50vh',
			margin: 0,
			}}>
			<div className='spinner-border d-block mx-auto' role='status'>
				<span className='visually-hidden'>Loading...</span>
			</div>
		</div>
	)
}

export default Loader
