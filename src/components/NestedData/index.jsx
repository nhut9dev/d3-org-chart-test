import { useRef } from 'react';
import { useLayoutEffect } from 'react';
import { OrgChart } from 'd3-org-chart';
import { hierarchy } from 'd3-hierarchy';

const h = {
	id: 1,
	name: 'node1',
	children: [
		{ id: 2, name: 'node2' },
		{ id: 3, name: 'node3', children: [{ id: 4, name: 'node4' }] }
	]
};

function getFlattenedData(dataHierarchy) {
	const descendants = hierarchy(dataHierarchy).descendants();

	descendants.forEach((d, i) => {
		d.id = d.id || 'id' + i;
	});

	return descendants
		.map((d, i) => [d.parent?.data?.id, d.data])
		.map(([parentId, data]) => {
			const copy = { ...data };
			delete copy.children;
			return { ...copy, ...{ parentId } };
		});
}

const styles = {
	orgChart: {
		height: 'calc(100vh - 60px)',
		backgroundColor: '#eaeaea'
	}
};

const NestedData = () => {
	const d3Container = useRef(null);

	const flattenedData = getFlattenedData(h);

	useLayoutEffect(() => {
		const toggleDetailsCard = (nodeId) => {
			console.log('clicked card');
		};
		const chart = new OrgChart();
		chart
			.container(d3Container.current)
			.data(flattenedData)
			// .nodeWidth((d) => 300)
			// .nodeHeight((d) => 150)
			// .compactMarginBetween((d) => 80)
			.onNodeClick((d) => {
				toggleDetailsCard(d);
			})
			.render();
	}, [flattenedData]);

	return <div style={styles.orgChart} ref={d3Container}></div>;
};

export default NestedData;
