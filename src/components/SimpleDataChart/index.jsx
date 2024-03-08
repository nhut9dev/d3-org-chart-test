import { useRef } from 'react';
import { useLayoutEffect } from 'react';
import { OrgChart } from 'd3-org-chart';

const data = [
	{ id: 1, parentId: null, name: 'node1' },
	{ id: 2, parentId: 1, name: 'node2' },
	{ id: 3, parentId: 1, name: 'node3' }
];

const styles = {
	orgChart: {
		height: 'calc(100vh - 60px)',
		backgroundColor: '#eaeaea'
	}
};

const SimpleDataChart = () => {
	const d3Container = useRef(null);

	useLayoutEffect(() => {
		const toggleDetailsCard = (nodeId) => {
			console.log('clicked card');
		};
		const chart = new OrgChart();
		chart
			.container(d3Container.current)
			.data(data)
			// .nodeWidth((d) => 300)
			// .nodeHeight((d) => 150)
			// .compactMarginBetween((d) => 80)
			.onNodeClick((d) => {
				toggleDetailsCard(d);
			})
			.render();
	}, []);

	return <div style={styles.orgChart} ref={d3Container}></div>;
};

export default SimpleDataChart;
