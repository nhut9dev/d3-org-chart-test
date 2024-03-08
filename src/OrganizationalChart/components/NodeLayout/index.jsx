import styles from './NodeLayout.module.scss';

const NodeLayout = (props) => {
	return (
		<div style={{ height: '100%', width: '100%' }}>
			<div
				style={{
					position: 'relative',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					border: '1px solid black',
					borderRadius: '10px',
					height: '100%',
					background: 'white',
					textAlign: 'center',
					padding: '0 10px'
				}}
			>
				{props.data.imageUrl && (
					<div
						style={{
							padding: 4,
							borderRadius: '50%',
							position: 'absolute',
							top: '-20px',
							left: 20,
							background: 'white'
						}}
					>
						<img
							style={{ height: 36, width: 36, borderRadius: '50%' }}
							src={props.data.imageUrl}
							alt="Profile"
						/>
					</div>
				)}

				{props.editing ? <input /> : <div>{props.data.name}</div>}
			</div>
		</div>
	);
};

export default NodeLayout;
