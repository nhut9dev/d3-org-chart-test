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

const StyledTree = () => {
	const d3Container = useRef(null);

	useLayoutEffect(() => {
		const toggleDetailsCard = (nodeId) => {
			console.log('clicked card');
		};
		const chart = new OrgChart();
		chart
			.container(d3Container.current)
			.data(data)
			.nodeHeight((d) => 85 + 25)
			.nodeWidth((d) => 220 + 2)
			.childrenMargin((d) => 50)
			.compactMarginBetween((d) => 35)
			.compactMarginPair((d) => 30)
			.neighbourMargin((a, b) => 20)
			.nodeContent(function (d, i, arr, state) {
				const color = '#FFFFFF';
				const imageDiffVert = 25 + 2;
				return `
                <div style='width:${
									d.width
								}px;height:${d.height}px;padding-top:${imageDiffVert - 2}px;padding-left:1px;padding-right:1px'>
                        <div style="font-family: 'Inter', sans-serif;background-color:${color};  margin-left:-1px;width:${d.width - 2}px;height:${d.height - imageDiffVert}px;border-radius:10px;border: 1px solid #E4E2E9">
                            <div style="display:flex;justify-content:flex-end;margin-top:5px;margin-right:8px">#${
															d.data.id
														}</div>
                            <div style="background-color:${color};margin-top:${-imageDiffVert - 20}px;margin-left:${15}px;border-radius:100px;width:50px;height:50px;" ></div>
                            <div style="margin-top:${
															-imageDiffVert - 20
														}px;">   <img src=" ${d.data.image}" style="margin-left:${20}px;border-radius:100px;width:40px;height:40px;" /></div>
                            <div style="font-size:15px;color:#08011E;margin-left:20px;margin-top:10px">  ${
															d.data.name
														} </div>
                            <div style="color:#716E7B;margin-left:20px;margin-top:3px;font-size:10px;"> ${
															d.data.position
														} </div>

                        </div>
                    </div>
                            `;
			})
			.onNodeClick((d) => {
				toggleDetailsCard(d);
			})
			.render();
	}, []);

	return <div style={styles.orgChart} ref={d3Container}></div>;
};

export default StyledTree;
