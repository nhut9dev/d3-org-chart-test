const styles = {
	['node-layout']: {
		height: '100%',
		width: '100%'
	},
	['content-wrapper']: {
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
	},
	['img-wrapper']: {
		padding: 4,
		borderRadius: '50%',
		position: 'absolute',
		top: '-20px',
		left: 20,
		background: 'white'
	},
	img: { height: 36, width: 36, borderRadius: '50%' }
};

const NodeLayout = (props) => {
	return (
		<div style={styles['node-layout']}>
			<div style={styles['content-wrapper']}>
				{props.data.imageUrl && (
					<div style={styles['img-wrapper']}>
						<img style={styles.img} src={props.data.imageUrl} alt="Profile" />
					</div>
				)}

				<div>{props.data.name}</div>
			</div>
		</div>
	);
};

export default NodeLayout;
