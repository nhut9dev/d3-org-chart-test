import { useRef } from 'react';
import { useLayoutEffect } from 'react';
import { OrgChart } from 'd3-org-chart';

const data = [
	{ customId: 1, customParentId: null, customName: 'node1' },
	{ customId: 2, customParentId: 1, customName: 'node2' },
	{ customId: 3, customParentId: 1, customName: 'node3' }
];

const styles = {
	orgChart: {
		height: 'calc(100vh - 60px)',
		backgroundColor: '#eaeaea'
	}
};

const CustomContent = () => {
	const d3Container = useRef(null);

	useLayoutEffect(() => {
		const toggleDetailsCard = (nodeId) => {
			console.log('clicked card');
		};
		const chart = new OrgChart();
		chart
			.container(d3Container.current)
			.data(data)
			.nodeId((dataItem) => dataItem.customId)
			.parentNodeId((dataItem) => dataItem.customParentId)
			// .nodeWidth((d) => 300)
			// .nodeHeight((d) => 150)
			// .compactMarginBetween((d) => 80)
			.nodeContent((node) => {
				return `<div 
          style="background-color:aqua;width:${node.width}px;height:${node.height}px"
        > 
             ${node.data.customName}
         </div>`;
			})
			.onNodeClick((d) => {
				toggleDetailsCard(d);
			})
			.render();
	}, []);

	return <div style={styles.orgChart} ref={d3Container}></div>;
};

export default CustomContent;
